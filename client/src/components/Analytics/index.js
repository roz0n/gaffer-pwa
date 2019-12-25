import React from "react";
import Radium from "radium";
// Components
import Tabs from "../Tabs";
import MatchdayCarousel from "../MatchdayCarousel";
// Utils
import COUNTRIES from "../../constants/countries";

function Analytics({
  country,
  standings,
  allMatches,
  leagueData,
  activeClubId
}) {
  // TODO: Get rid of these damn loops
  const activeLeague = leagueData.find(
    league => league.id === COUNTRIES[country].leagueId
  );
  const season = activeLeague?.currentSeason;

  const tabs = [
    {
      id: 0,
      title: "Match",
      component: <h1>Tab one</h1>
    },
    {
      id: 1,
      title: "Lineup",
      component: <h1>Tab two</h1>
    },
    {
      id: 2,
      title: "Stats",
      component: <h1>Tab three</h1>
    }
  ];
  return (
    <>
      {activeClubId && season ? (
        <article style={style.container}>
          <div style={[style.gridItem, style.content]}>
            <span style={{ borderBottom: "1px solid red" }}>
              <MatchdayCarousel
                standings={standings}
                allMatches={allMatches}
                activeClubId={activeClubId}
                activeLeagueName={activeLeague.name}
                currentMatchday={season.currentMatchday}
              />
            </span>
            <Tabs tabs={tabs} activeTab={1} />
          </div>

          <aside style={[style.gridItem, style.sidebar]}>
            <span>Column 2</span>
          </aside>
        </article>
      ) : (
        <article style={style.fullHeight}>
          Select a club to view more information it
        </article>
      )}
    </>
  );
}

const style = {
  container: {
    textAlign: "center",
    display: "grid",
    gridTemplateColumns: "1fr 32.5%",
    gridTemplateRows: "1fr",
    height: "100%"
  },
  fullHeight: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    height: "100%"
  },
  gridItem: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    padding: "4rem",
    backgroundColor: "cyan"
  },
  sidebar: {
    padding: "0 2.5rem",
    backgroundColor: "purple"
  }
};

export default Radium(Analytics);
