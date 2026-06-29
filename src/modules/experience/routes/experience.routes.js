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

const experienceRoutes = express.Router();

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

export default experienceRoutes;
