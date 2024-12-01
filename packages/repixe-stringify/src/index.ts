import type { Root as PxastRoot } from "@rshirohara/pxast";
import type { Plugin, Processor } from "unified";

import { toPixivNovel } from "./lib/index.js";

export const repixeStringify: Plugin<[], PxastRoot, string> = function (
	this: Processor,
) {
	const compiler = (doc: PxastRoot) => {
		return toPixivNovel(doc);
	};
	// biome-ignore lint/style/useNamingConvention: interface defined in external module
	Object.assign(this, { Compiler: compiler });
};
