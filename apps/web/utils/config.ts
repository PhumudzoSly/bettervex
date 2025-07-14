export const APP_NAME = "BetterVex";
export const AUTH_TITLE = "BetterVex";
export const AUTH_DESCRIPTION =
  "Your vibe-coded projects deserves a bit of flow ";

export const appConfig = {
  root_domain: "https://bettervex.com",
  app_domain: "https://bettervex.com",
  trustedOrigins: [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://bettervex.com",
  ],
};

/**
 * List of all routes that are not protected
 * These routes are used for auth only
 * @type {string[]}
 */
export const authRoutes = [
  // AUTH PAGES
  "/auth/sign-in",
  "/auth/sign-up",
  "/auth/reset-password",
  "/auth/new-password",
  "/verify-email",

  //PUBLIC
  "/",
  "/rm",
  "/home",
];

/**
 * Prefix for auth API
 */
export const apiPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/switch-org";
