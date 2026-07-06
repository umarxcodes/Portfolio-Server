import Analytics from "../models/analytics.model.js";
import Contact from "../../contact/models/contact.model.js";

const create = async (data) => await Analytics.create(data);
const count = async (filter) => await Analytics.countDocuments(filter);
const distinct = async (field, filter) =>
  await Analytics.distinct(field, filter);
const aggregate = async (pipeline) => await Analytics.aggregate(pipeline);
const countContacts = async (filter) => await Contact.countDocuments(filter);

export { create, count, distinct, aggregate, countContacts };
