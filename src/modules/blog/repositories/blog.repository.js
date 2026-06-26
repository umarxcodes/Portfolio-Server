// *** First ***    Imports
import Blog from "../models/blog.model.js";

// *** Second ***   Constants

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions
const findAll = (filter, sort) => Blog.find(filter).sort(sort);
const findById = (id, includeDeleted = false) =>
  Blog.findOne({ _id: id, ...(includeDeleted ? {} : { isDeleted: false }) })
    .select("+isDeleted")
    .lean();
const findBySlugAndIncrement = (slug) =>
  Blog.findOneAndUpdate(
    { slug, published: true, isDeleted: false },
    { $inc: { views: 1 } },
    { new: true }
  ).lean();
const create = (data) => Blog.create(data);
const updateById = (id, data) =>
  Blog.findOneAndUpdate({ _id: id, isDeleted: false }, data, {
    new: true,
    runValidators: true,
  }).lean();
const softDeleteById = (id) =>
  Blog.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true },
    { new: true }
  ).lean();

// *** Fifth ***    Service Functions

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export {
  findAll,
  findById,
  findBySlugAndIncrement,
  create,
  updateById,
  softDeleteById,
};
