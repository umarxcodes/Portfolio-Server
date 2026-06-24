// *** First ***    Imports
import asyncHandler from "../../../shared/utils/asyncHandler.utils.js";
import { sendSuccess } from "../../../shared/utils/response.utils.js";
import { PROJECT_MESSAGES } from "../constants/projects.constants.js";
import * as projectsService from "../services/projects.service.js";

// *** Second ***   Constants

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions

// *** Sixth ***    Controller Functions
const createProject = asyncHandler(async (req, res) => {
  const project = await projectsService.createProject(req.body);
  sendSuccess(res, 201, PROJECT_MESSAGES.PROJECT_CREATED, { project });
});

const getProjects = asyncHandler(async (req, res) => {
  const result = await projectsService.getProjects(req.query);
  sendSuccess(res, 200, PROJECT_MESSAGES.PROJECT_LISTED, {
    items: result.items,
    pagination: result.pagination,
  });
});

const getFeaturedProjects = asyncHandler(async (req, res) => {
  const projects = await projectsService.getFeaturedProjects();
  sendSuccess(res, 200, PROJECT_MESSAGES.PROJECT_LISTED, { items: projects });
});

const getProjectsByCategory = asyncHandler(async (req, res) => {
  const projects = await projectsService.getProjectsByCategory(
    req.params.category
  );
  sendSuccess(res, 200, PROJECT_MESSAGES.PROJECT_LISTED, { items: projects });
});

const getProjectBySlug = asyncHandler(async (req, res) => {
  const project = await projectsService.getProjectBySlug(req.params.slug);
  sendSuccess(res, 200, PROJECT_MESSAGES.PROJECT_FETCHED, { project });
});

const getProjectById = asyncHandler(async (req, res) => {
  const project = await projectsService.getProjectById(req.params.id);
  sendSuccess(res, 200, PROJECT_MESSAGES.PROJECT_FETCHED, { project });
});

const updateProject = asyncHandler(async (req, res) => {
  const project = await projectsService.updateProject(req.params.id, req.body);
  sendSuccess(res, 200, PROJECT_MESSAGES.PROJECT_UPDATED, { project });
});

const deleteProject = asyncHandler(async (req, res) => {
  const project = await projectsService.deleteProject(req.params.id);
  sendSuccess(res, 200, PROJECT_MESSAGES.PROJECT_DELETED, { project });
});

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
