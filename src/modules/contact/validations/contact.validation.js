import { z } from "zod";
import { validate as validateSchema } from "../../../shared/utils/validation.utils.js";
import { CONTACT_STATUSES } from "../constants/contact.constants.js";

const objectIdField = z
  .string()
  .trim()
  .regex(/^[a-f\d]{24}$/i, { message: "Invalid id" });
const idParamsSchema = z.object({ id: objectIdField }).strict();

const submitContactSchema = z
  .object({
    name: z.string().trim().min(2).max(100),
    email: z.string().trim().email().toLowerCase(),
    subject: z.string().trim().min(2).max(200),
    message: z.string().trim().min(10).max(2000),
  })
  .strict();
const updateContactStatusSchema = z
  .object({
    status: z.enum(CONTACT_STATUSES),
  })
  .strict();
const listContactQuerySchema = z
  .object({
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().max(50).optional(),
    sort: z.string().optional(),
    search: z.string().optional(),
    status: z.enum(CONTACT_STATUSES).optional(),
    isRead: z.preprocess(
      (value) => (value === "true" ? true : value === "false" ? false : value),
      z.boolean().optional()
    ),
  })
  .strict();

const validate = validateSchema;

export {
  submitContactSchema,
  updateContactStatusSchema,
  listContactQuerySchema,
  idParamsSchema,
  validate,
};
