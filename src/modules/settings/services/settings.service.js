// *** First ***    Imports
import { DEFAULT_SETTINGS } from "../constants/settings.constants.js";
import * as settingsRepository from "../repositories/settings.repository.js";

// *** Second ***   Constants

// *** Third ***    Schema / Model

// *** Fourth ***   Repository Functions

// *** Fifth ***    Service Functions
const getSettings = async () => {
  const settings = await settingsRepository.findOne();
  return settings || DEFAULT_SETTINGS;
};

const updateSettings = (data) => settingsRepository.upsert(data);

// *** Sixth ***    Controller Functions

// *** Seventh ***  Routes

// *** Eighth ***   Exports
export { getSettings, updateSettings };
