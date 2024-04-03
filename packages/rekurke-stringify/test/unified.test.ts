import type { Root } from "@rshirohara/kkast";
import { unified } from "unified";
import { expect, test } from "vitest";
import { rekurkeStringify } from "~/index.js";

test("rekurkeStringify", () => {
  const source: Root = {
    type: "root",
    children: [
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            value: "unified でカクヨム小説構文をレンダリングできるかのテスト。",
          },
        ],
      },
      { type: "paragraphMargin", size: 1 },
      {
        type: "paragraph",
        children: [
          { type: "text", value: "ここが二" },
          { type: "ruby", value: "段落", ruby: "だんらく" },
          { type: "text", value: "目。" },
          { type: "break" },
          { type: "text", value: "ここが二行目。" },
        ],
      },
      { type: "paragraphMargin", size: 3 },
      {
        type: "paragraph",
        children: [
          { type: "text", value: "ここから三段落目。" },
          { type: "break" },
          { type: "emphasis", value: "強調" },
          { type: "text", value: "も使える。" },
        ],
      },
    ],
  };
  const expected = [
    "unified でカクヨム小説構文をレンダリングできるかのテスト。\n\n",
    "ここが二|段落《だんらく》目。\nここが二行目。\n\n\n\n",
    "ここから三段落目。\n《《強調》》も使える。",
  ].join("");
  expect(unified().use(rekurkeStringify).stringify(source)).toEqual(expected);
});
