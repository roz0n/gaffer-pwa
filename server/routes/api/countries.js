const router = require("express").Router();
const serverFetch = require("../../utils/serverFetch");
const redis = require("../../redis");

router.get("/:name", async (req, res) => {
  try {
    const { routeInfo, params } = req;
    const countryName = params.name.toLowerCase();
    const request = await serverFetch("competitions");

    if (request.body) {
      const response = JSON.parse(request.body);
      const leagueData = response.competitions;
      const countryLeagues = leagueData.filter(league => {
        return (
          league.area.name && league.area.name.toLowerCase() === countryName
        );
      });

      if (countryLeagues.length === 0) {
        throw new Error("No leagues found in that country");
      } else {
        const responseData = countryLeagues;

        await redis.hmset(routeInfo.url, {
          [`${routeInfo.path}`]: JSON.stringify(responseData)
        });
        await redis.expire(routeInfo.url, 3600);

        res.status(200).send({ success: new Date(), data: responseData });
      }
    } else {
      throw new Error("Error obtaining data");
    }
  } catch (error) {
    res
      .status(500)
      .send({ error: error.message || "Error obtaining country data" });
  }
});

module.exports = router;
