// *** First ***    Imports
import asyncHandler from "express-async-handler";
import { sendSuccess } from "../../../shared/utils/response.utils.js";
import { AUTH_MESSAGES } from "../constants/auth.constants.js";
import * as authService from "../services/auth.service.js";

// *** Second ***   Constants

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions

// *** Sixth ***    Controller Functions
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { accessToken, refreshToken, admin } = await authService.login(
    email,
    password
  );

  sendSuccess(res, 200, AUTH_MESSAGES.LOGIN_SUCCESS, {
    accessToken,
    refreshToken,
    admin,
  });
});

const profile = asyncHandler(async (req, res) => {
  const admin = await authService.getProfile(req.user.sub);
  sendSuccess(res, 200, AUTH_MESSAGES.PROFILE_FETCHED, { admin });
});

const logout = asyncHandler(async (req, res) => {
  await authService.logout(req.user.sub);
  sendSuccess(res, 200, AUTH_MESSAGES.LOGOUT_SUCCESS, {});
});

const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  const tokens = await authService.refreshToken(refreshToken);
  sendSuccess(res, 200, AUTH_MESSAGES.TOKEN_REFRESHED, tokens);
});

const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  await authService.changePassword(req.user.sub, currentPassword, newPassword);
  sendSuccess(res, 200, AUTH_MESSAGES.PASSWORD_CHANGED, {});
});

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export { login, profile, logout, refreshToken, changePassword };
