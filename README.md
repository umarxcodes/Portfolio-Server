# Portfolio Backend API

Production-grade Node.js backend for a personal portfolio application with secure authentication, role-based authorization, Resend transactional emails, admin user management, and project CRUD.

## Project Overview

This API is built as a modular Express backend. It keeps HTTP concerns in controllers, business rules in services, persistence in Mongoose models, and shared cross-cutting behavior in middleware/utilities.

API base URL for local development:

```txt
http://localhost:5000/api/v1
```

Health check:

```txt
GET http://localhost:5000/
```

## Features

- User registration with bcrypt password hashing.
- Email verification through Resend.
- Login with JWT access and refresh tokens.
- Access token expiry: 15 minutes.
- Refresh token expiry: 7 days.
- Refresh token rotation on every refresh request.
- HTTP-only cookies for access and refresh tokens.
- Forgot password and reset password with hashed recovery tokens.
- Password change with old-password verification.
- Token invalidation after password changes using `passwordChangedAt`.
- Login attempt tracking and 15-minute account lock after 5 failed attempts.
- Role-based access control for `user` and `admin`.
- Admin user listing, role changes, blocking, and deletion.
- Portfolio project CRUD with auto slug generation.
- Public project reads with pagination, filters, featured projects, and view counter.
- Admin project listing, status updates, and featured toggles.
- Skills management with categorization and proficiency levels.
- Featured skills highlighting on portfolio homepage.
- Experience management with timeline and employment types.
- Analytics event tracking for portfolio, profile, and project views.
- Analytics dashboard with daily, weekly, and monthly summaries.
- Contact message submission with admin inbox workflows.
- Cloudinary uploads for avatars, resumes, and project images.
- Resume download tracking.
- Zod validation for body, params, cookies, and query strings.
- Centralized `ApiError` and `ApiResponse` response patterns.
- Helmet, CORS, request size limits, rate limiting, and MongoDB operator sanitization.

## Tech Stack

| Tool                   | Version |
| ---------------------- | ------- |
| Node.js                | 22+     |
| Express                | ^5.2.1  |
| Mongoose               | ^9.6.2  |
| Zod                    | ^4.4.3  |
| bcrypt                 | ^6.0.0  |
| jsonwebtoken           | ^9.0.3  |
| Resend                 | ^6.12.4 |
| Cloudinary             | ^2.10.0 |
| Multer                 | ^2.1.1  |
| nanoid                 | ^5.1.11 |
| Helmet                 | ^8.2.0  |
| CORS                   | ^2.8.6  |
| cookie-parser          | ^1.4.7  |
| express-rate-limit     | ^8.5.2  |
| express-mongo-sanitize | ^2.2.0  |

## Architecture Overview

Request flow:

```txt
Client -> app.js middleware -> routes/index.js -> module route -> validateRequest/auth middleware -> controller -> service -> model -> response/error handler
```

Layer rules:

- Controllers are thin and only handle HTTP request/response mapping.
- Services contain business logic and throw `ApiError` for expected failures.
- Models define persistence shape, hooks, schema methods, and indexes.
- Validation schemas live beside the module they protect.
- Shared utilities live in `src/utils`.
- Shared middleware lives in `src/middlewares`.
- Environment values are validated once at startup in `src/config/env.js`.

## Folder Structure

```txt
src/
├── app.js                         # Express app, security middleware, route mounting
├── server.js                      # DB connection, HTTP server, shutdown handlers
├── config/
│   ├── cloudinary.js                # Cloudinary upload/delete helpers
│   ├── db.js                      # Mongoose connection
│   ├── email.js                   # Configured Resend client
│   ├── env.js                     # Zod environment validation
│   └── logger.js                  # Logger abstraction
├── constants/
│   └── index.js                   # Shared roles and cookie names
├── middlewares/
│   ├── globalErrorHandler.js      # Centralized error formatter
│   ├── multer.middleware.js       # Memory upload middleware and file validation
│   ├── notFound.js                # 404 handler
│   └── validateRequest.js         # Zod validation middleware
├── modules/
│   ├── analytics/
│   │   ├── analytics.controller.js    # Analytics HTTP handlers
│   │   ├── analytics.model.js         # Analytics event schema and indexes
│   │   ├── analytics.route.js         # Analytics route definitions
│   │   ├── analytics.service.js       # Analytics business logic
│   │   └── analytics.validation.js    # Analytics Zod schemas
│   ├── auth/
│   │   ├── auth.constants.js      # Token expiry and login lock constants
│   │   ├── auth.controller.js     # Auth HTTP handlers
│   │   ├── auth.middleware.js     # authenticateUser and authorizeRoles
│   │   ├── auth.route.js          # Auth route definitions
│   │   ├── auth.service.js        # Auth business logic
│   │   ├── auth.utils.js          # Token hashing and user sanitizing
│   │   └── auth.validation.js     # Auth Zod schemas
│   ├── contact/
│   │   ├── contact.controller.js  # Contact HTTP handlers
│   │   ├── contact.model.js       # Contact schema and inbox indexes
│   │   ├── contact.route.js       # Public contact and admin inbox routes
│   │   ├── contact.service.js     # Contact email and admin workflow logic
│   │   └── contact.validation.js  # Contact Zod schemas
│   ├── experience/
│   │   ├── experience.controller.js   # Experience HTTP handlers
│   │   ├── experience.model.js        # Experience schema and indexes
│   │   ├── experience.route.js        # Experience route definitions
│   │   ├── experience.service.js      # Experience business logic
│   │   └── experience.validation.js   # Experience Zod schemas
│   ├── project/
│   │   ├── project.admin.route.js # Admin-only project routes
│   │   ├── project.controller.js  # Project HTTP handlers
│   │   ├── project.model.js       # Project schema, indexes, slug hook
│   │   ├── project.route.js       # Public and owner project routes
│   │   ├── project.service.js     # Project business logic
│   │   └── project.validation.js  # Project Zod schemas
│   ├── skill/
│   │   ├── skill.controller.js    # Skill HTTP handlers
│   │   ├── skill.model.js         # Skill schema and indexes
│   │   ├── skill.route.js         # Skill route definitions
│   │   ├── skill.service.js       # Skill business logic
│   │   └── skill.validation.js    # Skill Zod schemas
│   ├── upload/
│   │   ├── upload.controller.js   # Upload HTTP handlers
│   │   ├── upload.route.js        # Upload route definitions
│   │   └── upload.service.js      # Cloudinary upload business logic
│   └── user/
│       ├── user.controller.js     # Admin user HTTP handlers
│       ├── user.model.js          # User schema, methods, indexes
│       ├── user.route.js          # Admin user route definitions
│       ├── user.service.js        # Admin user business logic
│       └── user.validation.js     # Admin user Zod schemas
├── routes/
│   └── index.js                   # Versioned API route composer
├── utils/
│   ├── ApiError.js                # Operational error class
│   ├── ApiResponse.js             # Success response wrapper
│   ├── catchAsync.js              # Async Express wrapper
│   ├── emailTemplates.js          # Resend HTML templates
│   ├── generateToken.js           # JWT signing helper
│   ├── sendEmail.js               # Resend email sender
│   └── sendToken.js               # Auth cookie and token response helper
└── validations/
    └── common.validation.js       # Shared ObjectId and token schemas
```

## Getting Started

### Prerequisites

- Node.js 22+
- Yarn 1.x
- MongoDB database
- Resend account and API key

### Installation

```bash
git clone <repository-url>
cd portfolio-backend
yarn install
cp .env.example .env
```

Update `.env`, then start the API:

```bash
yarn dev
```

Production start:

```bash
yarn start
```

## Environment Variables

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio-backend
ACCESS_TOKEN_SECRET=replace_with_at_least_32_characters_access_secret
REFRESH_TOKEN_SECRET=replace_with_at_least_32_characters_refresh_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=12
CLIENT_URL=http://localhost:5173
COOKIE_DOMAIN=
RESEND_API_KEY=re_your_resend_api_key
# For development: use onboarding@resend.dev (pre-verified)
# For production: verify your domain at resend.com/domains and use your verified sender
EMAIL_FROM=Portfolio API <onboarding@resend.dev>
```

| Variable                   | Required | Description                                      |
| -------------------------- | -------- | ------------------------------------------------ |
| `NODE_ENV`                 | Yes      | `development`, `test`, or `production`           |
| `PORT`                     | Yes      | HTTP port, default `5000`                        |
| `MONGODB_URI`              | Yes      | MongoDB connection string                        |
| `ACCESS_TOKEN_SECRET`      | Yes      | 32+ character JWT access-token secret            |
| `REFRESH_TOKEN_SECRET`     | Yes      | 32+ character JWT refresh-token secret           |
| `CLOUDINARY_CLOUD_NAME`    | Yes      | Cloudinary account cloud name                    |
| `CLOUDINARY_API_KEY`       | Yes      | Cloudinary API key                               |
| `CLOUDINARY_API_SECRET`    | Yes      | Cloudinary API secret                            |
| `ACCESS_TOKEN_EXPIRES_IN`  | Yes      | Must be `15m`                                    |
| `REFRESH_TOKEN_EXPIRES_IN` | Yes      | Must be `7d`                                     |
| `BCRYPT_SALT_ROUNDS`       | Yes      | Must be between `12` and `15`                    |
| `CLIENT_URL`               | Yes      | Frontend base URL used in email links and CORS   |
| `COOKIE_DOMAIN`            | No       | Optional cookie domain for production deployment |
| `RESEND_API_KEY`           | Yes      | Resend API key, must start with `re_`            |
| `EMAIL_FROM`               | Yes      | Verified Resend sender address                   |

### Frontend Integration Notes

- `CLIENT_URL` must be the public frontend origin with no trailing slash. It is used for CORS and for email links such as `/verify-email/:token` and `/reset-password/:token`.
- Production auth cookies use `SameSite=None` and `Secure=true` so the deployed React app can call the deployed API with `credentials: "include"`.
- If Resend is running in a testing or unverified-domain mode, registration still succeeds. The API returns `emailSent: false` and `emailError: "testing_restriction"` so the frontend can show a non-blocking message and a resend option.

## File Upload System

This backend supports Cloudinary-based file uploads for avatars, resumes, and project assets.

### Setup

1. Create a Cloudinary account.
2. Add `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` to `.env`.
3. Restart the application so `src/config/env.js` validates the values at startup.

### Upload Endpoints

| Method   | Route                                | Auth   | Field Name                       | Size Limit         | Supported Types           |
| -------- | ------------------------------------ | ------ | -------------------------------- | ------------------ | ------------------------- |
| `POST`   | `/upload/avatar`                     | User   | `avatar`                         | 5MB                | JPEG, PNG, WEBP, GIF, SVG |
| `POST`   | `/upload/resume`                     | User   | `resume`                         | 10MB               | PDF                       |
| `POST`   | `/upload/projects/:projectId/images` | User   | `images`                         | 5 files / 5MB each | JPEG, PNG, WEBP, GIF, SVG |
| `GET`    | `/upload/resume/download`            | Public | query: `username` or `userId`    | N/A                | PDF resume URL            |
| `DELETE` | `/upload/file`                       | Admin  | body: `publicId`, `resourceType` | N/A                | image/raw                 |

### How Resume Download Tracking Works

- Resumes are stored in Cloudinary as `raw` assets.
- When a public download URL is requested, the backend increments `resumeDownloads` on the user document.
- The endpoint returns the direct Cloudinary `resumeUrl` for client download tracking.

## Available Scripts

| Script          | Description            |
| --------------- | ---------------------- |
| `yarn dev`      | Run with Nodemon       |
| `yarn start`    | Run production server  |
| `yarn lint`     | Run ESLint             |
| `yarn lint:fix` | Auto-fix lint issues   |
| `yarn format`   | Format supported files |

## Authentication Flow

1. Register creates a user with a hashed password and hashed verification token.
2. Resend sends the raw verification token inside the email URL.
3. Verification hashes the incoming token, checks expiry, marks `isVerified`, and clears token fields.
4. Login verifies bcrypt password, checks account lock, resets `loginAttempts`, creates a refresh token, and sends auth cookies.
5. Refresh verifies the refresh cookie, rejects stale tokens, rotates the refresh token, and sends fresh cookies.
6. Logout removes the stored refresh token and clears auth cookies.
7. Forgot password stores only a hashed reset token and sends the raw token by email.
8. Reset password validates the reset token, updates the password, clears reset fields, and invalidates refresh sessions.
9. Change password verifies the old password before updating and invalidating sessions.

## API Reference

All routes are prefixed with `/api/v1`.

### Auth Routes

| Method  | Route                         | Auth           | Description                                | Request Body                                    | Success Response                   |
| ------- | ----------------------------- | -------------- | ------------------------------------------ | ----------------------------------------------- | ---------------------------------- |
| `POST`  | `/auth/register`              | No             | Create account and send verification email | `{ username, email, password, avatar? }`        | `201 { user, verificationToken? }` |
| `POST`  | `/auth/login`                 | No             | Login and issue cookies/tokens             | `{ email, password }`                           | `200 { user, accessToken }`        |
| `POST`  | `/auth/refresh-token`         | Refresh cookie | Rotate refresh token                       | Cookie only                                     | `200 { user, accessToken }`        |
| `POST`  | `/auth/forgot-password`       | No             | Send reset email if account exists         | `{ email }`                                     | `200 { resetToken? }`              |
| `POST`  | `/auth/reset-password/:token` | No             | Reset password with token                  | `{ password, confirmPassword }`                 | `200 null`                         |
| `GET`   | `/auth/verify-email/:token`   | No             | Verify email address                       | None                                            | `200 { user }`                     |
| `POST`  | `/auth/resend-verification`   | No             | Send a fresh verification email            | `{ email }`                                     | `200 { verificationToken? }`       |
| `POST`  | `/auth/logout`                | User/Admin     | Clear DB refresh token and cookies         | None                                            | `200 null`                         |
| `PATCH` | `/auth/change-password`       | User/Admin     | Change password after old password check   | `{ oldPassword, newPassword, confirmPassword }` | `200 null`                         |
| `GET`   | `/auth/me`                    | User/Admin     | Get current profile                        | None                                            | `200 { user }`                     |
| `PATCH` | `/auth/update-profile`        | User/Admin     | Update profile fields                      | `{ username?, avatar? }`                        | `200 { user }`                     |

### Admin User Routes

| Method   | Route                    | Auth  | Description            | Request Body                  | Success Response    |
| -------- | ------------------------ | ----- | ---------------------- | ----------------------------- | ------------------- |
| `GET`    | `/admin/users`           | Admin | List users             | None                          | `200 { users: [] }` |
| `PATCH`  | `/admin/change-role/:id` | Admin | Change user role       | `{ role: "user" \| "admin" }` | `200 { user }`      |
| `PATCH`  | `/admin/block-user/:id`  | Admin | Block user temporarily | `{ blockedUntil? }`           | `200 { user }`      |
| `DELETE` | `/admin/delete-user/:id` | Admin | Delete user            | None                          | `200 null`          |

### Public Project Routes

| Method | Route                  | Auth | Description                             | Query                                                        | Success Response                                        |
| ------ | ---------------------- | ---- | --------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| `GET`  | `/projects`            | No   | List published projects                 | `page, limit, category, featured, search, sortBy, sortOrder` | `200 { projects, totalCount, totalPages, currentPage }` |
| `GET`  | `/projects/featured`   | No   | List featured published projects        | None                                                         | `200 { projects }`                                      |
| `GET`  | `/projects/slug/:slug` | No   | Get project by slug and increment views | None                                                         | `200 { project }`                                       |

### Protected Project Routes

| Method   | Route                   | Auth        | Description                  | Request Body         | Success Response                                        |
| -------- | ----------------------- | ----------- | ---------------------------- | -------------------- | ------------------------------------------------------- |
| `POST`   | `/projects`             | User/Admin  | Create project               | Project body         | `201 { project }`                                       |
| `GET`    | `/projects/my-projects` | User/Admin  | List current user's projects | Query params         | `200 { projects, totalCount, totalPages, currentPage }` |
| `PATCH`  | `/projects/:id`         | Owner/Admin | Update project               | Partial project body | `200 { project }`                                       |
| `DELETE` | `/projects/:id`         | Owner/Admin | Delete project               | None                 | `200 { message }`                                       |

### Admin Project Routes

| Method  | Route                          | Auth  | Description                       | Request Body | Success Response                                        |
| ------- | ------------------------------ | ----- | --------------------------------- | ------------ | ------------------------------------------------------- |
| `GET`   | `/admin/projects`              | Admin | List all projects with any status | Query params | `200 { projects, totalCount, totalPages, currentPage }` |
| `GET`   | `/admin/projects/:id`          | Admin | Get project by id                 | None         | `200 { project }`                                       |
| `PATCH` | `/admin/projects/:id/featured` | Admin | Toggle featured flag              | None         | `200 { project }`                                       |
| `PATCH` | `/admin/projects/:id/status`   | Admin | Update project status             | `{ status }` | `200 { project }`                                       |

### Skills Routes

| Method  | Route                    | Auth        | Description                | Request Body                  | Success Response                                        |
| ------- | ------------------------ | ----------- | ------------------------ | ----------------------------- | ----------------------------------------------------- |
| `GET`   | `/skills`                | No          | List all skills          | Query: `page, limit, category, featured, search, sortBy, sortOrder` | `200 { skills, totalCount, totalPages, currentPage }` |
| `GET`   | `/skills/featured`       | No          | List featured skills    | None                          | `200 { skills }`                                        |
| `GET`   | `/skills/category/:category` | No      | Filter skills by category | Query params                 | `200 { skills }`                                        |
| `GET`   | `/skills/:id`            | No          | Get skill by id          | None                          | `200 { skill }`                                         |
| `POST`  | `/skills`                | Admin       | Create skill             | Skill body (see below)        | `201 { skill }`                                         |
| `PATCH` | `/skills/:id`            | Admin       | Update skill             | Partial skill body            | `200 { skill }`                                         |
| `DELETE`| `/skills/:id`            | Admin       | Delete skill             | None                          | `200 { message }`                                       |

Skill body:

```json
{
  "name": "Node.js",
  "category": "Backend",
  "proficiencyLevel": "Expert",
  "icon": "https://example.com/icon.png",
  "featured": true,
  "displayOrder": 1
}
```

Categories: `Backend`, `Frontend`, `Database`, `DevOps`, `Tools`, `Other`.

Proficiency levels: `Beginner`, `Intermediate`, `Advanced`, `Expert`.

### Experience Routes

| Method  | Route                    | Auth        | Description                | Request Body                  | Success Response                                        |
| ------- | ------------------------ | ----------- | ------------------------ | ----------------------------- | ----------------------------------------------------- |
| `GET`   | `/experiences`           | No          | List all experiences     | Query params                  | `200 { experiences, totalCount, totalPages, currentPage }` |
| `GET`   | `/experiences/featured`  | No          | List featured experiences| None                          | `200 { experiences }`                                     |
| `GET`   | `/experiences/:id`       | No          | Get experience by id       | None                          | `200 { experience }`                                      |
| `POST`  | `/experiences`           | Admin       | Create experience          | Experience body (see below)   | `201 { experience }`                                      |
| `PATCH` | `/experiences/:id`       | Admin       | Update experience          | Partial experience body       | `200 { experience }`                                      |
| `DELETE`| `/experiences/:id`       | Admin       | Delete experience          | None                          | `200 { message }`                                         |

Experience body:

```json
{
  "company": "Tech Corp",
  "title": "Senior Developer",
  "location": "Remote",
  "employmentType": "Full-time",
  "description": "Led development of portfolio platform.",
  "technologies": ["Node.js", "Express", "MongoDB"],
  "startDate": "2022-01-01",
  "endDate": "2024-06-01",
  "current": false,
  "achievements": ["Built 50+ projects"],
  "companyLogo": "https://example.com/logo.png",
  "featured": true,
  "displayOrder": 1
}
```

Employment types: `Full-time`, `Part-time`, `Contract`, `Freelance`, `Internship`, `Apprenticeship`, `Self-employed`.

### Analytics Routes

| Method | Route                    | Auth  | Description              | Request Body                  | Success Response                              |
| ------ | -------------------------- | ----- | ------------------------ | ----------------------------- | ------------------------------------------- |
| `GET`  | `/analytics/summary`       | Admin | Dashboard summary        | None                          | `200 { summary }`                             |
| `GET`  | `/analytics/daily`         | Admin | Daily analytics          | Query: `startDate, endDate, type` | `200 { analytics }`                       |
| `GET`  | `/analytics/weekly`        | Admin | Weekly analytics         | Query params                  | `200 { analytics }`                           |
| `GET`  | `/analytics/monthly`       | Admin | Monthly analytics        | Query params                  | `200 { analytics }`                           |
| `POST` | `/analytics/track/portfolio-view` | No | Track portfolio view | `{ path?, referrer? }`        | `201 "Portfolio view tracked successfully"`   |
| `POST` | `/analytics/track/profile-view`   | No | Track profile view    | `{ userId?, username? }`      | `201 "Profile view tracked successfully"`     |
| `POST` | `/analytics/track/project-view/:projectId` | No | Track project view | None                          | `201 "Project view tracked successfully"`   |

## Request Examples

Register:

```json
{
  "username": "Muhammad Umar",
  "email": "muhammadumar.code@gmail.com",
  "password": "Password@123"
}
```

Login:

```json
{
  "email": "muhammadumar.code@gmail.com",
  "password": "Password@123"
}
```

Create project:

```json
{
  "title": "Portfolio API",
  "description": "A production-grade portfolio backend API.",
  "content": "Detailed project content for the portfolio project page.",
  "techStack": ["Node.js", "Express", "MongoDB"],
  "category": "backend",
  "status": "published",
  "featured": true,
  "coverImage": "https://example.com/cover.png",
  "images": ["https://example.com/screenshot.png"],
  "liveUrl": "https://api.example.com",
  "githubUrl": "https://github.com/username/repo",
  "tags": ["api", "auth", "mongodb"]
}
```

## Middleware Reference

| Middleware               | Purpose                                     |
| ------------------------ | ------------------------------------------- |
| `helmet()`               | Adds security headers                       |
| `cors()`                 | Restricts browser access to `CLIENT_URL`    |
| `express.json()`         | Parses JSON with `10kb` limit               |
| `cookieParser()`         | Reads auth cookies before routes            |
| `express-mongo-sanitize` | Removes MongoDB operator injection keys     |
| `express-rate-limit`     | Limits login attempts at HTTP layer         |
| `validateRequest`        | Validates Zod schemas before controllers    |
| `authenticateUser`       | Verifies access-token cookie and loads user |
| `authorizeRoles`         | Enforces RBAC                               |
| `notFound`               | Converts unmatched routes to 404            |
| `globalErrorHandler`     | Formats all thrown errors                   |

## Validation Strategy

- Zod validates body, params, cookies, and query strings.
- Parsed body, params, and cookies replace request values.
- Parsed query values are stored on `req.validatedQuery` because Express exposes `req.query` through a getter.
- Passwords require at least 8 characters, uppercase, lowercase, number, and special character.
- Project arrays are bounded: max 20 technologies, max 10 images, max 20 tags.
- MongoDB ObjectIds are validated before they reach Mongoose.

## Error Handling Strategy

All operational errors should be thrown as `ApiError`.

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "path": "body.email",
      "message": "Invalid email address"
    }
  ]
}
```

Production hides stack traces and unknown internal error details.

## Security Implementation

- JWTs are signed with HS256.
- JWT secrets are required from environment variables.
- Refresh tokens are rotated and stored server-side for replay protection.
- Password changes invalidate older access and refresh tokens.
- Passwords and token fields use `select: false`.
- Passwords are hashed with bcrypt using 12+ salt rounds.
- Email verification and reset tokens are stored as SHA-256 hashes.
- Registration rolls back if the verification email cannot be delivered.
- Undelivered reset and verification resend tokens are cleared.
- Notification email failures are logged but do not undo completed auth actions.
- Dynamic values in email templates are HTML-escaped.
- Auth cookies are `httpOnly`, `sameSite: strict`, and `secure` in production.
- CORS is restricted to `CLIENT_URL`.
- Login route has rate limiting plus service-level account lockout.
- MongoDB operator sanitization is applied globally.

## Database Design

### User Collection

Key fields:

- `username`, `email`, `password`, `role`, `avatar`
- `isVerified`
- `refreshToken`
- `verificationToken`, `verificationTokenExpiry`
- `resetPasswordToken`, `resetPasswordTokenExpiry`
- `lastLogin`, `loginAttempts`, `blockedUntil`, `passwordChangedAt`

Indexes:

- Unique email index.
- Verification token lookup index.
- Reset password token lookup index.
- Role plus creation date index for admin reads.

### Project Collection

Key fields:

- `title`, `slug`, `description`, `content`
- `techStack`, `category`, `status`, `featured`
- `coverImage`, `images`, `liveUrl`, `githubUrl`
- `author`, `views`, `likes`, `tags`

Indexes:

- Unique slug index.
- Published/featured/date index.
- Status/category/date index.
- Author/date index.
- Tag index.
- Text index across title, description, and tags.

### Skill Collection

Key fields:

- `name`, `category`, `proficiencyLevel`, `icon`
- `featured`, `displayOrder`

Indexes:

- Unique compound index on `name` and `category`.
- Category and display order index.
- Featured and display order index.

### Experience Collection

Key fields:

- `company`, `title`, `location`, `employmentType`
- `description`, `technologies`, `startDate`, `endDate`, `current`
- `achievements`, `companyLogo`, `featured`, `displayOrder`

Indexes:

- Display order and start date index.
- Featured and display order index.
- Employment type and display order index.

Pre-save hook clears `endDate` when `current` is true.

### Analytics Collection

Key fields:

- `type`, `resourceId`, `resourceType`
- `metadata`, `ipAddress`, `userAgent`, `occurredAt`

Indexes:

- Type and occurred date index.
- Resource type and resource ID index.

## Deployment Guide

### Traditional Server Deployment

1. Create a production MongoDB database (MongoDB Atlas recommended).
2. Verify a Resend sending domain or use `onboarding@resend.dev` for development.
3. Set all required environment variables.
4. Set `NODE_ENV=production`.
5. Set `CLIENT_URL` to the production frontend URL.
6. Set `COOKIE_DOMAIN` only when cookies must be shared across subdomains.
7. Run `yarn start` behind a process manager or container platform.

### Vercel Serverless Deployment

This backend supports Vercel serverless deployment. Requirements:
- MongoDB Atlas (serverless needs connection-per-request pattern)
- All environment variables set in Vercel dashboard

Deploy steps:

```bash
npm install -g vercel
vercel
```

Or link to GitHub for automatic deployments via Vercel dashboard.

The `api/index.js` serves as the serverless entry point, connecting to MongoDB on each request.

## Docker Setup

Build and run:

```bash
docker compose up --build
```

The container expects `.env` to contain a reachable `MONGODB_URI`. The Compose file runs only the backend service; use MongoDB Atlas or add a MongoDB service for local container-only development.

## CI/CD Overview

Recommended pipeline:

```txt
install -> lint -> node syntax check -> build docker image -> run container healthcheck -> deploy
```

Minimum checks:

```bash
yarn install --frozen-lockfile
yarn lint
find src -name '*.js' -exec node --check {} \;
```

## Testing

Recommended libraries:

- Jest or Node test runner for unit tests.
- Supertest for HTTP integration tests.
- mongodb-memory-server for isolated database tests.

Recommended structure:

```txt
tests/
├── analytics/
│   ├── analytics.service.test.js
│   └── analytics.routes.test.js
├── auth/
│   ├── auth.service.test.js
│   └── auth.routes.test.js
├── experience/
│   ├── experience.service.test.js
│   └── experience.routes.test.js
├── project/
│   ├── project.service.test.js
│   └── project.routes.test.js
├── skill/
│   ├── skill.service.test.js
│   └── skill.routes.test.js
├── user/
│   └── user.routes.test.js
└── utils/
    ├── generateToken.test.js
    └── emailTemplates.test.js
```

Critical test cases:

- Register -> verify email -> login -> refresh -> logout.
- Weak password returns Zod validation error.
- Duplicate email returns `409`.
- Failed login increments `loginAttempts`.
- 5 failed logins locks account for 15 minutes.
- Reusing an old refresh token after rotation returns `401`.
- Password change invalidates old tokens.
- User cannot access admin routes.
- Owner can update own project.
- Non-owner cannot update another user's project.
- Admin can update project status and featured state.
- Invalid ObjectId returns `400`.
- Search with special characters does not crash.
- Resend failure rolls back register token/account state.
- Analytics tracking creates events for portfolio/profile/project views.
- Skills cannot be duplicated within the same category.
- Experience date validation requires endDate when current is false.
- Featured skills and experiences are filterable via query.
- Skill creation validates required category and proficiencyLevel.
- Experience with invalid employmentType returns validation error.
- Analytics date range queries return correct aggregations.

## Thunder Client Notes

Use this exact login URL:

```http
POST http://localhost:5000/api/v1/auth/login
```

Do not add a trailing space. If Thunder Client shows `/login%20`, remove the hidden space at the end of the URL.

Use a valid email for validation:

```txt
muhammadumar.code@gmail.com
```

`muhammadumar.code@gmaillcom` is not valid because it is missing the dot before `com`.

## Future Roadmap

- Automated test suite with coverage reports.
- CI workflow for lint, test, Docker build, and deployment.

## Troubleshooting

### Email not sending during registration

**Error:** `You can only send testing emails to your own email address`

When using `onboarding@resend.dev` (Resend's test sender), emails can only be sent to the address registered with your Resend account.

**Solutions:**
1. For local testing: Register with your Resend account email
2. For production: Verify your domain at [resend.com/domains](https://resend.com/domains) and use your verified sender

**Error:** `The gmail.com domain is not verified`

Resend requires verified domains. For development, use the pre-verified test sender:

```env
EMAIL_FROM=Portfolio API <onboarding@resend.dev>
```

### Cookies not being set

Ensure `CLIENT_URL` matches your frontend URL exactly. Cookies are `httpOnly`, `sameSite: strict`, and `secure` in production.

## License

MIT
