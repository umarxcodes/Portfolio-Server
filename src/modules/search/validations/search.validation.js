// *** First ***    Imports
import { z } from "zod";
import { validate as validateSchema } from "../../../shared/utils/validation.utils.js";

// *** Second ***   Constants

// *** Third ***    Schema / Model
const searchQuerySchema = z.object({
  q: z.string().trim().min(1),
  page: z.string().optional(),
  limit: z.string().optional(),
});

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions
const validate = validateSchema;

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export { searchQuerySchema, validate };
