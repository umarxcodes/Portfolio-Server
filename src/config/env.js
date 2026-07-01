import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({ quiet: true });

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().int().positive().default(5000),
  MONGO_URI: z.string().min(1),
  MONGO_MAX_POOL_SIZE: z.coerce.number().int().positive().default(10),
  MONGO_MIN_POOL_SIZE: z.coerce.number().int().min(0).default(0),
  MONGO_CONNECT_RETRIES: z.coerce.number().int().min(1).default(3),
  MONGO_CONNECT_RETRY_DELAY_MS: z.coerce
    .number()
    .int()
    .positive()
    .default(2000),
  ACCESS_TOKEN_SECRET: z.string().min(32),
  ACCESS_TOKEN_EXPIRES_IN: z.string().default("24h"),
  BCRYPT_SALT_ROUNDS: z.coerce.number().int().min(10).max(15).default(12),
  JSON_BODY_LIMIT: z.string().default("1mb"),
  URL_ENCODED_BODY_LIMIT: z.string().default("1mb"),
  TRUST_PROXY: z
    .preprocess((value) => {
      if (value === "true") return true;
      if (value === "false") return false;
      return value;
    }, z.boolean())
    .default(false),
  CLIENT_URL: z.string().url().optional(),
  CORS_ORIGINS: z.string().optional(),
  UPLOAD_ROOT: z.string().default("uploads"),
  IMAGE_UPLOAD_MAX_MB: z.coerce.number().positive().default(5),
  PDF_UPLOAD_MAX_MB: z.coerce.number().positive().default(10),
  GLOBAL_RATE_LIMIT_WINDOW_MS: z.coerce
    .number()
    .int()
    .positive()
    .default(60000),
  GLOBAL_RATE_LIMIT_MAX: z.coerce.number().int().positive().default(100),
  CONTACT_RATE_LIMIT_WINDOW_MS: z.coerce
    .number()
    .int()
    .positive()
    .default(3600000),
  CONTACT_RATE_LIMIT_MAX: z.coerce.number().int().positive().default(5),
  LOG_LEVEL: z.enum(["error", "warn", "info", "http", "debug"]).default("info"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  const message = parsedEnv.error.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join("; ");
  throw new Error(`Invalid environment configuration: ${message}`);
}

const env = parsedEnv.data;

const parseCorsOrigins = () => {
  const origins = env.CORS_ORIGINS || env.CLIENT_URL || "";
  return origins
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
};

export { parseCorsOrigins };
export default env;
