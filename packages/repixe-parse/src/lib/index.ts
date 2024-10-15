import type { Root } from "@rshirohara/pxast";
import { parse } from "./parser.peg.js";
import { postprocess } from "./postprocessor.js";
import { preprocess } from "./preprocessor.js";

export function fromPixivNovel(doc: string): Root {
  return postprocess(parse(preprocess(doc)));
}
