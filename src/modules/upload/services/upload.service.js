// *** First ***    Imports
import AppError from "../../../shared/errors/index.js";
import { isAllowedMimeType } from "../../../shared/utils/upload.utils.js";
import { UPLOAD_ERRORS } from "../constants/upload.constants.js";
import * as uploadRepository from "../repositories/upload.repository.js";
import { saveFile, deleteFile } from "../utils/storage.adapter.js";

// *** Second ***   Constants

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions
const uploadFile = async (file, folder, uploadedBy) => {
  if (!file) throw new AppError(400, UPLOAD_ERRORS.FILE_REQUIRED);
  if (!isAllowedMimeType(file.mimetype, folder)) {
    throw new AppError(400, UPLOAD_ERRORS.MIME_NOT_ALLOWED);
  }
  const stored = await saveFile(file, folder);
  return uploadRepository.create({
    ...stored,
    originalName: file.originalname,
    folder,
    uploadedBy,
  });
};

const getUploadById = async (id) => {
  const upload = await uploadRepository.findById(id);
  if (!upload) throw new AppError(404, UPLOAD_ERRORS.NOT_FOUND);
  return upload;
};

const deleteUpload = async (id) => {
  const upload = await uploadRepository.deleteById(id);
  if (!upload) throw new AppError(404, UPLOAD_ERRORS.NOT_FOUND);
  await deleteFile(upload.fileName, upload.folder);
  return upload;
};

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export { uploadFile, getUploadById, deleteUpload };
