import asyncHandler from "../../../shared/utils/asyncHandler.utils.js";
import { sendSuccess } from "../../../shared/utils/response.utils.js";
import { getClientMetadata } from "../../../shared/utils/request.utils.js";
import { BLOG_MESSAGES } from "../constants/blog.constants.js";
import * as blogService from "../services/blog.service.js";

const createBlogPost = asyncHandler(async (req, res) => {
  const post = await blogService.createBlogPost(req.body);
  sendSuccess(res, 201, BLOG_MESSAGES.CREATED, { post });
});
const getPublishedPosts = asyncHandler(async (req, res) => {
  const result = await blogService.getPublishedPosts(req.query);
  sendSuccess(res, 200, BLOG_MESSAGES.LISTED, result);
});
const getFeaturedPosts = asyncHandler(async (req, res) => {
  const result = await blogService.getFeaturedPosts(req.query);
  sendSuccess(res, 200, BLOG_MESSAGES.LISTED, {
    items: result.items,
    pagination: result.pagination,
  });
});
const getPostsByCategory = asyncHandler(async (req, res) => {
  const result = await blogService.getPostsByCategory(
    req.params.category,
    req.query
  );
  sendSuccess(res, 200, BLOG_MESSAGES.LISTED, result);
});
const getPostsByTag = asyncHandler(async (req, res) => {
  const result = await blogService.getPostsByTag(req.params.tag, req.query);
  sendSuccess(res, 200, BLOG_MESSAGES.LISTED, result);
});
const getPostBySlug = asyncHandler(async (req, res) => {
  const post = await blogService.getPostBySlug(
    req.params.slug,
    getClientMetadata(req)
  );
  sendSuccess(res, 200, BLOG_MESSAGES.FETCHED, { post });
});
const getPostById = asyncHandler(async (req, res) => {
  const post = await blogService.getPostById(req.params.id);
  sendSuccess(res, 200, BLOG_MESSAGES.FETCHED, { post });
});
const updateBlogPost = asyncHandler(async (req, res) => {
  const post = await blogService.updateBlogPost(req.params.id, req.body);
  sendSuccess(res, 200, BLOG_MESSAGES.UPDATED, { post });
});
const deleteBlogPost = asyncHandler(async (req, res) => {
  const post = await blogService.deleteBlogPost(req.params.id);
  sendSuccess(res, 200, BLOG_MESSAGES.DELETED, { post });
});

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
