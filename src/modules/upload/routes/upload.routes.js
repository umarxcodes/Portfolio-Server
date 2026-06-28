// *** First ***    Imports
import express from "express";
import protect from "../../../middlewares/auth.middleware.js";
import { createAnyUploadMiddleware } from "../../../config/multer.js";
import * as uploadController from "../controllers/upload.controller.js";
import {
  uploadBodySchema,
  idParamsSchema,
  validate,
} from "../validations/upload.validation.js";

// *** Second ***   Constants
const uploadRoutes = express.Router();
const upload = createAnyUploadMiddleware();

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes
uploadRoutes.post(
  "/",
  protect,
  upload.single("file"),
  validate(uploadBodySchema),
  uploadController.uploadFile
);
uploadRoutes.get(
  "/:id",
  protect,
  validate(idParamsSchema, "params"),
  uploadController.getUploadById
);
uploadRoutes.delete(
  "/:id",
  protect,
  validate(idParamsSchema, "params"),
  uploadController.deleteUpload
);

// *** Eighth ***   Exports
export default uploadRoutes;
