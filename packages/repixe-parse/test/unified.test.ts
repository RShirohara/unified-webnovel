import { expect, test } from "@jest/globals";
import { unified } from "unified";

import { repixeParse } from "@/index";
import type { Root } from "@rshirohara/pxast";

test("repixeParse", async () => {
  const source = [
    "unified で Pixiv 小説構文をパースできるかのテスト。\n",
    "ここが二[[rb:段落>だんらく]]目。",
    "ここが二行目。\n\n",
    "ここから三段落目。",
    "[[jumpuri:リンク>https://example.com]]も使える。",
    "[newpage]",
    "ここからページが変わる。",
    "[jump:01]ページへの参照。"
  ].join("\r\n");
  const expected: Root = {
    type: "root",
    children: [
      { type: "pageHeading", pageNumber: 1 },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            value: "unified で Pixiv 小説構文をパースできるかのテスト。"
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
  expect(await unified().use(repixeParse).parse(source)).toEqual(expected);
});
