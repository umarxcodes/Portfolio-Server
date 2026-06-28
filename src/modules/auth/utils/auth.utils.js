// *** First ***    Imports

// *** Second ***   Constants

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions
const buildAuthPayload = (admin) => ({
  sub: admin._id.toString(),
  role: admin.role,
});

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export { buildAuthPayload };
