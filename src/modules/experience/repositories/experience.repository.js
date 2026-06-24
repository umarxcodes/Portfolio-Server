// *** First ***    Imports
import Experience from "../models/experience.model.js";

// *** Second ***   Constants

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions
const createExperience = async (data) => Experience.create(data);

const listExperience = (filter, sort) =>
  Experience.find(filter).sort(sort).lean();

const findById = async (id) => Experience.findById(id).lean();

const updateExperience = async (id, data) =>
  Experience.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
    context: "query",
  }).lean();

const deleteExperience = async (id) => Experience.findByIdAndDelete(id).lean();

// *** Fifth ***    Service Functions

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export {
  createExperience,
  listExperience,
  findById,
  updateExperience,
  deleteExperience,
};
