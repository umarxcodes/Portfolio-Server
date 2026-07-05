# Portfolio CMS Backend - Complete API Documentation

Base URL: `http://localhost:5000/api/v1`

## Authentication

### POST /auth/login
**Auth:** Public
```json
{
  "email": "admin@example.com",
  "password": "ChangeMe123!"
}
```

### GET /auth/profile
**Auth:** Admin (Bearer token)

### POST /auth/logout
**Auth:** Admin (Bearer token)
The client should discard its access token. The API does not issue refresh tokens.

### PATCH /auth/change-password
**Auth:** Admin (Bearer token)
```json
{
  "currentPassword": "ChangeMe123!",
  "newPassword": "NewPass123!",
  "confirmNewPassword": "NewPass123!"
}
```

---

## Profile

### GET /profile
**Auth:** Public
Fetch portfolio profile (auto-tracks portfolio view analytics).

### PATCH /profile
**Auth:** Admin (Bearer token)
```json
{
  "name": "Muhammad Umar",
  "title": "Full Stack Developer",
  "bio": "Passionate developer...",
  "shortBio": "Full Stack Developer",
  "email": "umar@example.com",
  "phone": "+923001234567",
  "location": "Karachi, Pakistan",
  "profileImage": "https://example.com/profile.jpg",
  "resumeUrl": "https://example.com/resume.pdf",
  "availability": true,
  "yearsOfExperience": 5,
  "socialLinks": {
    "github": "https://github.com/username",
    "linkedin": "https://linkedin.com/in/username",
    "portfolio": "https://username.dev",
    "twitter": "https://twitter.com/username"
  }
}
```

---

## Projects

### GET /projects
**Auth:** Public
Query params: `page`, `limit`, `sort`, `status`, `category`, `featured`, `search`

### GET /projects/featured
**Auth:** Public

### GET /projects/category/:category
**Auth:** Public
Categories: `frontend`, `backend`, `fullstack`, `mobile`, `devops`, `ai`, `open-source`

### GET /projects/slug/:slug
**Auth:** Public

### GET /projects/:id
**Auth:** Public

### POST /projects
**Auth:** Admin (Bearer token)
```json
{
  "title": "My Awesome Project",
  "description": "Full description...",
  "shortDescription": "Short desc",
  "techStack": ["React", "Node.js"],
  "category": "fullstack",
  "status": "completed",
  "featured": true,
  "githubUrl": "https://github.com/...",
  "liveUrl": "https://...",
  "thumbnail": "https://...",
  "images": ["https://..."],
  "startDate": "2024-01-01",
  "endDate": "2024-06-01"
}
```

### PATCH /projects/:id
**Auth:** Admin (Bearer token)
Partial update - send only fields to update.

### DELETE /projects/:id
**Auth:** Admin (Bearer token)
Soft delete.

---

## Skills

### GET /skills
**Auth:** Public
Query params: `page`, `limit`, `category`, `level`, `sort`

### GET /skills/category/:category
**Auth:** Public
Categories: `frontend`, `backend`, `database`, `devops`, `cloud`, `testing`, `tools`, `mobile`, `ai`

### GET /skills/:id
**Auth:** Public

### POST /skills
**Auth:** Admin (Bearer token)
```json
{
  "name": "React",
  "category": "frontend",
  "level": "advanced",
  "yearsOfExperience": 4,
  "icon": "https://...",
  "description": "...",
  "displayOrder": 1
}
```

### PATCH /skills/:id
**Auth:** Admin (Bearer token)
Partial update.

### DELETE /skills/:id
**Auth:** Admin (Bearer token)

---

## Experience

### GET /experience
**Auth:** Public
Query params: `page`, `limit`, `employmentType`, `isCurrent`, `technologies`, `sort`

### GET /experience/:id
**Auth:** Public

### POST /experience
**Auth:** Admin (Bearer token)
```json
{
  "company": "Tech Corp",
  "position": "Senior Developer",
  "employmentType": "full-time",
  "location": "Karachi, Pakistan",
  "description": "Leading frontend team",
  "responsibilities": ["Led team", "CI/CD"],
  "technologies": ["React", "TypeScript"],
  "startDate": "2023-01-01",
  "endDate": "2024-12-31",
  "isCurrent": false,
  "companyLogo": "https://..."
}
```

### PATCH /experience/:id
**Auth:** Admin (Bearer token)
Partial update.

### DELETE /experience/:id
**Auth:** Admin (Bearer token)

---

## Education

### GET /education
**Auth:** Public
Query params: `page`, `limit`, `sort`, `search`, `institution`, `isCurrent`

### GET /education/current
**Auth:** Public
Get current education entry.

### GET /education/:id
**Auth:** Public

### POST /education
**Auth:** Admin (Bearer token)
```json
{
  "degree": "Bachelor of Science",
  "fieldOfStudy": "Computer Science",
  "institution": "University of Karachi",
  "description": "Focused on software engineering",
  "grade": "A",
  "startDate": "2018-09-01",
  "endDate": "2022-06-01",
  "isCurrent": false,
  "location": "Karachi, Pakistan"
}
```

### PATCH /education/:id
**Auth:** Admin (Bearer token)
Partial update.

### DELETE /education/:id
**Auth:** Admin (Bearer token)

---

## Certificates

### GET /certificates
**Auth:** Public
Query params: `page`, `limit`, `sort`, `search`, `issuer`, `skill`, `expired`

### GET /certificates/:id
**Auth:** Public

### POST /certificates
**Auth:** Admin (Bearer token)
```json
{
  "name": "AWS Solutions Architect",
  "issuer": "Amazon Web Services",
  "issueDate": "2024-01-15",
  "expiryDate": "2027-01-15",
  "credentialId": "AWS-123456",
  "credentialUrl": "https://aws.amazon.com/verification/123456",
  "description": "Professional level AWS certification",
  "skills": ["AWS", "Cloud", "DevOps"],
  "badgeImage": "https://..."
}
```

### PATCH /certificates/:id
**Auth:** Admin (Bearer token)
Partial update.

### DELETE /certificates/:id
**Auth:** Admin (Bearer token)

---

## Blog

### GET /blogs
**Auth:** Public
Query params: `page`, `limit`, `sort`, `search`, `category`, `featured`
Only returns published posts.

### GET /blogs/featured
**Auth:** Public

### GET /blogs/category/:category
**Auth:** Public

### GET /blogs/tag/:tag
**Auth:** Public

### GET /blogs/slug/:slug
**Auth:** Public
Auto-increments view count.

### GET /blogs/:id
**Auth:** Admin (Bearer token)
Can fetch drafts and soft-deleted posts.

### POST /blogs
**Auth:** Admin (Bearer token)
```json
{
  "title": "Getting Started with React Hooks",
  "excerpt": "Learn the basics...",
  "content": "# Markdown content here...",
  "coverImage": "https://...",
  "tags": ["react", "javascript"],
  "category": "technology",
  "featured": true,
  "published": true,
  "seoTitle": "React Hooks Guide",
  "seoDescription": "Master React Hooks..."
}
```

### PATCH /blogs/:id
**Auth:** Admin (Bearer token)
Partial update. Auto-calculates reading time. Auto-sets publishedAt when published=true.

### DELETE /blogs/:id
**Auth:** Admin (Bearer token)
Soft delete.

---

## Contact

### POST /contact
**Auth:** Public (Rate limited: 5 per hour)
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Job Opportunity",
  "message": "Hi, I have a job opportunity..."
}
```

### GET /contact
**Auth:** Admin (Bearer token)
Query params: `page`, `limit`, `sort`, `search`, `status`, `isRead`

### GET /contact/:id
**Auth:** Admin (Bearer token)
Auto-marks as read.

### PATCH /contact/:id
**Auth:** Admin (Bearer token)
```json
{
  "status": "replied"
}
```
Status: `unread`, `read`, `replied`
Auto-sets repliedAt when status=replied.

### DELETE /contact/:id
**Auth:** Admin (Bearer token)

---

## Upload

### POST /uploads
**Auth:** Admin (Bearer token)
**Content-Type:** multipart/form-data
```
file: (binary)
folder: "profile" | "projects" | "blogs" | "certificates" | "resume"
```

### GET /uploads/:id
**Auth:** Admin (Bearer token)

### DELETE /uploads/:id
**Auth:** Admin (Bearer token)
Deletes file from disk and DB record.

---

## Analytics

### GET /analytics/overview
**Auth:** Admin (Bearer token)

### GET /analytics/projects
**Auth:** Admin (Bearer token)

### GET /analytics/blogs
**Auth:** Admin (Bearer token)

### GET /analytics/contact
**Auth:** Admin (Bearer token)

### GET /analytics/monthly
**Auth:** Admin (Bearer token)
Query params: `months` (default: 6)

### POST /analytics/track
**Auth:** Public
```json
{
  "type": "portfolio_view",
  "resourceId": null
}
```
Types: `portfolio_view`, `project_view`, `blog_view`, `contact_submit`

---

## Settings

### GET /settings
**Auth:** Public
Returns settings with defaults if none exist.

### PATCH /settings
**Auth:** Admin (Bearer token)
```json
{
  "siteTitle": "My Portfolio",
  "siteDescription": "Personal portfolio",
  "seoTitle": "My Portfolio - Developer",
  "seoDescription": "Portfolio of a full stack developer",
  "keywords": ["developer", "react"],
  "socialLinks": {
    "github": "https://...",
    "linkedin": "https://...",
    "twitter": "https://...",
    "youtube": "https://..."
  },
  "theme": "dark",
  "logo": "https://...",
  "favicon": "https://...",
  "contactEmail": "contact@example.com",
  "contactPhone": "+923001234567",
  "maintenanceMode": false
}
```

---

## Search

### GET /search
**Auth:** Public
Query params:
- `q` (required): search query
- `type` (optional): `projects`, `blogs`, `skills`, `experience`, `education`, `certificates`
- `page` (optional): default 1
- `limit` (optional): default 5, max 20

Example: `/search?q=react&page=1&limit=5`

---

## ThunderClient Import

Import the file `thunderclient/portfolio-backend.json` into ThunderClient.

### Setup Steps:
1. Open ThunderClient
2. Click "Import"
3. Select "From File"
4. Choose `thunderclient/portfolio-backend.json`
5. Set variables in ThunderClient:
   - `baseUrl`: `http://localhost:5000`
   - `accessToken`: (get from login response)
   - `projectId`, `skillId`, `experienceId`, `educationId`, `certificateId`, `blogId`, `contactId`, `uploadId`: (get from create responses)

### Test Flow:
1. **Login** - POST `/api/v1/auth/login` → Save `accessToken`
2. **Get Profile** - GET `/api/v1/profile`
3. **Create Project** - POST `/api/v1/projects` → Save `projectId`
4. **List Projects** - GET `/api/v1/projects`
5. **Create Skill** - POST `/api/v1/skills` → Save `skillId`
6. **Create Experience** - POST `/api/v1/experience` → Save `experienceId`
7. **Create Education** - POST `/api/v1/education` → Save `educationId`
8. **Create Certificate** - POST `/api/v1/certificates` → Save `certificateId`
9. **Create Blog** - POST `/api/v1/blogs` → Save `blogId`
10. **Submit Contact** - POST `/api/v1/contact` → Save `contactId`
11. **Upload File** - POST `/api/v1/uploads` → Save `uploadId`
12. **Search** - GET `/api/v1/search?q=react`
13. **Analytics** - GET `/api/v1/analytics/overview`
14. **Settings** - GET `/api/v1/settings`
