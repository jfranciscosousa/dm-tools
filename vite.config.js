import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [tailwindcss(), sveltekit()],
  resolve: {
    alias: {
      "@aws-sdk/client-bedrock-runtime": "/mock"
    }
  }
};

export default config;
