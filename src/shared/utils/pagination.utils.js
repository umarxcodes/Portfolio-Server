// *** First ***    Imports

// *** Second ***   Constants
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 50;

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions
const paginate = async (query, page = DEFAULT_PAGE, limit = DEFAULT_LIMIT) => {
  const pageNumber = Math.max(Number(page) || DEFAULT_PAGE, DEFAULT_PAGE);
  const pageLimit = Math.min(
    Math.max(Number(limit) || DEFAULT_LIMIT, 1),
    MAX_LIMIT
  );
  const skip = (pageNumber - 1) * pageLimit;
  const countQuery = query.model.countDocuments(query.getQuery());

  const [items, total] = await Promise.all([
    query.skip(skip).limit(pageLimit).lean(),
    countQuery,
  ]);

  const totalPages = total > 0 ? Math.ceil(total / pageLimit) : 1;

  return {
    data: items,
    pagination: {
      total,
      page: pageNumber,
      limit: pageLimit,
      totalPages,
      hasNextPage: pageNumber < totalPages,
      hasPrevPage: pageNumber > 1,
    },
  };
};

const paginateModel = async (model, filter = {}, options = {}) => {
  const pageNumber = Math.max(
    Number(options.page) || DEFAULT_PAGE,
    DEFAULT_PAGE
  );
  const pageLimit = Math.min(
    Math.max(Number(options.limit) || DEFAULT_LIMIT, 1),
    MAX_LIMIT
  );
  const skip = (pageNumber - 1) * pageLimit;
  const sort = options.sort || { createdAt: -1 };
  const projection = options.projection || {};
  let query = model
    .find(filter, projection)
    .sort(sort)
    .skip(skip)
    .limit(pageLimit);

  if (options.populate) {
    query = query.populate(options.populate);
  }

  const [items, total] = await Promise.all([
    query.lean(),
    model.countDocuments(filter),
  ]);
  const totalPages = total > 0 ? Math.ceil(total / pageLimit) : 1;

  return {
    items,
    pagination: {
      total,
      page: pageNumber,
      limit: pageLimit,
      totalPages,
      hasNextPage: pageNumber < totalPages,
      hasPrevPage: pageNumber > 1,
    },
  };
};

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export { paginate, paginateModel, DEFAULT_PAGE, DEFAULT_LIMIT, MAX_LIMIT };
