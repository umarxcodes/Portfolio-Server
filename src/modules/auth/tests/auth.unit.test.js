const authUnitCases = [
  "loginWithValidCredentials",
  "rejectInvalidCredentials",
  "rejectInactiveAdmin",
  "refreshAccessTokenWithValidToken",
  "rejectRefreshTokenTampering",
  "getCurrentAdminProfile",
  "changePasswordWithCurrentPassword",
  "rejectSamePassword",
];

export { authUnitCases };
