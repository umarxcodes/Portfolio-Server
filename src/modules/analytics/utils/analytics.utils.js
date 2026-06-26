// *** First ***    Imports
import crypto from "node:crypto";

// *** Second ***   Constants

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions
const hashIpAddress = (ipAddress) =>
  crypto
    .createHash("sha256")
    .update(String(ipAddress || "unknown"))
    .digest("hex");

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export { hashIpAddress };
