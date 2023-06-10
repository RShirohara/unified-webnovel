import type { Root } from "@rshirohara/pxast";
import { Parser } from "pixiv-novel-parser";

import { transform } from "./transformer";
import { transpile } from "./transpiler";

export function fromPixivNovel(doc: string): Root {
  const pixivNodes = transform(Parser.parse(doc));
  return { type: "root", children: transpile(pixivNodes) };
}
