import asyncHandler from "../../../shared/utils/asyncHandler.utils.js";
import { sendSuccess } from "../../../shared/utils/response.utils.js";
import { AUTH_MESSAGES } from "../constants/auth.constants.js";
import * as authService from "../services/auth.service.js";

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

const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken: token } = req.body;
  const { accessToken, refreshToken: newRefreshToken } =
    await authService.refreshAccessToken(token);

  sendSuccess(res, 200, AUTH_MESSAGES.TOKEN_REFRESHED, {
    accessToken,
    refreshToken: newRefreshToken,
  });
});

const profile = asyncHandler(async (req, res) => {
  const admin = await authService.getProfile(req.user.sub);
  sendSuccess(res, 200, AUTH_MESSAGES.PROFILE_FETCHED, { admin });
});

const logout = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  await authService.logout(req.user.sub, refreshToken);
  sendSuccess(res, 200, AUTH_MESSAGES.LOGOUT_SUCCESS, {});
});

const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  await authService.changePassword(req.user.sub, currentPassword, newPassword);
  sendSuccess(res, 200, AUTH_MESSAGES.PASSWORD_CHANGED, {});
});

export { login, refreshToken, profile, logout, changePassword };
