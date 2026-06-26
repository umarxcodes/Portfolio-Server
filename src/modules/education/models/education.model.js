// *** First ***    Imports
import mongoose from "mongoose";

// *** Second ***   Constants

// *** Third ***    Schema / Model
const educationSchema = new mongoose.Schema(
  {
    degree: { type: String, required: true, trim: true },
    fieldOfStudy: { type: String, required: true, trim: true },
    institution: { type: String, required: true, trim: true },
    description: { type: String, default: null, trim: true },
    grade: { type: String, default: null, trim: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, default: null },
    isCurrent: { type: Boolean, default: false },
    location: { type: String, default: null, trim: true },
  },
  { timestamps: true }
);

educationSchema.index({ startDate: -1, isCurrent: 1 });
educationSchema.index({
  degree: "text",
  fieldOfStudy: "text",
  institution: "text",
  location: "text",
});

const Education = mongoose.model("Education", educationSchema);

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export default Education;
