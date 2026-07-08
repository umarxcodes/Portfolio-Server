import { z } from "zod";
import { validate as validateSchema } from "../../../shared/utils/validation.utils.js";

const strongPassword = (fieldName) =>
  z
    .string()
    .min(8, { message: `${fieldName} must be at least 8 characters` })
    .max(128, { message: `${fieldName} must not exceed 128 characters` })
    .regex(/[a-z]/, { message: `${fieldName} must include a lowercase letter` })
    .regex(/[A-Z]/, {
      message: `${fieldName} must include an uppercase letter`,
    })
    .regex(/\d/, { message: `${fieldName} must include a number` })
    .regex(/[^A-Za-z0-9]/, {
      message: `${fieldName} must include a special character`,
    });

const loginSchema = z
  .object({
    email: z
      .string()
      .email({ message: "Invalid email" })
      .trim()
      .transform((value) => value.toLowerCase()),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(128, { message: "Password must not exceed 128 characters" }),
  })
  .strict();

const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, { message: "Current password must be at least 8 characters" })
      .max(128, {
        message: "Current password must not exceed 128 characters",
      }),
    newPassword: strongPassword("New password"),
    confirmNewPassword: strongPassword("Confirm password"),
  })
  .strict()
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords must match",
    path: ["confirmNewPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });

const validate = validateSchema;

export { loginSchema, changePasswordSchema, validate };
