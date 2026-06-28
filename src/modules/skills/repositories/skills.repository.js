// *** First ***    Imports
import Skill from "../models/skills.model.js";

// *** Second ***   Constants

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions
const createSkill = async (data) => Skill.create(data);

const listSkills = (filter, sort) => Skill.find(filter).sort(sort).lean();

const findByCategory = async (category) =>
  Skill.find({ category }).sort({ displayOrder: 1, name: 1 }).lean();

const findById = async (id) => Skill.findById(id).lean();

const updateSkill = async (id, data) =>
  Skill.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
    context: "query",
  }).lean();

const deleteSkill = async (id) => Skill.findByIdAndDelete(id).lean();

// *** Fifth ***    Service Functions

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export {
  createSkill,
  listSkills,
  findByCategory,
  findById,
  updateSkill,
  deleteSkill,
};
