// *** First ***    Imports
import { sendError } from "../shared/utils/response.utils.js";

// *** Second ***   Constants

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions
const errorMiddleware = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  const errors = Array.isArray(err.errors) ? err.errors : [];

  sendError(res, statusCode, message, errors);
};

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export default errorMiddleware;
