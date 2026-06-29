import mongoose from "mongoose";
import { UPLOAD_FOLDERS } from "../constants/upload.constants.js";

const uploadSchema = new mongoose.Schema(
  {
    fileName: { type: String, required: true },
    originalName: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    url: { type: String, required: true },
    folder: { type: String, required: true, enum: UPLOAD_FOLDERS },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

uploadSchema.index({ folder: 1, createdAt: -1 });
uploadSchema.index({ uploadedBy: 1, createdAt: -1 });

const Upload = mongoose.model("Upload", uploadSchema);

export default Upload;
