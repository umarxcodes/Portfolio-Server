# Portfolio CMS Backend

> Production-grade REST API for a personal portfolio website with admin panel, built with enterprise engineering standards.

## Overview

Portfolio Backend is a secure, scalable REST API designed for a single-administrator portfolio content management system. It provides public read-only APIs for portfolio content and authenticated admin endpoints for content management.

**Key Design Principles:**
- Feature-based modular architecture with clean separation of concerns
- Single admin authentication (minimal surface area)
- Defensive security posture with multiple layers
- Production-ready with comprehensive error handling

## Tech Stack

| Layer | Technology |
|-------|------------|
| Runtime | Node.js 20+ |
| Framework | Express.js 5.x |
| Database | MongoDB 7.x, Mongoose 9.x |
| Language | JavaScript (ESM) |
| Validation | Zod 4.x |
| Authentication | JWT (jsonwebtoken) |
| Passwords | bcryptjs |
| File Uploads | Multer, memory storage |
| Security | Helmet, CORS, express-rate-limit, express-mongo-sanitize |
| Logging | Morgan |
| Compression | compression |
| Infrastructure | Docker-ready |

## Architecture

```
Request → Route → Validation Middleware → Auth Middleware → Controller → Service → Repository → Mongoose Model → MongoDB
```

### Layer Responsibilities

| Layer | Responsibility |
|-------|---------------|
| **Router** | HTTP method, path, middleware composition |
| **Validation** | Input sanitization and schema validation (Zod) |
| **Controller** | HTTP request/response translation |
| **Service** | Business logic and orchestration |
| **Repository** | Database query abstractions |

## Project Structure

```
src/
├── app.js                    # Express application setup
├── server.js                 # HTTP server and lifecycle management
├── routes/
│   └── index.js             # Central route registry
├── config/
│   ├── env.js               # Environment validation with Zod
│   ├── database.js          # MongoDB connection configuration
│   ├── cors.js              # CORS whitelist configuration
│   ├── helmet.js            # Security headers configuration
│   ├── compression.js       # Response compression
│   ├── logger.js            # Request logging (Morgan)
│   ├── multer.js            # File upload middleware factory
│   ├── upload.js            # Upload constraints configuration
│   └── rateLimiter.js       # Rate limiting rules
├── middlewares/
│   ├── auth.middleware.js   # JWT authentication guard
│   ├── error.middleware.js  # Global error handler
│   ├── validation.middleware.js # Zod validation wrapper
│   ├── rateLimit.middleware.js  # Rate limiting middleware
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

### Environment Variables

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| `NODE_ENV` | ✓ | Runtime environment | `development` |
| `PORT` | ✗ | HTTP port | `5000` |
| `MONGO_URI` | ✓ | MongoDB connection string | - |
| `MONGO_MAX_POOL_SIZE` | ✗ | Max connection pool | `10` |
| `ACCESS_TOKEN_SECRET` | ✓ | JWT signing secret (≥32 chars) | - |
| `ACCESS_TOKEN_EXPIRES_IN` | ✗ | JWT expiry | `24h` |
| `BCRYPT_SALT_ROUNDS` | ✗ | Hashing cost factor | `12` |
| `JSON_BODY_LIMIT` | ✗ | JSON payload limit | `1mb` |
| `TRUST_PROXY` | ✗ | Trust proxy headers | `false` |
| `CORS_ORIGINS` | ✗ | Allowed origins | - |
| `GLOBAL_RATE_LIMIT_MAX` | ✗ | Global rate limit | `100` |
| `GLOBAL_RATE_LIMIT_WINDOW_MS` | ✗ | Rate limit window | `60000` |

## API Reference

All endpoints are prefixed with `/api/v1`.

### Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/login` | Public | Admin login with email/password |
| POST | `/auth/refresh-token` | Public | Refresh access token |
| GET | `/auth/profile` | Admin | Get current admin profile |
| POST | `/auth/logout` | Admin | Invalidate refresh token |
| PATCH | `/auth/change-password` | Admin | Change admin password |

### Profile

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/profile` | Public | Get personal profile |
| PATCH | `/profile` | Admin | Update profile |

### Projects

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/projects` | Public | List paginated projects |
| GET | `/projects/featured` | Public | Get featured projects |
| GET | `/projects/category/:category` | Public | Filter by category |
| GET | `/projects/slug/:slug` | Public | Get by slug |
| GET | `/projects/:id` | Public | Get by ID |
| POST | `/projects` | Admin | Create project |
| PATCH | `/projects/:id` | Admin | Update project |
| DELETE | `/projects/:id` | Admin | Delete project |

### Skills

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/skills` | Public | List paginated skills |
| GET | `/skills/category/:category` | Public | Filter by category |
| POST | `/skills` | Admin | Create skill |
| PATCH | `/skills/:id` | Admin | Update skill |
| DELETE | `/skills/:id` | Admin | Delete skill |

### Experience

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/experience` | Public | List experience entries |
| POST | `/experience` | Admin | Create entry |
| PATCH | `/experience/:id` | Admin | Update entry |
| DELETE | `/experience/:id` | Admin | Delete entry |

### Education

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/education` | Public | List education entries |
| POST | `/education` | Admin | Create entry |
| PATCH | `/education/:id` | Admin | Update entry |
| DELETE | `/education/:id` | Admin | Delete entry |

### Certificates

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/certificates` | Public | List certificates |
| POST | `/certificates` | Admin | Create certificate |
| PATCH | `/certificates/:id` | Admin | Update certificate |
| DELETE | `/certificates/:id` | Admin | Delete certificate |

### Blog

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/blogs` | Public | List published posts |
| GET | `/blogs/featured` | Public | Get featured posts |
| GET | `/blogs/category/:category` | Public | Filter by category |
| GET | `/blogs/tag/:tag` | Public | Filter by tag |
| GET | `/blogs/slug/:slug` | Public | Get by slug (increments view) |
| POST | `/blogs` | Admin | Create post |
| PATCH | `/blogs/:id` | Admin | Update post |
| DELETE | `/blogs/:id` | Admin | Delete post |

### Contact

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/contact` | Public | Submit contact form (rate limited) |
| GET | `/contact` | Admin | List submissions |
| GET | `/contact/:id` | Admin | Get submission |
| PATCH | `/contact/:id` | Admin | Update status |
| DELETE | `/contact/:id` | Admin | Delete submission |

### Upload

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/uploads` | Admin | Upload file (multipart/form-data) |
| GET | `/uploads/:id` | Admin | Get upload metadata |
| DELETE | `/uploads/:id` | Admin | Delete upload |

**Upload Constraints:**

| Folder | MIME Types | Max Size |
|--------|------------|----------|
| profile | image/jpeg, image/png, image/webp | 5 MB |
| projects | image/jpeg, image/png, image/webp | 5 MB |
| blogs | image/jpeg, image/png, image/webp | 5 MB |
| certificates | image/jpeg, image/png, image/webp | 5 MB |
| resume | application/pdf | 10 MB |

### Analytics

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/analytics/overview` | Admin | Get analytics overview |
| GET | `/analytics/monthly?months=N` | Admin | Monthly report (1-24 months) |
| GET | `/analytics/projects` | Admin | Top viewed projects |
| GET | `/analytics/blogs` | Admin | Top viewed blogs |
| GET | `/analytics/contact` | Admin | Contact submissions timeline |

### Settings

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/settings` | Public | Get site settings |
| PATCH | `/settings` | Admin | Update settings |

### Search

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/search?q=term&type=resource` | Public | Global text search |

## Response Format

### Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error message",
  "errors": [
    { "field": "fieldName", "message": "Validation error" }
  ]
}
```

### Paginated Response

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
- **Rate Limiting**: Global (100/min) and contact-specific (5/hour) limits
- **JWT**: Signed tokens with HS256 algorithm
- **Mongo Sanitization**: Protection against NoSQL injection
- **Password Hashing**: bcrypt with configurable salt rounds
- **File Validation**: MIME type and size checks
- **UUID Filenames**: Prevents filename collisions and path traversal

## Development

```bash
npm run dev      # Development with nodemon
npm run start    # Production server
npm run lint     # ESLint
npm run lint:fix # Auto-fix lint issues
npm run format   # Prettier formatting
npm run seed:admin # Create admin user
```

## Deployment Checklist

- [ ] Generate strong JWT secrets (32+ characters)
- [ ] Configure MongoDB Atlas network access
- [ ] Set `NODE_ENV=production`
- [ ] Configure `CORS_ORIGINS` for your domain
- [ ] Set up persistent upload storage (or configure S3 adapter)
- [ ] Configure rate limiting for production traffic
- [ ] Enable HTTPS (via reverse proxy)
- [ ] Set up log rotation for production logs

## Engineering Scores

| Category | Score | Notes |
|----------|-------|-------|
| Architecture | 9/10 | Clean feature-based architecture |
| Code Quality | 8/10 | Consistent patterns, minor improvements possible |
| Security | 8/10 | Comprehensive protections in place |
| Performance | 8/10 | Efficient queries with lean() |
| Testing | 4/10 | Tests exist but need proper mocking |
| Documentation | 8/10 | This README |

## License

MIT © Muhammad Umar