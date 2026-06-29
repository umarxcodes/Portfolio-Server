const SETTINGS_THEMES = ["light", "dark", "system"];
const SETTINGS_MESSAGES = {
  FETCHED: "Settings fetched",
  UPDATED: "Settings updated",
};
const DEFAULT_SETTINGS = {
  siteTitle: "Portfolio",
  siteDescription: "Personal portfolio",
  seoTitle: "",
  seoDescription: "",
  keywords: [],
  socialLinks: {},
  theme: "system",
  logo: "",
  favicon: "",
  contactEmail: "",
  contactPhone: "",
  maintenanceMode: false,
};

export { SETTINGS_THEMES, SETTINGS_MESSAGES, DEFAULT_SETTINGS };
