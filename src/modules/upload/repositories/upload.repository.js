// *** First ***    Imports
import Upload from "../models/upload.model.js";

// *** Second ***   Constants

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions
const create = (data) => Upload.create(data);
const findById = (id) => Upload.findById(id).lean();
const deleteById = (id) => Upload.findByIdAndDelete(id).lean();

// *** Fifth ***    Service Functions

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export { create, findById, deleteById };
