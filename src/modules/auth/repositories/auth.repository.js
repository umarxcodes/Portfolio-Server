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
    { password: hashedPassword },
    { new: true, runValidators: true }
  );

export { findByEmail, findById, updateLastLogin, changePassword };
