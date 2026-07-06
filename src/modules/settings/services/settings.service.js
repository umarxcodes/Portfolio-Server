import { DEFAULT_SETTINGS } from "../constants/settings.constants.js";
import * as settingsRepository from "../repositories/settings.repository.js";

const getSettings = async () => {
  const settings = await settingsRepository.findOne();
  return settings || DEFAULT_SETTINGS;
};

const updateSettings = async (data) => {
  const currentSettings = await getSettings();
  const nextSettings = {
    ...DEFAULT_SETTINGS,
    ...currentSettings,
    ...data,
    socialLinks: {
      ...DEFAULT_SETTINGS.socialLinks,
      ...currentSettings.socialLinks,
      ...data.socialLinks,
    },
  };

  return await settingsRepository.upsert(nextSettings);
};

export { getSettings, updateSettings };
