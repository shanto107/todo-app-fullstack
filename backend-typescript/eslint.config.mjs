import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default [
    {
        ignores: [
            "node_modules/",
            "dist/",
            "coverage/",
            "drizzle/meta/",
            "tests/",
        ],
    },

    js.configs.recommended,

    // Apply type-aware TypeScript rules only to .ts files.
    ...tseslint.configs.recommendedTypeChecked.map((config) => ({
        ...config,
        files: ["**/*.ts"],
    })),

    {
        files: ["**/*.ts"],

        languageOptions: {
            globals: globals.node,
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
        },
    },

    eslintConfigPrettier,
];
