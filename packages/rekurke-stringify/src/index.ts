import type { Root as KkastRoot } from "@rshirohara/kkast";
import type { Plugin, Processor } from "unified";
import { toKakuyomuNovel } from "./lib/index.js";

export const rekurkeStringify: Plugin<[], KkastRoot, string> = function (
  this: Processor,
) {
  const compiler = (doc: KkastRoot) => {
    return toKakuyomuNovel(doc);
  };
  // biome-ignore lint/style/useNamingConvention: interface defined in external module
  Object.assign(this, { Compiler: compiler });
};
