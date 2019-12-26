import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
// Global styles
import "../src/global/style.css";
import "flag-icon-css/css/flag-icon.min.css";

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.register();