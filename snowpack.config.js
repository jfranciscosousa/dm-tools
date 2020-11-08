/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    static: "/",
    src: "/_dist_",
  },
  plugins: [
    "@snowpack/plugin-postcss",
    "@snowpack/plugin-svelte",
    "@snowpack/plugin-dotenv",
    "@snowpack/plugin-typescript",
    "@snowpack/plugin-webpack"
  ],
  devOptions: {
    open: "none",
  },
  buildOptions: {
    out: "public",
  },
  alias: {
    root: "./src",
  },
};
