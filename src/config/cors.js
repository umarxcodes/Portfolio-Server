// *** First ***    Imports
import cors from "cors";
import env, { parseCorsOrigins } from "./env.js";

// *** Second ***   Constants
const allowedOrigins = parseCorsOrigins();
const corsOptions = {
  origin(origin, callback) {
    if (
      !origin ||
      env.NODE_ENV !== "production" ||
      allowedOrigins.includes(origin)
    ) {
      return callback(null, true);
    }

    return callback(new Error("Origin is not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const corsMiddleware = cors(corsOptions);

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export { corsOptions, allowedOrigins };
export default corsMiddleware;
