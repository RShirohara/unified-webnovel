import { URL } from "node:url";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    name: "repixe-stringify",
    include: ["./test/**/*.test.ts"],
    environment: "node",
    alias: {
      "~": new URL("./src", import.meta.url).pathname
    }
  },
  plugins: [tsconfigPaths({ root: "./test" })]
});
