import express from "express";

// Create the Express application instance.
const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Api is Working Fine 🫰");
});
// Export the configured Express app for the server entrypoint and tests.
export default app;
