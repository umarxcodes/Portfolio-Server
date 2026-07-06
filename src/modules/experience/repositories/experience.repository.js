import Experience from "../models/experience.model.js";

const createExperience = async (data) => await Experience.create(data);

const listExperience = (filter, sort) =>
  Experience.find(filter).sort(sort).lean();

const findById = async (id) => await Experience.findById(id).lean();

const updateExperience = async (id, data) =>
  await Experience.findByIdAndUpdate(id, data, {
    returnDocument: "after",
    runValidators: true,
  }).lean();

const deleteExperience = async (id) =>
  await Experience.findByIdAndDelete(id).lean();

export {
  createExperience,
  listExperience,
  findById,
  updateExperience,
  deleteExperience,
};
