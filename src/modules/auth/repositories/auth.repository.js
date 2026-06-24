// *** First ***    Imports
import Admin from "../models/admin.model.js";

// *** Second ***   Constants

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions
const findByEmail = async (email) =>
  Admin.findOne({ email }).select("+password");

const findById = async (id, options = {}) => {
  const query = Admin.findById(id);

  if (options.withSecrets) {
    query.select("+password +refreshToken");
  }

  return query;
};

const updateLastLogin = async (id) =>
  Admin.findByIdAndUpdate(id, { lastLogin: Date.now() }, { new: true });

const saveRefreshToken = async (id, hashedToken) =>
  Admin.findByIdAndUpdate(id, { refreshToken: hashedToken }, { new: true });

const clearRefreshToken = async (id) =>
  Admin.findByIdAndUpdate(id, { refreshToken: null }, { new: true });

const changePassword = async (id, hashedPassword) =>
  Admin.findByIdAndUpdate(
    id,
    { password: hashedPassword, refreshToken: null },
    { new: true, runValidators: true }
  );

// *** Fifth ***    Service Functions

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export {
  findByEmail,
  findById,
  updateLastLogin,
  saveRefreshToken,
  clearRefreshToken,
  changePassword,
};
