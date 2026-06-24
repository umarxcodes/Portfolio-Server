// *** First ***    Imports
import express from "express";
import { authRoutes } from "../modules/auth/index.js";
import { profileRoutes } from "../modules/profile/index.js";
import { projectsRoutes } from "../modules/projects/index.js";
import { skillsRoutes } from "../modules/skills/index.js";
import { experienceRoutes } from "../modules/experience/index.js";

// *** Second ***   Constants
const router = express.Router();

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes
router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/profile", profileRoutes);
router.use("/api/v1/projects", projectsRoutes);
router.use("/api/v1/skills", skillsRoutes);
router.use("/api/v1/experience", experienceRoutes);

// *** Eighth ***   Exports
export default router;
