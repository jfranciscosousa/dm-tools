import { defineConfig } from "cypress";

export default defineConfig({
  defaultCommandTimeout: 2000,
  e2e: {
    supportFile: "./cypress/support/index.ts",
    baseUrl: "http://localhost:3000"
  }
});
