// *** First ***    Imports
import Settings from "../models/settings.model.js";

// *** Second ***   Constants

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions
const findOne = () => Settings.findOne({}).lean();
const upsert = (data) =>
  Settings.findOneAndUpdate(
    { singletonKey: "site-settings" },
    { ...data, singletonKey: "site-settings" },
    { new: true, upsert: true, runValidators: true }
  ).lean();

// *** Fifth ***    Service Functions

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export { findOne, upsert };
