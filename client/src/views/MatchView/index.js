import React, { useState, useEffect } from "react";
// Views
import SettingsView from "../SettingsView";
// Components
import Layout from "../../components/Layout";
import Analytics from "../../components/Analytics";
import Header from "../../components/Header";
import Standings from "../../components/Standings";
import EmptyContent from "../../components/EmptyContent";
import Footer from "../../components/Footer";
// Utils
import COUNTRIES from "../../constants/countries";
import { DEFAULT_COUNTRY } from "../../config/defaults";
import {
  fetchLeagueById,
  fetchLeaguesByCountry,
  fetchLeagueStandings
} from "../../data/api";

function Match(props) {
  const location = props.location?.pathname;
  const [country, setCountry] = useState(COUNTRIES[DEFAULT_COUNTRY]["name"]);
  const [leagues, setLeagues] = useState(null);
  const [matches, setMatches] = useState(null);
  const [standings, setStandings] = useState(null);

  // Active league states
  const [activeLeagueId, setActiveLeagueId] = useState(null);
  const [activeLeagueData, setActiveLeagueData] = useState(null);
  const [activeClubId, setactiveClubId] = useState(null);

  // Loading states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  function handleReset() {
    setLeagues(null);
    setActiveLeagueId(null);
    setStandings(null);
    setactiveClubId(null);
    setActiveLeagueData(null);
    setError(false);
  }

  async function fetchLeagues(country) {
    try {
      setLoading(true);
      const leaguesData = await fetchLeaguesByCountry(country);

      if (leaguesData.success) {
        setLeagues(leaguesData.data);
      } else {
        throw new Error("Error fetching leagues");
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function* fetchAllData() {
      try {
        setLoading(true);
        const matchData = await fetchLeagueById(activeLeagueId);

        if (matchData.success) {
          yield { payload: matchData, handleState: setMatches };
        } else {
          throw new Error("Error fetching league data");
        }

        const standingsData = await fetchLeagueStandings(activeLeagueId);

        if (standingsData.success) {
          yield { payload: standingsData, handleState: setStandings };
        } else {
          throw new Error("Error fetching league standings");
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    async function loadData() {
      const data = fetchAllData();

      for await (let request of data) {
        const { payload, handleState } = request;
        const { data } = payload;

        handleState(data);
      }
    }

    if (activeLeagueId && !activeLeagueData) {
      const activeLeague = leagues.find(
        league => league.id === +activeLeagueId
      );

      loadData();
      setActiveLeagueData(activeLeague);
    } else if (!activeLeagueId && !leagues) {
      fetchLeagues(country);
    }
  }, [country, leagues, activeLeagueId, activeLeagueData]);

  return (
    <Layout>
      <Header
        location={location}
        countries={Object.values(COUNTRIES)}
        leagues={leagues}
        country={country}
        setCountry={setCountry}
        activeLeagueId={activeLeagueId}
        setActiveLeagueId={setActiveLeagueId}
        handleReset={handleReset}
        loading={loading}
      />

      <div style={style.body}>
        {loading && !error ? (
          <article style={style.fullHeight}>Loading...</article>
        ) : (
          activeLeagueData &&
          !error && (
            <section style={{ height: "100%" }}>
              {location === "/settings" ? (
                <SettingsView />
              ) : (
                <div style={{ height: "inherit" }}>
                  <Standings
                    standings={standings}
                    handleClick={setactiveClubId}
                  />
                  <Analytics
                    standings={standings} // TODO: Standings should be a map
                    allMatches={matches}
                    activeLeagueData={activeLeagueData}
                    activeClubId={activeClubId}
                  />
                  <Footer />
                </div>
              )}
            </section>
          )
        )}

        {!loading && !activeLeagueData && !activeClubId && !error && (
          <EmptyContent
            message={"Start by selecting a country from the top menu"}
          />
        )}

        {error && (
          <EmptyContent message={"There was an error loading the data"}>
            <button onClick={() => handleReset()}>Try again?</button>
          </EmptyContent>
        )}
      </div>
    </Layout>
  );
}

const style = {
  body: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    height: "calc(100vh - 80px)"
  },
  fullHeight: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    height: "100%"
  }
};

export { Match as MatchView };
