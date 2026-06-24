// *** First ***    Imports
import Profile from "../models/profile.model.js";

// *** Second ***   Constants

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions
const findProfile = async () => Profile.findOne({}).lean();

const updateProfile = async (data) =>
  Profile.findOneAndUpdate({}, data, {
    new: true,
    runValidators: true,
    context: "query",
    upsert: false,
  }).lean();

// *** Fifth ***    Service Functions

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export { findProfile, updateProfile };
