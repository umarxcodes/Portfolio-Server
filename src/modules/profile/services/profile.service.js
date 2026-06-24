// *** First ***    Imports
import AppError from "../../../shared/errors/index.js";
import { PROFILE_ERRORS } from "../constants/profile.constants.js";
import * as profileRepository from "../repositories/profile.repository.js";

// *** Second ***   Constants

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions
const getProfile = async () => {
  const profile = await profileRepository.findProfile();

  if (!profile) {
    throw new AppError(404, PROFILE_ERRORS.NOT_FOUND);
  }

  return profile;
};

const updateProfile = async (data) => {
  const profile = await profileRepository.updateProfile(data);

  if (!profile) {
    throw new AppError(404, PROFILE_ERRORS.NOT_FOUND);
  }

  return profile;
};

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export { getProfile, updateProfile };
