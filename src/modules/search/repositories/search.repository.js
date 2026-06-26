// *** First ***    Imports
import Project from "../../projects/models/projects.model.js";
import Skill from "../../skills/models/skills.model.js";
import Experience from "../../experience/models/experience.model.js";
import Education from "../../education/models/education.model.js";
import Certificate from "../../certificates/models/certificates.model.js";
import Blog from "../../blog/models/blog.model.js";

// *** Second ***   Constants

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions
const searchResource = async (Model, filter, page, limit) => {
  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    Model.find(filter).skip(skip).limit(limit).lean(),
    Model.countDocuments(filter),
  ]);
  return { items, total };
};

const searchProjects = (regex, page, limit) =>
  searchResource(
    Project,
    {
      isDeleted: false,
      status: "published",
      $or: [{ title: regex }, { description: regex }, { techStack: regex }],
    },
    page,
    limit
  );
const searchBlogs = (regex, page, limit) =>
  searchResource(
    Blog,
    {
      isDeleted: false,
      published: true,
      $or: [
        { title: regex },
        { excerpt: regex },
        { content: regex },
        { tags: regex },
      ],
    },
    page,
    limit
  );
const searchSkills = (regex, page, limit) =>
  searchResource(
    Skill,
    { $or: [{ name: regex }, { category: regex }, { description: regex }] },
    page,
    limit
  );
const searchExperience = (regex, page, limit) =>
  searchResource(
    Experience,
    {
      $or: [
        { company: regex },
        { position: regex },
        { description: regex },
        { technologies: regex },
      ],
    },
    page,
    limit
  );
const searchEducation = (regex, page, limit) =>
  searchResource(
    Education,
    {
      $or: [{ degree: regex }, { fieldOfStudy: regex }, { institution: regex }],
    },
    page,
    limit
  );
const searchCertificates = (regex, page, limit) =>
  searchResource(
    Certificate,
    {
      $or: [
        { name: regex },
        { issuer: regex },
        { description: regex },
        { skills: regex },
      ],
    },
    page,
    limit
  );

// *** Fifth ***    Service Functions

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export {
  searchProjects,
  searchBlogs,
  searchSkills,
  searchExperience,
  searchEducation,
  searchCertificates,
};
