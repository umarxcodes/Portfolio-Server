import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { BCRYPT_SALT_ROUNDS } from "../constants/auth.constants.js";

const adminSchema = new mongoose.Schema(
  {
    singletonKey: {
      type: String,
      default: "primary-admin",
      unique: true,
      select: false,
    },
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
    refreshTokens: [
      {
        token: { type: String, required: true, select: false },
        createdAt: { type: Date, default: Date.now, expires: "7d" },
      },
    ],
  },
  { timestamps: true }
);

adminSchema.pre("save", async function saveAdminPassword() {
  if (!this.isModified("password")) {
    return;
  }

  this.password = await bcrypt.hash(this.password, BCRYPT_SALT_ROUNDS);
});

adminSchema.methods.comparePassword = async function comparePassword(
  candidatePassword
) {
  return bcrypt.compare(candidatePassword, this.password);
};

adminSchema.methods.generateSanitized = function generateSanitized() {
  const adminObject = this.toObject({ getters: true });
  delete adminObject.singletonKey;
  delete adminObject.password;
  delete adminObject.__v;
  const sanitized = adminObject;
  return sanitized;
};

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
