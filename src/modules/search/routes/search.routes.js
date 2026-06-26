// *** First ***    Imports
import express from "express";
import * as searchController from "../controllers/search.controller.js";
import {
  searchQuerySchema,
  validate,
} from "../validations/search.validation.js";

// *** Second ***   Constants
const searchRoutes = express.Router();

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes
searchRoutes.get(
  "/",
  validate(searchQuerySchema, "query"),
  searchController.searchAll
);

// *** Eighth ***   Exports
export default searchRoutes;
