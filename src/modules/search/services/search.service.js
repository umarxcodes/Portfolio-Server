import { SEARCH_RESOURCE_TYPES } from "../constants/search.constants.js";
import * as searchRepository from "../repositories/search.repository.js";

const searchAll = async (queryParams) => {
  const query = String(queryParams.q || "").trim();
  const page = Math.max(Number(queryParams.page) || 1, 1);
  const limit = Math.min(Math.max(Number(queryParams.limit) || 5, 1), 20);
  const type = queryParams.type;

  if (type && !SEARCH_RESOURCE_TYPES.includes(type)) {
    throw new Error(`Invalid search type: ${type}`);
  }

  const searchers = {
    projects: searchRepository.searchProjects,
    blogs: searchRepository.searchBlogs,
    skills: searchRepository.searchSkills,
    experience: searchRepository.searchExperience,
    education: searchRepository.searchEducation,
    certificates: searchRepository.searchCertificates,
  };

  if (type) {
    return {
      query,
      results: {
        [type]: await searchers[type](query, page, limit),
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

export { searchAll };
