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
  const regex = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
  const [projects, blogs, skills, experience, education, certificates] =
    await Promise.all([
      searchRepository.searchProjects(regex, page, limit),
      searchRepository.searchBlogs(regex, page, limit),
      searchRepository.searchSkills(regex, page, limit),
      searchRepository.searchExperience(regex, page, limit),
      searchRepository.searchEducation(regex, page, limit),
      searchRepository.searchCertificates(regex, page, limit),
    ]);

  return {
    query,
    results: { projects, blogs, skills, experience, education, certificates },
  };
};

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export { searchAll };
