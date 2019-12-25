import React from "react";
import Radium from "radium";
// Components
import NumberLabel from "../NumberLabel";

const Badge = ({ id, position, crest, name, label = false, onClick, style }) => {
  return (
    <article style={{ position: "relative" }}>
      <div
        style={[
          styles.container.size,
          styles.container.layout,
          styles.container.theme,
          style
        ]}
        onClick={e => onClick && onClick(e, id)}
      >
        <img
          style={[styles.badge.layout, styles.badge.size, styles.badge.theme]}
          src={crest}
          alt={name}
        />
      </div>

      {position && label && <NumberLabel position={position} />}
    </article>
  );
};

const styles = {
  container: {
    layout: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      overflow: "hidden",
      borderRadius: "100%",
      margin: ".25rem 1rem",
      transition: "all .2s ease-in"
    },
    size: {
      maxHeight: "7.5rem",
      maxWidth: "7.5rem",
      width: "7.5rem",
      height: "7.5rem"
    },
    theme: {
      backgroundColor: "#1f1f1f",
      // border: ".4rem solid #E0EDFF"
    }
  },
  badge: {
    layout: { 
      boxSizing: "border-box",
    },
    size: { width: "6.5rem" },
    theme: {
      ":hover": {
        cursor: "pointer"
      }
    }
  }
};

export default Radium(Badge);
