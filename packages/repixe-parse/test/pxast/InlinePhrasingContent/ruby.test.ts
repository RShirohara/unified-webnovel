import type { Root } from "@rshirohara/pxast";
import { describe, expect, test } from "vitest";
import { fromPixivNovel } from "~/lib/index.js";

describe("tokenize", () => {
  test("`[[` の後にスペースを挟まず文字列が存在する場合、Ruby になる", () => {
    const source = "[[rb:ルビ>るび]]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [{ type: "ruby", value: "ルビ", ruby: "るび" }],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`[[` の後に1つのスペースを挟んで文字列が存在する場合、ただの Text になる", () => {
    const source = "[[ rb:ルビ>るび]]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [{ type: "text", value: "[[ rb:ルビ>るび]]" }],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`:` の前にスペースを挟まず文字列が存在する場合、Ruby になる", () => {
    const source = "[[rb:ルビ>るび]]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [{ type: "ruby", value: "ルビ", ruby: "るび" }],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`:` の前に1つのスペースを挟んで文字列が存在する場合、ただの Text になる", () => {
    const source = "[[rb :ルビ>るび]]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [{ type: "text", value: "[[rb :ルビ>るび]]" }],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`:` の後にスペースを挟まず文字列が存在する場合、Ruby になる", () => {
    const source = "[[rb:ルビ>るび]]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [{ type: "ruby", value: "ルビ", ruby: "るび" }],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`:` の後に1つのスペースを挟んで文字列が存在する場合、Ruby になる", () => {
    const source = "[[rb: ルビ>るび]]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [{ type: "ruby", value: "ルビ", ruby: "るび" }],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`:` の後に2つ以上のスペースを挟んで文字列が存在する場合、Ruby になる", () => {
    const source = "[[rb: 　ルビ>るび]]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [{ type: "ruby", value: "ルビ", ruby: "るび" }],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`>` の前にスペースを挟まず文字列が存在する場合、Ruby になる", () => {
    const source = "[[rb:ルビ>るび]]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [{ type: "ruby", value: "ルビ", ruby: "るび" }],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`>` の前に1つのスペースを挟んで文字列が存在する場合、Ruby になる", () => {
    const source = "[[rb:ルビ >るび]]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [{ type: "ruby", value: "ルビ", ruby: "るび" }],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`>` の前に2つ以上のスペースを挟んで文字列が存在する場合、Ruby になる", () => {
    const source = "[[rb:ルビ 　>るび]]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [{ type: "ruby", value: "ルビ", ruby: "るび" }],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`>` の後にスペースを挟まず文字列が存在する場合、Ruby になる", () => {
    const source = "[[rb:ルビ>るび]]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [{ type: "ruby", value: "ルビ", ruby: "るび" }],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`>` の後に1つのスペースを挟んで文字列が存在する場合、Ruby になる", () => {
    const source = "[[rb:ルビ> るび]]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [{ type: "ruby", value: "ルビ", ruby: "るび" }],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`>` の後に2つ以上のスペースを挟んで文字列が存在する場合、Ruby になる", () => {
    const source = "[[rb:ルビ> 　るび]]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [{ type: "ruby", value: "ルビ", ruby: "るび" }],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`]]` の前にスペースを挟まず文字列が存在する場合、Ruby になる", () => {
    const source = "[[rb:ルビ>るび]]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [{ type: "ruby", value: "ルビ", ruby: "るび" }],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`]]` の前に1つのスペースを挟んで文字列が存在する場合、Ruby になる", () => {
    const source = "[[rb:ルビ>るび ]]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [{ type: "ruby", value: "ルビ", ruby: "るび" }],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`]]` の前に2つ以上のスペースを挟んで文字列が存在する場合、Ruby になる", () => {
    const source = "[[rb:ルビ>るび 　]]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [{ type: "ruby", value: "ルビ", ruby: "るび" }],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });
});

describe("内部コンテンツ", () => {
  test("ルビをちゃんと認識できる", () => {
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
});
