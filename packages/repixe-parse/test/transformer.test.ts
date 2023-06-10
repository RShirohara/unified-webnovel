import { describe, expect, test } from "@jest/globals";
import type { Root } from "@rshirohara/pxast";

import { fromPixivNovel } from "@/lib";
import { Parser } from "pixiv-novel-parser";

describe("Text", () => {
  test("改行を持たない場合はそのまま追加される", () => {
    const source = "一つの段落";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [{ type: "text", value: "一つの段落" }],
        },
      ],
    };
    console.info("pixiv-novel-parser output", Parser.parse(source));
    expect(fromPixivNovel(source)).toEqual(expected);
  });
  test("連続した改行を1つだけ持つ場合は2つの段落に分割される", () => {
    const source = "一つ目の段落\n\n二つ目の段落";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [{ type: "text", value: "一つ目の段落" }],
        },
        {
          type: "paragraph",
          children: [{ type: "text", value: "二つ目の段落" }],
        },
      ],
    };
    console.info("pixiv-novel-parser output", Parser.parse(source));
    expect(fromPixivNovel(source)).toEqual(expected);
  });
  test("連続した改行を2つ以上持つ場合は3つ以上の段落に分割される", () => {
    const source =
      "一つ目の段落\n\n二つ目の段落\n\r\n三つ目の段落\n\n\r\n\n\r\n四つ目の段落\n四つ目の段落の二つ目の行";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [{ type: "text", value: "一つ目の段落" }],
        },
        {
          type: "paragraph",
          children: [{ type: "text", value: "二つ目の段落" }],
        },
        {
          type: "paragraph",
          children: [{ type: "text", value: "三つ目の段落" }],
        },
        {
          type: "paragraph",
          children: [
            { type: "text", value: "四つ目の段落" },
            { type: "break" },
            { type: "text", value: "四つ目の段落の二つ目の行" },
          ],
        },
      ],
    };
    console.info("pixiv-novel-parser output", Parser.parse(source));
    expect(fromPixivNovel(source)).toEqual(expected);
  });
});

describe("Mixed", () => {
  test("段落の直後に PhrasingContent", () => {
    const source = "一つ目の段落\n\n[[rb:二>ふた]]つ目の段落";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [{ type: "text", value: "一つ目の段落" }],
        },
        {
          type: "paragraph",
          children: [
            { type: "ruby", value: "二", ruby: "ふた" },
            { type: "text", value: "つ目の段落" },
          ],
        },
      ],
    };
    console.info("pixiv-novel-parser output", Parser.parse(source));
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("段落の直後に Text を挟んで PhrasingContent", () => {
    const source = "一つ目の段落\n\n二つ目の[[rb:段落>だんらく]]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [{ type: "text", value: "一つ目の段落" }],
        },
        {
          type: "paragraph",
          children: [
            { type: "text", value: "二つ目の" },
            { type: "ruby", value: "段落", ruby: "だんらく" },
          ],
        },
      ],
    };
    console.info("pixiv-novel-parser output", Parser.parse(source));
    expect(fromPixivNovel(source)).toEqual(expected);
  });
});
