# Portfolio Backend

## Project Overview

Portfolio Backend is a production-oriented REST API for a developer portfolio. It supports public portfolio content, secure admin management, contact submissions, uploads, search, analytics, and site settings using a feature-based clean architecture.

Built by Muhammad Umar as a GitHub-ready backend portfolio project.

## Live Demo

Placeholder: `https://your-production-api.example.com`

## Tech Stack

| Area           | Technology                                  |
| -------------- | ------------------------------------------- |
| Runtime        | Node.js                                     |
| Framework      | Express.js                                  |
| Database       | MongoDB, Mongoose                           |
| Language       | JavaScript, ESM                             |
| Validation     | Zod                                         |
| Authentication | JWT, jsonwebtoken                           |
| Passwords      | bcryptjs                                    |
| Async Handling | express-async-handler                       |
| Uploads        | Multer, local storage adapter               |
| Security       | Helmet, CORS, rate limiting, mongo sanitize |
| Logging        | Morgan                                      |
| Compression    | compression                                 |

## Architecture Overview

The API uses feature-based clean architecture:

```text
Request
  -> Route
  -> Validation and Auth Middleware
  -> Controller
  -> Service
  -> Repository
  -> Mongoose Model
  -> MongoDB
```

Controllers only handle HTTP translation, services contain business rules, repositories contain database access, and shared utilities keep cross-cutting behavior consistent.

## Folder Structure

```text
src/
├── config/
├── database/
├── middlewares/
├── modules/
│   ├── analytics/
│   ├── auth/
│   ├── blog/
│   ├── certificates/
│   ├── contact/
│   ├── education/
│   ├── experience/
│   ├── profile/
│   ├── projects/
│   ├── search/
│   ├── settings/
│   ├── skills/
│   └── upload/
├── routes/
├── shared/
├── app.js
└── server.js
```

## Getting Started

Prerequisites: Node.js 20+, MongoDB Atlas or local MongoDB.

```bash
git clone <repo-url>
cd portfolio-backend
npm install
cp .env.example .env
npm run dev
```

## Environment Variables

| Variable                       | Description                             | Example                               |
| ------------------------------ | --------------------------------------- | ------------------------------------- |
| `NODE_ENV`                     | Runtime environment                     | `development`                         |
| `PORT`                         | HTTP port                               | `5000`                                |
| `MONGO_URI`                    | MongoDB connection string               | `mongodb://localhost:27017/portfolio` |
| `ACCESS_TOKEN_SECRET`          | Access token signing secret, 32+ chars  | `replace_with_32_chars_minimum`       |
| `REFRESH_TOKEN_SECRET`         | Refresh token signing secret, 32+ chars | `replace_with_32_chars_minimum`       |
| `ACCESS_TOKEN_EXPIRES_IN`      | Access token TTL                        | `15m`                                 |
| `REFRESH_TOKEN_EXPIRES_IN`     | Refresh token TTL                       | `7d`                                  |
| `BCRYPT_SALT_ROUNDS`           | Password hashing cost                   | `12`                                  |
| `CLIENT_URL`                   | Allowed client origin                   | `http://localhost:5173`               |
| `CORS_ORIGINS`                 | Comma-separated allowed origins         | `https://example.com`                 |
| `UPLOAD_ROOT`                  | Upload storage directory                | `uploads`                             |
| `IMAGE_UPLOAD_MAX_MB`          | Image upload limit                      | `5`                                   |
| `PDF_UPLOAD_MAX_MB`            | PDF upload limit                        | `10`                                  |
| `GLOBAL_RATE_LIMIT_WINDOW_MS`  | Global rate window                      | `60000`                               |
| `GLOBAL_RATE_LIMIT_MAX`        | Global requests per window              | `100`                                 |
| `CONTACT_RATE_LIMIT_WINDOW_MS` | Contact rate window                     | `3600000`                             |
| `CONTACT_RATE_LIMIT_MAX`       | Contact submissions per window          | `5`                                   |

## API Documentation

All endpoints are mounted under `/api/v1`.

| Module       | Method            | Path                           | Auth   | Description                    |
| ------------ | ----------------- | ------------------------------ | ------ | ------------------------------ |
| Auth         | POST              | `/auth/login`                  | Public | Admin login                    |
| Auth         | GET               | `/auth/profile`                | Admin  | Current admin profile          |
| Auth         | POST              | `/auth/logout`                 | Admin  | Logout and clear refresh token |
| Auth         | POST              | `/auth/refresh-token`          | Public | Rotate refresh token           |
| Auth         | PATCH             | `/auth/change-password`        | Admin  | Change password                |
| Profile      | GET               | `/profile`                     | Public | Read profile                   |
| Profile      | PATCH             | `/profile`                     | Admin  | Update profile                 |
| Projects     | GET               | `/projects`                    | Public | Paginated projects             |
| Projects     | GET               | `/projects/featured`           | Public | Featured projects              |
| Projects     | GET               | `/projects/category/:category` | Public | Projects by category           |
| Projects     | GET               | `/projects/slug/:slug`         | Public | Project by slug                |
| Projects     | POST/PATCH/DELETE | `/projects`                    | Admin  | Manage projects                |
| Skills       | GET               | `/skills`                      | Public | Paginated skills               |
| Skills       | GET               | `/skills/category/:category`   | Public | Skills by category             |
| Skills       | POST/PATCH/DELETE | `/skills`                      | Admin  | Manage skills                  |
| Experience   | GET               | `/experience`                  | Public | Paginated experience           |
| Experience   | POST/PATCH/DELETE | `/experience`                  | Admin  | Manage experience              |
| Education    | GET               | `/education`                   | Public | Paginated education            |
| Education    | POST/PATCH/DELETE | `/education`                   | Admin  | Manage education               |
| Certificates | GET               | `/certificates`                | Public | Paginated certificates         |
| Certificates | POST/PATCH/DELETE | `/certificates`                | Admin  | Manage certificates            |
| Blogs        | GET               | `/blogs`                       | Public | Paginated published posts      |
| Blogs        | GET               | `/blogs/featured`              | Public | Featured posts                 |
| Blogs        | GET               | `/blogs/category/:category`    | Public | Posts by category              |
| Blogs        | GET               | `/blogs/tag/:tag`              | Public | Posts by tag                   |
| Blogs        | GET               | `/blogs/slug/:slug`            | Public | Published post by slug         |
| Blogs        | POST/PATCH/DELETE | `/blogs`                       | Admin  | Manage posts                   |
| Contact      | POST              | `/contact`                     | Public | Submit message                 |
| Contact      | GET/PATCH/DELETE  | `/contact`                     | Admin  | Manage messages                |
| Uploads      | POST              | `/uploads`                     | Admin  | Upload file                    |
| Uploads      | GET/DELETE        | `/uploads/:id`                 | Admin  | Read or delete upload          |
| Analytics    | GET               | `/analytics/*`                 | Admin  | Analytics reports              |
| Settings     | GET               | `/settings`                    | Public | Site settings                  |
| Settings     | PATCH             | `/settings`                    | Admin  | Update settings                |
| Search       | GET               | `/search?q=`                   | Public | Global text search             |

## Authentication

Admin authentication uses short-lived access tokens and rotated refresh tokens. Access tokens expire in 15 minutes by default. Refresh tokens expire in 7 days by default and are stored hashed in MongoDB.

## File Uploads

Uploads are stored through `modules/upload/utils/storage.adapter.js`, so local storage can be swapped for S3 or Cloudinary without changing service logic.

| Folder         | MIME Types                              | Limit |
| -------------- | --------------------------------------- | ----- |
| `profile`      | `image/jpeg`, `image/png`, `image/webp` | 5 MB  |
| `projects`     | `image/jpeg`, `image/png`, `image/webp` | 5 MB  |
| `blogs`        | `image/jpeg`, `image/png`, `image/webp` | 5 MB  |
| `certificates` | `image/jpeg`, `image/png`, `image/webp` | 5 MB  |
| `resume`       | `application/pdf`                       | 10 MB |

Files are saved as `uuid + original extension`; original file names are not used on disk.

## Validation

All request bodies, params, and query inputs use Zod schemas mounted in route files through the shared `validate()` middleware. Validation errors return:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [{ "field": "email", "message": "Invalid email" }]
}
```

## Error Handling

Services throw `AppError(statusCode, message, errors)`. The global error middleware returns consistent JSON and avoids stack leakage in API responses.

## Security

Security controls include Helmet headers, CORS whitelist config, global rate limiting, contact-specific rate limiting, bcryptjs hashing, JWT rotation, MongoDB query sanitization, strict upload MIME checks, UUID file names, and env validation at startup.

## Pagination & Filtering

List endpoints support `page`, `limit`, `sort`, and module-specific filters. Limits are capped at 50.

```json
{
  "success": true,
  "message": "Items listed",
  "data": {
    "items": [],
    "pagination": {
      "total": 0,
      "page": 1,
      "limit": 10,
      "totalPages": 1,
      "hasNextPage": false,
      "hasPrevPage": false
    }
  }
}
```

## Search

Global search uses MongoDB `$text` indexes across projects, blogs, skills, experience, education, and certificates.

## Analytics

Analytics tracks portfolio views, project views, blog views, contact submissions, unique visitors, monthly views, top viewed resources, and contact timelines.

## Scripts

| Script             | Description                           |
| ------------------ | ------------------------------------- |
| `npm run dev`      | Start development server with Nodemon |
| `npm start`        | Start production server               |
| `npm run lint`     | Run ESLint                            |
| `npm run lint:fix` | Fix lintable issues                   |
| `npm run format`   | Format with Prettier                  |

## Deployment

Set production env vars, verify MongoDB network access, use strong JWT secrets, set `NODE_ENV=production`, configure `CORS_ORIGINS`, provision persistent upload storage or replace the storage adapter, and run `npm start`.

## Coding Standards

Files use structured section labels, feature modules follow Repository -> Service -> Controller, mutating routes require admin auth, controllers use `sendSuccess()`, and repositories own database access.

## Future Improvements

Add full integration tests, seed scripts, OpenAPI route generation, Cloudinary or S3 adapter, email notifications for contact submissions, and CI deployment checks.

## Author

Muhammad Umar

- LinkedIn: `https://linkedin.com/in/your-profile`
- GitHub: `https://github.com/your-username`
- Portfolio: `https://your-portfolio.example.com`
