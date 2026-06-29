import { z } from "zod";
import { validate as validateSchema } from "../../../shared/utils/validation.utils.js";
import { ANALYTICS_TYPES } from "../constants/analytics.constants.js";

const analyticsRangeQuerySchema = z.object({
  months: z.string().optional(),
});

const trackEventSchema = z.object({
  type: z.enum(ANALYTICS_TYPES),
  resourceId: z.string().trim().min(1).optional().nullable(),
});

const validate = validateSchema;

export { trackEventSchema, analyticsRangeQuerySchema, validate };
