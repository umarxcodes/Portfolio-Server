import Profile from "../models/profile.model.js";

const findProfile = async () => Profile.findOne({}).lean();

const updateProfile = async (data) =>
  Profile.findOneAndUpdate({}, data, {
    new: true,
    runValidators: true,
    context: "query",
    upsert: false,
  }).lean();

export { findProfile, updateProfile };
