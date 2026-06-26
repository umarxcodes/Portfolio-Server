// *** First ***    Imports
import asyncHandler from "../../../shared/utils/asyncHandler.utils.js";
import { sendSuccess } from "../../../shared/utils/response.utils.js";
import { ANALYTICS_MESSAGES } from "../constants/analytics.constants.js";
import * as analyticsService from "../services/analytics.service.js";

// *** Second ***   Constants

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions

// *** Sixth ***    Controller Functions
const getOverview = asyncHandler(async (req, res) => {
  const overview = await analyticsService.getOverview();
  sendSuccess(res, 200, ANALYTICS_MESSAGES.OVERVIEW, overview);
});
const getProjectAnalytics = asyncHandler(async (req, res) => {
  const items = await analyticsService.getTopResources("project_view");
  sendSuccess(res, 200, ANALYTICS_MESSAGES.PROJECTS, { items });
});
const getBlogAnalytics = asyncHandler(async (req, res) => {
  const items = await analyticsService.getTopResources("blog_view");
  sendSuccess(res, 200, ANALYTICS_MESSAGES.BLOGS, { items });
});
const getContactAnalytics = asyncHandler(async (req, res) => {
  const items = await analyticsService.getContactTimeline();
  sendSuccess(res, 200, ANALYTICS_MESSAGES.CONTACT, { items });
});

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export {
  getOverview,
  getProjectAnalytics,
  getBlogAnalytics,
  getContactAnalytics,
};
