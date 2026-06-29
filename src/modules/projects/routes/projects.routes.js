import express from "express";
import protect from "../../../middlewares/auth.middleware.js";
import * as projectsController from "../controllers/projects.controller.js";
import {
  createProjectSchema,
  updateProjectSchema,
  listProjectsQuerySchema,
  validate,
} from "../validations/projects.validation.js";
import { PROJECT_CATEGORIES } from "../constants/projects.constants.js";
import { z } from "zod";

const projectsRoutes = express.Router();

const categoryParamsSchema = z.object({
  category: z.enum(PROJECT_CATEGORIES, {
    invalid_type_error: "Invalid category",
  }),
});

const slugParamsSchema = z.object({
  slug: z.string().trim().min(1, { message: "slug is required" }),
});

const idParamsSchema = z.object({
  id: z.string().trim().min(1, { message: "id is required" }),
});

projectsRoutes.post(
  "/",
  protect,
  validate(createProjectSchema),
  projectsController.createProject
);
projectsRoutes.get(
  "/",
  validate(listProjectsQuerySchema, "query"),
  projectsController.getProjects
);
projectsRoutes.get("/featured", projectsController.getFeaturedProjects);
projectsRoutes.get(
  "/category/:category",
  validate(categoryParamsSchema, "params"),
  projectsController.getProjectsByCategory
);
projectsRoutes.get(
  "/slug/:slug",
  validate(slugParamsSchema, "params"),
  projectsController.getProjectBySlug
);
projectsRoutes.get(
  "/:id",
  validate(idParamsSchema, "params"),
  projectsController.getProjectById
);
projectsRoutes.patch(
  "/:id",
  protect,
  validate(idParamsSchema, "params"),
  validate(updateProjectSchema),
  projectsController.updateProject
);
projectsRoutes.delete(
  "/:id",
  protect,
  validate(idParamsSchema, "params"),
  projectsController.deleteProject
);

export default projectsRoutes;
