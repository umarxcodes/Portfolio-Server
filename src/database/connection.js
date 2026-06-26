// *** First ***    Imports
import mongoose from "mongoose";
import databaseConfig from "../config/database.js";

// *** Second ***   Constants

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions
const connectDB = async () => {
  await mongoose.connect(databaseConfig.uri, databaseConfig.options);
};

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export default connectDB;
