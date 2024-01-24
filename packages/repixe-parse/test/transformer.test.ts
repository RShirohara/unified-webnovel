import { describe, expect, test } from "vitest";

import type { Root } from "@rshirohara/pxast";

import { Parser } from "pixiv-novel-parser";
import { fromPixivNovel } from "~/lib";

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

  test("段落の中間に PhrasingContent", () => {
    const source =
      "一つ目の段落\n\n二つ目の[[rb:段落>だんらく]]の中の\n改行\n\n三つ目の段落";
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
            { type: "text", value: "の中の" },
            { type: "break" },
            { type: "text", value: "改行" },
          ],
        },
        {
          type: "paragraph",
          children: [{ type: "text", value: "三つ目の段落" }],
        },
      ],
    };
    console.info("pixiv-novel-parser output", Parser.parse(source));
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("段落の末尾に PhrasingContent", () => {
    const source =
      "一つ目の段落\n\n二つ目の[[rb:段落>だんらく]]\n\n三つ目の段落";
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
        {
          type: "paragraph",
          children: [{ type: "text", value: "三つ目の段落" }],
        },
      ],
    };
    console.info("pixiv-novel-parser output", Parser.parse(source));
    expect(fromPixivNovel(source)).toEqual(expected);
  });
});
