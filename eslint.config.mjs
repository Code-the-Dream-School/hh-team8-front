import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginJest from "eslint-plugin-jest";
export default [
  // Apply to JavaScript and React files
  {
    files: ["**/*.{js,mjs,cjs,jsx}"], // Matches all JS and React files
    languageOptions: {
      globals: {
        ...globals.browser, // Browser globals like window, document
        ...globals.jest, // Jest globals like describe, test, expect
      },
    },
    settings: {
      react: {
        version: "detect", // Automatically detect the React version
      },
    },
  },
  // Base JavaScript configuration
  pluginJs.configs.recommended,
  // React configuration
  pluginReact.configs.flat.recommended,
  // Jest configuration
  {
    plugins: {
      jest: pluginJest,
    },
    rules: {
      ...pluginJest.configs.recommended.rules, // Add Jest recommended rules
    },
  },
];
