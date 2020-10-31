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
      extends: [
        "airbnb-base",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
        "prettier",
      ],
    },
  ],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
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
      {
        blankLine: "always",
        prev: "*",
        next: "if",
      },
      {
        blankLine: "always",
        prev: "if",
        next: "*",
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
    "import/no-unresolved": [
      2,
      {
        ignore: ["root/"],
      },
    ],
  },
};
