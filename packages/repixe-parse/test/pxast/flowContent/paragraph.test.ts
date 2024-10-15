import type { Root } from "@rshirohara/pxast";
import { describe, expect, test } from "vitest";
import { fromPixivNovel } from "~/lib/index.js";

describe("Tokenize", () => {
  test("文字列の前に改行が存在しない場合、Paragraph になる", () => {
    const source = "テキスト";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "テキスト",
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 5, offset: 4 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 5, offset: 4 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 1, column: 5, offset: 4 },
      },
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("文字列の前に1つの改行が存在する場合、Paragraph に吸収される", () => {
    const source = "\nテキスト";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "テキスト",
              position: {
                start: { line: 2, column: 1, offset: 1 },
                end: { line: 2, column: 5, offset: 5 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 2, column: 5, offset: 5 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 2, column: 5, offset: 5 },
      },
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("文字列の前に2つ以上の改行が存在する場合、Paragraph に吸収される", () => {
    const source = "\r\n\rテキスト";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "テキスト",
              position: {
                start: { line: 3, column: 1, offset: 3 },
                end: { line: 3, column: 5, offset: 7 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 3, column: 5, offset: 7 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 3, column: 5, offset: 7 },
      },
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("文字列の後に改行が存在しない場合、Paragraph になる", () => {
    const source = "テキスト";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "テキスト",
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 5, offset: 4 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 5, offset: 4 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 1, column: 5, offset: 4 },
      },
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("文字列の後に1つの改行が存在する場合、Paragraph に吸収される", () => {
    const source = "テキスト\n";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "テキスト",
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 5, offset: 4 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 2, column: 1, offset: 5 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 2, column: 1, offset: 5 },
      },
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("文字列の後に2つ以上の改行が存在する場合、Paragraph に吸収される", () => {
    const source = "テキスト\r\n\r";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "テキスト",
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 5, offset: 4 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 3, column: 1, offset: 7 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 3, column: 1, offset: 7 },
      },
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
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "一段落目",
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 5, offset: 4 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 3, column: 1, offset: 6 },
          },
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "二段落目",
              position: {
                start: { line: 3, column: 1, offset: 6 },
                end: { line: 3, column: 5, offset: 10 },
              },
            },
          ],
          position: {
            start: { line: 3, column: 1, offset: 6 },
            end: { line: 3, column: 5, offset: 10 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 3, column: 5, offset: 10 },
      },
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("連続した改行を2つ以上持つ場合は3つ以上の Paragraph に分割される", () => {
    const source = "一段落目\n\n二段落目\r二行目\r\n\r\r三段落目";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "一段落目",
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 5, offset: 4 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 3, column: 1, offset: 6 },
          },
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "二段落目",
              position: {
                start: { line: 3, column: 1, offset: 6 },
                end: { line: 3, column: 5, offset: 10 },
              },
            },
            {
              type: "break",
              position: {
                start: { line: 3, column: 5, offset: 10 },
                end: { line: 4, column: 1, offset: 11 },
              },
            },
            {
              type: "text",
              value: "二行目",
              position: {
                start: { line: 4, column: 1, offset: 11 },
                end: { line: 4, column: 4, offset: 14 },
              },
            },
          ],
          position: {
            start: { line: 3, column: 1, offset: 6 },
            end: { line: 7, column: 1, offset: 18 },
          },
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "三段落目",
              position: {
                start: { line: 7, column: 1, offset: 18 },
                end: { line: 7, column: 5, offset: 22 },
              },
            },
          ],
          position: {
            start: { line: 7, column: 1, offset: 18 },
            end: { line: 7, column: 5, offset: 22 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 7, column: 5, offset: 22 },
      },
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
            {
              type: "text",
              value: "一行目",
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 4, offset: 3 },
              },
            },
            {
              type: "break",
              position: {
                start: { line: 1, column: 4, offset: 3 },
                end: { line: 2, column: 1, offset: 4 },
              },
            },
            {
              type: "text",
              value: "二行目",
              position: {
                start: { line: 2, column: 1, offset: 4 },
                end: { line: 2, column: 4, offset: 7 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 2, column: 4, offset: 7 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 2, column: 4, offset: 7 },
      },
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
              children: [
                {
                  type: "text",
                  value: "リンク例",
                  position: {
                    start: { line: 1, column: 11, offset: 10 },
                    end: { line: 1, column: 15, offset: 14 },
                  },
                },
              ],
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 37, offset: 36 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 37, offset: 36 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 1, column: 37, offset: 36 },
      },
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
          children: [
            {
              type: "pageReference",
              pageNumber: 1,
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 10, offset: 9 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 10, offset: 9 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 1, column: 10, offset: 9 },
      },
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
            {
              type: "ruby",
              value: "換言",
              ruby: "かんげん",
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 18, offset: 17 },
              },
            },
            {
              type: "text",
              value: "すれば",
              position: {
                start: { line: 1, column: 18, offset: 17 },
                end: { line: 1, column: 21, offset: 20 },
              },
            },
            {
              type: "ruby",
              value: "畢竟",
              ruby: "ひっきょう",
              position: {
                start: { line: 1, column: 21, offset: 20 },
                end: { line: 1, column: 36, offset: 35 },
              },
            },
            {
              type: "text",
              value: "ももんが",
              position: {
                start: { line: 1, column: 36, offset: 35 },
                end: { line: 1, column: 40, offset: 39 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 40, offset: 39 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 1, column: 40, offset: 39 },
      },
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
          children: [
            {
              type: "text",
              value: "ただのテキスト",
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 8, offset: 7 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 8, offset: 7 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 1, column: 8, offset: 7 },
      },
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });
});
