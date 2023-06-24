import type { Root } from "@rshirohara/pxast";
import { Parser } from "pixiv-novel-parser";

import { transform } from "./transformer.js";
import { transpile } from "./transpiler.js";

export function fromPixivNovel(doc: string): Root {
  const pixivNodes = transform(Parser.parse(doc));
  return { type: "root", children: transpile(pixivNodes), data: undefined };
}
