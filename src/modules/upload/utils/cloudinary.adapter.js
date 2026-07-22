import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function buildPublicId(folder, fileName) {
  const safeFolder = folder.replace(/[^a-zA-Z0-9_-]/g, "_");
  const base = fileName.replace(/\.[^/.]+$/, "");
  return `${safeFolder}/${base}`;
}

async function uploadBuffer({ buffer, mimeType, folder, fileName }) {
  const publicId = buildPublicId(folder, fileName);
  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          public_id: publicId,
          resource_type: mimeType === "application/pdf" ? "raw" : "image",
          folder: `portfolio/${folder}`,
          overwrite: false,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      )
      .end(buffer);
  });

  return {
    publicId: result.public_id,
    url: result.secure_url,
  };
}

async function deleteFileByPublicId(publicId) {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch {
    // ignore cleanup failures
  }
}

export { uploadBuffer, deleteFileByPublicId };
