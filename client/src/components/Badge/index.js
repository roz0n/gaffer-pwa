import React from "react";
import Radium from "radium";
// Components
import NumberLabel from "../NumberLabel";

const Badge = ({ id, position, crest, name, label = false, onClick }) => {
  return (
    <article style={{ position: "relative" }}>
      <div
        style={[
          styles.container.size,
          styles.container.layout,
          styles.container.theme
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
      margin: "1rem"
    },
    size: {
      maxHeight: "7.5rem",
      maxWidth: "7.5rem",
      width: "7.5rem",
      height: "7.5rem"
    },
    theme: {
      backgroundColor: "#F5F9FF",
      border: ".4rem solid #E0EDFF"
    }
  },
  badge: {
    layout: { boxSizing: "border-box" },
    size: { width: "4rem" },
    theme: {
      ":hover": {
        cursor: "pointer"
      }
    }
  }
};

export default Radium(Badge);
