import { sveltekit } from "@sveltejs/kit/vite";

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  resolve: {
    alias: {
      "@aws-sdk/client-bedrock-runtime": "/mock"
    }
  }
};

export default config;
