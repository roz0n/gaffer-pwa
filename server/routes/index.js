const router = require("express").Router();
const countries = require("./api/countries");
const matches = require("./api/matches");
const clubs = require("./api/clubs");
const standings = require("./api/standings");

// Middleware
const { cacheRoute, setRouteInfo } = require("../middleware");
router.use(setRouteInfo);
router.use(cacheRoute);

// Routes
router.use("/countries", countries);
router.use("/matches", matches);
router.use("/standings", standings);
// router.use("/clubs", clubs); // TODO: Is this needed?

module.exports = router;
