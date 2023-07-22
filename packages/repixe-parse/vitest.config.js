import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    name: "repixe-parse",
    include: ["./test/**/*.test.ts"],
    environment: "node"
  },
  resolve: {
    alias: {
      "~": `./src`
    }
  }
});
