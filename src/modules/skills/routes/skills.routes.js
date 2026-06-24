// *** First ***    Imports
import express from "express";
import protect from "../../../middlewares/auth.middleware.js";
import * as skillsController from "../controllers/skills.controller.js";
import {
  createSkillSchema,
  updateSkillSchema,
  listSkillQuerySchema,
  idParamsSchema,
  validate,
} from "../validations/skills.validation.js";
import { SKILL_CATEGORIES } from "../constants/skills.constants.js";
import { z } from "zod";

// *** Second ***   Constants
const skillsRoutes = express.Router();

const categoryParamsSchema = z.object({
  category: z.enum(SKILL_CATEGORIES, {
    invalid_type_error: "Invalid category",
  }),
});

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes
skillsRoutes.post(
  "/",
  protect,
  validate(createSkillSchema),
  skillsController.createSkill
);
skillsRoutes.get(
  "/",
  validate(listSkillQuerySchema, "query"),
  skillsController.getSkills
);
skillsRoutes.get(
  "/category/:category",
  validate(categoryParamsSchema, "params"),
  skillsController.getSkillsByCategory
);
skillsRoutes.get(
  "/:id",
  validate(idParamsSchema, "params"),
  skillsController.getSkillById
);
skillsRoutes.patch(
  "/:id",
  protect,
  validate(idParamsSchema, "params"),
  validate(updateSkillSchema),
  skillsController.updateSkill
);
skillsRoutes.delete(
  "/:id",
  protect,
  validate(idParamsSchema, "params"),
  skillsController.deleteSkill
);

// *** Eighth ***   Exports
export default skillsRoutes;
