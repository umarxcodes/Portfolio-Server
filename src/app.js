// *** First ***    Imports
import express from "express";
import path from "node:path";
import mongoSanitize from "express-mongo-sanitize";
import helmetMiddleware from "./config/helmet.js";
import corsMiddleware from "./config/cors.js";
import loggerMiddleware from "./config/logger.js";
import compressionMiddleware from "./config/compression.js";
import { globalRateLimiter } from "./config/rateLimiter.js";
import { UPLOAD_ROOT } from "./config/upload.js";
import routes from "./routes/index.js";
import notFoundMiddleware from "./middlewares/notFound.middleware.js";
import errorMiddleware from "./middlewares/error.middleware.js";

// *** Second ***   Constants
const app = express();

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions
app.use(helmetMiddleware);
app.use(corsMiddleware);
app.use(compressionMiddleware);
app.use(loggerMiddleware);
app.use(globalRateLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use("/uploads", express.static(path.resolve(UPLOAD_ROOT)));

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes
app.use(routes);

app.get("/", (req, res) => {
  res.status(200).send("API is running");
});

app.use(notFoundMiddleware);
app.use(errorMiddleware);

// *** Eighth ***   Exports
export default app;
