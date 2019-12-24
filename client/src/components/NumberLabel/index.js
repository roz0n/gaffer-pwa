import React from "react";
import Radium from "radium";

const NumberLabel = ({ position }) => {
  return (
    <article style={[styles.layout, styles.size, styles.theme]}>
      {position}
    </article>
  );
};

const styles = {
  layout: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    right: ".75rem",
    top: "5rem"
  },
  size: {
    maxHeight: "1.5rem",
    maxWidth: "1.5rem",
    width: "1.5rem",
    height: "1.5rem"
  },
  theme: {
    backgroundColor: "#4594FF",
    borderRadius: "100%",
    fontSize: "1rem",
    fontWeight: "bold",
    letterSpacing: "-.1rem",
    color: "#ffffff"
  }
};
export default Radium(NumberLabel);
