import type { Root } from "@rshirohara/pxast";
import { unified } from "unified";
import { expect, test } from "vitest";

import { repixeStringify } from "~/";

test("repixeStringify", () => {
  const source: Root = {
    type: "root",
    children: [
      { type: "pageHeading", pageNumber: 1 },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            value: "unified で Pixiv 小説構文をレンダリングできるかのテスト。"
          }
        ]
      },
      {
        type: "paragraph",
        children: [
          { type: "text", value: "ここが二" },
          { type: "ruby", value: "段落", ruby: "だんらく" },
          { type: "text", value: "目。" },
          { type: "break" },
          { type: "text", value: "ここが二行目。" }
        ]
      },
      {
        type: "paragraph",
        children: [
          { type: "text", value: "ここから三段落目。" },
          { type: "break" },
          {
            type: "link",
            url: "https://example.com",
            children: [{ type: "text", value: "リンク" }]
          },
          { type: "text", value: "も使える。" }
        ]
      },
      { type: "pageHeading", pageNumber: 2 },
      {
        type: "paragraph",
        children: [
          { type: "text", value: "ここからページが変わる。" },
          { type: "break" },
          { type: "pageReference", pageNumber: 1 },
          { type: "text", value: "ページへの参照。" }
        ]
      }
    ]
  };
  const expected = [
    "unified で Pixiv 小説構文をレンダリングできるかのテスト。\n",
    "ここが二[[rb: 段落 > だんらく]]目。",
    "ここが二行目。\n",
    "ここから三段落目。",
    "[[jumpuri: リンク > https://example.com]]も使える。\n",
    "[newpage]\n",
    "ここからページが変わる。",
    "[jump:1]ページへの参照。"
  ].join("\n");
  expect(unified().use(repixeStringify).stringify(source)).toEqual(expected);
});
