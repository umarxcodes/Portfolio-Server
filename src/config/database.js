// *** First ***    Imports
import env from "./env.js";

// *** Second ***   Constants
const databaseConfig = {
  uri: env.MONGO_URI,
  options: {
    autoIndex: env.NODE_ENV !== "production",
    serverSelectionTimeoutMS: 10000,
  },
};

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export default databaseConfig;
