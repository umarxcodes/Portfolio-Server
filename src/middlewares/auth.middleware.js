// *** First ***    Imports
import asyncHandler from "express-async-handler";
import AppError from "../shared/errors/index.js";
import { verifyAccessToken } from "../shared/utils/jwt.utils.js";
import { AUTH_ERRORS } from "../modules/auth/constants/auth.constants.js";

// *** Second ***   Constants

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions
const protect = asyncHandler(async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new AppError(401, AUTH_ERRORS.UNAUTHORIZED);
  }

  const token = authorization.split(" ")[1].trim();

  try {
    req.user = verifyAccessToken(token);
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new AppError(401, AUTH_ERRORS.TOKEN_EXPIRED);
    }

    if (error.name === "JsonWebTokenError") {
      throw new AppError(401, AUTH_ERRORS.TOKEN_INVALID);
    }

    throw error;
  }
});

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export default protect;
