// *** First ***    Imports
import { z } from "zod";
import { validate as validateSchema } from "../../../shared/utils/validation.utils.js";

// *** Second ***   Constants
const dateField = z.coerce.date();
const idParamsSchema = z.object({ id: z.string().trim().min(1) });

// *** Third ***    Schema / Model
const educationBaseSchema = z.object({
  degree: z.string().trim().min(1),
  fieldOfStudy: z.string().trim().min(1),
  institution: z.string().trim().min(1),
  description: z.string().trim().optional().nullable(),
  grade: z.string().trim().optional().nullable(),
  startDate: dateField,
  endDate: dateField.optional().nullable(),
  isCurrent: z.boolean().optional().default(false),
  location: z.string().trim().optional().nullable(),
});

const refineEducationDates = (data, ctx) => {
  if (data.isCurrent && data.endDate) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["endDate"],
      message: "endDate must be null when isCurrent is true",
    });
  }
  if (data.endDate && data.endDate < data.startDate) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["endDate"],
      message: "endDate must be after startDate",
    });
  }
};

const createEducationSchema =
  educationBaseSchema.superRefine(refineEducationDates);
const updateEducationSchema = educationBaseSchema
  .partial()
  .superRefine(refineEducationDates);
const listEducationQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  sort: z.string().optional(),
  search: z.string().optional(),
  institution: z.string().optional(),
  isCurrent: z.preprocess(
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
  createEducationSchema,
  updateEducationSchema,
  listEducationQuerySchema,
  idParamsSchema,
  validate,
};
