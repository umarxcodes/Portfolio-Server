import { z } from "zod";
import { validate as validateSchema } from "../../../shared/utils/validation.utils.js";

const urlField = z.string().url({ message: "Invalid URL" });

const socialLinksSchema = z
  .object({
    github: urlField.optional(),
    linkedin: urlField.optional(),
    portfolio: urlField.optional(),
    twitter: urlField.optional(),
  })
  .partial();

const profileSchema = z.object({
  name: z.string().trim(),
  title: z.string().trim(),
  bio: z.string(),
  shortBio: z
    .string()
    .trim()
    .max(160, { message: "shortBio must not exceed 160 characters" }),
  email: z
    .string()
    .email({ message: "Invalid email" })
    .trim()
    .transform((value) => value.toLowerCase()),
  phone: z.string().trim().optional(),
  location: z.string().trim().optional(),
  profileImage: urlField.optional(),
  resumeUrl: urlField.optional(),
  availability: z.boolean().optional(),
  yearsOfExperience: z
    .number()
    .min(0, { message: "yearsOfExperience must be at least 0" }),
  socialLinks: socialLinksSchema.optional(),
});

const updateProfileSchema = profileSchema.partial();

const validate = validateSchema;

export { updateProfileSchema, validate };
