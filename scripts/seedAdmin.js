// *** First ***    Imports
import dotenv from "dotenv";
import connectDB, { disconnectDB } from "../src/database/connection.js";
import Admin from "../src/modules/auth/models/admin.model.js";

// *** Second ***   Constants
dotenv.config({ quiet: true });

const isProduction = process.env.NODE_ENV === "production";
const adminName = process.env.ADMIN_NAME || "Portfolio Admin";
const adminEmail =
  process.env.ADMIN_EMAIL || (isProduction ? "" : "admin@example.com");
const adminPassword =
  process.env.ADMIN_PASSWORD || (isProduction ? "" : "ChangeMe123!");

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions
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
    console.info("Admin already exists. Seed skipped.");
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

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
seedAdmin()
  .catch((error) => {
    console.error("Admin seed failed:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await disconnectDB();
  });
