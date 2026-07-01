import jwt from "jsonwebtoken";
import AppError from "../errors/index.js";
import {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY,
  AUTH_ERRORS,
} from "../../modules/auth/constants/auth.constants.js";

const generateAccessToken = (payload) =>
  jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });

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

export { generateAccessToken, verifyAccessToken };
