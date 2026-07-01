const generateSlug = (title) =>
  String(title)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const ensureUniqueSlug = async (
  slug,
  Model,
  ignoredId = null,
  maxDepth = 1000
) => {
  const baseSlug = slug || "post";
  let suffix = 0;

  while (suffix < maxDepth) {
    const candidate = suffix === 0 ? baseSlug : `${baseSlug}-${suffix}`;
    const query = ignoredId
      ? { slug: candidate, _id: { $ne: ignoredId } }
      : { slug: candidate };

    const exists = await Model.exists(query);
    if (!exists) {
      return candidate;
    }
    suffix += 1;
  }

  const randomSuffix = Math.random().toString(36).substring(2, 7);
  return `${baseSlug}-${randomSuffix}`;
};

export { generateSlug, ensureUniqueSlug };
