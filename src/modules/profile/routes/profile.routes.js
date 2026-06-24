// *** First ***    Imports
import express from "express";
import * as profileController from "../controllers/profile.controller.js";
import {
  updateProfileSchema,
  validate,
} from "../validations/profile.validation.js";
import protect from "../../../middlewares/auth.middleware.js";

// *** Second ***   Constants
const profileRoutes = express.Router();

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes
profileRoutes.get("/", profileController.getProfile);
profileRoutes.patch(
  "/",
  protect,
  validate(updateProfileSchema),
  profileController.updateProfile
);

// *** Eighth ***   Exports
export default profileRoutes;
