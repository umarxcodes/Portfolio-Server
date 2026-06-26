// *** First ***    Imports
import { z } from "zod";
import { validate as validateSchema } from "../../../shared/utils/validation.utils.js";

// *** Second ***   Constants
const idParamsSchema = z.object({ id: z.string().trim().min(1) });
const slugParamsSchema = z.object({ slug: z.string().trim().min(1) });
const categoryParamsSchema = z.object({ category: z.string().trim().min(1) });
const tagParamsSchema = z.object({ tag: z.string().trim().min(1) });
const optionalUrl = z.string().url().optional().nullable();

// *** Third ***    Schema / Model
const blogBaseSchema = z.object({
  title: z.string().trim().min(1),
  excerpt: z.string().trim().min(1).max(300),
  content: z.string().trim().min(1),
  coverImage: optionalUrl,
  tags: z.array(z.string().trim().min(1)).optional().default([]),
  category: z.string().trim().min(1).toLowerCase(),
  featured: z.boolean().optional().default(false),
  published: z.boolean().optional().default(false),
  seoTitle: z.string().trim().max(60).optional().nullable(),
  seoDescription: z.string().trim().max(160).optional().nullable(),
});
const createBlogSchema = blogBaseSchema;
const updateBlogSchema = blogBaseSchema.partial();
const listBlogQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  sort: z.string().optional(),
  search: z.string().optional(),
  category: z.string().optional(),
  featured: z.preprocess(
    (value) => (value === "true" ? true : value === "false" ? false : value),
    z.boolean().optional()
  ),
});

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions
const validate = validateSchema;

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export {
  createBlogSchema,
  updateBlogSchema,
  listBlogQuerySchema,
  idParamsSchema,
  slugParamsSchema,
  categoryParamsSchema,
  tagParamsSchema,
  validate,
};
