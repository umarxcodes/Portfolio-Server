import AppError from "../errors/index.js";

const VALIDATION_MESSAGE = "Validation failed";

const validate =
  (schema, source = "body") =>
  (req, res, next) => {
    const sanitizedPayload = sanitizePayload(req[source]);
    const parseResult = schema.safeParse(sanitizedPayload);

    if (!parseResult.success) {
      const errors = parseResult.error.issues.map((error) => ({
        field: error.path.join(".") || source,
        message: error.message,
      }));

      throw new AppError(400, VALIDATION_MESSAGE, errors);
    }

    req[source] = parseResult.data;
    next();
  };

const sanitizePayload = (payload) => {
  if (!payload || typeof payload !== "object") {
    return payload;
  }
  if (Array.isArray(payload)) {
    return payload.map(sanitizePayload);
  }
  const sanitized = {};
  for (const key of Object.keys(payload)) {
    if (key.startsWith("$") || key.includes(".")) {
      continue;
    }
    sanitized[key] = sanitizePayload(payload[key]);
  }
  return sanitized;
};

export { validate, sanitizePayload };
