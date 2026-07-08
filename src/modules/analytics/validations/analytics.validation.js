import { z } from "zod";
import { validate as validateSchema } from "../../../shared/utils/validation.utils.js";
import { ANALYTICS_TYPES } from "../constants/analytics.constants.js";

const trackEventSchema = z.object({
  type: z.enum(ANALYTICS_TYPES),
  resourceId: z
    .string()
    .regex(/^[a-f\d]{24}$/i, "Invalid resourceId")
    .optional()
    .nullable(),
});

const analyticsRangeQuerySchema = z
  .object({
    months: z.coerce.number().int().positive().max(24).optional(),
  })
  .strict();

const validate = validateSchema;

export { trackEventSchema, analyticsRangeQuerySchema, validate };
