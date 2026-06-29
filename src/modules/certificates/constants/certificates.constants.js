const CERTIFICATE_MESSAGES = {
  CREATED: "Certificate created",
  LISTED: "Certificates listed",
  FETCHED: "Certificate fetched",
  UPDATED: "Certificate updated",
  DELETED: "Certificate deleted",
};

const CERTIFICATE_ERRORS = {
  NOT_FOUND: "Certificate not found",
};

const CERTIFICATE_FILTER_FIELDS = ["issuer"];
const CERTIFICATE_SEARCH_FIELDS = ["name", "issuer", "description", "skills"];
const CERTIFICATE_SORT_FIELDS = [
  "issueDate",
  "expiryDate",
  "createdAt",
  "updatedAt",
  "name",
  "issuer",
];

export {
  CERTIFICATE_MESSAGES,
  CERTIFICATE_ERRORS,
  CERTIFICATE_FILTER_FIELDS,
  CERTIFICATE_SEARCH_FIELDS,
  CERTIFICATE_SORT_FIELDS,
};
