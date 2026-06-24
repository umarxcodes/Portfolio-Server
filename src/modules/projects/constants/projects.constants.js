// *** First ***    Imports

// *** Second ***   Constants
const PROJECT_CATEGORIES = [
  "frontend",
  "backend",
  "fullstack",
  "mobile",
  "devops",
  "ai",
  "open-source",
];

const PROJECT_STATUSES = ["completed", "in-progress", "planned", "archived"];

const PROJECT_FILTER_FIELDS = ["status", "category", "featured"];
const PROJECT_SEARCH_FIELDS = ["title", "description", "techStack"];

const PROJECT_ERRORS = {
  NOT_FOUND: "Project not found",
};

const PROJECT_MESSAGES = {
  PROJECT_CREATED: "Project created successfully",
  PROJECT_LISTED: "Projects retrieved successfully",
  PROJECT_FETCHED: "Project retrieved successfully",
  PROJECT_UPDATED: "Project updated successfully",
  PROJECT_DELETED: "Project deleted successfully",
};

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export {
  PROJECT_CATEGORIES,
  PROJECT_STATUSES,
  PROJECT_FILTER_FIELDS,
  PROJECT_SEARCH_FIELDS,
  PROJECT_ERRORS,
  PROJECT_MESSAGES,
};
