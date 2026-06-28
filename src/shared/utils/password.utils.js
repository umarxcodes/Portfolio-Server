// *** First ***    Imports
import bcrypt from "bcryptjs";
import { BCRYPT_SALT_ROUNDS } from "../../modules/auth/constants/auth.constants.js";

// *** Second ***   Constants

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions
const hashPassword = async (plainText) =>
  bcrypt.hash(plainText, BCRYPT_SALT_ROUNDS);

const comparePassword = async (plainText, hashedPassword) =>
  bcrypt.compare(plainText, hashedPassword);

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export { hashPassword, comparePassword };
