import express from "express";
import protect from "../../../middlewares/auth.middleware.js";
import * as settingsController from "../controllers/settings.controller.js";
import {
  updateSettingsSchema,
  validate,
} from "../validations/settings.validation.js";

const settingsRoutes = express.Router();

settingsRoutes.get("/", settingsController.getSettings);
settingsRoutes.patch(
  "/",
  protect,
  validate(updateSettingsSchema),
  settingsController.updateSettings
);

export default settingsRoutes;
