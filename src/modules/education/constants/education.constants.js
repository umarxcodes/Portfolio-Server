const EDUCATION_MESSAGES = {
  CREATED: "Education created",
  LISTED: "Education listed",
  FETCHED: "Education fetched",
  UPDATED: "Education updated",
  DELETED: "Education deleted",
};

const EDUCATION_ERRORS = {
  NOT_FOUND: "Education not found",
};

const EDUCATION_FILTER_FIELDS = ["isCurrent", "institution"];
const EDUCATION_SEARCH_FIELDS = [
  "degree",
  "fieldOfStudy",
  "institution",
  "location",
];
const EDUCATION_SORT_FIELDS = [
  "startDate",
  "endDate",
  "createdAt",
  "updatedAt",
  "institution",
];

export {
  EDUCATION_MESSAGES,
  EDUCATION_ERRORS,
  EDUCATION_FILTER_FIELDS,
  EDUCATION_SEARCH_FIELDS,
  EDUCATION_SORT_FIELDS,
};
