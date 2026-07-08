import { z } from "zod";
import { validate as validateSchema } from "../../../shared/utils/validation.utils.js";
import { UPLOAD_FOLDERS } from "../constants/upload.constants.js";

const objectIdField = z
  .string()
  .trim()
  .regex(/^[a-f\d]{24}$/i, { message: "Invalid id" });
const idParamsSchema = z.object({ id: objectIdField }).strict();

const uploadBodySchema = z.object({ folder: z.enum(UPLOAD_FOLDERS) }).strict();

const validate = validateSchema;

export { uploadBodySchema, idParamsSchema, validate };
