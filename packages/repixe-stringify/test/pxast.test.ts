import { describe, expect, test } from "@jest/globals";
import type { Root } from "@rshirohara/pxast";

import { toPixivNovel } from "@/lib";

describe("Root", () => {
  test("複数の子要素は '\\n\\n' で結合される", () => {
    const source: Root = {
      type: "root",
      children: [
        { type: "pageHeading", pageNumber: 1 },
        { type: "paragraph", children: [{ type: "text", value: "一段落目" }] },
        {
          type: "paragraph",
          children: [
            { type: "text", value: "二段落目" },
            { type: "break" },
            { type: "text", value: "二行目" },
          ],
        },
        { type: "pageHeading", pageNumber: 2 },
        { type: "heading", children: [{ type: "text", value: "見出し" }] },
      ],
    };
    const expected = [
      "一段落目",
      "二段落目\n二行目",
      "[newpage]",
      "[chapter: 見出し]",
    ].join("\n\n");
    expect(toPixivNovel(source)).toEqual(expected);
  });
});

describe("FlowContent", () => {
  describe("Heading", () => {
    test("ちゃんとレンダリングできる", () => {
      const source: Root = {
        type: "root",
        children: [
          { type: "heading", children: [{ type: "text", value: "見出し" }] },
        ],
      };
      const expected = "[chapter: 見出し]";
      expect(toPixivNovel(source)).toEqual(expected);
    });

    test("子要素は結合される", () => {
      const source: Root = {
        type: "root",
        children: [
          {
            type: "heading",
            children: [
              { type: "text", value: "ルビが" },
              { type: "ruby", value: "使用", ruby: "しよう" },
              { type: "text", value: "できる" },
              { type: "ruby", value: "見出", ruby: "みだ" },
              { type: "text", value: "し" },
            ],
          },
        ],
      };
      const expected =
        "[chapter: ルビが[[rb: 使用 > しよう]]できる[[rb: 見出 > みだ]]し]";
      expect(toPixivNovel(source)).toEqual(expected);
    });
  });

  describe("PageHeading", () => {
    test("ちゃんとレンダリングできる", () => {
      const source: Root = {
        type: "root",
        children: [
          { type: "pageHeading", pageNumber: 1 },
          {
            type: "paragraph",
            children: [{ type: "text", value: "1ページ目" }],
          },
          { type: "pageHeading", pageNumber: 2 },
          {
            type: "paragraph",
            children: [{ type: "text", value: "2ページ目" }],
          },
        ],
      };
      const expected = ["1ページ目", "[newpage]", "2ページ目"].join("\n\n");
      expect(toPixivNovel(source)).toEqual(expected);
    });

    test("先頭の PageHeading は除去される", () => {
      const source: Root = {
        type: "root",
        children: [
          { type: "pageHeading", pageNumber: 1 },
          {
            type: "paragraph",
            children: [{ type: "text", value: "1ページ目" }],
          },
          { type: "pageHeading", pageNumber: 2 },
          {
            type: "paragraph",
            children: [{ type: "text", value: "2ページ目" }],
          },
          { type: "pageHeading", pageNumber: 3 },
          {
            type: "paragraph",
            children: [{ type: "text", value: "3ページ目" }],
          },
        ],
      };
      const expected = [
        "1ページ目",
        "[newpage]",
        "2ページ目",
        "[newpage]",
        "3ページ目",
      ].join("\n\n");
      expect(toPixivNovel(source)).toEqual(expected);
    });
  });

  describe("Paragraph", () => {
    test("ちゃんとレンダリングできる", () => {
      const source: Root = {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [{ type: "text", value: "これは段落。" }],
          },
        ],
      };
      const expected = "これは段落。";
      expect(toPixivNovel(source)).toEqual(expected);
    });

    test("子要素は結合される", () => {
      const source: Root = {
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
      const expected =
        "[[rb: 換言 > かんげん]]すれば[[rb: 畢竟 > ひっきょう]]ももんが";
      expect(toPixivNovel(source)).toEqual(expected);
    });
  });
});

describe("PhrasingContent", () => {
  describe("Link", () => {
    test("ちゃんとレンダリングできる", () => {
      const source: Root = {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [
              {
                type: "link",
                url: "https://example.com",
                children: [{ type: "text", value: "example" }],
              },
            ],
          },
        ],
      };
      const expected = "[[jumpurl: example > https://example.com]]";
      expect(toPixivNovel(source)).toEqual(expected);
    });

    test("子要素は結合される", () => {
      const source: Root = {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [
              {
                type: "link",
                url: "https://example.com/",
                children: [
                  { type: "text", value: "これが" },
                  { type: "ruby", value: "例", ruby: "れい" },
                ],
              },
            ],
          },
        ],
      };
      const expected =
        "[[jumpuri: これが[[rb: 例 > れい]] > https://example.com]]";
      expect(toPixivNovel(source)).toEqual(expected);
    });
  });

  describe("Image", () => {
    test("画像形式の Image をちゃんとレンダリングできる", () => {
      const source: Root = {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [{ type: "image", illustId: "000001" }],
          },
        ],
      };
      const expected = "[pixivimage:000001]";
      expect(toPixivNovel(source)).toEqual(expected);
    });

    test("漫画形式の Image をちゃんとレンダリングできる", () => {
      const source: Root = {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [{ type: "image", illustId: "000001", pageNumber: 2 }],
          },
        ],
      };
      const expected = "[pixivimage:000001-2]";
      expect(toPixivNovel(source)).toEqual(expected);
    });
  });

  describe("PageReference", () => {
    test("ちゃんとレンダリングできる", () => {
      const source: Root = {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [
              { type: "text", value: "これは" },
              { type: "pageReference", pageNumber: 1 },
              { type: "text", value: "ページへの参照。" },
            ],
          },
        ],
      };
      const expected = "これは[jump:1]ページへの参照。";
      expect(toPixivNovel(source)).toEqual(expected);
    });
  });
});

describe("StaticPhrasingContent", () => {
  describe("Break", () => {
    test("ちゃんとレンダリングできる", () => {
      const source: Root = {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [
              { type: "text", value: "これは" },
              { type: "break" },
              { type: "text", value: "改行。" },
            ],
          },
        ],
      };
      const expected = "これは\n改行。";
      expect(toPixivNovel(source)).toEqual(expected);
    });
  });

  describe("Ruby", () => {
    test("ちゃんとレンダリングできる", () => {
      const source: Root = {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [
              { type: "text", value: "これは" },
              { type: "ruby", value: "例文", ruby: "れいぶん" },
              { type: "text", value: "。" },
            ],
          },
        ],
      };
      const expected = "これは[[rb: 例文 > れいぶん]]。";
      expect(toPixivNovel(source)).toEqual(expected);
    });
  });

  describe("Text", () => {
    test("ちゃんとレンダリングできる", () => {
      const source: Root = {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [{ type: "text", value: "これはテスト。" }],
          },
        ],
      };
      const expected = "これはテスト。";
      expect(toPixivNovel(source)).toEqual(expected);
    });
  });
});
