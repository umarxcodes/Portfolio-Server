// *** First ***    Imports
import express from "express";
import protect from "../../../middlewares/auth.middleware.js";
import * as analyticsController from "../controllers/analytics.controller.js";

// *** Second ***   Constants
const analyticsRoutes = express.Router();

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes
analyticsRoutes.get("/overview", protect, analyticsController.getOverview);
analyticsRoutes.get(
  "/projects",
  protect,
  analyticsController.getProjectAnalytics
);
analyticsRoutes.get("/blogs", protect, analyticsController.getBlogAnalytics);
analyticsRoutes.get(
  "/contact",
  protect,
  analyticsController.getContactAnalytics
);

// *** Eighth ***   Exports
export default analyticsRoutes;
