const CONTACT_STATUSES = ["unread", "read", "replied"];
const CONTACT_MESSAGES = {
  CREATED: "Contact submitted",
  LISTED: "Contacts listed",
  FETCHED: "Contact fetched",
  UPDATED: "Contact updated",
  DELETED: "Contact deleted",
};
const CONTACT_ERRORS = {
  NOT_FOUND: "Contact not found",
};
const CONTACT_SORT_FIELDS = ["createdAt", "updatedAt", "status", "isRead"];

export {
  CONTACT_STATUSES,
  CONTACT_MESSAGES,
  CONTACT_ERRORS,
  CONTACT_SORT_FIELDS,
};
