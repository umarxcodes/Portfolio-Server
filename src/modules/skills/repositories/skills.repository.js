import Skill from "../models/skills.model.js";

const createSkill = async (data) => Skill.create(data);

const listSkills = (filter, sort) => Skill.find(filter).sort(sort).lean();

const findByCategory = (category) => Skill.find({ category });

const findById = async (id) => Skill.findById(id).lean();

const updateSkill = async (id, data) =>
  Skill.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).lean();

const deleteSkill = async (id) => Skill.findByIdAndDelete(id).lean();

export {
  createSkill,
  listSkills,
  findByCategory,
  findById,
  updateSkill,
  deleteSkill,
};
