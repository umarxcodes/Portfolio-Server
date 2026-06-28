// *** First ***    Imports
import mongoose from "mongoose";
import databaseConfig from "../config/database.js";

// *** Second ***   Constants

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions
const wait = (milliseconds) =>
  new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });

const connectDB = async () => {
  let lastError;

  for (let attempt = 1; attempt <= databaseConfig.retries; attempt += 1) {
    try {
      const connection = await mongoose.connect(
        databaseConfig.uri,
        databaseConfig.options
      );
      console.info("MongoDB connected successfully");
      return connection;
    } catch (error) {
      lastError = error;

      if (attempt < databaseConfig.retries) {
        console.warn(
          `MongoDB connection attempt ${attempt} failed. Retrying in ${databaseConfig.retryDelayMs}ms...`
        );
        await wait(databaseConfig.retryDelayMs);
      }
    }
  }

  throw lastError;
};

const disconnectDB = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }
};

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export { disconnectDB };
export default connectDB;
