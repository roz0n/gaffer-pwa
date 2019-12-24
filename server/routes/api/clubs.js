const router = require("express").Router();
const serverFetch = require("../../utils/serverFetch");
const redis = require("../../redis");

router.get("/clubs/:id", async (req, res) => {
  try {
    const id = +req.params.id;

    if (!id) {
      throw new Error("Invalid request for club data");
    }

    const requestData = await serverFetch("clubs", id);

    if (requestData.body) {
      const clubsData = JSON.parse(requestData.body);

      redis.setex(id, 3600, JSON.stringify(clubsData));
      res.status(200).send({ success: new Date(), data: clubsData.teams });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
