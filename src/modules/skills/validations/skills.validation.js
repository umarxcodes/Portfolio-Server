import { z } from "zod";
import { validate as validateSchema } from "../../../shared/utils/validation.utils.js";
import {
  SKILL_CATEGORIES,
  SKILL_LEVELS,
} from "../constants/skills.constants.js";

const objectIdField = z
  .string()
  .trim()
  .regex(/^[a-f\d]{24}$/i, { message: "Invalid id" });

const createSkillSchema = z
  .object({
    name: z.string().trim().min(1),
    category: z.enum(SKILL_CATEGORIES, {
      invalid_type_error: "Invalid category",
    }),
    level: z.enum(SKILL_LEVELS, { invalid_type_error: "Invalid level" }),
    yearsOfExperience: z
      .number()
      .min(0, { message: "yearsOfExperience must be at least 0" })
      .max(50, { message: "yearsOfExperience must be 50 or less" }),
    icon: z.string().trim().optional(),
    description: z.string().optional(),
    displayOrder: z.number().optional(),
  })
  .strict();

const updateSkillSchema = createSkillSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  });

const listSkillQuerySchema = z
  .object({
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().max(50).optional(),
    category: z.enum(SKILL_CATEGORIES).optional(),
    level: z.enum(SKILL_LEVELS).optional(),
    sort: z.string().optional(),
  })
  .strict();

const idParamsSchema = z
  .object({
    id: objectIdField,
  })
  .strict();

const validate = validateSchema;

export {
  createSkillSchema,
  updateSkillSchema,
  listSkillQuerySchema,
  idParamsSchema,
  validate,
};
