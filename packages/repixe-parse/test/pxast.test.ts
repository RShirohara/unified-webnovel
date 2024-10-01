import type { Root } from "@rshirohara/pxast";
import { describe, expect, test } from "vitest";
import { fromPixivNovel } from "~/lib/index.js";

describe("PhrasingContent", () => {
  describe("Image", () => {
    test("画像形式の PixivImage をちゃんと変換できる", () => {
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
    test("漫画形式の PixivImage をちゃんと変換できる", () => {
      const source = "[pixivimage:000001-2]";
      const expected: Root = {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [{ type: "image", illustId: "000001", pageNumber: 2 }],
          },
        ],
      };
      expect(fromPixivNovel(source)).toEqual(expected);
    });
  });

  describe("Link", () => {
    test("正常な URL をちゃんと Link にできる", () => {
      const source = "[[jumpuri: example > https://example.com]]";
      const expected: Root = {
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
      expect(fromPixivNovel(source)).toEqual(expected);
    });
    test("Ruby を格納できる", () => {
      const source =
        "[[jumpuri: これが[[rb: 例 > れい]] > https://example.com/]]";
      const expected: Root = {
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
      expect(fromPixivNovel(source)).toEqual(expected);
    });
    test("Text を格納できる", () => {
      const source = "[[jumpuri:[リンク例]>https://example.com]]";
      const expected: Root = {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [
              {
                type: "link",
                url: "https://example.com",
                children: [{ type: "text", value: "[リンク例]" }],
              },
            ],
          },
        ],
      };
      expect(fromPixivNovel(source)).toEqual(expected);
    });
  });

  describe("PageReference", () => {
    test("ページへの参照をちゃんと変換できる", () => {
      const source = "[jump:01]";
      const expected: Root = {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [{ type: "pageReference", pageNumber: 1 }],
          },
        ],
      };
      expect(fromPixivNovel(source)).toEqual(expected);
    });
  });
});

describe("PhrasingStaticContent", () => {
  describe("Ruby", () => {
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

  describe("Text", () => {
    test("ただのテキストはちゃんとただのテキストになる", () => {
      const source = "ただのテキスト";
      const expected: Root = {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [{ type: "text", value: "ただのテキスト" }],
          },
        ],
      };
      expect(fromPixivNovel(source)).toEqual(expected);
    });
  });
});

describe("空要素の除去", () => {
  describe("Paragraph", () => {
    describe("Break", () => {
      test("Paragraph の先頭にある Break は削除される", () => {
        const source = "\n一行目\n二行目\n\n\n二段落目\n\n三段落目";
        const expected: Root = {
          type: "root",
          children: [
            {
              type: "paragraph",
              children: [
                { type: "text", value: "一行目" },
                { type: "break" },
                { type: "text", value: "二行目" },
              ],
            },
            {
              type: "paragraph",
              children: [{ type: "text", value: "二段落目" }],
            },
            {
              type: "paragraph",
              children: [{ type: "text", value: "三段落目" }],
            },
          ],
        };
        expect(fromPixivNovel(source)).toEqual(expected);
      });
      test("Paragraph の末尾にある Break は削除される", () => {
        const source = "一行目\n二行目\n\n二段落目\n二行目\n\n\n三段落目\n";
        const expected: Root = {
          type: "root",
          children: [
            {
              type: "paragraph",
              children: [
                { type: "text", value: "一行目" },
                { type: "break" },
                { type: "text", value: "二行目" },
              ],
            },
            {
              type: "paragraph",
              children: [
                { type: "text", value: "二段落目" },
                { type: "break" },
                { type: "text", value: "二行目" },
              ],
            },
            {
              type: "paragraph",
              children: [{ type: "text", value: "三段落目" }],
            },
          ],
        };
        expect(fromPixivNovel(source)).toEqual(expected);
      });
    });
  });

  describe("Link", () => {
    describe("Text", () => {
      test("Link の末尾にある空の Text は削除される", () => {
        const source =
          "[[jumpuri:リンクの[[rb:中>なか]]でルビが[[rb: 使用> しよう]]できる> https://example.com]]";
        const expected: Root = {
          type: "root",
          children: [
            {
              type: "paragraph",
              children: [
                {
                  type: "link",
                  url: "https://example.com",
                  children: [
                    { type: "text", value: "リンクの" },
                    { type: "ruby", value: "中", ruby: "なか" },
                    { type: "text", value: "でルビが" },
                    { type: "ruby", value: "使用", ruby: "しよう" },
                    { type: "text", value: "できる" },
                  ],
                },
              ],
            },
          ],
        };
        expect(fromPixivNovel(source)).toEqual(expected);
      });
    });
  });
});
