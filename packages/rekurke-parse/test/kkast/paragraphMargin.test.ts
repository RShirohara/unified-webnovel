import { describe, expect, test } from "vitest";

import type { Root } from "@rshirohara/kkast";
import { fromKakuyomuNovel } from "~/lib/index.js";

describe("2つの改行で成立する`ParagraphMargin`", () => {
  test("LF, LF", () => {
    const source = "これは一段落目\n\nこれは二段落目";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "これは一段落目",
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
        {
          type: "paragraphMargin",
          size: 1,
          position: {
            start: { line: 1, column: 8, offset: 7 },
            end: { line: 3, column: 1, offset: 9 },
          },
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "これは二段落目",
              position: {
                start: { line: 3, column: 1, offset: 9 },
                end: { line: 3, column: 8, offset: 16 },
              },
            },
          ],
          position: {
            start: { line: 3, column: 1, offset: 9 },
            end: { line: 3, column: 8, offset: 16 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 3, column: 8, offset: 16 },
      },
    };
    expect(fromKakuyomuNovel(source)).toEqual(expected);
  });

  test("CR, CR", () => {
    const source = "これは一段落目\r\rこれは二段落目";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "これは一段落目",
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
        {
          type: "paragraphMargin",
          size: 1,
          position: {
            start: { line: 1, column: 8, offset: 7 },
            end: { line: 3, column: 1, offset: 9 },
          },
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "これは二段落目",
              position: {
                start: { line: 3, column: 1, offset: 9 },
                end: { line: 3, column: 8, offset: 16 },
              },
            },
          ],
          position: {
            start: { line: 3, column: 1, offset: 9 },
            end: { line: 3, column: 8, offset: 16 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 3, column: 8, offset: 16 },
      },
    };
    expect(fromKakuyomuNovel(source)).toEqual(expected);
  });

  test("CRLF, CRLF", () => {
    const source = "これは一段落目\r\n\r\nこれは二段落目";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "これは一段落目",
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
        {
          type: "paragraphMargin",
          size: 1,
          position: {
            start: { line: 1, column: 8, offset: 7 },
            end: { line: 3, column: 1, offset: 11 },
          },
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "これは二段落目",
              position: {
                start: { line: 3, column: 1, offset: 11 },
                end: { line: 3, column: 8, offset: 18 },
              },
            },
          ],
          position: {
            start: { line: 3, column: 1, offset: 11 },
            end: { line: 3, column: 8, offset: 18 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 3, column: 8, offset: 18 },
      },
    };
    expect(fromKakuyomuNovel(source)).toEqual(expected);
  });

  test("LF, CRLF", () => {
    const source = "これは一段落目\n\r\nこれは二段落目";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "これは一段落目",
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
        {
          type: "paragraphMargin",
          size: 1,
          position: {
            start: { line: 1, column: 8, offset: 7 },
            end: { line: 3, column: 1, offset: 10 },
          },
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "これは二段落目",
              position: {
                start: { line: 3, column: 1, offset: 10 },
                end: { line: 3, column: 8, offset: 17 },
              },
            },
          ],
          position: {
            start: { line: 3, column: 1, offset: 10 },
            end: { line: 3, column: 8, offset: 17 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 3, column: 8, offset: 17 },
      },
    };
    expect(fromKakuyomuNovel(source)).toEqual(expected);
  });

  test("CR, CRLF", () => {
    const source = "これは一段落目\r\r\nこれは二段落目";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "これは一段落目",
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
        {
          type: "paragraphMargin",
          size: 1,
          position: {
            start: { line: 1, column: 8, offset: 7 },
            end: { line: 3, column: 1, offset: 10 },
          },
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "これは二段落目",
              position: {
                start: { line: 3, column: 1, offset: 10 },
                end: { line: 3, column: 8, offset: 17 },
              },
            },
          ],
          position: {
            start: { line: 3, column: 1, offset: 10 },
            end: { line: 3, column: 8, offset: 17 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 3, column: 8, offset: 17 },
      },
    };
    expect(fromKakuyomuNovel(source)).toEqual(expected);
  });

  test("CRLF, CR", () => {
    const source = "これは一段落目\r\n\rこれは二段落目";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "これは一段落目",
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
        {
          type: "paragraphMargin",
          size: 1,
          position: {
            start: { line: 1, column: 8, offset: 7 },
            end: { line: 3, column: 1, offset: 10 },
          },
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "これは二段落目",
              position: {
                start: { line: 3, column: 1, offset: 10 },
                end: { line: 3, column: 8, offset: 17 },
              },
            },
          ],
          position: {
            start: { line: 3, column: 1, offset: 10 },
            end: { line: 3, column: 8, offset: 17 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 3, column: 8, offset: 17 },
      },
    };
    expect(fromKakuyomuNovel(source)).toEqual(expected);
  });

  test("CRLF, LF", () => {
    const source = "これは一段落目\r\n\nこれは二段落目";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "これは一段落目",
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
        {
          type: "paragraphMargin",
          size: 1,
          position: {
            start: { line: 1, column: 8, offset: 7 },
            end: { line: 3, column: 1, offset: 10 },
          },
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "これは二段落目",
              position: {
                start: { line: 3, column: 1, offset: 10 },
                end: { line: 3, column: 8, offset: 17 },
              },
            },
          ],
          position: {
            start: { line: 3, column: 1, offset: 10 },
            end: { line: 3, column: 8, offset: 17 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 3, column: 8, offset: 17 },
      },
    };
    expect(fromKakuyomuNovel(source)).toEqual(expected);
  });
});

describe("3つ以上の改行で成立する`ParagraphMargin`", () => {
  test("LF, LF, LF", () => {
    const source = "これは一段落目\n\n\nこれは二段落目";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "これは一段落目",
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
        {
          type: "paragraphMargin",
          size: 2,
          position: {
            start: { line: 1, column: 8, offset: 7 },
            end: { line: 4, column: 1, offset: 10 },
          },
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "これは二段落目",
              position: {
                start: { line: 4, column: 1, offset: 10 },
                end: { line: 4, column: 8, offset: 17 },
              },
            },
          ],
          position: {
            start: { line: 4, column: 1, offset: 10 },
            end: { line: 4, column: 8, offset: 17 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 4, column: 8, offset: 17 },
      },
    };
    expect(fromKakuyomuNovel(source)).toEqual(expected);
  });

  test("CR, CR, CR", () => {
    const source = "これは一段落目\r\r\rこれは二段落目";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "これは一段落目",
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
        {
          type: "paragraphMargin",
          size: 2,
          position: {
            start: { line: 1, column: 8, offset: 7 },
            end: { line: 4, column: 1, offset: 10 },
          },
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "これは二段落目",
              position: {
                start: { line: 4, column: 1, offset: 10 },
                end: { line: 4, column: 8, offset: 17 },
              },
            },
          ],
          position: {
            start: { line: 4, column: 1, offset: 10 },
            end: { line: 4, column: 8, offset: 17 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 4, column: 8, offset: 17 },
      },
    };
    expect(fromKakuyomuNovel(source)).toEqual(expected);
  });

  test("CRLF, CRLF, CRLF", () => {
    const source = "これは一段落目\r\n\r\n\r\nこれは二段落目";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "これは一段落目",
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
        {
          type: "paragraphMargin",
          size: 2,
          position: {
            start: { line: 1, column: 8, offset: 7 },
            end: { line: 4, column: 1, offset: 13 },
          },
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "これは二段落目",
              position: {
                start: { line: 4, column: 1, offset: 13 },
                end: { line: 4, column: 8, offset: 20 },
              },
            },
          ],
          position: {
            start: { line: 4, column: 1, offset: 13 },
            end: { line: 4, column: 8, offset: 20 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 4, column: 8, offset: 20 },
      },
    };
    expect(fromKakuyomuNovel(source)).toEqual(expected);
  });

  test("LF, CR, CRLF", () => {
    const source = "これは一段落目\n\r\r\nこれは二段落目";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "これは一段落目",
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
        {
          type: "paragraphMargin",
          size: 2,
          position: {
            start: { line: 1, column: 8, offset: 7 },
            end: { line: 4, column: 1, offset: 11 },
          },
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "これは二段落目",
              position: {
                start: { line: 4, column: 1, offset: 11 },
                end: { line: 4, column: 8, offset: 18 },
              },
            },
          ],
          position: {
            start: { line: 4, column: 1, offset: 11 },
            end: { line: 4, column: 8, offset: 18 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 4, column: 8, offset: 18 },
      },
    };
    expect(fromKakuyomuNovel(source)).toEqual(expected);
  });

  test("LF, CRLF, CR", () => {
    const source = "これは一段落目\n\r\n\rこれは二段落目";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "これは一段落目",
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
        {
          type: "paragraphMargin",
          size: 2,
          position: {
            start: { line: 1, column: 8, offset: 7 },
            end: { line: 4, column: 1, offset: 11 },
          },
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "これは二段落目",
              position: {
                start: { line: 4, column: 1, offset: 11 },
                end: { line: 4, column: 8, offset: 18 },
              },
            },
          ],
          position: {
            start: { line: 4, column: 1, offset: 11 },
            end: { line: 4, column: 8, offset: 18 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 4, column: 8, offset: 18 },
      },
    };
    expect(fromKakuyomuNovel(source)).toEqual(expected);
  });

  test("CR, CRLF, LF", () => {
    const source = "これは一段落目\r\r\n\nこれは二段落目";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "これは一段落目",
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
        {
          type: "paragraphMargin",
          size: 2,
          position: {
            start: { line: 1, column: 8, offset: 7 },
            end: { line: 4, column: 1, offset: 11 },
          },
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "これは二段落目",
              position: {
                start: { line: 4, column: 1, offset: 11 },
                end: { line: 4, column: 8, offset: 18 },
              },
            },
          ],
          position: {
            start: { line: 4, column: 1, offset: 11 },
            end: { line: 4, column: 8, offset: 18 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 4, column: 8, offset: 18 },
      },
    };
    expect(fromKakuyomuNovel(source)).toEqual(expected);
  });

  test("CRLF, LF, CR", () => {
    const source = "これは一段落目\r\n\n\rこれは二段落目";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "これは一段落目",
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
        {
          type: "paragraphMargin",
          size: 2,
          position: {
            start: { line: 1, column: 8, offset: 7 },
            end: { line: 4, column: 1, offset: 11 },
          },
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "これは二段落目",
              position: {
                start: { line: 4, column: 1, offset: 11 },
                end: { line: 4, column: 8, offset: 18 },
              },
            },
          ],
          position: {
            start: { line: 4, column: 1, offset: 11 },
            end: { line: 4, column: 8, offset: 18 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 4, column: 8, offset: 18 },
      },
    };
    expect(fromKakuyomuNovel(source)).toEqual(expected);
  });
});

test("`Paragraph`の先頭にある空行は`ParagraphMargin`に変換される", () => {
  const source = "\n先頭に空行";
  const expected: Root = {
    type: "root",
    children: [
      {
        type: "paragraphMargin",
        size: 1,
        position: {
          start: { line: 1, column: 1, offset: 0 },
          end: { line: 2, column: 1, offset: 1 },
        },
      },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            value: "先頭に空行",
            position: {
              start: { line: 2, column: 1, offset: 1 },
              end: { line: 2, column: 6, offset: 6 },
            },
          },
        ],
        position: {
          start: { line: 2, column: 1, offset: 1 },
          end: { line: 2, column: 6, offset: 6 },
        },
      },
    ],
    position: {
      start: { line: 1, column: 1, offset: 0 },
      end: { line: 2, column: 6, offset: 6 },
    },
  };
  expect(fromKakuyomuNovel(source)).toEqual(expected);
});
