import React from "react";

const Layout = ({ type = "fullscreen", children }) => {
  const styles = {
    fullscreen: {
      minHeight: "100vh",
      maxWidth: "100vw",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column"
    }
  };

  return <div style={styles[type]}>{children}</div>;
};

export default Layout;
