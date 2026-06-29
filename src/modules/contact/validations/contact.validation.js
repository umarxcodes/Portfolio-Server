import { z } from "zod";
import { validate as validateSchema } from "../../../shared/utils/validation.utils.js";
import { CONTACT_STATUSES } from "../constants/contact.constants.js";

const idParamsSchema = z.object({ id: z.string().trim().min(1) });

const submitContactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().toLowerCase(),
  subject: z.string().trim().min(2).max(200),
  message: z.string().trim().min(10).max(2000),
});
const updateContactStatusSchema = z.object({
  status: z.enum(CONTACT_STATUSES),
});
const listContactQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  sort: z.string().optional(),
  search: z.string().optional(),
  status: z.enum(CONTACT_STATUSES).optional(),
  isRead: z.preprocess(
    (value) => (value === "true" ? true : value === "false" ? false : value),
    z.boolean().optional()
  ),
});

const validate = validateSchema;

export {
  submitContactSchema,
  updateContactStatusSchema,
  listContactQuerySchema,
  idParamsSchema,
  validate,
};
