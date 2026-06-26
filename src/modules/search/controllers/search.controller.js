// *** First ***    Imports
import asyncHandler from "../../../shared/utils/asyncHandler.utils.js";
import { sendSuccess } from "../../../shared/utils/response.utils.js";
import { SEARCH_MESSAGES } from "../constants/search.constants.js";
import * as searchService from "../services/search.service.js";

// *** Second ***   Constants

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions

// *** Sixth ***    Controller Functions
const searchAll = asyncHandler(async (req, res) => {
  const data = await searchService.searchAll(req.query);
  sendSuccess(res, 200, SEARCH_MESSAGES.RESULTS, data);
});

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export { searchAll };
