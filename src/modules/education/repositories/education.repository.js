import Education from "../models/education.model.js";

const findAll = (filter, sort) => Education.find(filter).sort(sort).lean();
const findCurrent = async () =>
  await Education.find({ isCurrent: true }).sort({ startDate: -1 }).lean();
const findById = async (id) => await Education.findById(id).lean();
const create = async (data) => await Education.create(data);
const updateById = async (id, data) =>
  await Education.findByIdAndUpdate(id, data, {
    returnDocument: "after",
    runValidators: true,
  }).lean();
const deleteById = async (id) => await Education.findByIdAndDelete(id).lean();

export { findAll, findCurrent, findById, create, updateById, deleteById };
