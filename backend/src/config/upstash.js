import pkg from "@upstash/ratelimit";
const { Ratelimit } = pkg;
import { Redis } from "@upstash/redis";

import dotenv from "dotenv";

dotenv.config();

const rateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, "60 s"),
});

export default rateLimit;