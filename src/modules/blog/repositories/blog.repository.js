import Blog from "../models/blog.model.js";

const findAll = (filter, sort) => Blog.find(filter).sort(sort).lean();
const findById = async (id, includeDeleted = false) =>
  await Blog.findOne({
    _id: id,
    ...(includeDeleted ? {} : { isDeleted: false }),
  })
    .select("+isDeleted")
    .lean();
const findBySlugAndIncrement = async (slug) =>
  await Blog.findOneAndUpdate(
    { slug, published: true, isDeleted: false },
    { $inc: { views: 1 } },
    { returnDocument: "after" }
  ).lean();
const create = async (data) => await Blog.create(data);
const updateById = async (id, data) =>
  await Blog.findOneAndUpdate({ _id: id, isDeleted: false }, data, {
    returnDocument: "after",
    runValidators: true,
  }).lean();
const softDeleteById = async (id) =>
  await Blog.findOneAndUpdate(
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
