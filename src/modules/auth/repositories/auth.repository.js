import Admin from "../models/admin.model.js";

const findByEmail = async (email) =>
  Admin.findOne({ email }).select("+password");

const findById = async (id, options = {}) => {
  const query = Admin.findById(id);

  if (options.withSecrets) {
    query.select("+password");
  }

  return query;
};

const updateLastLogin = async (id) =>
  Admin.findByIdAndUpdate(id, { lastLogin: Date.now() }, { new: true });

const changePassword = async (id, hashedPassword) =>
  Admin.findByIdAndUpdate(
    id,
    { password: hashedPassword, refreshTokens: [] },
    { new: true, runValidators: true }
  );

const storeRefreshToken = async (id, hashedToken) =>
  Admin.findByIdAndUpdate(
    id,
    { $push: { refreshTokens: { token: hashedToken } } },
    { new: true }
  );

const verifyRefreshTokenExists = async (id, hashedToken) => {
  const admin = await Admin.findById(id).select("+refreshTokens");
  if (!admin) return false;
  return admin.refreshTokens.some((rt) => rt.token === hashedToken);
};

const revokeRefreshToken = async (id, hashedToken) =>
  Admin.findByIdAndUpdate(
    id,
    { $pull: { refreshTokens: { token: hashedToken } } },
    { new: true }
  );

const revokeAllRefreshTokens = async (id) =>
  Admin.findByIdAndUpdate(id, { refreshTokens: [] }, { new: true });

export {
  findByEmail,
  findById,
  updateLastLogin,
  changePassword,
  storeRefreshToken,
  verifyRefreshTokenExists,
  revokeRefreshToken,
  revokeAllRefreshTokens,
};
