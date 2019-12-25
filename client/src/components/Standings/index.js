import React from "react";
import Radium from "radium";
// Components
import Badge from "../Badge";

const Standings = ({ standings, activeClubId, handleClick }) => {
  function onClick(e, id) {
    handleClick(id);
  }

  return (
    <ol style={Object.values(styles)}>
      {standings?.map((club, i) => (
        <li
          style={{
            margin: "1.15rem 1rem"
          }}
          key={`standings-list-${i}`}
        >
          <Badge
            id={club.id}
            style={{
              border:
                activeClubId === club.id && ".3rem solid rgb(85, 255, 112)"
            }}
            position={String(i + 1)}
            label={true}
            crest={club.crestUrl}
            name={club.name}
            onClick={onClick}
          />
        </li>
      ))}
    </ol>
  );
};

const styles = {
  layout: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    listStyleType: "none",
    paddingLeft: 0,
    margin: 0,
    scrollbarWidth: "thin",
    scrollbarColor: "rgb(32, 32, 32) rgb(47, 47, 47)",
    overflow: "auto",
    height: "calc(100vh - 5rem)"
  },
  size: {},
  theme: {
    backgroundColor: "rgb(23, 23, 23)"
  }
};

export default Radium(Standings);
