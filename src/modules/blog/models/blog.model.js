import mongoose from "mongoose";
import {
  generateSlug,
  ensureUniqueSlug,
} from "../../../shared/utils/slug.utils.js";
import { calculateReadingTime } from "../utils/blog.utils.js";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    excerpt: { type: String, required: true, trim: true, maxlength: 300 },
    content: { type: String, required: true },
    coverImage: { type: String, default: null, trim: true },
    tags: { type: [String], default: [] },
    category: { type: String, required: true, trim: true, lowercase: true },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: false },
    publishedAt: { type: Date, default: null },
    seoTitle: { type: String, default: null, trim: true, maxlength: 60 },
    seoDescription: { type: String, default: null, trim: true, maxlength: 160 },
    readingTime: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false, select: false },
  },
  { timestamps: true }
);

blogSchema.index({ slug: 1 }, { unique: true });
blogSchema.index({ published: 1, featured: 1, isDeleted: 1, publishedAt: -1 });
blogSchema.index({ category: 1, published: 1, isDeleted: 1 });
blogSchema.index({ tags: 1 });
blogSchema.index({
  title: "text",
  excerpt: "text",
  content: "text",
  tags: "text",
});

blogSchema.pre("validate", async function prepareBlogPost() {
  if (!this.slug || this.isModified("title")) {
    this.slug = await ensureUniqueSlug(
      generateSlug(this.title),
      this.constructor,
      this._id
    );
  }
  this.readingTime = calculateReadingTime(this.content);
  if (this.published && !this.publishedAt) this.publishedAt = new Date();
  if (!this.published) this.publishedAt = null;
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
