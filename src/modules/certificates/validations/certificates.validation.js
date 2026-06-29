import { z } from "zod";
import { validate as validateSchema } from "../../../shared/utils/validation.utils.js";

const dateField = z.coerce.date();
const optionalUrl = z.string().url().optional().nullable();
const idParamsSchema = z.object({ id: z.string().trim().min(1) });

const certificateBaseSchema = z.object({
  name: z.string().trim().min(1),
  issuer: z.string().trim().min(1),
  issueDate: dateField,
  expiryDate: dateField.optional().nullable(),
  credentialId: z.string().trim().optional().nullable(),
  credentialUrl: optionalUrl,
  description: z.string().trim().optional().nullable(),
  skills: z.array(z.string().trim().min(1)).optional().default([]),
  badgeImage: optionalUrl,
});

const createCertificateSchema = certificateBaseSchema.refine(
  (data) => !data.expiryDate || data.expiryDate > data.issueDate,
  {
    path: ["expiryDate"],
    message: "expiryDate must be after issueDate",
  }
);
const updateCertificateSchema = certificateBaseSchema
  .partial()
  .refine(
    (data) =>
      !data.expiryDate || !data.issueDate || data.expiryDate > data.issueDate,
    {
      path: ["expiryDate"],
      message: "expiryDate must be after issueDate",
    }
  );
const listCertificatesQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  sort: z.string().optional(),
  search: z.string().optional(),
  issuer: z.string().optional(),
  skill: z.string().optional(),
  expired: z.preprocess(
    (value) => (value === "true" ? true : value === "false" ? false : value),
    z.boolean().optional()
  ),
});

const validate = validateSchema;

export {
  createCertificateSchema,
  updateCertificateSchema,
  listCertificatesQuerySchema,
  idParamsSchema,
  validate,
};
