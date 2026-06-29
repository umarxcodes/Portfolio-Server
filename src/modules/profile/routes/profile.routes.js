import express from "express";
import * as profileController from "../controllers/profile.controller.js";
import {
  updateProfileSchema,
  validate,
} from "../validations/profile.validation.js";
import protect from "../../../middlewares/auth.middleware.js";

const profileRoutes = express.Router();

profileRoutes.get("/", profileController.getProfile);
profileRoutes.patch(
  "/",
  protect,
  validate(updateProfileSchema),
  profileController.updateProfile
);

export default profileRoutes;
