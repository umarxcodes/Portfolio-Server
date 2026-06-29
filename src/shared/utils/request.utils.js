const getClientMetadata = (req) => ({
  ipAddress: req.ip || req.headers["x-forwarded-for"] || "unknown",
  userAgent: req.headers["user-agent"] || "",
});

export { getClientMetadata };
