import type { Root } from "@rshirohara/pxast";
import { describe, expect, test } from "vitest";
import { fromPixivNovel } from "~/lib/index.js";

describe("Tokenize", () => {
  test("`[` の前に改行が存在しない場合、PageBreak になる", () => {
    const source = "[newpage]";
    const expected: Root = { type: "root", children: [{ type: "pageBreak" }] };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`[` の前に1つの改行が存在する場合、PageBreak になる", () => {
    const source = "\n[newpage]";
    const expected: Root = { type: "root", children: [{ type: "pageBreak" }] };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`[` の前に2つ以上の改行が存在する場合、PageBreak になる", () => {
    const source = "\r\n\r[newpage]";
    const expected: Root = { type: "root", children: [{ type: "pageBreak" }] };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`[` の後にスペースを挟まず文字列が存在する場合、PageBreak になる", () => {
    const source = "[newpage]";
    const expected: Root = { type: "root", children: [{ type: "pageBreak" }] };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`[` の後に1つのスペースを挟んで文字列が存在する場合、ただの Text になる", () => {
    const source = "[ newpage]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [{ type: "text", value: "[ newpage]" }],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`]` の前にスペースを挟まず文字列が存在する場合、PageBreak になる", () => {
    const source = "[newpage]";
    const expected: Root = { type: "root", children: [{ type: "pageBreak" }] };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`]` の前に1つのスペースを挟んで文字列が存在する場合、ただの Text になる", () => {
    const source = "[newpage ]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [{ type: "text", value: "[newpage ]" }],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`]` の後に改行が存在しない場合、PageBreak になる", () => {
    const source = "[newpage]";
    const expected: Root = { type: "root", children: [{ type: "pageBreak" }] };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`]` の後に1つの改行が存在する場合、PageBreak になる", () => {
    const source = "[newpage]\n";
    const expected: Root = { type: "root", children: [{ type: "pageBreak" }] };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`]` の後に2つ以上の改行が存在する場合、PageBreak になる", () => {
    const source = "[newpage]\r\n\r";
    const expected: Root = { type: "root", children: [{ type: "pageBreak" }] };
    expect(fromPixivNovel(source)).toEqual(expected);
  });
});

describe("他 Node との相互作用", () => {
  test("PageBreak の前に改行を挟まず Text が存在する場合、Text と PageBreak に分割される", () => {
    const source = "テキスト[newpage]";
    const expected: Root = {
      type: "root",
      children: [
        { type: "paragraph", children: [{ type: "text", value: "テキスト" }] },
        { type: "pageBreak" },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("PageBreak の前に1つの改行を挟んで Text が存在する場合、Text と PageBreak に分割される", () => {
    const source = "テキスト\n[newpage]";
    const expected: Root = {
      type: "root",
      children: [
        { type: "paragraph", children: [{ type: "text", value: "テキスト" }] },
        { type: "pageBreak" },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("PageBreak の前に2つ以上の改行を挟んで Text が存在する場合、Text と PageBreak に分割される", () => {
    const source = "テキスト\r\n\r[newpage]";
    const expected: Root = {
      type: "root",
      children: [
        { type: "paragraph", children: [{ type: "text", value: "テキスト" }] },
        { type: "pageBreak" },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("PageBreak の後に改行を挟まず Text が存在する場合、PageBreak と Text に分割される", () => {
    const source = "[newpage]テキスト";
    const expected: Root = {
      type: "root",
      children: [
        { type: "pageBreak" },
        { type: "paragraph", children: [{ type: "text", value: "テキスト" }] },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("PageBreak の後に1つの改行を挟んで Text が存在する場合、PageBreak と Text に分割される", () => {
    const source = "[newpage]\nテキスト";
    const expected: Root = {
      type: "root",
      children: [
        { type: "pageBreak" },
        { type: "paragraph", children: [{ type: "text", value: "テキスト" }] },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("PageBreak の後に2つ以上の改行を挟んで Text が存在する場合、PageBreak と Text に分割される", () => {
    const source = "[newpage]\r\n\nテキスト";
    const expected: Root = {
      type: "root",
      children: [
        { type: "pageBreak" },
        { type: "paragraph", children: [{ type: "text", value: "テキスト" }] },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("PageBreak の前に改行を挟まず Heading が存在する場合、Heading と PageBreak に分割される", () => {
    const source = "[chapter:見出し][newpage]";
    const expected: Root = {
      type: "root",
      children: [
        { type: "heading", children: [{ type: "text", value: "見出し" }] },
        { type: "pageBreak" },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("PageBreak の前に1つの改行を挟んで Heading が存在する場合、Heading と PageBreak に分割される", () => {
    const source = "[chapter:見出し]\n[newpage]";
    const expected: Root = {
      type: "root",
      children: [
        { type: "heading", children: [{ type: "text", value: "見出し" }] },
        { type: "pageBreak" },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("PageBreak の前に2つ以上の改行を挟んで Heading が存在する場合、Heading と PageBreak に分割される", () => {
    const source = "[chapter:見出し]\r\n\r[newpage]";
    const expected: Root = {
      type: "root",
      children: [
        { type: "heading", children: [{ type: "text", value: "見出し" }] },
        { type: "pageBreak" },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("PageBreak の後に改行を挟まず Heading が存在する場合、PageBreak と Heading に分割される", () => {
    const source = "[newpage][chapter:見出し]";
    const expected: Root = {
      type: "root",
      children: [
        { type: "pageBreak" },
        { type: "heading", children: [{ type: "text", value: "見出し" }] },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("PageBreak の後に1つの改行を挟んで Heading が存在する場合、PageBreak と Heading に分割される", () => {
    const source = "[newpage]\n[chapter:見出し]";
    const expected: Root = {
      type: "root",
      children: [
        { type: "pageBreak" },
        { type: "heading", children: [{ type: "text", value: "見出し" }] },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("PageBreak の後に2つ以上の改行を挟んで Heading が存在する場合、PageBreak と Heading に分割される", () => {
    const source = "[newpage]\r\n\r[chapter:見出し]";
    const expected: Root = {
      type: "root",
      children: [
        { type: "pageBreak" },
        { type: "heading", children: [{ type: "text", value: "見出し" }] },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });
});
