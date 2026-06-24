// *** First ***    Imports
import { z } from "zod";
import AppError from "../../../shared/errors/index.js";

// *** Second ***   Constants
const VALIDATION_MESSAGE = "Validation failed";

// *** Third ***    Schema / Model
const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email" })
    .trim()
    .transform((value) => value.toLowerCase()),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, { message: "Current password must be at least 8 characters" }),
    newPassword: z
      .string()
      .min(8, { message: "New password must be at least 8 characters" }),
    confirmNewPassword: z
      .string()
      .min(8, { message: "Confirm password must be at least 8 characters" }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords must match",
    path: ["confirmNewPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions
const validate = (schema) => (req, res, next) => {
  const parseResult = schema.safeParse(req.body);

  if (!parseResult.success) {
    const errors = parseResult.error.errors.map((error) => ({
      field: error.path.join(".") || "body",
      message: error.message,
    }));

    throw new AppError(400, VALIDATION_MESSAGE, errors);
  }

  req.body = parseResult.data;
  next();
};

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export { loginSchema, changePasswordSchema, validate };
