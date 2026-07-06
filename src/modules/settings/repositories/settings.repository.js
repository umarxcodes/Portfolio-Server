import Settings from "../models/settings.model.js";

const findOne = async () => await Settings.findOne({}).lean();

const upsert = async (data) =>
  await Settings.findOneAndUpdate(
    { singletonKey: "site-settings" },
    { ...data, singletonKey: "site-settings" },
    { returnDocument: "after", upsert: true, runValidators: true }
  ).lean();

export { findOne, upsert };
