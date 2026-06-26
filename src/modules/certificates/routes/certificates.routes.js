// *** First ***    Imports
import express from "express";
import protect from "../../../middlewares/auth.middleware.js";
import * as certificatesController from "../controllers/certificates.controller.js";
import {
  createCertificateSchema,
  updateCertificateSchema,
  listCertificatesQuerySchema,
  idParamsSchema,
  validate,
} from "../validations/certificates.validation.js";

// *** Second ***   Constants
const certificatesRoutes = express.Router();

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes
certificatesRoutes.post(
  "/",
  protect,
  validate(createCertificateSchema),
  certificatesController.createCertificate
);
certificatesRoutes.get(
  "/",
  validate(listCertificatesQuerySchema, "query"),
  certificatesController.getCertificates
);
certificatesRoutes.get(
  "/:id",
  validate(idParamsSchema, "params"),
  certificatesController.getCertificateById
);
certificatesRoutes.patch(
  "/:id",
  protect,
  validate(idParamsSchema, "params"),
  validate(updateCertificateSchema),
  certificatesController.updateCertificate
);
certificatesRoutes.delete(
  "/:id",
  protect,
  validate(idParamsSchema, "params"),
  certificatesController.deleteCertificate
);

// *** Eighth ***   Exports
export default certificatesRoutes;
