import http from "node:http";
import mongoose from "mongoose";
import connectDB, { disconnectDB } from "./database/connection.js";
import env from "./config/env.js";

const PORT = env.PORT;
let server;

const shutdown = async (signal) => {
  try {
    console.info(`${signal} received. Shutting down gracefully.`);

    if (server) {
      await new Promise((resolve, reject) => {
        server.close((error) => {
          if (error) reject(error);
          else resolve();
        });
      });
    }

    await disconnectDB();
    process.exit(0);
  } catch (error) {
    console.error("Graceful shutdown failed", error);
    process.exit(1);
  }
};

const startServer = async () => {
  const { default: app } = await import("./app.js");

  await connectDB();

  server = http.createServer(app);

  server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      console.error(`Port ${PORT} is already in use`);
    }
    console.error("Server error", error);
    process.exit(1);
  });

  server.listen(PORT, () => {
    console.info(`API server listening on port ${PORT}`);
  });
};

mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error", error);
});

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled promise rejection", reason);
  shutdown("unhandledRejection");
});
process.on("uncaughtException", (error) => {
  console.error("Uncaught exception", error);
  shutdown("uncaughtException");
});

startServer().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
