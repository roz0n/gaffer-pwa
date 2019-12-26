const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const routes = require("./routes");
const BUNDLE = path.resolve(__dirname, "../client/build", "index.html");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", routes);

// Serve bundle
app.get("*", (req, res) => {
  res.status(200).sendFile(BUNDLE);
});

module.exports = app;