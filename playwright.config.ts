import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  use: {
    baseURL: "http://127.0.0.1:4173",
    screenshot: "only-on-failure"
  },
  reporter: "html",
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"]
      }
    }
  ],
  webServer: {
    command: "npm run build && npm run preview",
    url: "http://127.0.0.1:4173"
  }
});
