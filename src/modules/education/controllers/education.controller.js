import asyncHandler from "../../../shared/utils/asyncHandler.utils.js";
import { sendSuccess } from "../../../shared/utils/response.utils.js";
import { EDUCATION_MESSAGES } from "../constants/education.constants.js";
import * as educationService from "../services/education.service.js";

const createEducation = asyncHandler(async (req, res) => {
  const education = await educationService.createEducation(req.body);
  sendSuccess(res, 201, EDUCATION_MESSAGES.CREATED, { education });
});

const getEducationList = asyncHandler(async (req, res) => {
  const result = await educationService.getEducationList(req.query);
  sendSuccess(res, 200, EDUCATION_MESSAGES.LISTED, result);
});

const getCurrentEducation = asyncHandler(async (req, res) => {
  const items = await educationService.getCurrentEducation();
  sendSuccess(res, 200, EDUCATION_MESSAGES.LISTED, { items });
});

const getEducationById = asyncHandler(async (req, res) => {
  const education = await educationService.getEducationById(req.params.id);
  sendSuccess(res, 200, EDUCATION_MESSAGES.FETCHED, { education });
});

const updateEducation = asyncHandler(async (req, res) => {
  const education = await educationService.updateEducation(
    req.params.id,
    req.body
  );
  sendSuccess(res, 200, EDUCATION_MESSAGES.UPDATED, { education });
});

const deleteEducation = asyncHandler(async (req, res) => {
  const education = await educationService.deleteEducation(req.params.id);
  sendSuccess(res, 200, EDUCATION_MESSAGES.DELETED, { education });
});

export {
  createEducation,
  getEducationList,
  getCurrentEducation,
  getEducationById,
  updateEducation,
  deleteEducation,
};
