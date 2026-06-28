// *** First ***    Imports

// *** Second ***   Constants
const UPLOAD_FOLDERS = [
  "profile",
  "projects",
  "blogs",
  "certificates",
  "resume",
];
const UPLOAD_MESSAGES = {
  CREATED: "File uploaded",
  FETCHED: "Upload fetched",
  DELETED: "File deleted",
};
const UPLOAD_ERRORS = {
  NOT_FOUND: "Upload not found",
  FILE_REQUIRED: "File is required",
  FOLDER_INVALID: "Upload folder is invalid",
  MIME_NOT_ALLOWED: "File type is not allowed for this folder",
  FILE_TOO_LARGE: "File exceeds the allowed size for this folder",
};

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export { UPLOAD_FOLDERS, UPLOAD_MESSAGES, UPLOAD_ERRORS };
