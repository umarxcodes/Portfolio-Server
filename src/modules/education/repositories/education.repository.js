import Education from "../models/education.model.js";

const findAll = (filter, sort) => Education.find(filter).sort(sort).lean();
const findCurrent = () =>
  Education.find({ isCurrent: true }).sort({ startDate: -1 }).lean();
const findById = (id) => Education.findById(id).lean();
const create = (data) => Education.create(data);
const updateById = (id, data) =>
  Education.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).lean();
const deleteById = (id) => Education.findByIdAndDelete(id).lean();

export { findAll, findCurrent, findById, create, updateById, deleteById };
