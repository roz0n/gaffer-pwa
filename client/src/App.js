import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
    <Router>
      <Routes />
    </Router>
  );
}

export default App;
