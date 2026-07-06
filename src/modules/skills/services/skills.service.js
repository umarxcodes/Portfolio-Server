import AppError from "../../../shared/errors/index.js";
import {
  buildFilter,
  buildSort,
} from "../../../shared/utils/queryBuilder.utils.js";
import { paginate } from "../../../shared/utils/pagination.utils.js";
import * as skillsRepository from "../repositories/skills.repository.js";
import {
  SKILL_ERRORS,
  SKILL_FILTER_FIELDS,
  SKILL_SORT_FIELDS,
} from "../constants/skills.constants.js";

const createSkill = async (data) => await skillsRepository.createSkill(data);

const getSkills = async (queryParams) => {
  const filter = buildFilter(queryParams, SKILL_FILTER_FIELDS);
  const sort = queryParams.sort
    ? buildSort(queryParams.sort, SKILL_SORT_FIELDS)
    : { category: 1, displayOrder: 1, name: 1 };
  const result = await paginate(
    skillsRepository.listSkills(filter, sort),
    queryParams.page,
    queryParams.limit
  );
  const skills = result.data;

  const groupedByCategory = skills.reduce((acc, skill) => {
    const bucket = acc[skill.category] || [];
    bucket.push(skill);
    acc[skill.category] = bucket;
    return acc;
  }, {});

  return {
    items: skills,
    groupedByCategory,
    pagination: result.pagination,
  };
};

const getSkillsByCategory = async (category, queryParams) => {
  const sort = queryParams.sort
    ? buildSort(queryParams.sort, SKILL_SORT_FIELDS)
    : { category: 1, displayOrder: 1, name: 1 };
  const query = skillsRepository.findByCategory(category).sort(sort);
  const result = await paginate(query, queryParams.page, queryParams.limit);
  return { items: result.data, pagination: result.pagination };
};

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

export {
  createSkill,
  getSkills,
  getSkillsByCategory,
  getSkillById,
  updateSkill,
  deleteSkill,
};
