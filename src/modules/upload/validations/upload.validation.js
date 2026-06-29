import { z } from "zod";
import { validate as validateSchema } from "../../../shared/utils/validation.utils.js";
import { UPLOAD_FOLDERS } from "../constants/upload.constants.js";

const idParamsSchema = z.object({ id: z.string().trim().min(1) });

const uploadBodySchema = z.object({ folder: z.enum(UPLOAD_FOLDERS) });

const validate = validateSchema;

export { uploadBodySchema, idParamsSchema, validate };
