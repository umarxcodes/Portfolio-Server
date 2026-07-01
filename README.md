# Portfolio CMS Backend

**Production-grade REST API for a single-administrator portfolio website.**

## Overview

Portfolio Backend is a secure, scalable REST API designed for managing personal portfolio content. It follows enterprise engineering standards with a modular feature-based architecture.

**Key Features:**
- Single administrator authentication (minimal surface area)
- Public read-only APIs for portfolio content
- Admin-only write endpoints for content management
- File upload with validation and UUID naming
- Built-in analytics tracking
- Full-text search across all content types

## Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Runtime | Node.js | 20+ |
| Framework | Express.js | 5.x |
| Database | MongoDB + Mongoose | 7.x / 9.x |
| Language | JavaScript ESM | - |
| Validation | Zod | 4.x |
| Authentication | JWT | - |
| Passwords | bcryptjs | - |
| File Uploads | Multer | - |
| Security | Helmet, CORS, express-rate-limit, express-mongo-sanitize | - |
| Logging | Morgan | - |
| Compression | compression | - |

## Architecture

```
Request → Route → Validation → Auth → Controller → Service → Repository → Model → MongoDB
```

### Layer Responsibilities

| Layer | Responsibility |
|-------|---------------|
| **Router** | HTTP method, path, middleware composition |
| **Validation** | Input sanitization with Zod schemas |
| **Auth Middleware** | JWT verification and user attachment |
| **Controller** | HTTP req/res translation only |
| **Service** | Business logic and orchestration |
| **Repository** | Database query abstractions |

## Project Structure

```
src/
├── app.js                    # Express app configuration
├── server.js                 # HTTP server and graceful shutdown
├── routes/
│   └── index.js             # Central route registry (/api/v1)
├── config/
│   ├── env.js               # Zod-validated environment variables
│   ├── database.js          # MongoDB connection with retry logic
│   ├── cors.js              # CORS whitelist configuration
│   ├── helmet.js            # Security headers
│   ├── compression.js       # Response compression
│   ├── logger.js            # Morgan request logging
│   ├── multer.js            # File upload middleware factory
│   ├── upload.js            # Upload constraints
│   └── rateLimiter.js       # Rate limiting rules
├── middlewares/
│   ├── auth.middleware.js   # JWT authentication guard
│   ├── error.middleware.js  # Global error handler
│   ├── validation.middleware.js # Zod wrapper
│   ├── rateLimit.middleware.js # Rate limit middleware
│   ├── upload.middleware.js # File upload middleware
│   └── notFound.middleware.js # 404 handler
├── shared/
│   ├── errors/
│   │   └── index.js         # AppError class
│   └── utils/
│       ├── asyncHandler.js  # Async wrapper utility
│       ├── pagination.js    # Pagination helper
│       ├── queryBuilder.js  # Filter/sort/search builders
│       ├── response.js      # JSON response helpers
│       ├── validation.js    # Zod validation wrapper
│       ├── jwt.js           # JWT utilities
│       ├── password.js      # Bcrypt utilities
│       ├── upload.js        # Upload helpers
│       └── slug.js          # URL slug generation
└── modules/
    ├── auth/                # Admin authentication
    ├── profile/             # Personal profile
    ├── projects/            # Project portfolio
    ├── skills/              # Technical skills
    ├── experience/          # Work experience
    ├── education/           # Educational background
    ├── certificates/        # Certifications
    ├── blog/                # Blog posts
    ├── contact/             # Contact form
    ├── upload/              # File management
    ├── analytics/           # Usage analytics
    ├── settings/            # Site configuration
    └── search/              # Global search
```

## Quick Start

### Prerequisites

- Node.js 20+
- MongoDB 7+ (local or Atlas)
- npm or yarn

### Installation

```bash
git clone https://github.com/muhammadumar-codes/portfolio-backend.git
cd portfolio-backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run seed:admin
npm run dev
```

### Development Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Development server with Nodemon |
| `npm run start` | Production server |
| `npm run seed:admin` | Create initial admin user |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Auto-fix lint issues |
| `npm run format` | Format with Prettier |

## Environment Variables

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| `NODE_ENV` | No | Runtime environment | `development` |
| `PORT` | No | HTTP port | `5000` |
| `MONGO_URI` | Yes | MongoDB connection string | - |
| `MONGO_MAX_POOL_SIZE` | No | Max connection pool | `10` |
| `MONGO_MIN_POOL_SIZE` | No | Min connection pool | `0` |
| `MONGO_CONNECT_RETRIES` | No | MongoDB retry attempts | `3` |
| `MONGO_CONNECT_RETRY_DELAY_MS` | No | Retry delay (ms) | `2000` |
| `ACCESS_TOKEN_SECRET` | Yes | JWT signing secret (32+ chars) | - |
| `ACCESS_TOKEN_EXPIRES_IN` | No | JWT expiry duration | `24h` |
| `BCRYPT_SALT_ROUNDS` | No | Password hashing cost (10-15) | `12` |
| `JSON_BODY_LIMIT` | No | JSON payload limit | `1mb` |
| `URL_ENCODED_BODY_LIMIT` | No | URL-encoded payload limit | `1mb` |
| `TRUST_PROXY` | No | Trust proxy headers | `false` |
| `CLIENT_URL` | No | Frontend origin | - |
| `CORS_ORIGINS` | No | Comma-separated origins | - |
| `UPLOAD_ROOT` | No | Upload storage path | `uploads` |
| `GLOBAL_RATE_LIMIT_MAX` | No | Requests per window | `100` |
| `GLOBAL_RATE_LIMIT_WINDOW_MS` | No | Window duration (ms) | `60000` |
| `CONTACT_RATE_LIMIT_MAX` | No | Contact submissions per window | `5` |
| `CONTACT_RATE_LIMIT_WINDOW_MS` | No | Contact window (1hr) | `3600000` |

## API Reference

All endpoints are prefixed with `/api/v1`.

---

### Authentication

Token-based authentication using JWT. Login returns an access token (24h expiry by default).

```bash
# Login
curl -X POST /api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"yourpassword"}'

# Use token
curl -H "Authorization: Bearer <token>" /api/v1/auth/profile
```

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/login` | Public | Login, returns JWT token |
| GET | `/auth/profile` | Admin | Get current admin profile |
| POST | `/auth/logout` | Admin | Logout (client discards token) |
| PATCH | `/auth/change-password` | Admin | Change password |

---

### Profile

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/profile` | Public | Get profile (tracks view) |
| PATCH | `/profile` | Admin | Update profile |

---

### Projects

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/projects` | Public | List paginated (`?page=&limit=&sort=&status=&category=&featured=`) |
| GET | `/projects/featured` | Public | Featured projects |
| GET | `/projects/category/:category` | Public | Filter by category |
| GET | `/projects/slug/:slug` | Public | Get by slug (tracks view) |
| GET | `/projects/:id` | Public | Get by MongoDB ID |
| POST | `/projects` | Admin | Create project |
| PATCH | `/projects/:id` | Admin | Update project |
| DELETE | `/projects/:id` | Admin | Soft delete project |

**Categories:** `frontend`, `backend`, `fullstack`, `mobile`, `devops`, `ai`, `open-source`

**Statuses:** `completed`, `in-progress`, `planned`, `archived`

---

### Skills

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/skills` | Public | List skills with grouping |
| GET | `/skills/category/:category` | Public | Filter by category |
| POST | `/skills` | Admin | Create skill |
| PATCH | `/skills/:id` | Admin | Update skill |
| DELETE | `/skills/:id` | Admin | Delete skill |

**Categories:** `frontend`, `backend`, `database`, `devops`, `cloud`, `testing`, `tools`, `mobile`, `ai`

**Levels:** `beginner`, `intermediate`, `advanced`, `expert`

---

### Experience

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/experience` | Public | List experience entries |
| POST | `/experience` | Admin | Create entry |
| PATCH | `/experience/:id` | Admin | Update entry |
| DELETE | `/experience/:id` | Admin | Delete entry |

**Employment Types:** `full-time`, `part-time`, `contract`, `freelance`, `internship`

---

### Education

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/education` | Public | List education entries |
| POST | `/education` | Admin | Create entry |
| PATCH | `/education/:id` | Admin | Update entry |
| DELETE | `/education/:id` | Admin | Delete entry |

---

### Certificates

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/certificates` | Public | List certificates |
| POST | `/certificates` | Admin | Create certificate |
| PATCH | `/certificates/:id` | Admin | Update certificate |
| DELETE | `/certificates/:id` | Admin | Delete certificate |

---

### Blog

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/blogs` | Public | Published posts only |
| GET | `/blogs/featured` | Public | Featured posts |
| GET | `/blogs/category/:category` | Public | Filter by category |
| GET | `/blogs/tag/:tag` | Public | Filter by tag |
| GET | `/blogs/slug/:slug` | Public | Get by slug (increments view) |
| POST | `/blogs` | Admin | Create post |
| PATCH | `/blogs/:id` | Admin | Update post |
| DELETE | `/blogs/:id` | Admin | Soft delete post |

---

### Contact

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/contact` | Public | Submit message (rate limited: 5/hr) |
| GET | `/contact` | Admin | List submissions |
| GET | `/contact/:id` | Admin | Get submission |
| PATCH | `/contact/:id` | Admin | Update status |
| DELETE | `/contact/:id` | Admin | Delete submission |

**Statuses:** `unread`, `read`, `replied`

---

### Uploads

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/uploads` | Admin | Upload file (`multipart/form-data`) |
| GET | `/uploads/:id` | Admin | Get upload metadata |
| DELETE | `/uploads/:id` | Admin | Delete upload |

**Request body:** `folder` (enum) + `file` (multipart)

**Upload Constraints:**

| Folder | MIME Types | Limit |
|--------|------------|-----|
| `profile` | image/jpeg, image/png, image/webp | 5 MB |
| `projects` | image/jpeg, image/png, image/webp | 5 MB |
| `blogs` | image/jpeg, image/png, image/webp | 5 MB |
| `certificates` | image/jpeg, image/png, image/webp | 5 MB |
| `resume` | application/pdf | 10 MB |

---

### Analytics

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/analytics/overview` | Admin | Overview stats |
| GET | `/analytics/monthly?months=N` | Admin | Monthly report (1-24 months) |
| GET | `/analytics/projects` | Admin | Top viewed projects |
| GET | `/analytics/blogs` | Admin | Top viewed blogs |
| GET | `/analytics/contact` | Admin | Contact submissions timeline |

---

### Settings

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/settings` | Public | Get site settings |
| PATCH | `/settings` | Admin | Update settings |

---

### Search

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/search?q=term&type=resource` | Public | Full-text search |

**Types:** `projects`, `blogs`, `skills`, `experience`, `education`, `certificates`

---

## Response Format

### Success

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "field": "email", "message": "Invalid email" }
  ]
}
```

### Paginated

```json
{
  "success": true,
  "message": "Items retrieved",
  "data": {
    "items": [...],
    "pagination": {
      "total": 100,
      "page": 1,
      "limit": 10,
      "totalPages": 10,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

## Security Measures

- **Helmet**: Security headers (CSP, HSTS, X-Frame-Options)
- **CORS**: Origin whitelist with credentials support
- **Rate Limiting**: Global (100/min) and contact-specific (5/hour)
- **JWT Authentication**: HS256 signed tokens
- **Mongo Sanitization**: NoSQL injection protection
- **Password Hashing**: bcrypt with configurable salt rounds
- **File Validation**: MIME type and size checking
- **UUID Filenames**: Prevents collisions and path traversal

## Deployment

### Production Checklist

- [ ] Generate strong JWT secret (32+ random characters)
- [ ] Configure MongoDB Atlas network access
- [ ] Set `NODE_ENV=production`
- [ ] Configure `CORS_ORIGINS` for your domain
- [ ] Set up persistent upload storage or S3 adapter
- [ ] Configure rate limiting for traffic patterns
- [ ] Enable HTTPS via reverse proxy
- [ ] Set up log rotation

### Docker (Optional)

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## License

MIT © Muhammad Umar

---

## Author

Muhammad Umar
- GitHub: [@muhammadumar-codes](https://github.com/muhammadumar-codes)