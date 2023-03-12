import { defineConfig, devices } from "@playwright/test";

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
    },
    ...(process.env.CI
      ? [
          {
            name: "safari",
            use: {
              ...devices["Desktop Safari"]
            }
          },
          { name: "firefox", use: { ...devices["Desktop Firefox"] } }
        ]
      : [])
  ],
  webServer: {
    command: "npm run build && npm run preview -- --host 0.0.0.0",
    url: "http://127.0.0.1:4173"
  }
});
