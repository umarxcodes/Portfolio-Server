import Project from "../models/projects.model.js";

const createProject = async (data) => Project.create(data);

const listProjects = (filter, sort) => Project.find(filter).sort(sort).lean();

const findBySlug = async (slug) =>
  Project.findOne({ slug, isDeleted: false }).lean();

const findById = async (id) =>
  Project.findOne({ _id: id, isDeleted: false }).lean();

const findFeatured = async () =>
  Project.find({ featured: true, isDeleted: false }).lean();

const findByCategory = async (category) =>
  Project.find({ category, isDeleted: false }).lean();

const updateProject = async (id, data) =>
  Project.findOneAndUpdate({ _id: id, isDeleted: false }, data, {
    new: true,
    runValidators: true,
    context: "query",
  }).lean();

const softDeleteProject = async (id) =>
  Project.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true },
    { new: true }
  ).lean();

export {
  createProject,
  listProjects,
  findBySlug,
  findById,
  findFeatured,
  findByCategory,
  updateProject,
  softDeleteProject,
};
