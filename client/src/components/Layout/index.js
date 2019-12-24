import React from "react";

const Layout = ({ type = "fullscreen", children }) => {
  const styles = {
    fullscreen: {
      minHeight: "100vh",
      maxWidth: "100vw",
      overflowX: "hidden"
    }
  };

  return <div style={styles[type]}>{children}</div>;
};

export default Layout;
