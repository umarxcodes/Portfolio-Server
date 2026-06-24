// *** First ***    Imports
import mongoose from "mongoose";
import {
  SKILL_CATEGORIES,
  SKILL_LEVELS,
} from "../constants/skills.constants.js";

// *** Second ***   Constants

// *** Third ***    Schema / Model
const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, enum: SKILL_CATEGORIES },
    level: { type: String, required: true, enum: SKILL_LEVELS },
    yearsOfExperience: { type: Number, required: true, min: 0, max: 50 },
    icon: { type: String, default: null, trim: true },
    description: { type: String, default: null },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

skillSchema.index({ category: 1 });
skillSchema.index({ level: 1 });
skillSchema.index({ displayOrder: 1 });

const Skill = mongoose.model("Skill", skillSchema);

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export default Skill;
