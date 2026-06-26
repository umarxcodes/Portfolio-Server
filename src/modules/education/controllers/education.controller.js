// *** First ***    Imports
import asyncHandler from "../../../shared/utils/asyncHandler.utils.js";
import { sendSuccess } from "../../../shared/utils/response.utils.js";
import { EDUCATION_MESSAGES } from "../constants/education.constants.js";
import * as educationService from "../services/education.service.js";

// *** Second ***   Constants

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions

// *** Sixth ***    Controller Functions
const createEducation = asyncHandler(async (req, res) => {
  const education = await educationService.createEducation(req.body);
  sendSuccess(res, 201, EDUCATION_MESSAGES.CREATED, { education });
});

const getEducationList = asyncHandler(async (req, res) => {
  const result = await educationService.getEducationList(req.query);
  sendSuccess(res, 200, EDUCATION_MESSAGES.LISTED, result);
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

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export {
  createEducation,
  getEducationList,
  getEducationById,
  updateEducation,
  deleteEducation,
};
