// *** First ***    Imports
import Certificate from "../models/certificates.model.js";

// *** Second ***   Constants

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions
const findAll = (filter, sort) => Certificate.find(filter).sort(sort);
const findById = (id) => Certificate.findById(id).lean({ virtuals: true });
const create = (data) => Certificate.create(data);
const updateById = (id, data) =>
  Certificate.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).lean({ virtuals: true });
const deleteById = (id) => Certificate.findByIdAndDelete(id).lean();

// *** Fifth ***    Service Functions

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export { findAll, findById, create, updateById, deleteById };
