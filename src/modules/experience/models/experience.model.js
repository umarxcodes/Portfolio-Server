// *** First ***    Imports
import mongoose from "mongoose";
import { EMPLOYMENT_TYPES } from "../constants/experience.constants.js";

// *** Second ***   Constants

// *** Third ***    Schema / Model
const experienceSchema = new mongoose.Schema(
  {
    company: { type: String, required: true, trim: true },
    position: { type: String, required: true, trim: true },
    employmentType: { type: String, required: true, enum: EMPLOYMENT_TYPES },
    location: { type: String, default: null, trim: true },
    description: { type: String, required: true },
    responsibilities: { type: [String], default: [] },
    technologies: { type: [String], default: [] },
    startDate: { type: Date, required: true },
    endDate: { type: Date, default: null },
    isCurrent: { type: Boolean, default: false },
    companyLogo: { type: String, default: null, trim: true },
  },
  { timestamps: true }
);

experienceSchema.index({ startDate: -1 });
experienceSchema.index({ isCurrent: 1 });
experienceSchema.index({ employmentType: 1 });

const Experience = mongoose.model("Experience", experienceSchema);

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export default Experience;
