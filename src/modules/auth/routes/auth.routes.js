// *** First ***    Imports
import express from "express";
import {
  loginSchema,
  changePasswordSchema,
  refreshTokenSchema,
  validate,
} from "../validations/auth.validation.js";
import * as authController from "../controllers/auth.controller.js";
import protect from "../../../middlewares/auth.middleware.js";

// *** Second ***   Constants
const authRoutes = express.Router();

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes
authRoutes.post("/login", validate(loginSchema), authController.login);
authRoutes.post(
  "/refresh-token",
  validate(refreshTokenSchema),
  authController.refreshToken
);
authRoutes.get("/profile", protect, authController.profile);
authRoutes.post("/logout", protect, authController.logout);
authRoutes.patch(
  "/change-password",
  protect,
  validate(changePasswordSchema),
  authController.changePassword
);

// *** Eighth ***   Exports
export default authRoutes;
