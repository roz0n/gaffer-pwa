import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import queryString from "query-string";
// Views
import SettingsView from "../SettingsView";
// Components
import Layout from "../../components/Layout";
import Analytics from "../../components/Analytics";
import Header from "../../components/Header";
import Standings from "../../components/Standings";
import EmptyContent from "../../components/EmptyContent";
// Utils
import COUNTRIES from "../../constants/countries";
import {
  fetchLeagueById,
  fetchLeagueStandings,
  fetchLeaguesByCountry
} from "../../data/api";

function Match(props) {
  // Routing
  const { location } = props;
  const params = queryString.parse(location.search);
  const { country: countryParam } = params;
  const countryData = COUNTRIES[countryParam];
  // TODO: This can be named better
  const [settingsViewActive, setsettingsViewActive] = useState(false);

  // Semi-persistent data
  const [country, setCountry] = useState(null);
  const [league, setLeague] = useState(null);
  const [standings, setStandings] = useState(null);
  const [matches, setMatches] = useState(null);

  // Active league states
  const [activeClubId, setActiveClubId] = useState(null);

  // Loading states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  function handleReset() {
    setCountry(null);
    setLeague(null);
    setStandings(null);
    setMatches(null);
    setActiveClubId(null);
    setError(false);
  }

  function toggleSettingsView() {
    setsettingsViewActive(!settingsViewActive);
  }

  // Handle initial load and routing
  useEffect(() => {
    if (!params) {
      return <Redirect to="/" />;
    }

    if (countryParam) {
      setCountry(countryParam);
    }
  }, []);

  // Handle data fetching
  useEffect(() => {
    async function* fetchAllData() {
      try {
        setLoading(true);
        const leagueData = await fetchLeaguesByCountry(country);

        if (leagueData.success) {
          yield { payload: leagueData, handleState: setLeague };
        } else {
          throw new Error("Error fetching league data");
        }

        const matchData = await fetchLeagueById(countryData.leagueId);

        if (matchData.success) {
          yield { payload: matchData, handleState: setMatches };
        } else {
          throw new Error("Error fetching league matches");
        }

        const standingsData = await fetchLeagueStandings(countryData.leagueId);

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

    if (country && countryData && !matches) {
      loadData();
    }
  }, [country, matches]);

  return (
    <Layout>
      <Header
        location={location}
        countries={Object.values(COUNTRIES)}
        country={country}
        setCountry={setCountry}
        settingsViewActive={settingsViewActive}
        handleSettingsView={toggleSettingsView}
        handleReset={handleReset}
        loading={loading}
      />

      <div style={{ width: "100%", display: "flex", flexDirection: "row" }}>
        {standings && !settingsViewActive && (
          <Standings
            standings={standings}
            activeClubId={activeClubId}
            handleClick={setActiveClubId}
          />
        )}

        <div style={style.body}>
          {league && !loading && !settingsViewActive && (
            <section style={{ height: "100%" }}>
              <div style={{ height: "inherit" }}>
                <Analytics
                  country={country}
                  standings={standings} // TODO: Standings should be a map
                  allMatches={matches}
                  leagueData={league}
                  activeClubId={activeClubId}
                />
              </div>
            </section>
          )}

          {settingsViewActive && <SettingsView />}

          {loading && <EmptyContent message={"Preparing tactics..."} />}

          {!league && !loading && !error && (
            <EmptyContent message={"Select a club from the left menu"} />
          )}

          {error && (
            <EmptyContent message={"There was an error loading the data"}>
              <button onClick={() => handleReset()}>Try again?</button>
            </EmptyContent>
          )}
        </div>
      </div>
    </Layout>
  );
}

const style = {
  body: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    height: "100vh",
    width: "100%",
    backgroundColor: "rgb(23, 23, 23)",
    color: "#ffffff"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    height: "100%"
  }
};

export { Match as MatchView };
