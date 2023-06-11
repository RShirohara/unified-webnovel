import type { Root as PxastRoot } from "@rshirohara/pxast";
import type { Plugin, Processor } from "unified";

import { toPixivNovel } from "./lib";

export const repixeStringify: Plugin<[], PxastRoot, string> = function (
  this: Processor
) {
  const compiler = (doc: PxastRoot) => {
    return toPixivNovel(doc);
  };
  Object.assign(this, { Compiler: compiler });
};
