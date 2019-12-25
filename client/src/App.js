import React from "react";
import { StyleRoot } from "radium";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeContext } from "./context/theme.context";
// Components
import { WorldView } from "./views/WorldView";
import { MatchView } from "./views/MatchView";

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={WorldView} />
      <Route path="/matches" component={MatchView} />
    </Switch>
  );
}

function App() {
  return (
    <StyleRoot>
      <ThemeContext.Provider value={"test"}>
        <Router>
          <Routes />
        </Router>
      </ThemeContext.Provider>
    </StyleRoot>
  );
}

export default App;
