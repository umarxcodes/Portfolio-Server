// *** First ***    Imports

// *** Second ***   Constants
const EMPLOYMENT_TYPES = [
  "full-time",
  "part-time",
  "contract",
  "freelance",
  "internship",
];

const EXPERIENCE_FILTER_FIELDS = ["employmentType", "isCurrent"];
const EXPERIENCE_SORT_FIELDS = [
  "startDate",
  "endDate",
  "createdAt",
  "updatedAt",
  "company",
  "position",
];

const EXPERIENCE_ERRORS = {
  NOT_FOUND: "Experience entry not found",
};

const EXPERIENCE_MESSAGES = {
  EXPERIENCE_CREATED: "Experience entry created successfully",
  EXPERIENCE_LISTED: "Experience entries retrieved successfully",
  EXPERIENCE_FETCHED: "Experience entry retrieved successfully",
  EXPERIENCE_UPDATED: "Experience entry updated successfully",
  EXPERIENCE_DELETED: "Experience entry deleted successfully",
};

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export {
  EMPLOYMENT_TYPES,
  EXPERIENCE_FILTER_FIELDS,
  EXPERIENCE_SORT_FIELDS,
  EXPERIENCE_ERRORS,
  EXPERIENCE_MESSAGES,
};
