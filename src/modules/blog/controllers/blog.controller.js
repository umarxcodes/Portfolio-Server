// *** First ***    Imports
import asyncHandler from "../../../shared/utils/asyncHandler.utils.js";
import { sendSuccess } from "../../../shared/utils/response.utils.js";
import { BLOG_MESSAGES } from "../constants/blog.constants.js";
import * as blogService from "../services/blog.service.js";

// *** Second ***   Constants

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions

// *** Sixth ***    Controller Functions
const createBlogPost = asyncHandler(async (req, res) => {
  const post = await blogService.createBlogPost(req.body);
  sendSuccess(res, 201, BLOG_MESSAGES.CREATED, { post });
});
const getPublishedPosts = asyncHandler(async (req, res) => {
  const result = await blogService.getPublishedPosts(req.query);
  sendSuccess(res, 200, BLOG_MESSAGES.LISTED, result);
});
const getFeaturedPosts = asyncHandler(async (req, res) => {
  const items = await blogService.getFeaturedPosts();
  sendSuccess(res, 200, BLOG_MESSAGES.LISTED, { items });
});
const getPostsByCategory = asyncHandler(async (req, res) => {
  const items = await blogService.getPostsByCategory(req.params.category);
  sendSuccess(res, 200, BLOG_MESSAGES.LISTED, { items });
});
const getPostsByTag = asyncHandler(async (req, res) => {
  const items = await blogService.getPostsByTag(req.params.tag);
  sendSuccess(res, 200, BLOG_MESSAGES.LISTED, { items });
});
const getPostBySlug = asyncHandler(async (req, res) => {
  const post = await blogService.getPostBySlug(req.params.slug);
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
