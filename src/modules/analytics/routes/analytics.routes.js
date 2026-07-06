import express from "express";
import protect from "../../../middlewares/auth.middleware.js";
import * as analyticsController from "../controllers/analytics.controller.js";
import {
  trackEventSchema,
  analyticsRangeQuerySchema,
  validate,
} from "../validations/analytics.validation.js";

const analyticsRoutes = express.Router();

analyticsRoutes.post(
  "/track",
  validate(trackEventSchema),
  analyticsController.trackEvent
);
analyticsRoutes.get("/overview", protect, analyticsController.getOverview);
analyticsRoutes.get(
  "/monthly",
  protect,
  validate(analyticsRangeQuerySchema, "query"),
  analyticsController.getMonthlyReport
);
analyticsRoutes.get(
  "/projects",
  protect,
  analyticsController.getProjectAnalytics
);
analyticsRoutes.get("/blogs", protect, analyticsController.getBlogAnalytics);
analyticsRoutes.get(
  "/contact",
  protect,
  analyticsController.getContactAnalytics
);

export default analyticsRoutes;
