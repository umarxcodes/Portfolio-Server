import Settings from "../models/settings.model.js";

const findOne = () => Settings.findOne({}).lean();
const upsert = (data) =>
  Settings.findOneAndUpdate(
    { singletonKey: "site-settings" },
    { ...data, singletonKey: "site-settings" },
    { returnDocument: "after", upsert: true, runValidators: true }
  ).lean();

export { findOne, upsert };
