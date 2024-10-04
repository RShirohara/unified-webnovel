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
          children: [
            {
              type: "image",
              illustId: "000001",
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 20, offset: 19 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 20, offset: 19 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 1, column: 20, offset: 19 },
      },
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
          children: [
            {
              type: "text",
              value: "[ pixivimage:000001]",
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 21, offset: 20 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 21, offset: 20 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 1, column: 21, offset: 20 },
      },
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
          children: [
            {
              type: "image",
              illustId: "000001",
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 20, offset: 19 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 20, offset: 19 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 1, column: 20, offset: 19 },
      },
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
          children: [
            {
              type: "text",
              value: "[pixivimage :000001]",
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 21, offset: 20 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 21, offset: 20 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 1, column: 21, offset: 20 },
      },
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
          children: [
            {
              type: "image",
              illustId: "000001",
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 20, offset: 19 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 20, offset: 19 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 1, column: 20, offset: 19 },
      },
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
          children: [
            {
              type: "text",
              value: "[pixivimage: 000001]",
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 21, offset: 20 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 21, offset: 20 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 1, column: 21, offset: 20 },
      },
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
          children: [
            {
              type: "image",
              illustId: "000001",
              pageNumber: 1,
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 22, offset: 21 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 22, offset: 21 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 1, column: 22, offset: 21 },
      },
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
          children: [
            {
              type: "text",
              value: "[pixivimage:000001 -1]",
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 23, offset: 22 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 23, offset: 22 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 1, column: 23, offset: 22 },
      },
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
          children: [
            {
              type: "image",
              illustId: "000001",
              pageNumber: 1,
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 22, offset: 21 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 22, offset: 21 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 1, column: 22, offset: 21 },
      },
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
          children: [
            {
              type: "text",
              value: "[pixivimage:000001- 1]",
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 23, offset: 22 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 23, offset: 22 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 1, column: 23, offset: 22 },
      },
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
          children: [
            {
              type: "image",
              illustId: "000001",
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 20, offset: 19 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 20, offset: 19 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 1, column: 20, offset: 19 },
      },
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
          children: [
            {
              type: "text",
              value: "[pixivimage:000001 ]",
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 21, offset: 20 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 21, offset: 20 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 1, column: 21, offset: 20 },
      },
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
          children: [
            {
              type: "image",
              illustId: "000001",
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 20, offset: 19 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 20, offset: 19 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 1, column: 20, offset: 19 },
      },
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
          children: [
            {
              type: "image",
              illustId: "000001",
              pageNumber: 1,
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 22, offset: 21 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 22, offset: 21 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 1, column: 22, offset: 21 },
      },
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });
});
