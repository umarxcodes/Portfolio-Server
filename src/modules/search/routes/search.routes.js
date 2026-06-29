import express from "express";
import * as searchController from "../controllers/search.controller.js";
import {
  searchQuerySchema,
  validate,
} from "../validations/search.validation.js";

const searchRoutes = express.Router();

searchRoutes.get(
  "/",
  validate(searchQuerySchema, "query"),
  searchController.searchAll
);

export default searchRoutes;
