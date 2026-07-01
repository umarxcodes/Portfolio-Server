import env from "../../../config/env.js";

const ACCESS_TOKEN_SECRET = env.ACCESS_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRY = env.ACCESS_TOKEN_EXPIRES_IN;
const BCRYPT_SALT_ROUNDS = env.BCRYPT_SALT_ROUNDS;

const AUTH_ERRORS = {
  INVALID_CREDENTIALS: "Invalid credentials",
  ACCOUNT_INACTIVE: "Account is inactive",
  TOKEN_EXPIRED: "Token expired",
  TOKEN_INVALID: "Token invalid",
  UNAUTHORIZED: "Unauthorized",
  SAME_PASSWORD: "New password must be different from current password",
  WRONG_CURRENT_PASSWORD: "Current password is incorrect",
};

const AUTH_MESSAGES = {
  LOGIN_SUCCESS: "Login successful",
  LOGOUT_SUCCESS: "Logout successful",
  PROFILE_FETCHED: "Profile fetched successfully",
  PASSWORD_CHANGED: "Password changed successfully",
};

export {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY,
  BCRYPT_SALT_ROUNDS,
  AUTH_ERRORS,
  AUTH_MESSAGES,
};
