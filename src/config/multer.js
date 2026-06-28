// *** First ***    Imports
import multer from "multer";
import AppError from "../shared/errors/index.js";
import {
  MIME_TYPES_BY_FOLDER,
  FILE_SIZE_LIMITS,
  getAllowedMimeTypes,
  getFileSizeLimit,
} from "./upload.js";

// *** Second ***   Constants
const storage = multer.memoryStorage();
const allAllowedMimeTypes = [
  ...new Set(Object.values(MIME_TYPES_BY_FOLDER).flat()),
];
const maxFileSizeLimit = Math.max(...Object.values(FILE_SIZE_LIMITS));

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions
const createUploadMiddleware = (folder) =>
  multer({
    storage,
    limits: { fileSize: getFileSizeLimit(folder) },
    fileFilter: (req, file, callback) => {
      if (!getAllowedMimeTypes(folder).includes(file.mimetype)) {
        return callback(
          new AppError(400, "File type is not allowed for this folder")
        );
      }

      return callback(null, true);
    },
  });

const createAnyUploadMiddleware = () =>
  multer({
    storage,
    limits: { fileSize: maxFileSizeLimit },
    fileFilter: (req, file, callback) => {
      if (!allAllowedMimeTypes.includes(file.mimetype)) {
        return callback(new AppError(400, "File type is not allowed"));
      }

      return callback(null, true);
    },
  });

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export { createUploadMiddleware, createAnyUploadMiddleware };
