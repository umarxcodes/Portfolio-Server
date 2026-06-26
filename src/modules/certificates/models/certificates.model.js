// *** First ***    Imports
import mongoose from "mongoose";

// *** Second ***   Constants

// *** Third ***    Schema / Model
const certificateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    issuer: { type: String, required: true, trim: true },
    issueDate: { type: Date, required: true },
    expiryDate: { type: Date, default: null },
    credentialId: { type: String, default: null, trim: true },
    credentialUrl: { type: String, default: null, trim: true },
    description: { type: String, default: null, trim: true },
    skills: { type: [String], default: [] },
    badgeImage: { type: String, default: null, trim: true },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

certificateSchema.virtual("expired").get(function getExpired() {
  return Boolean(this.expiryDate && this.expiryDate < new Date());
});

certificateSchema.index({ issueDate: -1 });
certificateSchema.index({ issuer: 1 });
certificateSchema.index({ skills: 1 });
certificateSchema.index({
  name: "text",
  issuer: "text",
  description: "text",
  skills: "text",
});

const Certificate = mongoose.model("Certificate", certificateSchema);

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export default Certificate;
