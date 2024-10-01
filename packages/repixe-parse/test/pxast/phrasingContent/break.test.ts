import type { Root } from "@rshirohara/pxast";
import { describe, expect, test } from "vitest";
import { fromPixivNovel } from "~/lib/index.js";

describe("内部コンテンツ", () => {
  describe("1つの改行は Break になる", () => {
    test("CR", () => {
      const source = "一行目\r二行目";
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
        ],
      };
      expect(fromPixivNovel(source)).toEqual(expected);
    });

    test("LF", () => {
      const source = "一行目\n二行目";
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
        ],
      };
      expect(fromPixivNovel(source)).toEqual(expected);
    });

    test("CRLF", () => {
      const source = "一行目\r\n二行目";
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
        ],
      };
      expect(fromPixivNovel(source)).toEqual(expected);
    });
  });
});
