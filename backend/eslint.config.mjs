import globals from "globals";
import importPlugin from "eslint-plugin-import";
import nodePlugin from "eslint-plugin-n";
import pluginPromise from "eslint-plugin-promise";
import config from "eslint-config-standard";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"],
    ignores: ["__tests__/*", "**/config/**", "**/db/**", "**/models/**", ".sequelizerc", "**config.js", "**config.mjs"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node,
        ...config.globals,
        ...config.env
      },
      parserOptions: config.parserOptions
    },
    plugins: {
      import: importPlugin,
      promise: pluginPromise,
      n: nodePlugin,
      standard: config.plugins
    },
    rules: config.rules
  }
];