import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

// biome-ignore lint/style/noDefaultExport: vitest config
export default defineConfig({
	test: {
		name: "repixe",
		include: ["./test/**/*.test.ts"],
		environment: "edge-runtime",
		alias: {
			"~/": new URL("./src/", import.meta.url).pathname,
		},
	},
	plugins: [tsconfigPaths({ root: "./test" })],
});
