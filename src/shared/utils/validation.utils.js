import AppError from "../errors/index.js";

const VALIDATION_MESSAGE = "Validation failed";

const validate =
  (schema, source = "body") =>
  (req, res, next) => {
    const payload = req[source];
    const parseResult = schema.safeParse(payload);

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

export { validate };
