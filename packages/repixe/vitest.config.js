import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

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
