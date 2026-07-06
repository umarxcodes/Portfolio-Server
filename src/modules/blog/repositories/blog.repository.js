import Blog from "../models/blog.model.js";

const findAll = (filter, sort) => Blog.find(filter).sort(sort).lean();
const findById = (id, includeDeleted = false) =>
  Blog.findOne({ _id: id, ...(includeDeleted ? {} : { isDeleted: false }) })
    .select("+isDeleted")
    .lean();
const findBySlugAndIncrement = (slug) =>
  Blog.findOneAndUpdate(
    { slug, published: true, isDeleted: false },
    { $inc: { views: 1 } },
    { returnDocument: "after" }
  ).lean();
const create = (data) => Blog.create(data);
const updateById = (id, data) =>
  Blog.findOneAndUpdate({ _id: id, isDeleted: false }, data, {
    returnDocument: "after",
    runValidators: true,
  }).lean();
const softDeleteById = (id) =>
  Blog.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true },
    { returnDocument: "after" }
  ).lean();

export {
  findAll,
  findById,
  findBySlugAndIncrement,
  create,
  updateById,
  softDeleteById,
};
