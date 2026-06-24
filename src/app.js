// *** First ***    Imports
import express from "express";
import routes from "./routes/index.js";

// *** Second ***   Constants
const app = express();

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions
app.use(express.json());

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes
app.use(routes);

app.get("/", (req, res) => {
  res.status(200).send("Api is Working Fine 🫰");
});

// *** Eighth ***   Exports
export default app;
