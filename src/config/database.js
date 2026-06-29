import env from "./env.js";

const databaseConfig = {
  uri: env.MONGO_URI,
  options: {
    autoIndex: env.NODE_ENV !== "production",
    maxPoolSize: env.MONGO_MAX_POOL_SIZE,
    minPoolSize: env.MONGO_MIN_POOL_SIZE,
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    maxIdleTimeMS: 30000,
    connectTimeoutMS: 10000,
  },
  retries: env.MONGO_CONNECT_RETRIES,
  retryDelayMs: env.MONGO_CONNECT_RETRY_DELAY_MS,
};

export default databaseConfig;
