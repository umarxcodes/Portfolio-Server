import { z } from "zod";
import { validate as validateSchema } from "../../../shared/utils/validation.utils.js";

const objectIdField = z
  .string()
  .trim()
  .regex(/^[a-f\d]{24}$/i, { message: "Invalid id" });
const idParamsSchema = z.object({ id: objectIdField }).strict();
const slugParamsSchema = z.object({ slug: z.string().trim().min(1) }).strict();
const categoryParamsSchema = z
  .object({ category: z.string().trim().min(1) })
  .strict();
const tagParamsSchema = z.object({ tag: z.string().trim().min(1) }).strict();
const optionalUrl = z.string().url().optional().nullable();

const blogBaseSchema = z
  .object({
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
  })
  .strict();
const createBlogSchema = blogBaseSchema;
const updateBlogSchema = blogBaseSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  });
const listBlogQuerySchema = z
  .object({
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().max(50).optional(),
    sort: z.string().optional(),
    search: z.string().optional(),
    category: z.string().optional(),
    featured: z.preprocess(
      (value) => (value === "true" ? true : value === "false" ? false : value),
      z.boolean().optional()
    ),
  })
  .strict();

const validate = validateSchema;

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
