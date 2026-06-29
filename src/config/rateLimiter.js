import rateLimit from "express-rate-limit";
import env from "./env.js";

const rateLimitHandler = (req, res) =>
  res.status(429).json({
    success: false,
    message: "Too many requests",
    errors: [],
  });

const globalRateLimiter = rateLimit({
  windowMs: env.GLOBAL_RATE_LIMIT_WINDOW_MS,
  limit: env.GLOBAL_RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler,
});

const contactRateLimiter = rateLimit({
  windowMs: env.CONTACT_RATE_LIMIT_WINDOW_MS,
  limit: env.CONTACT_RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler,
});

export { globalRateLimiter, contactRateLimiter };
