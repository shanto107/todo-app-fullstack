import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    name: "integration",
    include: ["tests/integration/**/*.test.ts"],
    environment: "node",
    testTimeout: 100_000,
    hookTimeout: 100_000,
    sequence: {
      concurrent: false
    },
    setupFiles: "./tests/setup/integration-setup.ts",
    coverage: {
      provider: "v8",
      reporter: ["text"],
      include: ["src/**/*.ts"],
      exclude: [ "tests/**", "src/**/*.test.ts"],
      clean: true
    },
  }
});