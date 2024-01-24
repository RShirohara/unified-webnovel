import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

// biome-ignore lint/style/noDefaultExport: vitest config
export default defineConfig({
  test: {
    name: "repixe-parse",
    include: ["./test/**/*.test.ts"],
    environment: "node",
    alias: {
      "~": new URL("./src", import.meta.url).pathname,
    },
  },
  plugins: [tsconfigPaths({ root: "./test" })],
});
