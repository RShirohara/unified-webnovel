import type { Root as KkastRoot } from "@rshirohara/kkast";
import type { Root as PxastRoot } from "@rshirohara/pxast";
import { convertRoot } from "./converter.js";
import { buildOptions, type Options } from "./options.js";
import { postprocess } from "./postprocessor.js";

export function toKkast(tree: PxastRoot, options?: Options | null): KkastRoot {
	const option = buildOptions(options);
	return postprocess(convertRoot(tree, option), option);
}
