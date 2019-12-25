const router = require("express").Router();
const countries = require("./api/countries");
const matches = require("./api/matches");
const clubs = require("./api/clubs");
const standings = require("./api/standings");
const mapData = require("../data/world-110m.json");

// Middleware
const { cacheRoute, setRouteInfo } = require("../middleware");
router.use(setRouteInfo);
router.use(cacheRoute);

// Routes
router.use("/countries", countries);
router.use("/matches", matches);
router.use("/standings", standings);
// router.use("/clubs", clubs); // TODO: Is this needed?

// TODO: Move this
router.get("/map/data", (req, res) => {
  // TODO: This is really fast because it's read from disk, would it be even faster if it's read from memory?
  res.status(200).send({ success: new Date(), data: mapData });
});

module.exports = router;
