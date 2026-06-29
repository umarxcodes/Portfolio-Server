const SKILL_CATEGORIES = [
  "frontend",
  "backend",
  "database",
  "devops",
  "cloud",
  "testing",
  "tools",
  "mobile",
  "ai",
];

const SKILL_LEVELS = ["beginner", "intermediate", "advanced", "expert"];

const SKILL_FILTER_FIELDS = ["category", "level"];
const SKILL_SORT_FIELDS = [
  "category",
  "displayOrder",
  "name",
  "level",
  "yearsOfExperience",
  "createdAt",
  "updatedAt",
];

const SKILL_ERRORS = {
  NOT_FOUND: "Skill not found",
};

const SKILL_MESSAGES = {
  SKILL_CREATED: "Skill created successfully",
  SKILLS_LISTED: "Skills retrieved successfully",
  SKILL_FETCHED: "Skill retrieved successfully",
  SKILL_UPDATED: "Skill updated successfully",
  SKILL_DELETED: "Skill deleted successfully",
};

export {
  SKILL_CATEGORIES,
  SKILL_LEVELS,
  SKILL_FILTER_FIELDS,
  SKILL_SORT_FIELDS,
  SKILL_ERRORS,
  SKILL_MESSAGES,
};
