import adapter from "svelte-adapter-deno";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  compilerOptions: {
    runes: true
  },

  kit: {
    adapter: adapter()
  }
};

export default config;
