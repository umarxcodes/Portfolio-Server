import { z } from "zod";
import { validate as validateSchema } from "../../../shared/utils/validation.utils.js";

const analyticsRangeQuerySchema = z.object({
  months: z.string().optional(),
});

const validate = validateSchema;

export { analyticsRangeQuerySchema, validate };
