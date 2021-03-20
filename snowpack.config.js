/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    static: "/",
    src: "/_dist_",
  },
  routes: [{ match: "routes", src: ".*", dest: "/index.html" }],
  plugins: [
    "@snowpack/plugin-postcss",
    "@snowpack/plugin-svelte",
    "@snowpack/plugin-dotenv",
    "@snowpack/plugin-typescript",
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
  optimize: {
    bundle: true,
    minify: true,
    splitting: true,
    target: "es2018",
  },
};
