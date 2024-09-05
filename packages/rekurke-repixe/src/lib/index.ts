import type { Root as KkastRoot } from "@rshirohara/kkast";
import type { Root as PxastRoot } from "@rshirohara/pxast";
import { convertRoot } from "./converter.js";
import { type Options, buildOptions } from "./options.js";

export function toPxast(tree: KkastRoot, options?: Options | null): PxastRoot {
  const option = buildOptions(options);
  return convertRoot(tree, option);
}
