import AppError from "../../../shared/errors/index.js";
import { paginate } from "../../../shared/utils/pagination.utils.js";
import {
  buildFilter,
  buildSearch,
  buildSort,
} from "../../../shared/utils/queryBuilder.utils.js";
import {
  generateSlug,
  ensureUniqueSlug,
} from "../../../shared/utils/slug.utils.js";
import { calculateReadingTime } from "../utils/blog.utils.js";
import Blog from "../models/blog.model.js";
import {
  BLOG_ERRORS,
  BLOG_FILTER_FIELDS,
  BLOG_SEARCH_FIELDS,
  BLOG_SORT_FIELDS,
} from "../constants/blog.constants.js";
import * as blogRepository from "../repositories/blog.repository.js";
import { trackBlogView } from "../../analytics/services/analytics.service.js";

const createBlogPost = async (data) => await blogRepository.create(data);

const prepareBlogUpdate = async (id, data) => {
  const update = { ...data };

  if (data.title) {
    update.slug = await ensureUniqueSlug(generateSlug(data.title), Blog, id);
  }

  if (data.content) {
    update.readingTime = calculateReadingTime(data.content);
  }

  if (data.published === true) {
    const currentPost = await blogRepository.findById(id);
    update.publishedAt = currentPost?.publishedAt || new Date();
  }

  if (data.published === false) {
    update.publishedAt = null;
  }

  return update;
};

const getPublishedPosts = async (queryParams) => {
  const filter = {
    ...buildFilter(queryParams, BLOG_FILTER_FIELDS),
    ...buildSearch(queryParams.search, BLOG_SEARCH_FIELDS),
    published: true,
    isDeleted: false,
  };
  const sort = queryParams.sort
    ? buildSort(queryParams.sort, BLOG_SORT_FIELDS)
    : { publishedAt: -1 };
  const result = await paginate(
    blogRepository.findAll(filter, sort),
    queryParams.page,
    queryParams.limit
  );
  return { items: result.data, pagination: result.pagination };
};

const getFeaturedPosts = async (queryParams) => {
  const sort = queryParams.sort
    ? buildSort(queryParams.sort, BLOG_SORT_FIELDS)
    : { publishedAt: -1 };
  const query = blogRepository
    .findAll({ published: true, featured: true, isDeleted: false }, sort)
    .limit(20);
  const result = await paginate(query, queryParams.page, queryParams.limit);
  return { items: result.data, pagination: result.pagination };
};

const getPostsByCategory = async (category, queryParams) => {
  const sort = queryParams.sort
    ? buildSort(queryParams.sort, BLOG_SORT_FIELDS)
    : { publishedAt: -1 };
  const result = await paginate(
    blogRepository.findAll(
      { category, published: true, isDeleted: false },
      sort
    ),
    queryParams.page,
    queryParams.limit
  );
  return { items: result.data, pagination: result.pagination };
};

const getPostsByTag = async (tag, queryParams) => {
  const sort = queryParams.sort
    ? buildSort(queryParams.sort, BLOG_SORT_FIELDS)
    : { publishedAt: -1 };
  const result = await paginate(
    blogRepository.findAll(
      { tags: tag, published: true, isDeleted: false },
      sort
    ),
    queryParams.page,
    queryParams.limit
  );
  return { items: result.data, pagination: result.pagination };
};

const getPostBySlug = async (slug, metadata) => {
  const post = await blogRepository.findBySlugAndIncrement(slug);
  if (!post) throw new AppError(404, BLOG_ERRORS.NOT_FOUND);
  await trackBlogView(post._id, metadata);
  return post;
};

const getPostById = async (id) => {
  const post = await blogRepository.findById(id, true);
  if (!post) throw new AppError(404, BLOG_ERRORS.NOT_FOUND);
  return post;
};

const updateBlogPost = async (id, data) => {
  const post = await blogRepository.updateById(
    id,
    await prepareBlogUpdate(id, data)
  );
  if (!post) throw new AppError(404, BLOG_ERRORS.NOT_FOUND);
  return post;
};

const deleteBlogPost = async (id) => {
  const post = await blogRepository.softDeleteById(id);
  if (!post) throw new AppError(404, BLOG_ERRORS.NOT_FOUND);
  return post;
};

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
