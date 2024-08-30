import type { Root as KkastRoot } from "@rshirohara/kkast";
import type { Root as PxastRoot } from "@rshirohara/pxast";
import { describe, expect, test } from "vitest";
import { toKkast } from "~/lib/index.js";

describe("FlowContent", () => {
  describe("Heading", () => {
    test("Paragraph に変換される", () => {
      const source: PxastRoot = {
        type: "root",
        children: [
          { type: "heading", children: [{ type: "text", value: "見出し" }] },
        ],
      };
      const expected: KkastRoot = {
        type: "root",
        children: [
          { type: "paragraph", children: [{ type: "text", value: "見出し" }] },
        ],
      };
      expect(toKkast(source)).toEqual(expected);
    });

    test("ほかの Paragraph との間に ParagraphMargin が挿入される", () => {
      const source: PxastRoot = {
        type: "root",
        children: [
          { type: "heading", children: [{ type: "text", value: "見出し" }] },
          {
            type: "paragraph",
            children: [{ type: "text", value: "これは一行目" }],
          },
        ],
      };
      const expected: KkastRoot = {
        type: "root",
        children: [
          { type: "paragraph", children: [{ type: "text", value: "見出し" }] },
          { type: "paragraphMargin", size: 1 },
          {
            type: "paragraph",
            children: [{ type: "text", value: "これは一行目" }],
          },
        ],
      };
      expect(toKkast(source)).toEqual(expected);
    });
  });

  describe("PageHeading", () => {
    test("preserveUnmatchedSyntax が false の場合、PageHeading は削除される。", () => {
      const source: PxastRoot = {
        type: "root",
        children: [{ type: "pageHeading", pageNumber: 1 }],
      };
      const expected: KkastRoot = {
        type: "root",
        children: [],
      };
      expect(toKkast(source, { preserveUnmatchedSyntax: false })).toEqual(
        expected,
      );
    });

    test("preserveUnmatchedSyntax が true の場合、Pixiv の構文を保持したまま Paragraph へ変換される", () => {
      const source: PxastRoot = {
        type: "root",
        children: [{ type: "pageHeading", pageNumber: 1 }],
      };
      const expected: KkastRoot = {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [{ type: "text", value: "[newpage]" }],
          },
        ],
      };
      expect(toKkast(source, { preserveUnmatchedSyntax: true })).toEqual(
        expected,
      );
    });
  });

  describe("Paragraph", () => {
    test("Paragraph に変換される", () => {
      const source: PxastRoot = {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [{ type: "text", value: "これは一行目" }],
          },
        ],
      };
      const expected: KkastRoot = {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [{ type: "text", value: "これは一行目" }],
          },
        ],
      };
      expect(toKkast(source)).toEqual(expected);
    });

    test("ほかの Paragraph との間に ParagraphMargin が挿入される", () => {
      const source: PxastRoot = {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [{ type: "text", value: "これは一段落目" }],
          },
          {
            type: "paragraph",
            children: [{ type: "text", value: "これは二段落目" }],
          },
        ],
      };
      const expected: KkastRoot = {
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
        ],
      };
      expect(toKkast(source)).toEqual(expected);
    });
  });
});

describe("PhrasingContent", () => {
  describe("Break", () => {
    test("Break に変換される", () => {
      const source: PxastRoot = {
        type: "root",
        children: [{ type: "paragraph", children: [{ type: "break" }] }],
      };
      const expected: KkastRoot = {
        type: "root",
        children: [{ type: "paragraph", children: [{ type: "break" }] }],
      };
      expect(toKkast(source)).toEqual(expected);
    });
  });

  describe("Image", () => {
    test("preserveUnmatchedSyntax が false の場合、Image は削除される", () => {
      const source: PxastRoot = {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [{ type: "image", illustId: "000001" }],
          },
        ],
      };
      const expected: KkastRoot = {
        type: "root",
        children: [],
      };
      expect(toKkast(source, { preserveUnmatchedSyntax: false })).toEqual(
        expected,
      );
    });

    test("preserveUnmatchedSyntax が true の場合、Pixiv の構文を保持したまま Text に変換される", () => {
      const source: PxastRoot = {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [{ type: "image", illustId: "000001", pageNumber: 2 }],
          },
        ],
      };
      const expected: KkastRoot = {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [{ type: "text", value: "[pixivimage:000001-2]" }],
          },
        ],
      };
      expect(toKkast(source, { preserveUnmatchedSyntax: true })).toEqual(
        expected,
      );
    });
  });

  describe("Link", () => {
    test("preserveUnmatchedSyntax が false の場合、Text 要素のみが変換される。", () => {
      const source: PxastRoot = {
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
      const expected: KkastRoot = {
        type: "root",
        children: [
          { type: "paragraph", children: [{ type: "text", value: "example" }] },
        ],
      };
      expect(toKkast(source, { preserveUnmatchedSyntax: false })).toEqual(
        expected,
      );
    });

    test("preserveUnmatchedSyntax が true の場合、Pixiv の構文を保持したまま Text に変換される", () => {
      const source: PxastRoot = {
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
      const expected: KkastRoot = {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                value: "[[jumpuri: example > https://example.com]]",
              },
            ],
          },
        ],
      };
      expect(toKkast(source, { preserveUnmatchedSyntax: true })).toEqual(
        expected,
      );
    });
  });

  describe("PageReference", () => {
    test("preserveUnmatchedSyntax が false の場合、PageReference は削除される", () => {
      const source: PxastRoot = {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [{ type: "pageReference", pageNumber: 1 }],
          },
        ],
      };
      const expected: KkastRoot = {
        type: "root",
        children: [],
      };
      expect(toKkast(source, { preserveUnmatchedSyntax: false })).toEqual(
        expected,
      );
    });

    test("preserveUnmatchedSyntax が true の場合、Pixiv の構文を保持したまま Text に変換される", () => {
      const source: PxastRoot = {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [{ type: "pageReference", pageNumber: 1 }],
          },
        ],
      };
      const expected: KkastRoot = {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [{ type: "text", value: "[jump:1]" }],
          },
        ],
      };
      expect(toKkast(source, { preserveUnmatchedSyntax: true })).toEqual(
        expected,
      );
    });
  });

  describe("Ruby", () => {
    test("Ruby に変換される", () => {
      const source: PxastRoot = {
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
      const expected: KkastRoot = {
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
      expect(toKkast(source, { preserveUnmatchedSyntax: true })).toEqual(
        expected,
      );
    });
  });

  describe("Text", () => {
    test("Text に変換される", () => {
      const source: PxastRoot = {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [{ type: "text", value: "ただのテキスト" }],
          },
        ],
      };
      const expected: KkastRoot = {
        type: "root",
        children: [
          {
            type: "paragraph",
            children: [{ type: "text", value: "ただのテキスト" }],
          },
        ],
      };
      expect(toKkast(source)).toEqual(expected);
    });
  });
});
