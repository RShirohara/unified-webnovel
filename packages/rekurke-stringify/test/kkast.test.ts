import type { Root } from "@rshirohara/kkast";
import { describe, expect, test } from "vitest";
import { toKakuyomuNovel } from "~/lib/index.js";

describe("PhrasingContent", () => {
  describe("Paragraph", () => {
    test("`FlowContent` が空文字で結合される", () => {
      const source: Root = {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [
              { type: "text", value: "これは一段落目" },
              { type: "break" },
              { type: "text", value: "これは二行目" },
            ],
          },
          {
            type: "paragraph",
            children: [{ type: "text", value: "これは二段落目" }],
          },
        ],
      };
      const expected: string = "これは一段落目\nこれは二行目これは二段落目";
      expect(toKakuyomuNovel(source)).toEqual(expected);
    });
  });

  describe("ParagraphMargin", () => {
    test("`size` の個数分だけ `\n` が追加される", () => {
      const source: Root = {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [{ type: "text", value: "これは一段落目" }],
          },
          { type: "paragraphMargin", size: 1 },
          {
            type: "paragraph",
            children: [{ type: "text", value: "これは二段落目" }],
          },
          { type: "paragraphMargin", size: 2 },
          {
            type: "paragraph",
            children: [{ type: "text", value: "これは三段落目" }],
          },
          { type: "paragraphMargin", size: 3 },
          {
            type: "paragraph",
            children: [{ type: "text", value: "これは四段落目" }],
          },
        ],
      };
      const expected: string = [
        "これは一段落目\n\n",
        "これは二段落目\n\n\n",
        "これは三段落目\n\n\n\n",
        "これは四段落目",
      ].join("");
      expect(toKakuyomuNovel(source)).toEqual(expected);
    });
  });
});

describe("FlowContent", () => {
  describe("Break", () => {
    test("ちゃんとレンダリングできる", () => {
      const source: Root = {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [
              { type: "text", value: "これは一行目" },
              { type: "break" },
              { type: "text", value: "これは二行目" },
            ],
          },
        ],
      };
      const expected: string = "これは一行目\nこれは二行目";
      expect(toKakuyomuNovel(source)).toEqual(expected);
    });
  });

  describe("Emphasis", () => {
    test("ちゃんとレンダリングできる", () => {
      const source: Root = {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [
              { type: "text", value: "これは" },
              { type: "emphasis", value: "強調" },
            ],
          },
        ],
      };
      const expected: string = "これは《《強調》》";
      expect(toKakuyomuNovel(source)).toEqual(expected);
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
              { type: "ruby", value: "ルビ", ruby: "るび" },
            ],
          },
        ],
      };
      const expected: string = "これは|ルビ《るび》";
      expect(toKakuyomuNovel(source)).toEqual(expected);
    });
  });

  describe("Text", () => {
    test("ちゃんとレンダリングできる", () => {
      const source: Root = {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [
              { type: "text", value: "これは" },
              { type: "text", value: "ただのテキスト" },
            ],
          },
        ],
      };
      const expected: string = "これはただのテキスト";
      expect(toKakuyomuNovel(source)).toEqual(expected);
    });
  });
});
