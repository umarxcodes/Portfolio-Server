import express from "express";
import protect from "../../../middlewares/auth.middleware.js";
import { createAnyUploadMiddleware } from "../../../config/multer.js";
import * as uploadController from "../controllers/upload.controller.js";
import {
  uploadBodySchema,
  idParamsSchema,
  validate,
} from "../validations/upload.validation.js";

const uploadRoutes = express.Router();
const upload = createAnyUploadMiddleware();

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

export default uploadRoutes;
