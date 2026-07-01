import asyncHandler from "../../../shared/utils/asyncHandler.utils.js";
import { sendSuccess } from "../../../shared/utils/response.utils.js";
import { ANALYTICS_MESSAGES } from "../constants/analytics.constants.js";
import * as analyticsService from "../services/analytics.service.js";

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

const getMonthlyReport = asyncHandler(async (req, res) => {
  const months = Math.min(Math.max(Number(req.query.months) || 6, 1), 24);
  const items = await analyticsService.getMonthlyReport(months);
  sendSuccess(res, 200, ANALYTICS_MESSAGES.MONTHLY, { items });
});

export {
  getOverview,
  getProjectAnalytics,
  getBlogAnalytics,
  getContactAnalytics,
  getMonthlyReport,
};
