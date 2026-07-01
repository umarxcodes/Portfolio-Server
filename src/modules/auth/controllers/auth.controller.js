import asyncHandler from "../../../shared/utils/asyncHandler.utils.js";
import { sendSuccess } from "../../../shared/utils/response.utils.js";
import { AUTH_MESSAGES } from "../constants/auth.constants.js";
import * as authService from "../services/auth.service.js";

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { accessToken, admin } = await authService.login(email, password);

  sendSuccess(res, 200, AUTH_MESSAGES.LOGIN_SUCCESS, { accessToken, admin });
});

const profile = asyncHandler(async (req, res) => {
  const admin = await authService.getProfile(req.user.sub);
  sendSuccess(res, 200, AUTH_MESSAGES.PROFILE_FETCHED, { admin });
});

const logout = asyncHandler(async (req, res) => {
  await authService.logout();
  sendSuccess(res, 200, AUTH_MESSAGES.LOGOUT_SUCCESS, {});
});

const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  await authService.changePassword(req.user.sub, currentPassword, newPassword);
  sendSuccess(res, 200, AUTH_MESSAGES.PASSWORD_CHANGED, {});
});

export { login, profile, logout, changePassword };
