import { defineConfig, devices } from "@playwright/test";

const withoutScreen = ({ screen, ...device }: (typeof devices)[keyof typeof devices]) => {
  void screen;
  return device;
};

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
        ...withoutScreen(devices["Desktop Chrome"])
      }
    },
    ...(process.env.CI
      ? [
          {
            name: "safari",
            use: {
              ...withoutScreen(devices["Desktop Safari"])
            }
          },
          { name: "firefox", use: { ...withoutScreen(devices["Desktop Firefox"]) } }
        ]
      : [])
  ],
  webServer: {
    command: "npm run build && npm run preview -- --host 0.0.0.0",
    url: "http://127.0.0.1:4173",
    env: {
      PASSWORD: ""
    }
  }
});
