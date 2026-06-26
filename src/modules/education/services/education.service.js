// *** First ***    Imports
import AppError from "../../../shared/errors/index.js";
import { paginate } from "../../../shared/utils/pagination.utils.js";
import {
  buildFilter,
  buildSearch,
  buildSort,
} from "../../../shared/utils/queryBuilder.utils.js";
import {
  EDUCATION_ERRORS,
  EDUCATION_FILTER_FIELDS,
  EDUCATION_SEARCH_FIELDS,
} from "../constants/education.constants.js";
import * as educationRepository from "../repositories/education.repository.js";

// *** Second ***   Constants

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions
const createEducation = (data) =>
  educationRepository.create({
    ...data,
    endDate: data.isCurrent ? null : data.endDate,
  });

const getEducationList = async (queryParams) => {
  const filter = {
    ...buildFilter(queryParams, EDUCATION_FILTER_FIELDS),
    ...buildSearch(queryParams.search, EDUCATION_SEARCH_FIELDS),
  };
  const sort = queryParams.sort
    ? buildSort(queryParams.sort)
    : { startDate: -1 };
  const result = await paginate(
    educationRepository.findAll(filter, sort),
    queryParams.page,
    queryParams.limit
  );
  return { items: result.data, pagination: result.pagination };
};

const getEducationById = async (id) => {
  const education = await educationRepository.findById(id);
  if (!education) throw new AppError(404, EDUCATION_ERRORS.NOT_FOUND);
  return education;
};

const updateEducation = async (id, data) => {
  const education = await educationRepository.updateById(id, {
    ...data,
    ...(data.isCurrent ? { endDate: null } : {}),
  });
  if (!education) throw new AppError(404, EDUCATION_ERRORS.NOT_FOUND);
  return education;
};

const deleteEducation = async (id) => {
  const education = await educationRepository.deleteById(id);
  if (!education) throw new AppError(404, EDUCATION_ERRORS.NOT_FOUND);
  return education;
};

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export {
  createEducation,
  getEducationList,
  getEducationById,
  updateEducation,
  deleteEducation,
};
