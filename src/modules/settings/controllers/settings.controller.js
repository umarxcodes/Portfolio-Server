import asyncHandler from "../../../shared/utils/asyncHandler.utils.js";
import { sendSuccess } from "../../../shared/utils/response.utils.js";
import { SETTINGS_MESSAGES } from "../constants/settings.constants.js";
import * as settingsService from "../services/settings.service.js";

const getSettings = asyncHandler(async (req, res) => {
  const settings = await settingsService.getSettings();
  sendSuccess(res, 200, SETTINGS_MESSAGES.FETCHED, { settings });
});

const updateSettings = asyncHandler(async (req, res) => {
  const settings = await settingsService.updateSettings(req.body);
  sendSuccess(res, 200, SETTINGS_MESSAGES.UPDATED, { settings });
});

export { getSettings, updateSettings };
