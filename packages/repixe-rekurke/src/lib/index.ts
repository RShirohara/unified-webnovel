import type { Root as KkastRoot } from "@rshirohara/kkast";
import type { Root as PxastRoot } from "@rshirohara/pxast";
import { convertRoot } from "./converter.js";
import { type Options, defaultOptions } from "./options.js";
import { postprocess } from "./postprocessor.js";

export function toKkast(tree: PxastRoot, options?: Options | null): KkastRoot {
  const option =
    options !== undefined && options !== null ? options : defaultOptions;
  return postprocess(convertRoot(tree, option), option);
}
