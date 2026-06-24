// *** First ***    Imports
import mongoose from "mongoose";

// *** Second ***   Constants

// *** Third ***    Schema / Model
const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    bio: { type: String, required: true },
    shortBio: { type: String, required: true, trim: true, maxlength: 160 },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, default: null, trim: true },
    location: { type: String, default: null, trim: true },
    profileImage: { type: String, default: null, trim: true },
    resumeUrl: { type: String, default: null, trim: true },
    availability: { type: Boolean, default: true },
    yearsOfExperience: { type: Number, required: true, min: 0 },
    socialLinks: {
      github: { type: String, default: null, trim: true },
      linkedin: { type: String, default: null, trim: true },
      portfolio: { type: String, default: null, trim: true },
      twitter: { type: String, default: null, trim: true },
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export default Profile;
