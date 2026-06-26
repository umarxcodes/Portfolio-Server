// *** First ***    Imports

// *** Second ***   Constants

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions
const isUnread = (contact) =>
  contact.status === "unread" || contact.isRead === false;

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export { isUnread };
