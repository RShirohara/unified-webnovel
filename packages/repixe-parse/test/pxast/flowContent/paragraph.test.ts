import type { Root } from "@rshirohara/pxast";
import { describe, expect, test } from "vitest";
import { fromPixivNovel } from "~/lib/index.js";

describe("Tokenize", () => {
  test("文字列の前に改行が存在しない場合、Paragraph になる", () => {
    const source = "テキスト";
    const expected: Root = {
      type: "root",
      children: [
        { type: "paragraph", children: [{ type: "text", value: "テキスト" }] },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("文字列の前に1つの改行が存在する場合、Paragraph に吸収される", () => {
    const source = "\nテキスト";
    const expected: Root = {
      type: "root",
      children: [
        { type: "paragraph", children: [{ type: "text", value: "テキスト" }] },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("文字列の前に2つ以上の改行が存在する場合、Paragraph に吸収される", () => {
    const source = "\r\n\r";
    const expected: Root = {
      type: "root",
      children: [
        { type: "paragraph", children: [{ type: "text", value: "テキスト" }] },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("文字列の後に改行が存在しない場合、Paragraph になる", () => {
    const source = "テキスト";
    const expected: Root = {
      type: "root",
      children: [
        { type: "paragraph", children: [{ type: "text", value: "テキスト" }] },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("文字列の後に1つの改行が存在する場合、Paragraph に吸収される", () => {
    const source = "テキスト\n";
    const expected: Root = {
      type: "root",
      children: [
        { type: "paragraph", children: [{ type: "text", value: "テキスト" }] },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("文字列の後に2つ以上の改行が存在する場合、Paragraph に吸収される", () => {
    const source = "テキスト\r\n\r";
    const expected: Root = {
      type: "root",
      children: [
        { type: "paragraph", children: [{ type: "text", value: "テキスト" }] },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });
});

describe("他 Node との相互作用", () => {
  test("連続した改行を1つだけ持つ場合は2つの Paragraph に分割される", () => {
    const source = "一段落目\n\n二段落目";
    const expected: Root = {
      type: "root",
      children: [
        { type: "paragraph", children: [{ type: "text", value: "一段落目" }] },
        { type: "paragraph", children: [{ type: "text", value: "二段落目" }] },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("連続した改行を2つ以上持つ場合は3つ以上の Paragraph に分割される", () => {
    const source = "一段落目\n\n二段落目\r二行目\r\n\r\r三段落目";
    const expected: Root = {
      type: "root",
      children: [
        { type: "paragraph", children: [{ type: "text", value: "一段落目" }] },
        {
          type: "paragraph",
          children: [
            { type: "text", value: "二段落目" },
            { type: "break" },
            { type: "text", value: "二行目" },
          ],
        },
        { type: "paragraph", children: [{ type: "text", value: "三段落目" }] },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });
});

describe("内部コンテンツ", () => {
  test("Break を格納できる", () => {
    const source = "一行目\n二行目";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            { type: "text", value: "一行目" },
            { type: "break" },
            { type: "text", value: "二行目" },
          ],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("Image を格納できる", () => {
    const source = "[pixivimage:000001]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [{ type: "image", illustId: "000001" }],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("Link を格納できる", () => {
    const source = "[[jumpuri:リンク例>https://example.org]]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "link",
              url: "https://example.org",
              children: [{ type: "text", value: "リンク例" }],
            },
          ],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("PageReference を格納できる", () => {
    const source = "[jump:01]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [{ type: "pageReference", pageNumber: 1 }],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("Ruby を格納できる", () => {
    const source =
      "[[rb: 換言 > かんげん]]すれば[[rb:畢竟>ひっきょう]]ももんが";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            { type: "ruby", value: "換言", ruby: "かんげん" },
            { type: "text", value: "すれば" },
            { type: "ruby", value: "畢竟", ruby: "ひっきょう" },
            { type: "text", value: "ももんが" },
          ],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("Text を格納できる", () => {
    const source = "ただのテキスト";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [{ type: "text", value: "ただのテキスト" }],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });
});
