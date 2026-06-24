// *** First ***    Imports
import express from "express";
import protect from "../../../middlewares/auth.middleware.js";
import * as experienceController from "../controllers/experience.controller.js";
import {
  createExperienceSchema,
  updateExperienceSchema,
  listExperienceQuerySchema,
  idParamsSchema,
  validate,
} from "../validations/experience.validation.js";

// *** Second ***   Constants
const experienceRoutes = express.Router();

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes
experienceRoutes.post(
  "/",
  protect,
  validate(createExperienceSchema),
  experienceController.addExperience
);
experienceRoutes.get(
  "/",
  validate(listExperienceQuerySchema, "query"),
  experienceController.getExperiences
);
experienceRoutes.get(
  "/:id",
  validate(idParamsSchema, "params"),
  experienceController.getExperienceById
);
experienceRoutes.patch(
  "/:id",
  protect,
  validate(idParamsSchema, "params"),
  validate(updateExperienceSchema),
  experienceController.updateExperience
);
experienceRoutes.delete(
  "/:id",
  protect,
  validate(idParamsSchema, "params"),
  experienceController.deleteExperience
);

// *** Eighth ***   Exports
export default experienceRoutes;
