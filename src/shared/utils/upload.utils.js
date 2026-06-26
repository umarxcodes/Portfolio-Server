// *** First ***    Imports
import crypto from "node:crypto";
import path from "node:path";

// *** Second ***   Constants
const MIME_TYPES_BY_FOLDER = {
  profile: ["image/jpeg", "image/png", "image/webp"],
  projects: ["image/jpeg", "image/png", "image/webp"],
  blogs: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  certificates: ["image/jpeg", "image/png", "image/webp"],
  resume: ["application/pdf"],
  general: [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "application/pdf",
  ],
};

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions
const getFileExtension = (originalName) =>
  path.extname(String(originalName || "")).toLowerCase();

const generateFileName = (originalName) =>
  `${crypto.randomUUID()}${getFileExtension(originalName)}`;

const getFileSizeInMB = (bytes) =>
  Math.round((Number(bytes || 0) / (1024 * 1024)) * 100) / 100;

const isAllowedMimeType = (mimeType, folder) => {
  const allowedTypes = MIME_TYPES_BY_FOLDER[folder] || [];
  return allowedTypes.includes(mimeType);
};

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export {
  MIME_TYPES_BY_FOLDER,
  getFileExtension,
  generateFileName,
  getFileSizeInMB,
  isAllowedMimeType,
};
