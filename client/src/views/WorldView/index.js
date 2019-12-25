import React, { useState } from "react";
import Radium from "radium";
// Components
import Logo from "../../components/Logo";
import ContinentMap from "../../components/ContinentMap";

const World = Radium(() => {
  const [content, setContent] = useState("");

  return (
    <div style={styles.container}>
      <article style={styles.header}>
        <Logo />
      </article>

      <ContinentMap
        tipContent={content}
        setTooltipContent={setContent}
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
});

const styles = {
  container: {
    position: "relative",
    height: "100vh",
    width: "100vw",
    backgroundColor: "black",
    overflow: "hidden"
  },
  header: {
    color: "white",
    position: "absolute",
    fontSize: "2rem",
    userSelect: "none",
    maxWidth: "100vw",
    width: "100vw",
    textAlign: "center",
    top: "2.5rem",
    letterSpacing: ".5rem"
  }
};

export { World as WorldView };
