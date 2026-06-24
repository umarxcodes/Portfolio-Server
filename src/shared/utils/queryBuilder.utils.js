// *** First ***    Imports

// *** Second ***   Constants

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions
const parseQueryValue = (value) => {
  if (value === "true") return true;
  if (value === "false") return false;
  if (/^-?\d+$/.test(value)) return Number(value);
  return value;
};

// *** Fifth ***    Service Functions
const buildFilter = (queryParams, allowedFields = []) => {
  const filter = {};

  allowedFields.forEach((field) => {
    if (queryParams[field] !== undefined) {
      filter[field] = parseQueryValue(queryParams[field]);
    }
  });

  return filter;
};

const buildSort = (sortParam) => {
  if (!sortParam) {
    return { createdAt: -1 };
  }

  return sortParam.split(",").reduce((acc, field) => {
    const trimmed = field.trim();
    if (!trimmed) {
      return acc;
    }

    const direction = trimmed.startsWith("-") ? -1 : 1;
    const key = trimmed.replace(/^-/, "");
    acc[key] = direction;
    return acc;
  }, {});
};

const buildSearch = (searchParam, searchFields = []) => {
  if (!searchParam || searchFields.length === 0) {
    return {};
  }

  return { $text: { $search: searchParam } };
};

const buildProjection = (fields) => {
  if (!fields) {
    return {};
  }

  return fields.split(",").reduce((projection, field) => {
    const trimmed = field.trim();
    if (trimmed) {
      projection[trimmed] = 1;
    }
    return projection;
  }, {});
};

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export { buildFilter, buildSort, buildSearch, buildProjection };
