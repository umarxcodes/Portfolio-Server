class AppError extends Error {
  constructor(statusCode, message, errors = []) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.errors = Array.isArray(errors) ? errors : [];
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
