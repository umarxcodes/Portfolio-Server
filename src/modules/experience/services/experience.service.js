import AppError from "../../../shared/errors/index.js";
import {
  buildFilter,
  buildSort,
} from "../../../shared/utils/queryBuilder.utils.js";
import { paginate } from "../../../shared/utils/pagination.utils.js";
import * as experienceRepository from "../repositories/experience.repository.js";
import {
  EXPERIENCE_ERRORS,
  EXPERIENCE_FILTER_FIELDS,
  EXPERIENCE_SORT_FIELDS,
} from "../constants/experience.constants.js";

const addExperience = async (data) =>
  experienceRepository.createExperience(data);

const getExperiences = async (queryParams) => {
  const filter = buildFilter(queryParams, EXPERIENCE_FILTER_FIELDS);

  if (queryParams.technologies) {
    filter.technologies = { $in: [queryParams.technologies] };
  }

  const sort = queryParams.sort
    ? buildSort(queryParams.sort, EXPERIENCE_SORT_FIELDS)
    : { startDate: -1 };
  const result = await paginate(
    experienceRepository.listExperience(filter, sort),
    queryParams.page,
    queryParams.limit
  );
  return { items: result.data, pagination: result.pagination };
};

const getExperienceById = async (id) => {
  const experience = await experienceRepository.findById(id);

  if (!experience) {
    throw new AppError(404, EXPERIENCE_ERRORS.NOT_FOUND);
  }

  return experience;
};

const updateExperience = async (id, data) => {
  const experience = await experienceRepository.updateExperience(id, data);

  if (!experience) {
    throw new AppError(404, EXPERIENCE_ERRORS.NOT_FOUND);
  }

  return experience;
};

const deleteExperience = async (id) => {
  const experience = await experienceRepository.deleteExperience(id);

  if (!experience) {
    throw new AppError(404, EXPERIENCE_ERRORS.NOT_FOUND);
  }

  return experience;
};

export {
  addExperience,
  getExperiences,
  getExperienceById,
  updateExperience,
  deleteExperience,
};
