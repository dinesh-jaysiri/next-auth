/**
 * An array of routes that are accessible to the public
 * these routes do not require authentication
 * @type{string[]}
 */

export const publicRoutes = ["/", "/auth/new-verification"];

/**
 * An array of routes that are used for authentication
 * these routes will redirect logged-in users to /settings
 * @type{string[]}
 */

export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
];

/**
 * the prefix for API authentication routes
 * Routs that start with this prefix are used for API authentication purposes
 * @type{string}
 */

export const API_AUTH_PREFIX = "/api/auth";

/**
 * the default redirect path after logging in
 * @type{string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/settings";
