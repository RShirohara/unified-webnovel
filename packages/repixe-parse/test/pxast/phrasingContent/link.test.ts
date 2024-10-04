import type { Root } from "@rshirohara/pxast";
import { describe, expect, test } from "vitest";
import { fromPixivNovel } from "~/lib/index.js";

describe("Tokenize", () => {
  test("`[[` の後にスペースを挟まず文字列が存在する場合、Link になる", () => {
    const source = "[[jumpuri:example>https://example.org]]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "link",
              url: "https://example.org",
              children: [{ type: "text", value: "example" }],
            },
          ],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`[[` の後に1つのスペースを挟んで文字列が存在する場合、ただの Text になる", () => {
    const source = "[[ jumpuri:example>https://example.org]]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            { type: "text", value: "[[ jumpuri:example>https://example.org]]" },
          ],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`:` の前にスペースを挟まず文字列が存在する場合、Link になる", () => {
    const source = "[[jumpuri:example>https://example.org]]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "link",
              url: "https://example.org",
              children: [{ type: "text", value: "example" }],
            },
          ],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`:` の前に1つのスペースを挟んで文字列が存在する場合、ただの Text になる", () => {
    const source = "[[jumpuri :example>https://example.org]]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            { type: "text", value: "[[jumpuri :example>https://example.org]]" },
          ],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`:` の後にスペースを挟まず文字列が存在する場合、Link になる", () => {
    const source = "[[jumpuri:example>https://example.org]]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "link",
              url: "https://example.org",
              children: [{ type: "text", value: "example" }],
            },
          ],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`:` の後に1つのスペースを挟んで文字列が存在する場合、Link になる", () => {
    const source = "[[jumpuri: example>https://example.org]]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "link",
              url: "https://example.org",
              children: [{ type: "text", value: "example" }],
            },
          ],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`:` の後に2つ以上のスペースを挟んで文字列が存在する場合、Link になる", () => {
    const source = "[[jumpuri: 　example>https://example.org]]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "link",
              url: "https://example.org",
              children: [{ type: "text", value: "example" }],
            },
          ],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`>` の前にスペースを挟まず文字列が存在する場合、Link になる", () => {
    const source = "[[jumpuri:example>https://example.org]]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "link",
              url: "https://example.org",
              children: [{ type: "text", value: "example" }],
            },
          ],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`>` の前に1つのスペースを挟んで文字列が存在する場合、Link になる", () => {
    const source = "[[jumpuri:example >https://example.org]]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "link",
              url: "https://example.org",
              children: [{ type: "text", value: "example" }],
            },
          ],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`>` の前に2つ以上のスペースを挟んで文字列が存在する場合、Link になる", () => {
    const source = "[[jumpuri:example 　>https://example.org]]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "link",
              url: "https://example.org",
              children: [{ type: "text", value: "example" }],
            },
          ],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`>` の後にスペースを挟まず文字列が存在する場合、Link になる", () => {
    const source = "[[jumpuri:example>https://example.org]]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "link",
              url: "https://example.org",
              children: [{ type: "text", value: "example" }],
            },
          ],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`>` の後に1つの半角スペースを挟んで文字列が存在する場合、Link になる", () => {
    const source = "[[jumpuri:example> https://example.org]]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "link",
              url: "https://example.org",
              children: [{ type: "text", value: "example" }],
            },
          ],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`>` の後に1つの全角スペースを挟んで文字列が存在する場合、ただの Text になる", () => {
    const source = "[[jumpuri:example>　https://example.org]]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "[[jumpuri:example>　https://example.org]]",
            },
          ],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`>` の後に2つ以上の半角スペースを挟んで文字列が存在する場合、Link になる", () => {
    const source = "[[jumpuri:example>  https://example.org]]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "link",
              url: "https://example.org",
              children: [{ type: "text", value: "example" }],
            },
          ],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`>` の後に2つ以上の全角スペースを挟んで文字列が存在する場合、ただの Text になる", () => {
    const source = "[[jumpuri:example>　　https://example.org]]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "[[jumpuri:example>　　https://example.org]]",
            },
          ],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`]]` の前にスペースを挟まず文字列が存在する場合、Link になる", () => {
    const source = "[[jumpuri:example>https://example.org]]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "link",
              url: "https://example.org",
              children: [{ type: "text", value: "example" }],
            },
          ],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`]]` の前に1つの半角スペースを挟んで文字列が存在する場合、Link になる", () => {
    const source = "[[jumpuri:example>https://example.org ]]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "link",
              url: "https://example.org",
              children: [{ type: "text", value: "example" }],
            },
          ],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`]]` の前に1つの全角スペースを挟んで文字列が存在する場合、ただの Text になる", () => {
    const source = "[[jumpuri:example>https://example.com　]]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "[[jumpuri:example>https://example.com　]]",
            },
          ],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`]]` の前に2つ以上の半角スペースを挟んで文字列が存在する場合、Link になる", () => {
    const source = "[[jumpuri:example>https://example.org  ]]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "link",
              url: "https://example.org",
              children: [{ type: "text", value: "example" }],
            },
          ],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`]]` の前に2つ以上の全角スペースを挟んで文字列が存在する場合、ただの Text になる", () => {
    const source = "[[jumpuri:example>https://example.com　　]]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "[[jumpuri:example>https://example.com　　]]",
            },
          ],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });
});

describe("内部コンテンツ", () => {
  test("HTTP URL を Link にできる", () => {
    const source = "[[jumpuri:example>http://example.org]]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "link",
              url: "http://example.org",
              children: [{ type: "text", value: "example" }],
            },
          ],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("HTTPS URL を Link にできる", () => {
    const source = "[[jumpuri:example>https://example.org]]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "link",
              url: "https://example.org",
              children: [{ type: "text", value: "example" }],
            },
          ],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("パーセントエンコーディングを含む URL を Link にできる", () => {
    const source =
      "[[jumpuri:example>https://example.com/%E3%83%86%E3%82%B9%E3%83%88]]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "link",
              url: "https://example.com/%E3%83%86%E3%82%B9%E3%83%88",
              children: [{ type: "text", value: "example" }],
            },
          ],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("Ruby を格納できる", () => {
    const source = "[[jumpuri:[[rb:ルビ>るび]]>https://example.org]]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "link",
              url: "https://example.org",
              children: [{ type: "ruby", value: "ルビ", ruby: "るび" }],
            },
          ],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("Text を格納できる", () => {
    const source = "[[jumpuri:テキスト>https://example.org]]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "link",
              url: "https://example.org",
              children: [{ type: "text", value: "テキスト" }],
            },
          ],
        },
      ],
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });
});
