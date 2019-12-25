import React, { useState } from "react";
import Radium from "radium";
import { ThemeContext } from "../../context/theme.context";
// Components
import Logo from "../../components/Logo";
import ContinentMap from "../../components/ContinentMap";

const World = Radium(props => {
  const [content, setContent] = useState("");

  return (
    <ThemeContext.Consumer>
      {theme => (
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
      )}
    </ThemeContext.Consumer>
  );
});

const styles = {
  container: {
    position: "relative",
    height: "100vh",
    width: "100vw",
    backgroundColor: "rgba(0, 0, 0, 0.92)",
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
