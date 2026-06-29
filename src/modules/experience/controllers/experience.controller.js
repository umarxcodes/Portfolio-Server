import asyncHandler from "../../../shared/utils/asyncHandler.utils.js";
import { sendSuccess } from "../../../shared/utils/response.utils.js";
import { EXPERIENCE_MESSAGES } from "../constants/experience.constants.js";
import * as experienceService from "../services/experience.service.js";

const addExperience = asyncHandler(async (req, res) => {
  const experience = await experienceService.addExperience(req.body);
  sendSuccess(res, 201, EXPERIENCE_MESSAGES.EXPERIENCE_CREATED, { experience });
});

const getExperiences = asyncHandler(async (req, res) => {
  const result = await experienceService.getExperiences(req.query);
  sendSuccess(res, 200, EXPERIENCE_MESSAGES.EXPERIENCE_LISTED, {
    items: result.items,
    pagination: result.pagination,
  });
});

const getExperienceById = asyncHandler(async (req, res) => {
  const experience = await experienceService.getExperienceById(req.params.id);
  sendSuccess(res, 200, EXPERIENCE_MESSAGES.EXPERIENCE_FETCHED, { experience });
});

const updateExperience = asyncHandler(async (req, res) => {
  const experience = await experienceService.updateExperience(
    req.params.id,
    req.body
  );
  sendSuccess(res, 200, EXPERIENCE_MESSAGES.EXPERIENCE_UPDATED, { experience });
});

const deleteExperience = asyncHandler(async (req, res) => {
  const experience = await experienceService.deleteExperience(req.params.id);
  sendSuccess(res, 200, EXPERIENCE_MESSAGES.EXPERIENCE_DELETED, { experience });
});

export {
  addExperience,
  getExperiences,
  getExperienceById,
  updateExperience,
  deleteExperience,
};
