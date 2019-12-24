import React from "react";

const Footer = () => {
  return (
    <footer style={style.container}>
        <span>data by football-data.org</span>
        <span>github.com/roz0n</span>
    </footer>
  );
};

const style = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    boxSizing: "border-box",
    padding: "1rem",
    fontSize: ".65rem",
    width: "100%",
    borderTop: "1px solid #E0EDFF",
    color: "#cccccc"
  }
};

export default Footer;
