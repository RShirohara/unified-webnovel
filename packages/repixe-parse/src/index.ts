import { Processor, Plugin } from "unified";
import { Root as PxastRoot } from "@rshirohara/pxast";

import { fromPixivNovel } from "./lib";

export const repixeParse: Plugin<[], string, PxastRoot> = function (
  this: Processor
) {
  const parser = (doc: string) => {
    return fromPixivNovel(doc);
  };
  Object.assign(this, { Parser: parser });
};
