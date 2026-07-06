import Project from "../models/projects.model.js";

const createProject = async (data) => await Project.create(data);

const listProjects = (filter, sort) => Project.find(filter).sort(sort).lean();

const findBySlug = async (slug) =>
  await Project.findOne({ slug, isDeleted: false }).lean();

const findById = async (id) =>
  await Project.findOne({ _id: id, isDeleted: false }).lean();

const findFeatured = () => Project.find({ featured: true, isDeleted: false });

const findByCategory = (category) =>
  Project.find({ category, isDeleted: false });

const updateProject = async (id, data) =>
  await Project.findOneAndUpdate({ _id: id, isDeleted: false }, data, {
    returnDocument: "after",
    runValidators: true,
  }).lean();

const softDeleteProject = async (id) =>
  await Project.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true },
    { returnDocument: "after" }
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
