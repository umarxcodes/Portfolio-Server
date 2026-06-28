// *** First ***    Imports
import path from "node:path";
import env from "./env.js";

// *** Second ***   Constants
const MB = 1024 * 1024;
const UPLOAD_ROOT = path.isAbsolute(env.UPLOAD_ROOT)
  ? env.UPLOAD_ROOT
  : path.join(process.cwd(), env.UPLOAD_ROOT);
const UPLOAD_FOLDERS = [
  "profile",
  "projects",
  "blogs",
  "certificates",
  "resume",
];
const MIME_TYPES_BY_FOLDER = {
  profile: ["image/jpeg", "image/png", "image/webp"],
  projects: ["image/jpeg", "image/png", "image/webp"],
  blogs: ["image/jpeg", "image/png", "image/webp"],
  certificates: ["image/jpeg", "image/png", "image/webp"],
  resume: ["application/pdf"],
};
const FILE_SIZE_LIMITS = {
  profile: env.IMAGE_UPLOAD_MAX_MB * MB,
  projects: env.IMAGE_UPLOAD_MAX_MB * MB,
  blogs: env.IMAGE_UPLOAD_MAX_MB * MB,
  certificates: env.IMAGE_UPLOAD_MAX_MB * MB,
  resume: env.PDF_UPLOAD_MAX_MB * MB,
};

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions
const getAllowedMimeTypes = (folder) => MIME_TYPES_BY_FOLDER[folder] || [];
const getFileSizeLimit = (folder) =>
  FILE_SIZE_LIMITS[folder] || FILE_SIZE_LIMITS.profile;
const isUploadFolder = (folder) => UPLOAD_FOLDERS.includes(folder);

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export {
  UPLOAD_ROOT,
  UPLOAD_FOLDERS,
  MIME_TYPES_BY_FOLDER,
  FILE_SIZE_LIMITS,
  getAllowedMimeTypes,
  getFileSizeLimit,
  isUploadFolder,
};
