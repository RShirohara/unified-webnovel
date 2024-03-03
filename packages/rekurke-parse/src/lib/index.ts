import type { Root } from "@rshirohara/kkast";
import { parse } from "./parser.peg.js";
import { postprocess } from "./postprocessor.js";
import { preprocess } from "./preprocessor.js";

export function fromKakuyomuNovel(doc: string): Root {
  return postprocess(parse(preprocess(doc)));
}
