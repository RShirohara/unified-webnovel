import type { Root as KkastRoot } from "@rshirohara/kkast";
import type { Root as PxastRoot } from "@rshirohara/pxast";
import { type Options, defaultOptions } from "./options.js";

export function toPxast(tree: KkastRoot, options?: Options | null): PxastRoot {
  const option =
    options !== undefined && options !== null ? options : defaultOptions;
  return { type: "root", children: [] };
}
