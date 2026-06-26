// *** First ***    Imports
import express from "express";
import protect from "../../../middlewares/auth.middleware.js";
import * as settingsController from "../controllers/settings.controller.js";
import {
  updateSettingsSchema,
  validate,
} from "../validations/settings.validation.js";

// *** Second ***   Constants
const settingsRoutes = express.Router();

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes
settingsRoutes.get("/", settingsController.getSettings);
settingsRoutes.patch(
  "/",
  protect,
  validate(updateSettingsSchema),
  settingsController.updateSettings
);

// *** Eighth ***   Exports
export default settingsRoutes;
