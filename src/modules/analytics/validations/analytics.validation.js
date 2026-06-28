// *** First ***    Imports
import { z } from "zod";
import { validate as validateSchema } from "../../../shared/utils/validation.utils.js";
import { ANALYTICS_TYPES } from "../constants/analytics.constants.js";

// *** Second ***   Constants
const analyticsRangeQuerySchema = z.object({
  months: z.string().optional(),
});

// *** Third ***    Schema / Model
const trackEventSchema = z.object({
  type: z.enum(ANALYTICS_TYPES),
  resourceId: z.string().trim().min(1).optional().nullable(),
});

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions
const validate = validateSchema;

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export { trackEventSchema, analyticsRangeQuerySchema, validate };
