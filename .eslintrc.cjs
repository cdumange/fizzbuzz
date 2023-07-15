/* eslint-env node */
module.exports = {
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  root: true,
  rules: {
    "no-magic-numbers": [
      2,
      { enforceConst: true, ignoreArrayIndexes: true, ignore: [-1, 0, 1] },
    ],
    "no-use-before-define": [
      "error",
      {
        functions: false,
        classes: false,
        variables: true,
        allowNamedExports: false,
      },
    ],
    "arrow-body-style": ["error", "always"],
    camelcase: ["error", { properties: "always" }],
    complexity: ["error", { max: 10 }],
    curly: ["error", "multi-line"],
  },
  ignorePatterns: ["*.spec.ts"],
};
