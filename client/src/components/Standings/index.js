import React from "react";
import Radium from "radium";
// Components
import Badge from "../Badge";

const Standings = ({ standings, handleClick }) => {
  function onClick(e, id) {
    handleClick(id);
  }

  return (
    <ol style={Object.values(styles)}>
      {standings?.map((club, i) => (
        <li style={{ margin: "1.15rem 1rem" }} key={`standings-list-${i}`}>
          <Badge
            id={club.id}
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
    height: "calc(100vh - 40px)"
  },
  size: {},
  theme: {
    backgroundColor: "#141414"
  }
};

export default Radium(Standings);
