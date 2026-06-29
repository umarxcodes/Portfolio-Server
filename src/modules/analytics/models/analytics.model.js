import mongoose from "mongoose";
import { ANALYTICS_TYPES } from "../constants/analytics.constants.js";

const analyticsSchema = new mongoose.Schema(
  {
    type: { type: String, required: true, enum: ANALYTICS_TYPES },
    resourceId: { type: mongoose.Schema.Types.ObjectId, default: null },
    ipAddress: { type: String, required: true, select: false },
    userAgent: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

analyticsSchema.index({ type: 1, resourceId: 1, createdAt: -1 });
analyticsSchema.index({ ipAddress: 1 });

const Analytics = mongoose.model("Analytics", analyticsSchema);

export default Analytics;
