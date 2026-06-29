import Project from "../../projects/models/projects.model.js";
import Skill from "../../skills/models/skills.model.js";
import Experience from "../../experience/models/experience.model.js";
import Education from "../../education/models/education.model.js";
import Certificate from "../../certificates/models/certificates.model.js";
import Blog from "../../blog/models/blog.model.js";

const searchResource = async (Model, filter, page, limit) => {
  const skip = (page - 1) * limit;
  const projection = { score: { $meta: "textScore" } };
  const sort = { score: { $meta: "textScore" } };
  const [items, total] = await Promise.all([
    Model.find(filter, projection).sort(sort).skip(skip).limit(limit).lean(),
    Model.countDocuments(filter),
  ]);
  const totalPages = total > 0 ? Math.ceil(total / limit) : 1;

  return {
    items,
    pagination: {
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
};

const searchProjects = (query, page, limit) =>
  searchResource(
    Project,
    {
      isDeleted: false,
      $text: { $search: query },
    },
    page,
    limit
  );
const searchBlogs = (query, page, limit) =>
  searchResource(
    Blog,
    {
      isDeleted: false,
      published: true,
      $text: { $search: query },
    },
    page,
    limit
  );
const searchSkills = (query, page, limit) =>
  searchResource(Skill, { $text: { $search: query } }, page, limit);
const searchExperience = (query, page, limit) =>
  searchResource(Experience, { $text: { $search: query } }, page, limit);
const searchEducation = (query, page, limit) =>
  searchResource(Education, { $text: { $search: query } }, page, limit);
const searchCertificates = (query, page, limit) =>
  searchResource(Certificate, { $text: { $search: query } }, page, limit);

export {
  searchProjects,
  searchBlogs,
  searchSkills,
  searchExperience,
  searchEducation,
  searchCertificates,
};
