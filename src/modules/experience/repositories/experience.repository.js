import Experience from "../models/experience.model.js";

const createExperience = async (data) => Experience.create(data);

const listExperience = (filter, sort) =>
  Experience.find(filter).sort(sort).lean();

const findById = async (id) => Experience.findById(id).lean();

const updateExperience = async (id, data) =>
  Experience.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).lean();

const deleteExperience = async (id) => Experience.findByIdAndDelete(id).lean();

export {
  createExperience,
  listExperience,
  findById,
  updateExperience,
  deleteExperience,
};
