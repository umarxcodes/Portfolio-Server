// *** First ***    Imports
import { z } from "zod";
import { validate as validateSchema } from "../../../shared/utils/validation.utils.js";
import { SEARCH_RESOURCE_TYPES } from "../constants/search.constants.js";

// *** Second ***   Constants

// *** Third ***    Schema / Model
const searchQuerySchema = z.object({
  q: z.string().trim().min(1),
  type: z.enum(SEARCH_RESOURCE_TYPES).optional(),
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
