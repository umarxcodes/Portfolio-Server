import app from "./app.js";
import connectDB from "./database/connection.js";
import dotenv from "dotenv";

const PORT = process.env.PORT || 5000;

dotenv.config();

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(` Server Running on Port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
