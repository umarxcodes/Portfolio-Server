// *** First ***    Imports
import AppError from "../../../shared/errors/index.js";
import { paginate } from "../../../shared/utils/pagination.utils.js";
import {
  buildFilter,
  buildSearch,
  buildSort,
} from "../../../shared/utils/queryBuilder.utils.js";
import {
  BLOG_ERRORS,
  BLOG_FILTER_FIELDS,
  BLOG_SEARCH_FIELDS,
} from "../constants/blog.constants.js";
import * as blogRepository from "../repositories/blog.repository.js";

// *** Second ***   Constants

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions
const createBlogPost = (data) => blogRepository.create(data);

const getPublishedPosts = async (queryParams) => {
  const filter = {
    ...buildFilter(queryParams, BLOG_FILTER_FIELDS),
    ...buildSearch(queryParams.search, BLOG_SEARCH_FIELDS),
    published: true,
    isDeleted: false,
  };
  const sort = queryParams.sort
    ? buildSort(queryParams.sort)
    : { publishedAt: -1 };
  const result = await paginate(
    blogRepository.findAll(filter, sort),
    queryParams.page,
    queryParams.limit
  );
  return { items: result.data, pagination: result.pagination };
};

const getFeaturedPosts = () =>
  blogRepository
    .findAll(
      { published: true, featured: true, isDeleted: false },
      { publishedAt: -1 }
    )
    .limit(6)
    .lean();

const getPostsByCategory = (category) =>
  blogRepository
    .findAll(
      { category, published: true, isDeleted: false },
      { publishedAt: -1 }
    )
    .lean();

const getPostsByTag = (tag) =>
  blogRepository
    .findAll(
      { tags: tag, published: true, isDeleted: false },
      { publishedAt: -1 }
    )
    .lean();

const getPostBySlug = async (slug) => {
  const post = await blogRepository.findBySlugAndIncrement(slug);
  if (!post) throw new AppError(404, BLOG_ERRORS.NOT_FOUND);
  return post;
};

const getPostById = async (id) => {
  const post = await blogRepository.findById(id, true);
  if (!post) throw new AppError(404, BLOG_ERRORS.NOT_FOUND);
  return post;
};

const updateBlogPost = async (id, data) => {
  const post = await blogRepository.updateById(id, data);
  if (!post) throw new AppError(404, BLOG_ERRORS.NOT_FOUND);
  return post;
};

const deleteBlogPost = async (id) => {
  const post = await blogRepository.softDeleteById(id);
  if (!post) throw new AppError(404, BLOG_ERRORS.NOT_FOUND);
  return post;
};

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export {
  createBlogPost,
  getPublishedPosts,
  getFeaturedPosts,
  getPostsByCategory,
  getPostsByTag,
  getPostBySlug,
  getPostById,
  updateBlogPost,
  deleteBlogPost,
};
