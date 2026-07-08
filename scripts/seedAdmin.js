import connectDB, { disconnectDB } from "../src/database/connection.js";
import Admin from "../src/modules/auth/models/admin.model.js";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

const isProduction = process.env.NODE_ENV === "production";
const adminName = process.env.ADMIN_NAME || "Muhammad Umar";
const adminEmail =
  process.env.ADMIN_EMAIL ||
  (isProduction ? "" : "muhammadumar.codes@gmail.com");
const adminPassword =
  process.env.ADMIN_PASSWORD || (isProduction ? "" : "Umarkhan!Tiger4148");

const validateSeedInput = () => {
  if (!adminEmail || !adminPassword) {
    throw new Error(
      "ADMIN_EMAIL and ADMIN_PASSWORD are required when seeding an admin"
    );
  }

  if (adminPassword.length < 8) {
    throw new Error("ADMIN_PASSWORD must be at least 8 characters");
  }
};

const seedAdmin = async () => {
  validateSeedInput();
  await connectDB();

  const existingAdmin = await Admin.findOne({}).lean();

  if (existingAdmin) {
    const adminDoc = await Admin.findById(existingAdmin._id);
    adminDoc.password = adminPassword;
    adminDoc.email = adminEmail;
    adminDoc.name = adminName;
    await adminDoc.save();
    console.info(`Admin updated for ${adminEmail}`);
    return;
  }

  await Admin.create({
    name: adminName,
    email: adminEmail,
    password: adminPassword,
    role: "admin",
    isActive: true,
  });

  console.info(`Admin seeded for ${adminEmail}`);
};

seedAdmin()
  .catch((error) => {
    console.error("Admin seed failed:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await disconnectDB();
  });
