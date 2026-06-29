import Upload from "../models/upload.model.js";

const create = (data) => Upload.create(data);
const findById = (id) => Upload.findById(id).lean();
const deleteById = (id) => Upload.findByIdAndDelete(id).lean();

export { create, findById, deleteById };
