// *** First ***    Imports
import Contact from "../models/contact.model.js";

// *** Second ***   Constants

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions
const findAll = (filter, sort) => Contact.find(filter).sort(sort);
const findById = (id) => Contact.findById(id).lean();
const create = (data) => Contact.create(data);
const updateById = (id, data) =>
  Contact.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).lean();
const deleteById = (id) => Contact.findByIdAndDelete(id).lean();

// *** Fifth ***    Service Functions

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export { findAll, findById, create, updateById, deleteById };
