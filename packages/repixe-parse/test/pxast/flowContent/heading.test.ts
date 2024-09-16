import type { Root } from "@rshirohara/pxast";
import { describe, expect, test } from "vitest";
import { fromPixivNovel } from "~/lib/index.js";

describe("Tokenize", () => {
  test("`[` の前に改行が存在しない場合、Heading になる", () => {
    const source = "[chapter:見出し]";
    const expected: Root = {
      type: "root",
      children: [
        { type: "heading", children: [{ type: "text", value: "見出し" }] },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`[` の前に1つの改行が存在する場合、Heading になる", () => {
    const source = "\n[chapter:見出し]";
    const expected: Root = {
      type: "root",
      children: [
        { type: "heading", children: [{ type: "text", value: "見出し" }] },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`[` の前に2つ以上の改行が存在する場合、Heading になる", () => {
    const source = "\r\n\r[chapter:見出し]";
    const expected: Root = {
      type: "root",
      children: [
        { type: "heading", children: [{ type: "text", value: "見出し" }] },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`[` の後にスペースを挟まず文字列が存在する場合、Heading になる", () => {
    const source = "[chapter:見出し]";
    const expected: Root = {
      type: "root",
      children: [
        { type: "heading", children: [{ type: "text", value: "見出し" }] },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`[` の後に1つのスペースを挟んで文字列が存在する場合、ただの Text になる", () => {
    const source = "[ chapter:見出し]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [{ type: "text", value: "[ chapter:見出し]" }],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`:` の前にスペースを挟まず文字列が存在する場合、Heading になる", () => {
    const source = "[chapter:見出し]";
    const expected: Root = {
      type: "root",
      children: [
        { type: "heading", children: [{ type: "text", value: "見出し" }] },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`:` の前に1つのスペースを挟んで文字列が存在する場合、ただの Text になる", () => {
    const source = "[chapter :見出し]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [{ type: "text", value: "[chapter :見出し]" }],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`:` の後にスペースを挟まず文字列が存在する場合、Heading になる", () => {
    const source = "[chapter:見出し]";
    const expected: Root = {
      type: "root",
      children: [
        { type: "heading", children: [{ type: "text", value: "見出し" }] },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`:` の後に1つのスペースを挟んで文字列が存在する場合、Heading になる", () => {
    const source = "[chapter: 見出し]";
    const expected: Root = {
      type: "root",
      children: [
        { type: "heading", children: [{ type: "text", value: "見出し" }] },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`:` の後に2つ以上のスペースを挟んで文字列が存在する場合、Heading になる", () => {
    const source = "[chapter: 　見出し]";
    const expected: Root = {
      type: "root",
      children: [
        { type: "heading", children: [{ type: "text", value: "見出し" }] },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`]` の前にスペースを挟まず文字列が存在する場合、Heading になる", () => {
    const source = "[chapter:見出し]";
    const expected: Root = {
      type: "root",
      children: [
        { type: "heading", children: [{ type: "text", value: "見出し" }] },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`]` の前に1つのスペースを挟んで文字列が存在する場合、Heading になる", () => {
    const source = "[chapter:見出し ]";
    const expected: Root = {
      type: "root",
      children: [
        { type: "heading", children: [{ type: "text", value: "見出し" }] },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`]` の前に2つ以上のスペースを挟んで文字列が存在する場合、Heading になる", () => {
    const source = "[chapter:見出し 　]";
    const expected: Root = {
      type: "root",
      children: [
        { type: "heading", children: [{ type: "text", value: "見出し" }] },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`]` の後に改行が存在しない場合、Heading になる", () => {
    const source = "[chapter:見出し]";
    const expected: Root = {
      type: "root",
      children: [
        { type: "heading", children: [{ type: "text", value: "見出し" }] },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`]` の後に1つの改行が存在する場合、Heading になる", () => {
    const source = "[chapter:見出し]\n";
    const expected: Root = {
      type: "root",
      children: [
        { type: "heading", children: [{ type: "text", value: "見出し" }] },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`]` の後に2つ以上の改行が存在する場合、Heading になる", () => {
    const source = "[chapter:見出し]\r\n\r";
    const expected: Root = {
      type: "root",
      children: [
        { type: "heading", children: [{ type: "text", value: "見出し" }] },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });
});

describe("他 Node との相互作用", () => {
  test("Heading の前に改行を挟まず Text が存在する場合、Text と Heading に分割される", () => {
    const source = "テキスト[chapter:見出し]";
    const expected: Root = {
      type: "root",
      children: [
        { type: "paragraph", children: [{ type: "text", value: "テキスト" }] },
        { type: "heading", children: [{ type: "text", value: "見出し" }] },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("Heading の前に1つの改行を挟んで Text が存在する場合、Text と Heading に分割される", () => {
    const source = "テキスト\n[chapter:見出し]";
    const expected: Root = {
      type: "root",
      children: [
        { type: "paragraph", children: [{ type: "text", value: "テキスト" }] },
        { type: "heading", children: [{ type: "text", value: "見出し" }] },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("Heading の前に2つ以上の改行を挟んで Text が存在する場合、Text と Heading に分割される", () => {
    const source = "テキスト\r\n\r[chapter:見出し]";
    const expected: Root = {
      type: "root",
      children: [
        { type: "paragraph", children: [{ type: "text", value: "テキスト" }] },
        { type: "heading", children: [{ type: "text", value: "見出し" }] },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("Heading の後に改行を挟まず Text が存在する場合、Heading と Text に分割される", () => {
    const source = "[chapter:見出し]テキスト";
    const expected: Root = {
      type: "root",
      children: [
        { type: "heading", children: [{ type: "text", value: "見出し" }] },
        { type: "paragraph", children: [{ type: "text", value: "テキスト" }] },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("Heading の後に1つの改行を挟んで Text が存在する場合、Heading と Text に分割される", () => {
    const source = "[chapter:見出し]\nテキスト";
    const expected: Root = {
      type: "root",
      children: [
        { type: "heading", children: [{ type: "text", value: "見出し" }] },
        { type: "paragraph", children: [{ type: "text", value: "テキスト" }] },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("Heading の後に2つ以上の改行を挟んで Text が存在する場合、Heading と Text に分割される", () => {
    const source = "[chapter:見出し]\r\n\rテキスト";
    const expected: Root = {
      type: "root",
      children: [
        { type: "heading", children: [{ type: "text", value: "見出し" }] },
        { type: "paragraph", children: [{ type: "text", value: "テキスト" }] },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("Heading の前に改行を挟まず PageBreak が存在する場合、PageBreak と Heading に分割される", () => {
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

  test("Heading の前に1つの改行を挟んで PageBreak が存在する場合、PageBreak と Heading に分割される", () => {
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

  test("Heading の前に2つ以上の改行を挟んで PageBreak が存在する場合、PageBreak と Heading に分割される", () => {
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

  test("Heading の後に改行を挟まず PageBreak が存在する場合、Heading と PageBreak に分割される", () => {
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

  test("Heading の後に1つの改行を挟んで PageBreak が存在する場合、Heading と PageBreak に分割される", () => {
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

  test("Heading の後に2つ以上の改行を挟んで PageBreak が存在する場合、Heading と PageBreak に分割される", () => {
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
});

describe("内部コンテンツ", () => {
  test("Ruby を格納できる", () => {
    const source = "[chapter:ルビが[[rb:使用>しよう]]できる見出し]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "heading",
          children: [
            { type: "text", value: "ルビが" },
            { type: "ruby", value: "使用", ruby: "しよう" },
            { type: "text", value: "できる見出し" },
          ],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("Text を格納できる", () => {
    const source = "[chapter: ただのテキスト]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "heading",
          children: [{ type: "text", value: "ただのテキスト" }],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });
});
