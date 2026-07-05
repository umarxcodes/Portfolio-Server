import Project from "../models/projects.model.js";

const createProject = async (data) => Project.create(data);

const listProjects = (filter, sort) => Project.find(filter).sort(sort).lean();

const findBySlug = async (slug) =>
  Project.findOne({ slug, isDeleted: false }).lean();

const findById = async (id) =>
  Project.findOne({ _id: id, isDeleted: false }).lean();

const findFeatured = () => Project.find({ featured: true, isDeleted: false });

const findByCategory = (category) =>
  Project.find({ category, isDeleted: false });

const updateProject = async (id, data) =>
  Project.findOneAndUpdate({ _id: id, isDeleted: false }, data, {
    new: true,
    runValidators: true,
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
