import asyncHandler from "../../../shared/utils/asyncHandler.utils.js";
import { sendSuccess } from "../../../shared/utils/response.utils.js";
import { getClientMetadata } from "../../../shared/utils/request.utils.js";
import { PROJECT_MESSAGES } from "../constants/projects.constants.js";
import * as projectsService from "../services/projects.service.js";

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
  const result = await projectsService.getFeaturedProjects(req.query);
  sendSuccess(res, 200, PROJECT_MESSAGES.PROJECT_LISTED, {
    items: result.items,
    pagination: result.pagination,
  });
});

const getProjectsByCategory = asyncHandler(async (req, res) => {
  const result = await projectsService.getProjectsByCategory(
    req.params.category,
    req.query
  );
  sendSuccess(res, 200, PROJECT_MESSAGES.PROJECT_LISTED, {
    items: result.items,
    pagination: result.pagination,
  });
});

const getProjectBySlug = asyncHandler(async (req, res) => {
  const project = await projectsService.getProjectBySlug(
    req.params.slug,
    getClientMetadata(req)
  );
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
