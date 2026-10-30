import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import query from "@tanstack/eslint-plugin-query";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
    globalIgnores(["node_modules/", "dist/", "coverage/"]),

    js.configs.recommended,

    // Type-aware TypeScript rules.
    ...tseslint.configs.recommendedTypeChecked.map((config) => ({
        ...config,
        files: ["**/*.{ts,tsx}"],
    })),

    {
        files: ["**/*.{ts,tsx}"],

        languageOptions: {
            globals: globals.browser,
            parserOptions: {
                projectService: true,
            },
        },

        plugins: {
            "simple-import-sort": simpleImportSort,
        },

        rules: {
            "no-unused-vars": "off",

            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    vars: "all",
                    args: "after-used",
                    ignoreRestSiblings: true,
                    argsIgnorePattern: "^_",
                    destructuredArrayIgnorePattern: "^_",
                },
            ],

            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-floating-promises": "error",
            "@typescript-eslint/no-misused-promises": "error",

            "no-nested-ternary": "error",
            "no-return-assign": ["error", "always"],
            "no-unneeded-ternary": ["error", { defaultAssignment: false }],
            "prefer-const": "error",

            "no-console": ["warn", { allow: ["log", "warn", "error"] }],

            "simple-import-sort/imports": "error",
            "simple-import-sort/exports": "error",
            "react-hooks/incompatible-library": "off",
        },
    },

    // React-specific rules.
    {
        files: ["**/*.{ts,tsx}"],

        extends: [
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
            query.configs["flat/recommended"],
        ],
    },

    // Disable Fast Refresh restrictions in shadcn/shared components.
    {
        files: ["src/components/**/*.{ts,tsx}"],
        rules: {
            "react-refresh/only-export-components": "off",
        },
    },

    // Keep last.
    eslintConfigPrettier,
]);
