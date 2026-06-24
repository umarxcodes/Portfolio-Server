// *** First ***    Imports
import dotenv from "dotenv";
import connectDB from "./database/connection.js";

// *** Second ***   Constants
dotenv.config();
const PORT = process.env.PORT || 5000;

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions
const startServer = async () => {
  try {
    const { default: app } = await import("./app.js");

    await connectDB();

    app.listen(PORT, () => {
      console.log(` Server Running on Port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
startServer();
