// *** First ***    Imports
import mongoose from "mongoose";
import { CONTACT_STATUSES } from "../constants/contact.constants.js";

// *** Second ***   Constants

// *** Third ***    Schema / Model
const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, lowercase: true, trim: true },
    subject: { type: String, required: true, trim: true, maxlength: 200 },
    message: { type: String, required: true, maxlength: 2000 },
    status: { type: String, enum: CONTACT_STATUSES, default: "unread" },
    isRead: { type: Boolean, default: false },
    repliedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

contactSchema.index({ status: 1, isRead: 1, createdAt: -1 });
contactSchema.index({ name: "text", email: "text", subject: "text" });

const Contact = mongoose.model("Contact", contactSchema);

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export default Contact;
