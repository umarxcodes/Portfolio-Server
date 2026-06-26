// *** First ***    Imports
import express from "express";
import path from "node:path";
import routes from "./routes/index.js";
import notFoundMiddleware from "./middlewares/notFound.middleware.js";
import errorMiddleware from "./middlewares/error.middleware.js";

// *** Second ***   Constants
const app = express();

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes
app.use(routes);

app.get("/", (req, res) => {
  res.status(200).send("Api is Working Fine 🫰");
});

app.use(notFoundMiddleware);
app.use(errorMiddleware);

// *** Eighth ***   Exports
export default app;
