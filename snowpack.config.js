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
    [
      "@snowpack/plugin-webpack",
      {
        extendConfig: (config) => ({
          ...config,
          optimization: {
            ...config.optimization,

            splitChunks: {
              chunks: "all",
            },
          },
        }),
      },
    ],
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
