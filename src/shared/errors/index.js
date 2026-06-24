// *** First ***    Imports

// *** Second ***   Constants

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions
class AppError extends Error {
  constructor(statusCode, message, errors = []) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.errors = Array.isArray(errors) ? errors : [];
    Error.captureStackTrace(this, this.constructor);
  }
}

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export default AppError;
