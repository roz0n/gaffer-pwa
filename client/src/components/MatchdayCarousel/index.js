import React, { useState } from "react";
import Radium from "radium";
// Components
import Badge from "../Badge";
import Button from "../Button";

// TODO: Add this to utils
const clubs = [];
const getCrest = id => clubs.find(club => club.id === id)?.crestUrl;

const PREV = "PREV";
const NEXT = "NEXT";
const RESET = "RESET";

const MatchdayCarousel = ({
  standings,
  allMatches,
  activeLeagueName,
  activeClubId,
  currentMatchday = ""
}) => {
  
  const [activeMatchday, setActiveMatchday] = useState();
  const clubMatches = allMatches.filter(
    match =>
      match.homeTeam.id === activeClubId || match.awayTeam.id === activeClubId
  );

  console.log("MATCHES ***", clubMatches);

  // TODO: Do we need this loop here as well?
  const recentMatchData = clubMatches?.filter(match => {
    console.log("** MATCH **", match, activeMatchday, currentMatchday);
    const matchdayToReference = +activeMatchday || +currentMatchday;
    return match.matchday === +matchdayToReference;
  });

  console.log("recentMatchData ***", recentMatchData);

  function handleActiveMatchday(e, type) {
    const matchdayToReference = +activeMatchday || +currentMatchday;

    switch (type) {
      case NEXT:
        return setActiveMatchday(matchdayToReference + 1);
      case PREV:
        return setActiveMatchday(matchdayToReference - 1);
      case RESET:
        return setActiveMatchday(+currentMatchday);
      default:
        break;
    }
  }

  // TODO: Standings should be a map called teams?
  // Standings just needs more data processing (set position property, and create separate clubs map)
  // Then we won't need to loop here
  const homeTeamData = standings.find(
    team => team.id === recentMatchData.homeTeam?.id
  );
  const awayTeamData = standings.find(
    team => team.id === recentMatchData.awayTeam?.id
  );

  return (
    <article style={styles.container.layout}>
      {activeLeagueName && (
        <header>
          <h2>{activeLeagueName}</h2>
          <h3>{`Matchday ${activeMatchday || currentMatchday}`}</h3>
        </header>
      )}

      {activeMatchday && activeMatchday !== currentMatchday ? (
        <Button
          override={true}
          label={"Back to Current Matchday"}
          onClick={e => handleActiveMatchday(e, RESET)}
        />
      ) : (
        <article>
           <h3>{`Upcoming Match`}</h3>
        </article>
      )}

      {activeClubId && (
        <section style={Object.values(styles.panel)}>
          <article>
            <Button
              icon={"navigate_before"}
              disabled={activeMatchday === 1}
              onClick={e => handleActiveMatchday(e, PREV)}
            />
          </article>

          <section style={styles.badge.layout}>
            <div>
              <Badge
                id={homeTeamData.id}
                crest={homeTeamData.crestUrl}
                name={homeTeamData.name}
              />
              {/* <span>{homeTeamData.name}</span> */}
            </div>            
          </section>

          {/* <section style={{ margin: "0 1rem" }}>
            <article>
              <span>{recentMatchData.score?.fullTime?.homeTeam}</span>
              <span style={{ margin: "0 1rem" }}>:</span>
              <span>{recentMatchData.score?.fullTime?.awayTeam}</span>
            </article>
          </section> */}

          <section style={styles.badge.layout}>
            <div>
              <Badge
                id={awayTeamData.id}
                crest={awayTeamData.crestUrl}
                name={awayTeamData.name}
              />
              {/* <span>{homeTeamData.name}</span> */}
            </div>
          </section>

          {/* <article>
            <Button
              icon={"navigate_next"}
              disabled={activeMatchday === matches.length}
              onClick={e => handleActiveMatchday(e, NEXT)}
            />
          </article> */}
        </section>
      )}
    </article>
  );
};

const styles = {
  container: {
    layout: {
      width: "100%"
    }
  },
  panel: {
    layout: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 0 1rem 0"
    },
    theme: {
      fontWeight: "bold",
      fontSize: "2.4rem",
    }
  },
  badge: {
    layout: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
  }
};

export default React.memo(Radium(MatchdayCarousel));
