import type { Root } from "@rshirohara/kkast";
import { parse } from "./parser.peg.js";

export function fromKakuyomuNovel(doc: string): Root {
  return parse(doc);
}
