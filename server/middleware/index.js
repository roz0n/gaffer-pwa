const redis = require("../redis");

function setRouteInfo(req, res, next) {
  const { baseUrl, path } = req;

  if (!req.baseUrl || req.baseUrl === "") {
    const splitPath = path.split("/");

    req.routeInfo = {
      url: splitPath[1],
      path: splitPath[2]
    };
  } else {
    req.routeInfo = {
      url: baseUrl.replace("/", ""),
      path: path.replace("/", "")
    };
  }

  next();
}

async function cacheRoute(req, res, next) {
  try {
    const { routeInfo } = req;
    const data = await redis.hmget(routeInfo.url, routeInfo.path);

    if (!!data[0]) {
      console.log("This route is cached!");
      res.status(200).send({ cached: true, success: new Date(), data: JSON.parse(data) });
    } else {
      console.log("This route is not cached");
      next();
    }
  } catch (err) {
    next();
  }
}

module.exports = {
  setRouteInfo,
  cacheRoute
};
