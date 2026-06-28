// *** First ***    Imports
import * as searchRepository from "../repositories/search.repository.js";

// *** Second ***   Constants

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions
const searchAll = async (queryParams) => {
  const query = String(queryParams.q || "").trim();
  const page = Math.max(Number(queryParams.page) || 1, 1);
  const limit = Math.min(Math.max(Number(queryParams.limit) || 5, 1), 20);
  const searchers = {
    projects: searchRepository.searchProjects,
    blogs: searchRepository.searchBlogs,
    skills: searchRepository.searchSkills,
    experience: searchRepository.searchExperience,
    education: searchRepository.searchEducation,
    certificates: searchRepository.searchCertificates,
  };

  if (queryParams.type) {
    return {
      query,
      results: {
        [queryParams.type]: await searchers[queryParams.type](
          query,
          page,
          limit
        ),
      },
    };
  }

  const entries = await Promise.all(
    Object.entries(searchers).map(async ([resourceType, searcher]) => [
      resourceType,
      await searcher(query, page, limit),
    ])
  );

  return {
    query,
    results: Object.fromEntries(entries),
  };
};

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export { searchAll };
