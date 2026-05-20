import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        name: "unit",
        include: ["tests/unit/**/*.test.ts"],
        environment: "node",
        restoreMocks: true,
        clearMocks: true,
        coverage: {
            provider: "v8",
            reporter: ["text"],
            include: ["src/modules/**/*.ts", "src/utils/**/*.ts", "src/middlewares/**/*.ts"],
            // exclude: [ "tests/**", "src/db/**/*.ts", "src/routes/**/*.ts"],
            clean: true
        },
    }
});