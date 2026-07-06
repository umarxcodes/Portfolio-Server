import Certificate from "../models/certificates.model.js";

const findAll = (filter, sort) => Certificate.find(filter).sort(sort).lean();
const findById = async (id) =>
  await Certificate.findById(id).lean({ virtuals: true });
const create = async (data) => await Certificate.create(data);
const updateById = async (id, data) =>
  await Certificate.findByIdAndUpdate(id, data, {
    returnDocument: "after",
    runValidators: true,
  }).lean({ virtuals: true });
const deleteById = async (id) => await Certificate.findByIdAndDelete(id).lean();

export { findAll, findById, create, updateById, deleteById };
