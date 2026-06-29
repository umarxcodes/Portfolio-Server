import { z } from "zod";
import { validate as validateSchema } from "../../../shared/utils/validation.utils.js";
import {
  SKILL_CATEGORIES,
  SKILL_LEVELS,
} from "../constants/skills.constants.js";

const createSkillSchema = z.object({
  name: z.string().trim(),
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
});

const updateSkillSchema = createSkillSchema.partial();

const listSkillQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  category: z.enum(SKILL_CATEGORIES).optional(),
  level: z.enum(SKILL_LEVELS).optional(),
  sort: z.string().optional(),
});

const idParamsSchema = z.object({
  id: z.string().trim().min(1, { message: "id is required" }),
});

const validate = validateSchema;

export {
  createSkillSchema,
  updateSkillSchema,
  listSkillQuerySchema,
  idParamsSchema,
  validate,
};
