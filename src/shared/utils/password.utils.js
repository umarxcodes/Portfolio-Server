// *** First ***    Imports
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { BCRYPT_SALT_ROUNDS } from "../../modules/auth/constants/auth.constants.js";

// *** Second ***   Constants

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions
const hashPassword = async (plainText) =>
  bcrypt.hash(plainText, BCRYPT_SALT_ROUNDS);

const comparePassword = async (plainText, hashedPassword) =>
  bcrypt.compare(plainText, hashedPassword);

const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export { hashPassword, comparePassword, hashToken };
