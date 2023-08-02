import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    name: "repixe",
    include: ["./test/**/*.test.ts"],
    environment: "node"
  },
  plugins: [tsconfigPaths({ root: "./test" })],
  resolve: {
    alias: {
      "~": `./src`
    }
  }
});
