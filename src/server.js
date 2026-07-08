import http from "node:http";
import mongoose from "mongoose";

import env from "./config/env.js";
import connectDB, { disconnectDB } from "./database/connection.js";

const PORT = env.PORT;

let server;
let isShuttingDown = false;

/**
 * --------------------------------------------------------
 * Graceful Shutdown
 * --------------------------------------------------------
 */
const shutdown = async (signal) => {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;

  console.info(`\n${signal} received. Shutting down...`);

  try {
    if (server) {
      await new Promise((resolve, reject) => {
        server.close((error) => {
          if (error) {
            reject(error);
            return;
          }

          resolve();
        });
      });

      console.info("HTTP server closed.");
    }

    await disconnectDB();
    console.info("MongoDB disconnected.");

    process.exit(0);
  } catch (error) {
    console.error("Graceful shutdown failed.", error);
    process.exit(1);
  }
};

/**
 * --------------------------------------------------------
 * Start Server
 * --------------------------------------------------------
 */
const startServer = async () => {
  await connectDB();

  const { default: app } = await import("./app.js");

  server = http.createServer(app);

  server.on("error", (error) => {
    switch (error.code) {
      case "EADDRINUSE":
        console.error(`Port ${PORT} is already in use.`);
        break;

      case "EACCES":
        console.error(`Permission denied to use port ${PORT}.`);
        break;

      default:
        console.error("HTTP server error.", error);
    }

    process.exit(1);
  });

  server.listen(PORT, () => {
    console.info(` Server running on http://localhost:${PORT}`);
    console.info(`Environment : ${env.NODE_ENV}`);
  });
};

/**
 * --------------------------------------------------------
 * MongoDB Events
 * --------------------------------------------------------
 */
mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error.", error);
});

/**
 * --------------------------------------------------------
 * Process Events
 * --------------------------------------------------------
 */
process.on("SIGINT", () => shutdown("SIGINT"));

process.on("SIGTERM", () => shutdown("SIGTERM"));

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Promise Rejection:", reason);
  shutdown("unhandledRejection");
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  shutdown("uncaughtException");
});

/**
 * --------------------------------------------------------
 * Bootstrap
 * --------------------------------------------------------
 */
startServer().catch((error) => {
  console.error("Failed to start server.", error);
  process.exit(1);
});
