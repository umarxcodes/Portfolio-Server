// *** First ***    Imports
import AppError from "../../../shared/errors/index.js";
import {
  buildFilter,
  buildSort,
} from "../../../shared/utils/queryBuilder.utils.js";
import * as skillsRepository from "../repositories/skills.repository.js";
import {
  SKILL_ERRORS,
  SKILL_FILTER_FIELDS,
  SKILL_MESSAGES,
} from "../constants/skills.constants.js";

// *** Second ***   Constants

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions
const createSkill = async (data) => skillsRepository.createSkill(data);

const getSkills = async (queryParams) => {
  const filter = buildFilter(queryParams, SKILL_FILTER_FIELDS);
  const sort = queryParams.sort
    ? buildSort(queryParams.sort)
    : { category: 1, displayOrder: 1, name: 1 };
  const skills = await skillsRepository.listSkills(filter, sort);

  const groupedByCategory = skills.reduce((acc, skill) => {
    const bucket = acc[skill.category] || [];
    bucket.push(skill);
    acc[skill.category] = bucket;
    return acc;
  }, {});

  return { items: skills, groupedByCategory };
};

const getSkillsByCategory = async (category) =>
  skillsRepository.findByCategory(category);

const getSkillById = async (id) => {
  const skill = await skillsRepository.findById(id);

  if (!skill) {
    throw new AppError(404, SKILL_ERRORS.NOT_FOUND);
  }

  return skill;
};

const updateSkill = async (id, data) => {
  const skill = await skillsRepository.updateSkill(id, data);

  if (!skill) {
    throw new AppError(404, SKILL_ERRORS.NOT_FOUND);
  }

  return skill;
};

const deleteSkill = async (id) => {
  const skill = await skillsRepository.deleteSkill(id);

  if (!skill) {
    throw new AppError(404, SKILL_ERRORS.NOT_FOUND);
  }

  return skill;
};

// *** Sixth ***    Controller Functions

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
