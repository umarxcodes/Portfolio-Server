import Skill from "../models/skills.model.js";

const createSkill = async (data) => await Skill.create(data);

const listSkills = (filter, sort) => Skill.find(filter).sort(sort).lean();

const findByCategory = (category) => Skill.find({ category });

const findById = async (id) => await Skill.findById(id).lean();

const updateSkill = async (id, data) =>
  await Skill.findByIdAndUpdate(id, data, {
    returnDocument: "after",
    runValidators: true,
  }).lean();

const deleteSkill = async (id) => await Skill.findByIdAndDelete(id).lean();

export {
  createSkill,
  listSkills,
  findByCategory,
  findById,
  updateSkill,
  deleteSkill,
};
