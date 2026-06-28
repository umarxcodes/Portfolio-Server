// *** First ***    Imports
import env from "./env.js";

// *** Second ***   Constants
const swaggerConfig = {
  openapi: "3.0.3",
  info: {
    title: "Portfolio Backend API",
    version: "1.0.0",
    description: "Production API for a modular portfolio backend.",
  },
  servers: [
    {
      url:
        env.NODE_ENV === "production"
          ? "/api/v1"
          : `http://localhost:${env.PORT}/api/v1`,
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  paths: {
    "/auth/login": { post: { tags: ["Auth"], summary: "Admin login" } },
    "/auth/profile": {
      get: { tags: ["Auth"], summary: "Current admin profile" },
    },
    "/auth/logout": { post: { tags: ["Auth"], summary: "Admin logout" } },
    "/auth/change-password": {
      patch: { tags: ["Auth"], summary: "Change admin password" },
    },
    "/profile": {
      get: { tags: ["Profile"], summary: "Get public profile" },
      patch: { tags: ["Profile"], summary: "Update profile" },
    },
    "/projects": {
      get: { tags: ["Projects"], summary: "List projects" },
      post: { tags: ["Projects"], summary: "Create project" },
    },
    "/projects/featured": {
      get: { tags: ["Projects"], summary: "List featured projects" },
    },
    "/projects/category/{category}": {
      get: { tags: ["Projects"], summary: "List projects by category" },
    },
    "/projects/slug/{slug}": {
      get: { tags: ["Projects"], summary: "Get project by slug" },
    },
    "/projects/{id}": {
      get: { tags: ["Projects"], summary: "Get project by ID" },
      patch: { tags: ["Projects"], summary: "Update project" },
      delete: { tags: ["Projects"], summary: "Delete project" },
    },
    "/skills": {
      get: { tags: ["Skills"], summary: "List skills" },
      post: { tags: ["Skills"], summary: "Create skill" },
    },
    "/skills/category/{category}": {
      get: { tags: ["Skills"], summary: "List skills by category" },
    },
    "/skills/{id}": {
      get: { tags: ["Skills"], summary: "Get skill by ID" },
      patch: { tags: ["Skills"], summary: "Update skill" },
      delete: { tags: ["Skills"], summary: "Delete skill" },
    },
    "/experience": {
      get: { tags: ["Experience"], summary: "List experience entries" },
      post: { tags: ["Experience"], summary: "Create experience entry" },
    },
    "/experience/{id}": {
      get: { tags: ["Experience"], summary: "Get experience entry" },
      patch: { tags: ["Experience"], summary: "Update experience entry" },
      delete: { tags: ["Experience"], summary: "Delete experience entry" },
    },
    "/education": {
      get: { tags: ["Education"], summary: "List education entries" },
      post: { tags: ["Education"], summary: "Create education entry" },
    },
    "/education/current": {
      get: { tags: ["Education"], summary: "List current education entries" },
    },
    "/education/{id}": {
      get: { tags: ["Education"], summary: "Get education entry" },
      patch: { tags: ["Education"], summary: "Update education entry" },
      delete: { tags: ["Education"], summary: "Delete education entry" },
    },
    "/certificates": {
      get: { tags: ["Certificates"], summary: "List certificates" },
      post: { tags: ["Certificates"], summary: "Create certificate" },
    },
    "/certificates/{id}": {
      get: { tags: ["Certificates"], summary: "Get certificate" },
      patch: { tags: ["Certificates"], summary: "Update certificate" },
      delete: { tags: ["Certificates"], summary: "Delete certificate" },
    },
    "/blogs": {
      get: { tags: ["Blog"], summary: "List published posts" },
      post: { tags: ["Blog"], summary: "Create blog post" },
    },
    "/blogs/featured": {
      get: { tags: ["Blog"], summary: "List featured posts" },
    },
    "/blogs/category/{category}": {
      get: { tags: ["Blog"], summary: "List posts by category" },
    },
    "/blogs/tag/{tag}": {
      get: { tags: ["Blog"], summary: "List posts by tag" },
    },
    "/blogs/slug/{slug}": {
      get: { tags: ["Blog"], summary: "Get published post by slug" },
    },
    "/blogs/{id}": {
      get: { tags: ["Blog"], summary: "Get post by ID" },
      patch: { tags: ["Blog"], summary: "Update post" },
      delete: { tags: ["Blog"], summary: "Soft delete post" },
    },
    "/contact": {
      get: { tags: ["Contact"], summary: "List contact messages" },
      post: { tags: ["Contact"], summary: "Submit contact message" },
    },
    "/contact/{id}": {
      get: { tags: ["Contact"], summary: "Get contact message" },
      patch: { tags: ["Contact"], summary: "Update contact status" },
      delete: { tags: ["Contact"], summary: "Delete contact message" },
    },
    "/uploads": {
      post: { tags: ["Uploads"], summary: "Upload a portfolio asset" },
    },
    "/uploads/{id}": {
      get: { tags: ["Uploads"], summary: "Get uploaded asset" },
      delete: { tags: ["Uploads"], summary: "Delete uploaded asset" },
    },
    "/analytics/track": {
      post: { tags: ["Analytics"], summary: "Track public analytics event" },
    },
    "/analytics/overview": {
      get: { tags: ["Analytics"], summary: "Get dashboard overview" },
    },
    "/analytics/monthly": {
      get: { tags: ["Analytics"], summary: "Get monthly analytics report" },
    },
    "/analytics/projects": {
      get: { tags: ["Analytics"], summary: "Get project analytics" },
    },
    "/analytics/blogs": {
      get: { tags: ["Analytics"], summary: "Get blog analytics" },
    },
    "/analytics/contact": {
      get: { tags: ["Analytics"], summary: "Get contact analytics" },
    },
    "/settings": {
      get: { tags: ["Settings"], summary: "Get public settings" },
      patch: { tags: ["Settings"], summary: "Update settings" },
    },
    "/search": {
      get: { tags: ["Search"], summary: "Search portfolio resources" },
    },
  },
};

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export default swaggerConfig;
