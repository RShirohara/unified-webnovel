import { defineConfig } from "vitest/config";

// biome-ignore lint/style/noDefaultExport: vitest config
export default defineConfig({
	test: {
		projects: ["./packages/*"],
	},
});
