import express from "express";
import path from "node:path";

import env from "./config/env.js";
import helmetMiddleware from "./config/helmet.js";
import corsMiddleware from "./config/cors.js";
import compressionMiddleware from "./config/compression.js";
import loggerMiddleware from "./config/logger.js";
import { globalRateLimiter } from "./config/rateLimiter.js";
import { UPLOAD_ROOT } from "./config/upload.js";

import mongoSanitize from "./middlewares/mongoSanitize.middleware.js";
import notFoundMiddleware from "./middlewares/notFound.middleware.js";
import errorMiddleware from "./middlewares/error.middleware.js";

import routes from "./routes/index.js";

const app = express();

/* -------------------------------------------------------------------------- */
/*                               App Settings                                 */
/* -------------------------------------------------------------------------- */

app.set("trust proxy", env.TRUST_PROXY);

/* -------------------------------------------------------------------------- */
/*                            Global Middleware                               */
/* -------------------------------------------------------------------------- */

app.use(helmetMiddleware);
app.use(corsMiddleware);
app.use(compressionMiddleware);
app.use(loggerMiddleware);
app.use(globalRateLimiter);

/* -------------------------------------------------------------------------- */
/*                              Body Parsers                                  */
/* -------------------------------------------------------------------------- */

app.use(
  express.json({
    limit: env.JSON_BODY_LIMIT,
  }),
);

app.use(
  express.urlencoded({
    extended: true,
    limit: env.URL_ENCODED_BODY_LIMIT,
  }),
);

/* -------------------------------------------------------------------------- */
/*                            Security Middleware                             */
/* -------------------------------------------------------------------------- */

app.use(mongoSanitize.middleware);

/* -------------------------------------------------------------------------- */
/*                              Static Files                                  */
/* -------------------------------------------------------------------------- */

app.use("/uploads", express.static(path.resolve(UPLOAD_ROOT)));

/* -------------------------------------------------------------------------- */
/*                              Health Check                                  */
/* -------------------------------------------------------------------------- */

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Service is healthy",
    data: {
      environment: env.NODE_ENV,
      timestamp: new Date().toISOString(),
    },
  });
});

/* -------------------------------------------------------------------------- */
/*                                 Routes                                     */
/* -------------------------------------------------------------------------- */

app.use(routes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running",
  });
});

/* -------------------------------------------------------------------------- */
/*                           Error Middleware                                 */
/* -------------------------------------------------------------------------- */

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
