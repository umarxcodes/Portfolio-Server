import cors from "cors";
import { parseCorsOrigins } from "./env.js";

const allowedOrigins = parseCorsOrigins();
const corsOptions = {
  origin(origin, callback) {
    if (allowedOrigins.includes(origin || "")) {
      return callback(null, true);
    }

    return callback(new Error("Origin is not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Accept",
    "Origin",
    "X-Requested-With",
  ],
  exposedHeaders: ["Content-Range", "X-Content-Range"],
};

const corsMiddleware = cors(corsOptions);

export { corsOptions, allowedOrigins };
export default corsMiddleware;
