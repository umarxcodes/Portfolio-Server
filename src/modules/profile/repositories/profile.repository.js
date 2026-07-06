import Profile from "../models/profile.model.js";

const findProfile = async () => Profile.findOne({}).lean();

const updateProfile = async (data) =>
  Profile.findOneAndUpdate({}, data, {
    returnDocument: "after",
    runValidators: true,
    upsert: true,
  }).lean();

export { findProfile, updateProfile };
