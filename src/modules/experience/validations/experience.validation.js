import { z } from "zod";
import { validate as validateSchema } from "../../../shared/utils/validation.utils.js";
import { EMPLOYMENT_TYPES } from "../constants/experience.constants.js";

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

const experienceBaseSchema = z.object({
  company: z.string().trim(),
  position: z.string().trim(),
  employmentType: z.enum(EMPLOYMENT_TYPES, {
    invalid_type_error: "Invalid employment type",
  }),
  location: z.string().trim().optional(),
  description: z.string(),
  responsibilities: z.array(z.string().trim()).optional(),
  technologies: z.array(z.string().trim()).optional(),
  startDate: dateField,
  endDate: dateField.optional().nullable(),
  isCurrent: z.boolean().optional(),
  companyLogo: z.string().url({ message: "Invalid URL" }).optional(),
});

const createExperienceSchema = experienceBaseSchema.superRefine((data, ctx) => {
  if (data.isCurrent && data.endDate !== undefined && data.endDate !== null) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "endDate must be null when isCurrent is true",
      path: ["endDate"],
    });
  }

  if (data.endDate && data.startDate && data.endDate < data.startDate) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "endDate must be the same or after startDate",
      path: ["endDate"],
    });
  }
});

const updateExperienceSchema = experienceBaseSchema
  .partial()
  .superRefine((data, ctx) => {
    if (data.isCurrent && data.endDate !== undefined && data.endDate !== null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "endDate must be null when isCurrent is true",
        path: ["endDate"],
      });
    }

    if (data.startDate && data.endDate && data.endDate < data.startDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "endDate must be the same or after startDate",
        path: ["endDate"],
      });
    }
  });

const listExperienceQuerySchema = z.object({
  employmentType: z.enum(EMPLOYMENT_TYPES).optional(),
  isCurrent: z
    .preprocess((value) => {
      if (value === "true") return true;
      if (value === "false") return false;
      return value;
    }, z.boolean())
    .optional(),
  technologies: z.string().optional(),
  sort: z.string().optional(),
});

const idParamsSchema = z.object({
  id: z.string().trim().min(1, { message: "id is required" }),
});

const validate = validateSchema;

export {
  createExperienceSchema,
  updateExperienceSchema,
  listExperienceQuerySchema,
  idParamsSchema,
  validate,
};
