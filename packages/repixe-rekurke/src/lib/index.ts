import type { Root as KkastRoot } from "@rshirohara/kkast";
import type { Root as PxastRoot } from "@rshirohara/pxast";
import type { Options } from "./options.js";

export function toKkast(
  tree: PxastRoot,
  options: Options | null | undefined,
): KkastRoot {}
