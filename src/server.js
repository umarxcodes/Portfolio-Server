// *** First ***    Imports
import http from "node:http";
import connectDB from "./database/connection.js";
import env from "./config/env.js";

// *** Second ***   Constants
const PORT = env.PORT;

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions
const startServer = async () => {
  const { default: app } = await import("./app.js");

  await connectDB();

  const server = http.createServer(app);
  server.listen(PORT);
};

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
startServer();
