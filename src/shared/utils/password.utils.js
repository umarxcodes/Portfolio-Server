import bcrypt from "bcryptjs";
import { BCRYPT_SALT_ROUNDS } from "../../modules/auth/constants/auth.constants.js";

const hashPassword = async (plainText) =>
  bcrypt.hash(plainText, BCRYPT_SALT_ROUNDS);

const comparePassword = async (plainText, hashedPassword) =>
  bcrypt.compare(plainText, hashedPassword);

export { hashPassword, comparePassword };
