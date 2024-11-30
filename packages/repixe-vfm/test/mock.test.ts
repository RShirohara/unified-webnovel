import { reviveParse } from "@vivliostyle/vfm/lib/revive-parse.js";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { test } from "vitest";

test("remark", async () => {
  const source = `
  # Header 1
  ## Header 2

  たとえば{私|わたし}はこの文章を書く。
  これは二行目。
  `;

  const processor = unified().use(reviveParse(true, true)).use(remarkParse);
  // .use(remarkRehype)
  // .use(rehypeStringify);
  // const result = await processor.process(source);
  const node = processor.parse(source);
  const result = await processor.run(node);
  console.dir(result, { colors: true, depth: 10 });
});
