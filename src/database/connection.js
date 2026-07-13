import mongoose from "mongoose";
import databaseConfig from "../config/database.js";

const wait = (milliseconds) =>
  new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });

// Connect to MongoDB with retry logic
const connectDB = async () => {
  let lastError;

  for (let attempt = 1; attempt <= databaseConfig.retries; attempt += 1) {
    try {
      const connection = await mongoose.connect(databaseConfig.uri, databaseConfig.options);
      console.info("MongoDB connected successfully ❣️");
      return connection;
    } catch (error) {
      lastError = error;

      if (attempt < databaseConfig.retries) {
        console.warn(
          `MongoDB connection attempt ${attempt} failed. Retrying in ${databaseConfig.retryDelayMs}ms...`,
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

export { disconnectDB };
export default connectDB;
