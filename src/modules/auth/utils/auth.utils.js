// *** First ***    Imports
import { hashToken } from "../../../shared/utils/password.utils.js";

// *** Second ***   Constants

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions
const buildAuthPayload = (admin) => ({
  sub: admin._id.toString(),
  role: admin.role,
});

const buildHashedRefreshToken = (refreshToken) => hashToken(refreshToken);

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export { buildAuthPayload, buildHashedRefreshToken };
