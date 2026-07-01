import express from "express";
import {
  loginSchema,
  changePasswordSchema,
  validate,
} from "../validations/auth.validation.js";
import * as authController from "../controllers/auth.controller.js";
import protect from "../../../middlewares/auth.middleware.js";

const authRoutes = express.Router();

authRoutes.post("/login", validate(loginSchema), authController.login);
authRoutes.post("/logout", protect, authController.logout);
authRoutes.get("/profile", protect, authController.profile);
authRoutes.patch(
  "/change-password",
  protect,
  validate(changePasswordSchema),
  authController.changePassword
);

export default authRoutes;
