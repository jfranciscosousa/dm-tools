const eslintSveltePreprocess = require("eslint-svelte3-preprocess");
const svelteConfig = require("./svelte.config");

module.exports = {
  plugins: ["eslint-plugin-svelte3", "prettier", "@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  extends: ["airbnb-base", "prettier"],
  overrides: [
    {
      files: ["**/*.svelte"],
      processor: "svelte3/svelte3",
      rules: {
        "import/prefer-default-export": "off",
        "import/no-mutable-exports": "off",
        "import/first": "off",
        "prettier/prettier": "off",
      },
    },
    {
      files: ["*.ts"],
      extends: ["plugin:@typescript-eslint/recommended"],
    },
  ],
  settings: {
    "svelte3/ignore-styles": () => true,
    "svelte3/preprocess": eslintSveltePreprocess(svelteConfig.preprocess),
  },
  env: {
    browser: true,
    es6: true,
  },
  rules: {
    "prettier/prettier": "error",
    "eol-last": ["error", "always"],
    curly: ["error", "multi-line"],
    "padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        prev: "*",
        next: "return",
      },
    ],
    "no-param-reassign": [
      "error",
      {
        props: true,
        ignorePropertyModificationsFor: [
          "memo",
          "element",
          "key",
          "req",
          "acc",
          "result",
          "event",
        ],
      },
    ],
    "id-length": [
      "error",
      {
        exceptions: ["_", "x", "y"],
      },
    ],
    "no-use-before-define": ["error", "nofunc"],
    "no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
      },
    ],
    "no-alert": "off",
    "import/no-extraneous-dependencies": 0,
    "import/no-unresolved": 0,
    "import/extensions": 0,
  },
};
