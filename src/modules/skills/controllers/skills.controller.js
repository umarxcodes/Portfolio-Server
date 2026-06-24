// *** First ***    Imports
import asyncHandler from "../../../shared/utils/asyncHandler.utils.js";
import { sendSuccess } from "../../../shared/utils/response.utils.js";
import { SKILL_MESSAGES } from "../constants/skills.constants.js";
import * as skillsService from "../services/skills.service.js";

// *** Second ***   Constants

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions

// *** Sixth ***    Controller Functions
const createSkill = asyncHandler(async (req, res) => {
  const skill = await skillsService.createSkill(req.body);
  sendSuccess(res, 201, SKILL_MESSAGES.SKILL_CREATED, { skill });
});

const getSkills = asyncHandler(async (req, res) => {
  const result = await skillsService.getSkills(req.query);
  sendSuccess(res, 200, SKILL_MESSAGES.SKILLS_LISTED, {
    items: result.items,
    groupedByCategory: result.groupedByCategory,
  });
});

const getSkillsByCategory = asyncHandler(async (req, res) => {
  const skills = await skillsService.getSkillsByCategory(req.params.category);
  sendSuccess(res, 200, SKILL_MESSAGES.SKILLS_LISTED, { items: skills });
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

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export {
  createSkill,
  getSkills,
  getSkillsByCategory,
  getSkillById,
  updateSkill,
  deleteSkill,
};
