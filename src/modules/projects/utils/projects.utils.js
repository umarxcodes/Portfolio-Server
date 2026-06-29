const createSlug = (value) =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");

const generateUniqueSlug = async (
  Model,
  title,
  suffix = 0,
  ignoredId = null
) => {
  const baseSlug = createSlug(title);
  const slug = suffix > 0 ? `${baseSlug}-${suffix}` : baseSlug;
  const existing = await Model.findOne({
    slug,
    ...(ignoredId ? { _id: { $ne: ignoredId } } : {}),
  }).lean();

  if (!existing) {
    return slug;
  }

  return generateUniqueSlug(Model, title, suffix + 1, ignoredId);
};

export { createSlug, generateUniqueSlug };
