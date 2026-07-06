import { hashIpAddress } from "../utils/analytics.utils.js";
import * as analyticsRepository from "../repositories/analytics.repository.js";

const startOfMonth = () =>
  new Date(new Date().getFullYear(), new Date().getMonth(), 1);

const startOfMonthOffset = (monthsAgo) =>
  new Date(new Date().getFullYear(), new Date().getMonth() - monthsAgo, 1);

const trackEvent = async ({ type, resourceId, ipAddress, userAgent }) =>
  await analyticsRepository.create({
    type,
    resourceId,
    ipAddress: hashIpAddress(ipAddress),
    userAgent,
  });

const trackPortfolioView = (metadata) =>
  trackEvent({ type: "portfolio_view", ...metadata });

const trackProjectView = (resourceId, metadata) =>
  trackEvent({ type: "project_view", resourceId, ...metadata });

const trackBlogView = (resourceId, metadata) =>
  trackEvent({ type: "blog_view", resourceId, ...metadata });

const trackContactSubmission = (metadata) =>
  trackEvent({ type: "contact_submit", ...metadata });

const getOverview = async () => {
  const [
    totalPortfolioViews,
    totalProjectViews,
    totalBlogViews,
    totalContactSubmissions,
    uniqueVisitors,
    thisMonthViews,
  ] = await Promise.all([
    analyticsRepository.count({ type: "portfolio_view" }),
    analyticsRepository.count({ type: "project_view" }),
    analyticsRepository.count({ type: "blog_view" }),
    analyticsRepository.countContacts({}),
    analyticsRepository.distinct("ipAddress", {}),
    analyticsRepository.count({ createdAt: { $gte: startOfMonth() } }),
  ]);

  return {
    totalPortfolioViews,
    totalProjectViews,
    totalBlogViews,
    totalContactSubmissions,
    uniqueVisitors: uniqueVisitors.length,
    thisMonthViews,
  };
};

const getTopResources = async (type) =>
  await analyticsRepository.aggregate([
    { $match: { type, resourceId: { $ne: null } } },
    { $group: { _id: "$resourceId", views: { $sum: 1 } } },
    { $sort: { views: -1 } },
    { $limit: 10 },
  ]);

const getContactTimeline = async () =>
  await analyticsRepository.aggregate([
    { $match: { type: "contact_submit" } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

const getMonthlyReport = async (months = 6) =>
  await analyticsRepository.aggregate([
    { $match: { createdAt: { $gte: startOfMonthOffset(months - 1) } } },
    {
      $group: {
        _id: {
          month: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          type: "$type",
        },
        count: { $sum: 1 },
      },
    },
    {
      $group: {
        _id: "$_id.month",
        events: { $push: { type: "$_id.type", count: "$count" } },
        total: { $sum: "$count" },
      },
    },
    { $sort: { _id: 1 } },
  ]);

export {
  trackEvent,
  trackPortfolioView,
  trackProjectView,
  trackBlogView,
  trackContactSubmission,
  getOverview,
  getTopResources,
  getContactTimeline,
  getMonthlyReport,
};
