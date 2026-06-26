// *** First ***    Imports
import mongoose from "mongoose";
import { SETTINGS_THEMES } from "../constants/settings.constants.js";

// *** Second ***   Constants

// *** Third ***    Schema / Model
const settingsSchema = new mongoose.Schema(
  {
    singletonKey: {
      type: String,
      default: "site-settings",
      unique: true,
      select: false,
    },
    siteTitle: { type: String, required: true, trim: true },
    siteDescription: { type: String, required: true, trim: true },
    seoTitle: { type: String, default: "", trim: true, maxlength: 60 },
    seoDescription: { type: String, default: "", trim: true, maxlength: 160 },
    keywords: { type: [String], default: [] },
    socialLinks: {
      github: { type: String, default: "", trim: true },
      linkedin: { type: String, default: "", trim: true },
      twitter: { type: String, default: "", trim: true },
      youtube: { type: String, default: "", trim: true },
    },
    theme: { type: String, enum: SETTINGS_THEMES, default: "system" },
    logo: { type: String, default: "", trim: true },
    favicon: { type: String, default: "", trim: true },
    contactEmail: { type: String, default: "", trim: true },
    contactPhone: { type: String, default: "", trim: true },
    maintenanceMode: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Settings = mongoose.model("Settings", settingsSchema);

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export default Settings;
