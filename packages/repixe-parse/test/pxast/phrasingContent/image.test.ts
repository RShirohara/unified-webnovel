import type { Root } from "@rshirohara/pxast";
import { describe, expect, test } from "vitest";
import { fromPixivNovel } from "~/lib/index.js";

describe("Tokenize", () => {
  test("`[` の後にスペースを挟まず文字列が存在する場合、Image になる", () => {
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

  test("`[` の後に1つのスペースを挟んで文字列が存在する場合、ただの Text になる", () => {
    const source = "[ pixivimage:000001]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [{ type: "text", value: "[ pixivimage:000001]" }],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`:` の前にスペースを挟まず文字列が存在する場合、Image になる", () => {
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

  test("`:` の前に1つのスペースを挟んで文字列が存在する場合、ただの Text になる", () => {
    const source = "[pixivimage :000001]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [{ type: "text", value: "[pixivimage :000001]" }],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`:` の後にスペースを挟まず文字列が存在する場合、Image になる", () => {
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

  test("`:` の後に1つのスペースを挟んで文字列が存在する場合、ただの Text になる", () => {
    const source = "[pixivimage: 000001]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [{ type: "text", value: "[pixivimage: 000001]" }],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`-` の前にスペースを挟まず文字列が存在する場合、Image になる", () => {
    const source = "[pixivimage:000001-1]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [{ type: "image", illustId: "000001", pageNumber: 1 }],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`-` の前に1つのスペースを挟んで文字列が存在する場合、ただの Text になる", () => {
    const source = "[pixivimage:000001 -1]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [{ type: "text", value: "[pixivimage:000001 -1]" }],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`-` の後にスペースを挟まず文字列が存在する場合、Image になる", () => {
    const source = "[pixivimage:000001-1]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [{ type: "image", illustId: "000001", pageNumber: 1 }],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`-` の後に1つのスペースを挟んで文字列が存在する場合、ただの Text になる", () => {
    const source = "[pixivimage:000001- 1]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [{ type: "text", value: "[pixivimage:000001- 1]" }],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`]` の前にスペースを挟まず文字列が存在する場合、Image になる", () => {
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

  test("`]` の前に1つのスペースを挟んで文字列が存在する場合、ただの Text になる", () => {
    const source = "[pixivimage:000001 ]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [{ type: "text", value: "[pixivimage:000001 ]" }],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });
});

describe("内部コンテンツ", () => {
  test("画像形式の PixivImage をちゃんと認識できる", () => {
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

  test("漫画形式の PixivImage をちゃんと認識できる", () => {
    const source = "[pixivimage:000001-1]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [{ type: "image", illustId: "000001", pageNumber: 1 }],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });
});
