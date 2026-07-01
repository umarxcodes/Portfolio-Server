import AppError from "../../../shared/errors/index.js";
import { generateAccessToken } from "../../../shared/utils/jwt.utils.js";
import { hashPassword } from "../../../shared/utils/password.utils.js";
import { AUTH_ERRORS } from "../constants/auth.constants.js";
import * as authRepository from "../repositories/auth.repository.js";
import { buildAuthPayload } from "../utils/auth.utils.js";

const login = async (email, password) => {
  const admin = await authRepository.findByEmail(email);

  if (!admin) {
    throw new AppError(401, AUTH_ERRORS.INVALID_CREDENTIALS);
  }

  if (!admin.isActive) {
    throw new AppError(403, AUTH_ERRORS.ACCOUNT_INACTIVE);
  }

  const passwordMatches = await admin.comparePassword(password);

  if (!passwordMatches) {
    throw new AppError(401, AUTH_ERRORS.INVALID_CREDENTIALS);
  }

  const payload = buildAuthPayload(admin);
  const accessToken = generateAccessToken(payload);

  await authRepository.updateLastLogin(admin._id);

  return { accessToken, admin: admin.generateSanitized() };
};

const getProfile = async (adminId) => {
  const admin = await authRepository.findById(adminId);

  if (!admin) {
    throw new AppError(404, AUTH_ERRORS.UNAUTHORIZED);
  }

  return admin.generateSanitized();
};

const logout = async () => true;

const changePassword = async (adminId, currentPassword, newPassword) => {
  const admin = await authRepository.findById(adminId, { withSecrets: true });

  if (!admin) {
    throw new AppError(401, AUTH_ERRORS.UNAUTHORIZED);
  }

  const passwordMatches = await admin.comparePassword(currentPassword);

  if (!passwordMatches) {
    throw new AppError(401, AUTH_ERRORS.WRONG_CURRENT_PASSWORD);
  }

  if (currentPassword === newPassword) {
    throw new AppError(400, AUTH_ERRORS.SAME_PASSWORD);
  }

  const hashedNewPassword = await hashPassword(newPassword);
  await authRepository.changePassword(adminId, hashedNewPassword);
};

export { login, getProfile, logout, changePassword };
