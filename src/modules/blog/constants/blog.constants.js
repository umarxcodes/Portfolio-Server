// *** First ***    Imports

// *** Second ***   Constants
const BLOG_MESSAGES = {
  CREATED: "Blog post created",
  LISTED: "Blog posts listed",
  FETCHED: "Blog post fetched",
  UPDATED: "Blog post updated",
  DELETED: "Blog post deleted",
};
const BLOG_ERRORS = {
  NOT_FOUND: "Blog post not found",
};
const BLOG_FILTER_FIELDS = ["category", "featured", "published"];
const BLOG_SEARCH_FIELDS = ["title", "excerpt", "content", "tags"];
const BLOG_SORT_FIELDS = [
  "publishedAt",
  "createdAt",
  "updatedAt",
  "title",
  "views",
  "readingTime",
];

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export {
  BLOG_MESSAGES,
  BLOG_ERRORS,
  BLOG_FILTER_FIELDS,
  BLOG_SEARCH_FIELDS,
  BLOG_SORT_FIELDS,
};
