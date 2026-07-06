import Contact from "../models/contact.model.js";

const findAll = (filter, sort) => Contact.find(filter).sort(sort).lean();
const findById = async (id) => await Contact.findById(id).lean();
const create = async (data) => await Contact.create(data);
const updateById = async (id, data) =>
  await Contact.findByIdAndUpdate(id, data, {
    returnDocument: "after",
    runValidators: true,
  }).lean();
const deleteById = async (id) => await Contact.findByIdAndDelete(id).lean();

export { findAll, findById, create, updateById, deleteById };
