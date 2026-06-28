// *** First ***    Imports
import jwt from "jsonwebtoken";
import crypto from "crypto";
import AppError from "../errors/index.js";
import {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY,
  AUTH_ERRORS,
} from "../../modules/auth/constants/auth.constants.js";

// *** Second ***   Constants

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions
const generateAccessToken = (payload) =>
  jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });

const generateRefreshToken = (payload) =>
  jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });

const hashRefreshToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new AppError(401, AUTH_ERRORS.TOKEN_EXPIRED);
    }

    throw new AppError(401, AUTH_ERRORS.TOKEN_INVALID);
  }
};

const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new AppError(401, AUTH_ERRORS.REFRESH_TOKEN_EXPIRED);
    }

    throw new AppError(401, AUTH_ERRORS.REFRESH_TOKEN_INVALID);
  }
};

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export {
  generateAccessToken,
  generateRefreshToken,
  hashRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
