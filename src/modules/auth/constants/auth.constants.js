// *** First ***    Imports

// *** Second ***   Constants
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "";
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRES_IN || "15m";
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRES_IN || "7d";
const BCRYPT_SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS || 12);
const TOKEN_TYPE = "Bearer";
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
};

const AUTH_ERRORS = {
  INVALID_CREDENTIALS: "Invalid credentials",
  ACCOUNT_INACTIVE: "Account is inactive",
  TOKEN_EXPIRED: "Token expired",
  TOKEN_INVALID: "Token invalid",
  UNAUTHORIZED: "Unauthorized",
  SAME_PASSWORD: "New password must be different from current password",
  WRONG_CURRENT_PASSWORD: "Current password is incorrect",
  REFRESH_TOKEN_INVALID: "Refresh token is invalid",
};

const AUTH_MESSAGES = {
  LOGIN_SUCCESS: "Login successful",
  LOGOUT_SUCCESS: "Logout successful",
  PROFILE_FETCHED: "Profile fetched successfully",
  TOKEN_REFRESHED: "Token refreshed successfully",
  PASSWORD_CHANGED: "Password changed successfully",
};

if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
  throw new Error("Missing required authentication environment variables.");
}

if (!ACCESS_TOKEN_EXPIRY || !REFRESH_TOKEN_EXPIRY) {
  throw new Error("Missing required token expiry environment variables.");
}

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
  BCRYPT_SALT_ROUNDS,
  TOKEN_TYPE,
  COOKIE_OPTIONS,
  AUTH_ERRORS,
  AUTH_MESSAGES,
};
