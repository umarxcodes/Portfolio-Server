// *** First ***    Imports

// *** Second ***   Constants

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions
const normalizeEducationDates = (education) => ({
  ...education,
  endDate: education.isCurrent ? null : education.endDate,
});

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export { normalizeEducationDates };
