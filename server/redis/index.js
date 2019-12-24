const util = require("util");
const Redis = require("ioredis");
const redisPort = process.env.REDIS_PORT || 6379;
const redis = new Redis(redisPort);

redis.monitor((err, monitor) => {
  if (err) console.error("Error monitoring redis connection");

  monitor.on("monitor", (time, args, source, database) => {
    console.log(`[redis] ${time}ms :: ${util.inspect(args[0])}`);
  });
});

module.exports = redis;
