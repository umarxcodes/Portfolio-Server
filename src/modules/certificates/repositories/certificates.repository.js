import Certificate from "../models/certificates.model.js";

const findAll = (filter, sort) => Certificate.find(filter).sort(sort).lean();
const findById = (id) => Certificate.findById(id).lean({ virtuals: true });
const create = (data) => Certificate.create(data);
const updateById = (id, data) =>
  Certificate.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).lean({ virtuals: true });
const deleteById = (id) => Certificate.findByIdAndDelete(id).lean();

export { findAll, findById, create, updateById, deleteById };
