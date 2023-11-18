import redis from "redis";

const redisClient = redis.createClient({
  host: "localhost",
  port: 6379,
});

redisClient.on("error", (err) => {
  console.error(`Redis connection error: ${err}`);
});

redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

redisClient.on("end", () => {
  console.log("Redis connection ended");
});

process.on("SIGQUIT", () => {
  redisClient.quit(() => {
    console.log("Redis client quit gracefully");
  });
});

export default redisClient;
