import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    name: "repixe-stringify",
    include: ["./test/**/*.test.ts"],
    environment: "node"
  },
  resolve: {
    alias: {
      "~": `./src`
    }
  }
});
