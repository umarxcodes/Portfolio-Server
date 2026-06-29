import AppError from "../../../shared/errors/index.js";
import { PROFILE_ERRORS } from "../constants/profile.constants.js";
import * as profileRepository from "../repositories/profile.repository.js";
import { trackPortfolioView } from "../../analytics/services/analytics.service.js";

const getProfile = async (metadata) => {
  const profile = await profileRepository.findProfile();

  if (!profile) {
    throw new AppError(404, PROFILE_ERRORS.NOT_FOUND);
  }

  if (metadata) {
    await trackPortfolioView(metadata);
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

export { getProfile, updateProfile };
