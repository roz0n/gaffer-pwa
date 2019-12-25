import React from "react";
import Radium from "radium";
// Components
import Badge from "../Badge";

const Standings = ({ standings, handleClick }) => {
  function onClick(e, id) {
    handleClick(id);
  }

  return (
    <ol style={[styles.layout]}>
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
    scrollbarColor: "#4594FF #F5F9FF",
    overflow: "auto",
    height: "calc(100vh - 40px)"
  },
  size: {},
  theme: {}
};

export default Radium(Standings);
