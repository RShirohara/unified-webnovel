import type { Root as PxastRoot } from "@rshirohara/pxast";
import type { Plugin, Processor } from "unified";

import { fromPixivNovel } from "./lib/index.js";

export const repixeParse: Plugin<[], string, PxastRoot> = function (
  this: Processor,
) {
  const parser = (doc: string) => {
    return fromPixivNovel(doc);
  };
  // biome-ignore lint/style/useNamingConvention: interface defined in external module
  Object.assign(this, { Parser: parser });
};
