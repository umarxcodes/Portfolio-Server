const authIntegrationCases = [
  "POST /auth/login returns an access token",
  "POST /auth/refresh-token rotates tokens",
  "GET /auth/profile requires a bearer token",
  "POST /auth/logout requires a bearer token",
  "PATCH /auth/change-password validates current password",
  "auth routes do not expose register, forgot password, reset password, or OTP endpoints",
];

export { authIntegrationCases };
