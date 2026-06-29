import asyncHandler from "../../../shared/utils/asyncHandler.utils.js";
import { sendSuccess } from "../../../shared/utils/response.utils.js";
import { UPLOAD_MESSAGES } from "../constants/upload.constants.js";
import * as uploadService from "../services/upload.service.js";

const uploadFile = asyncHandler(async (req, res) => {
  const upload = await uploadService.uploadFile(
    req.file,
    req.body.folder,
    req.user?.sub
  );
  sendSuccess(res, 201, UPLOAD_MESSAGES.CREATED, { upload });
});

const getUploadById = asyncHandler(async (req, res) => {
  const upload = await uploadService.getUploadById(req.params.id);
  sendSuccess(res, 200, UPLOAD_MESSAGES.FETCHED, { upload });
});

const deleteUpload = asyncHandler(async (req, res) => {
  const upload = await uploadService.deleteUpload(req.params.id);
  sendSuccess(res, 200, UPLOAD_MESSAGES.DELETED, { upload });
});

export { uploadFile, getUploadById, deleteUpload };
