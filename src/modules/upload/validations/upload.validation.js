// *** First ***    Imports
import { z } from "zod";
import { validate as validateSchema } from "../../../shared/utils/validation.utils.js";
import { UPLOAD_FOLDERS } from "../constants/upload.constants.js";

// *** Second ***   Constants
const idParamsSchema = z.object({ id: z.string().trim().min(1) });

// *** Third ***    Schema / Model
const uploadBodySchema = z.object({ folder: z.enum(UPLOAD_FOLDERS) });

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions
const validate = validateSchema;

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export { uploadBodySchema, idParamsSchema, validate };
