// *** First ***    Imports

// *** Second ***   Constants

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions
const isExpiredCertificate = (certificate) =>
  Boolean(
    certificate.expiryDate && new Date(certificate.expiryDate) < new Date()
  );

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export { isExpiredCertificate };
