import express from "express";
import { authRoutes } from "../modules/auth/index.js";
import { profileRoutes } from "../modules/profile/index.js";
import { projectsRoutes } from "../modules/projects/index.js";
import { skillsRoutes } from "../modules/skills/index.js";
import { experienceRoutes } from "../modules/experience/index.js";
import { educationRoutes } from "../modules/education/index.js";
import { certificatesRoutes } from "../modules/certificates/index.js";
import { blogRoutes } from "../modules/blog/index.js";
import { contactRoutes } from "../modules/contact/index.js";
import { uploadRoutes } from "../modules/upload/index.js";
import { analyticsRoutes } from "../modules/analytics/index.js";
import { settingsRoutes } from "../modules/settings/index.js";
import { searchRoutes } from "../modules/search/index.js";

const router = express.Router();

router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/profile", profileRoutes);
router.use("/api/v1/projects", projectsRoutes);
router.use("/api/v1/skills", skillsRoutes);
router.use("/api/v1/experience", experienceRoutes);
router.use("/api/v1/education", educationRoutes);
router.use("/api/v1/certificates", certificatesRoutes);
router.use("/api/v1/blogs", blogRoutes);
router.use("/api/v1/contact", contactRoutes);
router.use("/api/v1/uploads", uploadRoutes);
router.use("/api/v1/analytics", analyticsRoutes);
router.use("/api/v1/settings", settingsRoutes);
router.use("/api/v1/search", searchRoutes);

export default router;
