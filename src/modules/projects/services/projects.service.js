// *** First ***    Imports
import AppError from "../../../shared/errors/index.js";
import {
  buildFilter,
  buildSearch,
  buildSort,
} from "../../../shared/utils/queryBuilder.utils.js";
import { paginate } from "../../../shared/utils/pagination.utils.js";
import Project from "../models/projects.model.js";
import * as projectsRepository from "../repositories/projects.repository.js";
import {
  PROJECT_ERRORS,
  PROJECT_FILTER_FIELDS,
  PROJECT_SEARCH_FIELDS,
  PROJECT_SORT_FIELDS,
} from "../constants/projects.constants.js";
import { trackProjectView } from "../../analytics/services/analytics.service.js";
import { generateUniqueSlug } from "../utils/projects.utils.js";

// *** Second ***   Constants

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions
const createProject = async (data) => projectsRepository.createProject(data);

const getProjects = async (queryParams) => {
  const filter = buildFilter(queryParams, PROJECT_FILTER_FIELDS);
  const search = buildSearch(queryParams.search, PROJECT_SEARCH_FIELDS);
  const sort = buildSort(queryParams.sort, PROJECT_SORT_FIELDS);
  const page = queryParams.page;
  const limit = queryParams.limit;
  const query = projectsRepository.listProjects(
    { ...filter, ...search, isDeleted: false },
    sort
  );
  const result = await paginate(query, page, limit);
  return { items: result.data, pagination: result.pagination };
};

const getFeaturedProjects = async () => projectsRepository.findFeatured();

const getProjectsByCategory = async (category) =>
  projectsRepository.findByCategory(category);

const getProjectBySlug = async (slug, metadata) => {
  const project = await projectsRepository.findBySlug(slug);
  if (!project) {
    throw new AppError(404, PROJECT_ERRORS.NOT_FOUND);
  }
  await trackProjectView(project._id, metadata);
  return project;
};

const getProjectById = async (id) => {
  const project = await projectsRepository.findById(id);
  if (!project) {
    throw new AppError(404, PROJECT_ERRORS.NOT_FOUND);
  }
  return project;
};

const updateProject = async (id, data) => {
  const update = { ...data };

  if (data.title) {
    update.slug = await generateUniqueSlug(Project, data.title, 0, id);
  }

  const project = await projectsRepository.updateProject(id, update);
  if (!project) {
    throw new AppError(404, PROJECT_ERRORS.NOT_FOUND);
  }
  return project;
};

const deleteProject = async (id) => {
  const project = await projectsRepository.softDeleteProject(id);
  if (!project) {
    throw new AppError(404, PROJECT_ERRORS.NOT_FOUND);
  }
  return project;
};

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export {
  createProject,
  getProjects,
  getFeaturedProjects,
  getProjectsByCategory,
  getProjectBySlug,
  getProjectById,
  updateProject,
  deleteProject,
};
