const router = require("express").Router();
const serverFetch = require("../../utils/serverFetch");
const redis = require("../../redis");

router.get("/league/:id", async (req, res) => {
  try {
    const { routeInfo, params } = req;
    const { id } = params;

    if (!id) {
      throw new Error("Invalid request");
    }

    const request = await serverFetch("leagues", id);

    if (request.body) {
      const response = JSON.parse(request.body);

      await redis.hmset(routeInfo.url, {
        [`${routeInfo.path}`]: JSON.stringify(response.matches)
      });
      await redis.expire(routeInfo.url, 3600);

      res.status(200).send({ success: new Date(), data: response.matches });
    } else {
      throw new Error();
    }
  } catch (error) {
    res.status(500).send({ error: error.message || "Error obtaining data" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { routeInfo, params } = req;
    const { id } = params;
    
    if (!id) throw new Error("Invalid request");

    const request = await serverFetch("match", id);

    if (request.body) {
      const response = JSON.parse(request.body);

      await redis.hmset(routeInfo.url, {
        [`${routeInfo.path}`]: JSON.stringify(response)
      });
      await redis.expire(routeInfo.url, 3600);

      res.status(200).send({ success: new Date(), data: response });
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log("ERROR", error);
    res.status(500).send({ error: error.message || "Error obtaining data" });
  }
});

module.exports = router;
