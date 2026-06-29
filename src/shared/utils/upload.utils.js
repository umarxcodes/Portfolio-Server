import crypto from "node:crypto";
import path from "node:path";
import { MIME_TYPES_BY_FOLDER } from "../../config/upload.js";

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

export {
  MIME_TYPES_BY_FOLDER,
  getFileExtension,
  generateFileName,
  getFileSizeInMB,
  isAllowedMimeType,
};
