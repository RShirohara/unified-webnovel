import type { Root as KkastRoot } from "@rshirohara/kkast";
import type { Plugin, Processor } from "unified";

import { fromKakuyomuNovel } from "./lib/index.js";

export const rekurkeParse: Plugin<[], string, KkastRoot> = function (
  this: Processor,
) {
  const parser = (doc: string) => {
    return fromKakuyomuNovel(doc);
  };
  // biome-ignore lint/style/useNamingConvention: interface defined in external module
  Object.assign(this, { Parser: parser });
};
