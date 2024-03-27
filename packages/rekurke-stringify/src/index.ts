import type { Root as KkastRoot } from "@rshirohara/kkast";
import { toKakuyomuNovel } from "lib/index.js";
import type { Plugin, Processor } from "unified";

export const rekurkeStringify: Plugin<[], KkastRoot, string> = function (
  this: Processor,
) {
  const compiler = (doc: KkastRoot) => {
    return toKakuyomuNovel(doc);
  };
  // biome-ignore lint/style/useNamingConvention: interface defined in external module
  Object.assign(this, { Compiler: compiler });
};
