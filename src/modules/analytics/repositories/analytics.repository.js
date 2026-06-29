import Analytics from "../models/analytics.model.js";
import Contact from "../../contact/models/contact.model.js";

const create = (data) => Analytics.create(data);
const count = (filter) => Analytics.countDocuments(filter);
const distinct = (field, filter) => Analytics.distinct(field, filter);
const aggregate = (pipeline) => Analytics.aggregate(pipeline);
const countContacts = (filter) => Contact.countDocuments(filter);

export { create, count, distinct, aggregate, countContacts };
