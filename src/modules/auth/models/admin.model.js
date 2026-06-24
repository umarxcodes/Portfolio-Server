// *** First ***    Imports
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { BCRYPT_SALT_ROUNDS } from "../constants/auth.constants.js";

// *** Second ***   Constants

// *** Third ***    Schema / Model
const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ["admin"], default: "admin" },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date, default: null },
    refreshToken: { type: String, select: false, default: null },
  },
  { timestamps: true }
);

adminSchema.pre("save", async function saveAdminPassword(next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, BCRYPT_SALT_ROUNDS);
  next();
});

adminSchema.methods.comparePassword = async function comparePassword(
  candidatePassword
) {
  return bcrypt.compare(candidatePassword, this.password);
};

adminSchema.methods.generateSanitized = function generateSanitized() {
  const adminObject = this.toObject({ getters: true });
  const { password, refreshToken, __v, ...sanitized } = adminObject;
  return sanitized;
};

const Admin = mongoose.model("Admin", adminSchema);

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export default Admin;
