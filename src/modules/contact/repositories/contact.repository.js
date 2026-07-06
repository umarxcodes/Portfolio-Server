import Contact from "../models/contact.model.js";

const findAll = (filter, sort) => Contact.find(filter).sort(sort).lean();
const findById = (id) => Contact.findById(id).lean();
const create = (data) => Contact.create(data);
const updateById = (id, data) =>
  Contact.findByIdAndUpdate(id, data, {
    returnDocument: "after",
    runValidators: true,
  }).lean();
const deleteById = (id) => Contact.findByIdAndDelete(id).lean();

export { findAll, findById, create, updateById, deleteById };
