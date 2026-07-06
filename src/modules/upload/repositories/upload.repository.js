import Upload from "../models/upload.model.js";

const create = async (data) => await Upload.create(data);
const findById = async (id) => await Upload.findById(id).lean();
const deleteById = async (id) => await Upload.findByIdAndDelete(id).lean();

export { create, findById, deleteById };
