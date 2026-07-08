import { z } from "zod";
import { validate as validateSchema } from "../../../shared/utils/validation.utils.js";

const dateField = z.coerce.date();
const optionalUrl = z.string().url().optional().nullable();
const objectIdField = z
  .string()
  .trim()
  .regex(/^[a-f\d]{24}$/i, { message: "Invalid id" });
const idParamsSchema = z.object({ id: objectIdField }).strict();

const certificateBaseSchema = z
  .object({
    name: z.string().trim().min(1),
    issuer: z.string().trim().min(1),
    issueDate: dateField,
    expiryDate: dateField.optional().nullable(),
    credentialId: z.string().trim().optional().nullable(),
    credentialUrl: optionalUrl,
    description: z.string().trim().optional().nullable(),
    skills: z.array(z.string().trim().min(1)).optional().default([]),
    badgeImage: optionalUrl,
  })
  .strict();

const createCertificateSchema = certificateBaseSchema.refine(
  (data) => !data.expiryDate || data.expiryDate > data.issueDate,
  {
    path: ["expiryDate"],
    message: "expiryDate must be after issueDate",
  }
);
const updateCertificateSchema = certificateBaseSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  })
  .refine(
    (data) =>
      !data.expiryDate || !data.issueDate || data.expiryDate > data.issueDate,
    {
      path: ["expiryDate"],
      message: "expiryDate must be after issueDate",
    }
  );
const listCertificatesQuerySchema = z
  .object({
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().max(50).optional(),
    sort: z.string().optional(),
    search: z.string().optional(),
    issuer: z.string().optional(),
    skill: z.string().optional(),
    expired: z.preprocess(
      (value) => (value === "true" ? true : value === "false" ? false : value),
      z.boolean().optional()
    ),
  })
  .strict();

const validate = validateSchema;

export {
  createCertificateSchema,
  updateCertificateSchema,
  listCertificatesQuerySchema,
  idParamsSchema,
  validate,
};
