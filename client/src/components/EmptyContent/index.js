import React from "react";
import Radium from "radium";

const EmptyContent = ({ icon, children, message, style }) => {
  return (
    <article style={style ? style : styles}>
      {message && <p>{message}</p>}
      {children}
    </article>
  );
};

const styles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "center",
  height: "100%"
};

export default Radium(EmptyContent);
