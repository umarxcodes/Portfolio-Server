// *** First ***    Imports
import Analytics from "../models/analytics.model.js";
import Contact from "../../contact/models/contact.model.js";

// *** Second ***   Constants

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions
const create = (data) => Analytics.create(data);
const count = (filter) => Analytics.countDocuments(filter);
const distinct = (field, filter) => Analytics.distinct(field, filter);
const aggregate = (pipeline) => Analytics.aggregate(pipeline);
const countContacts = (filter) => Contact.countDocuments(filter);

// *** Fifth ***    Service Functions

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export { create, count, distinct, aggregate, countContacts };
