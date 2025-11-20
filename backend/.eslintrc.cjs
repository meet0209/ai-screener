module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.json"],
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint", "import"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier",
  ],
  env: {
    node: true,
    jest: true,
  },
  rules: {
    "import/order": ["error", { "alphabetize": { "order": "asc" } }],
    "@typescript-eslint/no-misused-promises": "off"
  }
};
