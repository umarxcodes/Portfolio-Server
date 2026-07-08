import { z } from "zod";
import { validate as validateSchema } from "../../../shared/utils/validation.utils.js";

const dateField = z.coerce.date();
const objectIdField = z
  .string()
  .trim()
  .regex(/^[a-f\d]{24}$/i, { message: "Invalid id" });
const idParamsSchema = z.object({ id: objectIdField }).strict();

const educationBaseSchema = z
  .object({
    degree: z.string().trim().min(1),
    fieldOfStudy: z.string().trim().min(1),
    institution: z.string().trim().min(1),
    description: z.string().trim().optional().nullable(),
    grade: z.string().trim().optional().nullable(),
    startDate: dateField,
    endDate: dateField.optional().nullable(),
    isCurrent: z.boolean().optional().default(false),
    location: z.string().trim().optional().nullable(),
  })
  .strict();

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
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  })
  .superRefine(refineEducationDates);
const listEducationQuerySchema = z
  .object({
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().max(50).optional(),
    sort: z.string().optional(),
    search: z.string().optional(),
    institution: z.string().optional(),
    isCurrent: z.preprocess(
      (value) => (value === "true" ? true : value === "false" ? false : value),
      z.boolean().optional()
    ),
  })
  .strict();

const validate = validateSchema;

export {
  createEducationSchema,
  updateEducationSchema,
  listEducationQuerySchema,
  idParamsSchema,
  validate,
};
