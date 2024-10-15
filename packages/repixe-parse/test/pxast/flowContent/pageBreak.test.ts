import type { Root } from "@rshirohara/pxast";
import { describe, expect, test } from "vitest";
import { fromPixivNovel } from "~/lib/index.js";

describe("Tokenize", () => {
  test("`[` の前に改行が存在しない場合、PageBreak になる", () => {
    const source = "[newpage]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "pageBreak",
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

  test("`[` の前に1つの改行が存在する場合、PageBreak になる", () => {
    const source = "\n[newpage]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "pageBreak",
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 2, column: 10, offset: 10 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 2, column: 10, offset: 10 },
      },
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`[` の前に2つ以上の改行が存在する場合、PageBreak になる", () => {
    const source = "\r\n\r[newpage]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "pageBreak",
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 3, column: 10, offset: 12 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 3, column: 10, offset: 12 },
      },
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`[` の後にスペースを挟まず文字列が存在する場合、PageBreak になる", () => {
    const source = "[newpage]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "pageBreak",
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

  test("`[` の後に1つのスペースを挟んで文字列が存在する場合、ただの Text になる", () => {
    const source = "[ newpage]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "[ newpage]",
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 11, offset: 10 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 11, offset: 10 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 1, column: 11, offset: 10 },
      },
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`]` の前にスペースを挟まず文字列が存在する場合、PageBreak になる", () => {
    const source = "[newpage]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "pageBreak",
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

  test("`]` の前に1つのスペースを挟んで文字列が存在する場合、ただの Text になる", () => {
    const source = "[newpage ]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "[newpage ]",
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 11, offset: 10 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 11, offset: 10 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 1, column: 11, offset: 10 },
      },
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`]` の後に改行が存在しない場合、PageBreak になる", () => {
    const source = "[newpage]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "pageBreak",
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

  test("`]` の後に1つの改行が存在する場合、PageBreak になる", () => {
    const source = "[newpage]\n";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "pageBreak",
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 2, column: 1, offset: 10 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 2, column: 1, offset: 10 },
      },
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`]` の後に2つ以上の改行が存在する場合、PageBreak になる", () => {
    const source = "[newpage]\r\n\r";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "pageBreak",
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 3, column: 1, offset: 12 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 3, column: 1, offset: 12 },
      },
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });
});

describe("他 Node との相互作用", () => {
  test("PageBreak の前に改行を挟まず Text が存在する場合、Text と PageBreak に分割される", () => {
    const source = "テキスト[newpage]";
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
        {
          type: "pageBreak",
          position: {
            start: { line: 1, column: 5, offset: 4 },
            end: { line: 1, column: 14, offset: 13 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 1, column: 14, offset: 13 },
      },
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("PageBreak の前に1つの改行を挟んで Text が存在する場合、Text と PageBreak に分割される", () => {
    const source = "テキスト\n[newpage]";
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
        {
          type: "pageBreak",
          position: {
            start: { line: 2, column: 1, offset: 5 },
            end: { line: 2, column: 10, offset: 14 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 2, column: 10, offset: 14 },
      },
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("PageBreak の前に2つ以上の改行を挟んで Text が存在する場合、Text と PageBreak に分割される", () => {
    const source = "テキスト\r\n\r[newpage]";
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
        {
          type: "pageBreak",
          position: {
            start: { line: 3, column: 1, offset: 7 },
            end: { line: 3, column: 10, offset: 16 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 3, column: 10, offset: 16 },
      },
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("PageBreak の後に改行を挟まず Text が存在する場合、PageBreak と Text に分割される", () => {
    const source = "[newpage]テキスト";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "pageBreak",
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 10, offset: 9 },
          },
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "テキスト",
              position: {
                start: { line: 1, column: 10, offset: 9 },
                end: { line: 1, column: 14, offset: 13 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 10, offset: 9 },
            end: { line: 1, column: 14, offset: 13 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 1, column: 14, offset: 13 },
      },
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("PageBreak の後に1つの改行を挟んで Text が存在する場合、PageBreak と Text に分割される", () => {
    const source = "[newpage]\nテキスト";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "pageBreak",
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 2, column: 1, offset: 10 },
          },
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "テキスト",
              position: {
                start: { line: 2, column: 1, offset: 10 },
                end: { line: 2, column: 5, offset: 14 },
              },
            },
          ],
          position: {
            start: { line: 2, column: 1, offset: 10 },
            end: { line: 2, column: 5, offset: 14 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 2, column: 5, offset: 14 },
      },
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("PageBreak の後に2つ以上の改行を挟んで Text が存在する場合、PageBreak と Text に分割される", () => {
    const source = "[newpage]\r\n\nテキスト";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "pageBreak",
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 3, column: 1, offset: 12 },
          },
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "テキスト",
              position: {
                start: { line: 3, column: 1, offset: 12 },
                end: { line: 3, column: 5, offset: 16 },
              },
            },
          ],
          position: {
            start: { line: 3, column: 1, offset: 12 },
            end: { line: 3, column: 5, offset: 16 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 3, column: 5, offset: 16 },
      },
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("PageBreak の前に改行を挟まず Heading が存在する場合、Heading と PageBreak に分割される", () => {
    const source = "[chapter:見出し][newpage]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "heading",
          children: [
            {
              type: "text",
              value: "見出し",
              position: {
                start: { line: 1, column: 10, offset: 9 },
                end: { line: 1, column: 13, offset: 12 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 14, offset: 13 },
          },
        },
        {
          type: "pageBreak",
          position: {
            start: { line: 1, column: 14, offset: 13 },
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

  test("PageBreak の前に1つの改行を挟んで Heading が存在する場合、Heading と PageBreak に分割される", () => {
    const source = "[chapter:見出し]\n[newpage]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "heading",
          children: [
            {
              type: "text",
              value: "見出し",
              position: {
                start: { line: 1, column: 10, offset: 9 },
                end: { line: 1, column: 13, offset: 12 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 2, column: 1, offset: 14 },
          },
        },
        {
          type: "pageBreak",
          position: {
            start: { line: 2, column: 1, offset: 14 },
            end: { line: 2, column: 10, offset: 23 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 2, column: 10, offset: 23 },
      },
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("PageBreak の前に2つ以上の改行を挟んで Heading が存在する場合、Heading と PageBreak に分割される", () => {
    const source = "[chapter:見出し]\r\n\r[newpage]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "heading",
          children: [
            {
              type: "text",
              value: "見出し",
              position: {
                start: { line: 1, column: 10, offset: 9 },
                end: { line: 1, column: 13, offset: 12 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 3, column: 1, offset: 16 },
          },
        },
        {
          type: "pageBreak",
          position: {
            start: { line: 3, column: 1, offset: 16 },
            end: { line: 3, column: 10, offset: 25 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 3, column: 10, offset: 25 },
      },
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("PageBreak の後に改行を挟まず Heading が存在する場合、PageBreak と Heading に分割される", () => {
    const source = "[newpage][chapter:見出し]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "pageBreak",
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 10, offset: 9 },
          },
        },
        {
          type: "heading",
          children: [
            {
              type: "text",
              value: "見出し",
              position: {
                start: { line: 1, column: 19, offset: 18 },
                end: { line: 1, column: 22, offset: 21 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 10, offset: 9 },
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

  test("PageBreak の後に1つの改行を挟んで Heading が存在する場合、PageBreak と Heading に分割される", () => {
    const source = "[newpage]\n[chapter:見出し]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "pageBreak",
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 2, column: 1, offset: 10 },
          },
        },
        {
          type: "heading",
          children: [
            {
              type: "text",
              value: "見出し",
              position: {
                start: { line: 2, column: 10, offset: 19 },
                end: { line: 2, column: 13, offset: 22 },
              },
            },
          ],
          position: {
            start: { line: 2, column: 1, offset: 10 },
            end: { line: 2, column: 14, offset: 23 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 2, column: 14, offset: 23 },
      },
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("PageBreak の後に2つ以上の改行を挟んで Heading が存在する場合、PageBreak と Heading に分割される", () => {
    const source = "[newpage]\r\n\r[chapter:見出し]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "pageBreak",
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 3, column: 1, offset: 12 },
          },
        },
        {
          type: "heading",
          children: [
            {
              type: "text",
              value: "見出し",
              position: {
                start: { line: 3, column: 10, offset: 21 },
                end: { line: 3, column: 13, offset: 24 },
              },
            },
          ],
          position: {
            start: { line: 3, column: 1, offset: 12 },
            end: { line: 3, column: 14, offset: 25 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 3, column: 14, offset: 25 },
      },
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });
});
