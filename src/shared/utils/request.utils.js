// *** First ***    Imports

// *** Second ***   Constants

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions
const getClientMetadata = (req) => ({
  ipAddress: req.ip || req.headers["x-forwarded-for"] || "unknown",
  userAgent: req.headers["user-agent"] || "",
});

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export { getClientMetadata };
