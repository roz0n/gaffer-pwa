import React, { useState } from "react";
import Radium from "radium";

const Tabs = props => {
  const { tabs = [] } = props;
  const [activeTab, setActiveTab] = useState(0);

  return (
    <article style={styles.container}>
      <section style={Object.values(styles.header)}>
        {tabs.map(tab => (
          <div
            onClick={e => setActiveTab(tab.id, e)}
          >
            {tab.title}
          </div>
        ))}
      </section>

      <section style={{ margin: "2.5rem 0 0 0" }}>
        <div>{tabs[activeTab].component}</div>
      </section>
    </article>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "2.5rem 0"
  },
  header: {
    layout: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly"
    },
    theme: {
      fontWeight: "bold",
      textTransform: "uppercase",
      ":hover": {
        cursor: "pointer"
      }
    }
  }
}

export default Radium(Tabs);