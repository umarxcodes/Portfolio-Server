import express from "express";
import protect from "../../../middlewares/auth.middleware.js";
import * as educationController from "../controllers/education.controller.js";
import {
  createEducationSchema,
  updateEducationSchema,
  listEducationQuerySchema,
  idParamsSchema,
  validate,
} from "../validations/education.validation.js";

const educationRoutes = express.Router();

educationRoutes.post(
  "/",
  protect,
  validate(createEducationSchema),
  educationController.createEducation
);
educationRoutes.get(
  "/",
  validate(listEducationQuerySchema, "query"),
  educationController.getEducationList
);
educationRoutes.get("/current", educationController.getCurrentEducation);
educationRoutes.get(
  "/:id",
  validate(idParamsSchema, "params"),
  educationController.getEducationById
);
educationRoutes.patch(
  "/:id",
  protect,
  validate(idParamsSchema, "params"),
  validate(updateEducationSchema),
  educationController.updateEducation
);
educationRoutes.delete(
  "/:id",
  protect,
  validate(idParamsSchema, "params"),
  educationController.deleteEducation
);

export default educationRoutes;
