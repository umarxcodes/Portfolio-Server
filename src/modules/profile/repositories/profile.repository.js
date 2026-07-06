import Profile from "../models/profile.model.js";

const findProfile = async () => await Profile.findOne({}).lean();

const updateProfile = async (data) =>
  await Profile.findOneAndUpdate({}, data, {
    returnDocument: "after",
    runValidators: true,
    upsert: true,
  }).lean();

export { findProfile, updateProfile };
