const router = require("express").Router();
const serverFetch = require("../../utils/serverFetch");
const redis = require("../../redis");

router.get("/:id", async (req, res) => {
  try {
    const { routeInfo } = req;
    const id = +req.params.id;

    if (!id) {
      throw new Error("Invalid request for club data");
    }

    const request = await serverFetch("standings", id);

    if (request.body) {
      const requestData = JSON.parse(request.body);
      const fullTable = requestData.standings && requestData.standings[0].table;

      const response = fullTable.reduce((acc, val) => {
        acc.push(val.team);
        return acc;
      }, []);

      if (response.length > 0) {
        await redis.hmset(routeInfo.url, {
          [`${routeInfo.path}`]: JSON.stringify(response)
        });
        await redis.expire(routeInfo.url, 3600);

        res.status(200).send({ success: new Date(), data: response });
      } else {
        throw new Error("Could not obtain standings");
      }
    }
  } catch (error) {
    res.status(500).send({ error: error.message || "Error obtaining standings data" });
  }
});

module.exports = router;
