/** @type {import("eslint").Linter.Config} */
const config = {
  extends: [
    "next",
    "turbo",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier",
  ],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { prefer: "type-imports", fixStyle: "inline-type-imports" },
    ],
    "@typescript-eslint/no-empty-interface": [
      "error",
      {
        allowSingleExtends: true,
      },
    ],
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: false,
      },
    ],
    "react/jsx-curly-brace-presence": [
      "warn",
      { props: "never", children: "never", propElementValues: "always" },
    ],
    "react/no-children-prop": ["error"],
  },
  ignorePatterns: ["**/*.config.js", "**/*.config.cjs", "packages/config/**"],
  reportUnusedDisableDirectives: true,
};

module.exports = config;
