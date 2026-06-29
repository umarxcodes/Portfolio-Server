import asyncHandler from "../../../shared/utils/asyncHandler.utils.js";
import { sendSuccess } from "../../../shared/utils/response.utils.js";
import { SKILL_MESSAGES } from "../constants/skills.constants.js";
import * as skillsService from "../services/skills.service.js";

const createSkill = asyncHandler(async (req, res) => {
  const skill = await skillsService.createSkill(req.body);
  sendSuccess(res, 201, SKILL_MESSAGES.SKILL_CREATED, { skill });
});

const getSkills = asyncHandler(async (req, res) => {
  const result = await skillsService.getSkills(req.query);
  sendSuccess(res, 200, SKILL_MESSAGES.SKILLS_LISTED, {
    items: result.items,
    groupedByCategory: result.groupedByCategory,
    pagination: result.pagination,
  });
});

const getSkillsByCategory = asyncHandler(async (req, res) => {
  const result = await skillsService.getSkillsByCategory(
    req.params.category,
    req.query
  );
  sendSuccess(res, 200, SKILL_MESSAGES.SKILLS_LISTED, {
    items: result.items,
    pagination: result.pagination,
  });
});

const getSkillById = asyncHandler(async (req, res) => {
  const skill = await skillsService.getSkillById(req.params.id);
  sendSuccess(res, 200, SKILL_MESSAGES.SKILL_FETCHED, { skill });
});

const updateSkill = asyncHandler(async (req, res) => {
  const skill = await skillsService.updateSkill(req.params.id, req.body);
  sendSuccess(res, 200, SKILL_MESSAGES.SKILL_UPDATED, { skill });
});

const deleteSkill = asyncHandler(async (req, res) => {
  const skill = await skillsService.deleteSkill(req.params.id);
  sendSuccess(res, 200, SKILL_MESSAGES.SKILL_DELETED, { skill });
});

export {
  createSkill,
  getSkills,
  getSkillsByCategory,
  getSkillById,
  updateSkill,
  deleteSkill,
};
