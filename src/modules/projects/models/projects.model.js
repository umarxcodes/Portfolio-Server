import mongoose from "mongoose";
import {
  PROJECT_CATEGORIES,
  PROJECT_STATUSES,
} from "../constants/projects.constants.js";
import {
  generateSlug,
  ensureUniqueSlug,
} from "../../../shared/utils/slug.utils.js";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    description: { type: String, required: true },
    shortDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    techStack: {
      type: [String],
      required: true,
      validate: [
        (value) => Array.isArray(value) && value.length > 0,
        "techStack requires at least one item",
      ],
    },
    category: { type: String, required: true, enum: PROJECT_CATEGORIES },
    status: { type: String, required: true, enum: PROJECT_STATUSES },
    featured: { type: Boolean, default: false },
    githubUrl: { type: String, default: null, trim: true },
    liveUrl: { type: String, default: null, trim: true },
    thumbnail: { type: String, default: null, trim: true },
    images: { type: [String], default: [] },
    startDate: { type: Date, required: true },
    endDate: { type: Date, default: null },
    isDeleted: { type: Boolean, default: false, select: false },
  },
  { timestamps: true }
);

projectSchema.index({
  category: 1,
  status: 1,
  featured: 1,
  isDeleted: 1,
  createdAt: -1,
});
projectSchema.index({ title: "text", description: "text", techStack: "text" });

projectSchema.pre("validate", async function () {
  if (!this.slug || this.isModified("title")) {
    this.slug = await ensureUniqueSlug(
      generateSlug(this.title),
      this.constructor,
      this._id
    );
  }
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
