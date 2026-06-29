const buildAuthPayload = (admin) => ({
  sub: admin._id.toString(),
  role: admin.role,
});

export { buildAuthPayload };
