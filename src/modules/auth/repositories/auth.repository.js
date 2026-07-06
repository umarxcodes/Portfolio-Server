import Admin from "../models/admin.model.js";

const findByEmail = async (email) =>
  await Admin.findOne({ email }).select("+password");

const findById = async (id, options = {}) => {
  const query = Admin.findById(id);

  if (options.withSecrets) {
    query.select("+password");
  }

  return await query;
};

const updateLastLogin = async (id) =>
  await Admin.findByIdAndUpdate(
    id,
    { lastLogin: Date.now() },
    { returnDocument: "after" }
  );

const changePassword = async (id, hashedPassword) =>
  await Admin.findByIdAndUpdate(
    id,
    { password: hashedPassword },
    { returnDocument: "after", runValidators: true }
  );

export { findByEmail, findById, updateLastLogin, changePassword };
