// *** First ***    Imports
import express from "express";
import protect from "../../../middlewares/auth.middleware.js";
import * as blogController from "../controllers/blog.controller.js";
import {
  createBlogSchema,
  updateBlogSchema,
  listBlogQuerySchema,
  idParamsSchema,
  slugParamsSchema,
  categoryParamsSchema,
  tagParamsSchema,
  validate,
} from "../validations/blog.validation.js";

// *** Second ***   Constants
const blogRoutes = express.Router();

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes
blogRoutes.post(
  "/",
  protect,
  validate(createBlogSchema),
  blogController.createBlogPost
);
blogRoutes.get(
  "/",
  validate(listBlogQuerySchema, "query"),
  blogController.getPublishedPosts
);
blogRoutes.get("/featured", blogController.getFeaturedPosts);
blogRoutes.get(
  "/category/:category",
  validate(categoryParamsSchema, "params"),
  blogController.getPostsByCategory
);
blogRoutes.get(
  "/tag/:tag",
  validate(tagParamsSchema, "params"),
  blogController.getPostsByTag
);
blogRoutes.get(
  "/slug/:slug",
  validate(slugParamsSchema, "params"),
  blogController.getPostBySlug
);
blogRoutes.get(
  "/:id",
  protect,
  validate(idParamsSchema, "params"),
  blogController.getPostById
);
blogRoutes.patch(
  "/:id",
  protect,
  validate(idParamsSchema, "params"),
  validate(updateBlogSchema),
  blogController.updateBlogPost
);
blogRoutes.delete(
  "/:id",
  protect,
  validate(idParamsSchema, "params"),
  blogController.deleteBlogPost
);

// *** Eighth ***   Exports
export default blogRoutes;
