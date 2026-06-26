// *** First ***    Imports
import express from "express";
import protect from "../../../middlewares/auth.middleware.js";
import { contactRateLimiter } from "../../../config/rateLimiter.js";
import * as contactController from "../controllers/contact.controller.js";
import {
  submitContactSchema,
  updateContactStatusSchema,
  listContactQuerySchema,
  idParamsSchema,
  validate,
} from "../validations/contact.validation.js";

// *** Second ***   Constants
const contactRoutes = express.Router();

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes
contactRoutes.post(
  "/",
  contactRateLimiter,
  validate(submitContactSchema),
  contactController.submitContact
);
contactRoutes.get(
  "/",
  protect,
  validate(listContactQuerySchema, "query"),
  contactController.getContacts
);
contactRoutes.get(
  "/:id",
  protect,
  validate(idParamsSchema, "params"),
  contactController.getContactById
);
contactRoutes.patch(
  "/:id",
  protect,
  validate(idParamsSchema, "params"),
  validate(updateContactStatusSchema),
  contactController.updateContactStatus
);
contactRoutes.delete(
  "/:id",
  protect,
  validate(idParamsSchema, "params"),
  contactController.deleteContact
);

// *** Eighth ***   Exports
export default contactRoutes;
