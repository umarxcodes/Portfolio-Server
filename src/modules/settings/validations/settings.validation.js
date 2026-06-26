// *** First ***    Imports
import { z } from "zod";
import { validate as validateSchema } from "../../../shared/utils/validation.utils.js";
import { SETTINGS_THEMES } from "../constants/settings.constants.js";

// *** Second ***   Constants
const optionalUrl = z.string().url().or(z.literal("")).optional();

// *** Third ***    Schema / Model
const updateSettingsSchema = z.object({
  siteTitle: z.string().trim().min(1).optional(),
  siteDescription: z.string().trim().min(1).optional(),
  seoTitle: z.string().trim().max(60).optional(),
  seoDescription: z.string().trim().max(160).optional(),
  keywords: z.array(z.string().trim()).optional(),
  socialLinks: z
    .object({
      github: optionalUrl,
      linkedin: optionalUrl,
      twitter: optionalUrl,
      youtube: optionalUrl,
    })
    .optional(),
  theme: z.enum(SETTINGS_THEMES).optional(),
  logo: optionalUrl,
  favicon: optionalUrl,
  contactEmail: z.string().trim().email().or(z.literal("")).optional(),
  contactPhone: z.string().trim().optional(),
  maintenanceMode: z.boolean().optional(),
});

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions
const validate = validateSchema;

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export { updateSettingsSchema, validate };
