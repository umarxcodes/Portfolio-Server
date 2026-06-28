// *** First ***    Imports
import fs from "node:fs/promises";
import path from "node:path";
import { UPLOAD_ROOT } from "../../../config/upload.js";
import { generateFileName } from "../../../shared/utils/upload.utils.js";

// *** Second ***   Constants

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions
const saveFile = async (file, folder) => {
  const fileName = generateFileName(file.originalname);
  const folderPath = path.join(UPLOAD_ROOT, folder);
  await fs.mkdir(folderPath, { recursive: true });
  await fs.writeFile(path.join(folderPath, fileName), file.buffer);
  return {
    fileName,
    url: `/uploads/${folder}/${fileName}`,
    size: file.size,
    mimeType: file.mimetype,
  };
};

const deleteFile = async (fileName, folder) => {
  const filePath = path.join(UPLOAD_ROOT, folder, fileName);
  await fs.unlink(filePath).catch((error) => {
    if (error.code !== "ENOENT") throw error;
  });
};

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export { saveFile, deleteFile };
