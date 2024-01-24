import { defineWorkspace } from "vitest/config";

// biome-ignore lint/style/noDefaultExport: vitest config
export default defineWorkspace(["./packages/*/vitest.config.js"]);
