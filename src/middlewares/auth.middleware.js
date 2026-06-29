import asyncHandler from "express-async-handler";
import AppError from "../shared/errors/index.js";
import { verifyAccessToken } from "../shared/utils/jwt.utils.js";
import { AUTH_ERRORS } from "../modules/auth/constants/auth.constants.js";

const protect = asyncHandler(async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new AppError(401, AUTH_ERRORS.UNAUTHORIZED);
  }

  const token = authorization.split(" ")[1]?.trim();

  if (!token) {
    throw new AppError(401, AUTH_ERRORS.UNAUTHORIZED);
  }

  req.user = verifyAccessToken(token);
  next();
});

export default protect;
