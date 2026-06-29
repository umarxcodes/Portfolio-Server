const generateSlug = (title) =>
  String(title)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const ensureUniqueSlug = async (slug, Model, ignoredId = null) => {
  const baseSlug = slug || "post";
  let candidate = baseSlug;
  let suffix = 1;

  const buildQuery = () => ({
    slug: candidate,
    ...(ignoredId ? { _id: { $ne: ignoredId } } : {}),
  });

  while (await Model.exists(buildQuery())) {
    candidate = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  return candidate;
};

export { generateSlug, ensureUniqueSlug };
