import { z } from "zod";
import { validate as validateSchema } from "../../../shared/utils/validation.utils.js";
import {
  PROJECT_CATEGORIES,
  PROJECT_STATUSES,
} from "../constants/projects.constants.js";

const urlField = z.string().url({ message: "Invalid URL" });
const objectIdField = z
  .string()
  .trim()
  .regex(/^[a-f\d]{24}$/i, { message: "Invalid id" });
const dateField = z.preprocess(
  (value) => {
    if (value instanceof Date) {
      return value;
    }
    if (typeof value === "string" && value.trim() !== "") {
      return new Date(value);
    }
    return value;
  },
  z.date({
    invalid_type_error: "Invalid date",
    required_error: "Date is required",
  })
);

const projectBaseSchema = z
  .object({
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    shortDescription: z
      .string()
      .trim()
      .max(200, { message: "shortDescription must not exceed 200 characters" }),
    techStack: z
      .array(z.string().trim())
      .min(1, { message: "techStack requires at least one item" }),
    category: z.enum(PROJECT_CATEGORIES, {
      invalid_type_error: "Invalid category",
    }),
    status: z.enum(PROJECT_STATUSES, { invalid_type_error: "Invalid status" }),
    featured: z.boolean().optional(),
    githubUrl: urlField.optional(),
    liveUrl: urlField.optional(),
    thumbnail: urlField.optional(),
    images: z.array(urlField).optional(),
    startDate: dateField,
    endDate: dateField.optional().nullable(),
  })
  .strict();

const createProjectSchema = projectBaseSchema.refine(
  (data) => !data.endDate || data.endDate >= data.startDate,
  {
    message: "endDate must be the same or after startDate",
    path: ["endDate"],
  }
);

const updateProjectSchema = projectBaseSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  })
  .superRefine((data, ctx) => {
    if (data.startDate && data.endDate && data.endDate < data.startDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "endDate must be the same or after startDate",
        path: ["endDate"],
      });
    }
  });

const listProjectsQuerySchema = z
  .object({
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().max(50).optional(),
    sort: z.string().optional(),
    status: z.enum(PROJECT_STATUSES).optional(),
    category: z.enum(PROJECT_CATEGORIES).optional(),
    featured: z
      .preprocess((value) => {
        if (value === "true") return true;
        if (value === "false") return false;
        return value;
      }, z.boolean().optional())
      .optional(),
    search: z.string().optional(),
  })
  .strict();

const idParamsSchema = z
  .object({
    id: objectIdField,
  })
  .strict();

const validate = validateSchema;

export {
  createProjectSchema,
  updateProjectSchema,
  listProjectsQuerySchema,
  idParamsSchema,
  validate,
};
