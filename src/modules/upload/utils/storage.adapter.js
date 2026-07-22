import fs from "node:fs/promises";
import path from "node:path";
import { del, put } from "@vercel/blob";
import { UPLOAD_ROOT, UPLOAD_STORAGE_DRIVER } from "../../../config/upload.js";
import { generateFileName } from "../../../shared/utils/upload.utils.js";
import { uploadBuffer, deleteFileByPublicId } from "./cloudinary.adapter.js";

const saveLocalFile = async (file, folder, fileName) => {
  const folderPath = path.join(UPLOAD_ROOT, folder);
  await fs.mkdir(folderPath, { recursive: true });
  await fs.writeFile(path.join(folderPath, fileName), file.buffer);
  return `/uploads/${folder}/${fileName}`;
};

const saveBlobFile = async (file, folder, fileName) => {
  const blob = await put(`${folder}/${fileName}`, file.buffer, {
    access: "public",
    contentType: file.mimetype,
  });

  return blob.url;
};

const saveCloudinaryFile = async (file, folder, fileName) => {
  const result = await uploadBuffer({
    buffer: file.buffer,
    mimeType: file.mimetype,
    folder,
    fileName,
  });

  return result.url;
};

const saveFile = async (file, folder) => {
  const fileName = generateFileName(file.originalname);

  if (UPLOAD_STORAGE_DRIVER === "vercel-blob") {
    const url = await saveBlobFile(file, folder, fileName);
    return { fileName, url, size: file.size, mimeType: file.mimetype };
  }

  if (UPLOAD_STORAGE_DRIVER === "cloudinary") {
    const url = await saveCloudinaryFile(file, folder, fileName);
    return { fileName, url, size: file.size, mimeType: file.mimetype };
  }

  const url = await saveLocalFile(file, folder, fileName);
  return { fileName, url, size: file.size, mimeType: file.mimetype };
};

const deleteLocalFile = async (fileName, folder) => {
  const filePath = path.join(UPLOAD_ROOT, folder, fileName);
  await fs.unlink(filePath).catch((error) => {
    if (error.code !== "ENOENT") throw error;
  });
};

const deleteBlobFile = async (url) => {
  if (url) {
    await del(url);
  }
};

const deleteCloudinaryFile = async (url) => {
  if (!url) return;
  const match = url.match(/\/portfolio\/([^/]+)\/([^.]*)/);
  if (!match) return;
  const publicId = `portfolio/${match[1]}/${match[2]}`;
  await deleteFileByPublicId(publicId);
};

const deleteFile = async ({ fileName, folder, url }) => {
  if (UPLOAD_STORAGE_DRIVER === "vercel-blob") {
    await deleteBlobFile(url);
    return;
  }

  if (UPLOAD_STORAGE_DRIVER === "cloudinary") {
    await deleteCloudinaryFile(url);
    return;
  }

  await deleteLocalFile(fileName, folder);
};

export { saveFile, deleteFile };
