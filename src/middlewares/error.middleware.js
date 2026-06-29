import multer from "multer";
import mongoose from "mongoose";
import { sendError } from "../shared/utils/response.utils.js";

const DUPLICATE_KEY_CODE = 11000;

const errorMiddleware = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal server error";
  let errors = Array.isArray(err.errors) ? err.errors : [];

  if (err instanceof multer.MulterError) {
    statusCode = 400;
    message =
      err.code === "LIMIT_FILE_SIZE"
        ? "Uploaded file is too large"
        : err.message;
    errors = [{ field: err.field || "file", message }];
  }

  if (err instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = "Invalid identifier";
    errors = [{ field: err.path, message }];
  }

  if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = "Validation failed";
    errors = Object.values(err.errors).map((error) => ({
      field: error.path,
      message: error.message,
    }));
  }

  if (err?.code === DUPLICATE_KEY_CODE) {
    statusCode = 409;
    message = "Duplicate resource";
    errors = Object.keys(err.keyPattern || {}).map((field) => ({
      field,
      message: `${field} must be unique`,
    }));
  }

  sendError(res, statusCode, message, errors);
};

export default errorMiddleware;
