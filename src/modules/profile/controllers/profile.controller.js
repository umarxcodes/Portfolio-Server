// *** First ***    Imports
import asyncHandler from "../../../shared/utils/asyncHandler.utils.js";
import { sendSuccess } from "../../../shared/utils/response.utils.js";
import { getClientMetadata } from "../../../shared/utils/request.utils.js";
import { PROFILE_MESSAGES } from "../constants/profile.constants.js";
import * as profileService from "../services/profile.service.js";

// *** Second ***   Constants

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions

// *** Sixth ***    Controller Functions
const getProfile = asyncHandler(async (req, res) => {
  const profile = await profileService.getProfile(getClientMetadata(req));
  sendSuccess(res, 200, PROFILE_MESSAGES.PROFILE_FETCHED, { profile });
});

const updateProfile = asyncHandler(async (req, res) => {
  const profile = await profileService.updateProfile(req.body);
  sendSuccess(res, 200, PROFILE_MESSAGES.PROFILE_UPDATED, { profile });
});

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export { getProfile, updateProfile };
