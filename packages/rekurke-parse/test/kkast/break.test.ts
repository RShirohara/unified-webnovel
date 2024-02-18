import type { Root } from "@rshirohara/kkast";
import { describe, expect, test } from "vitest";
import { fromKakuyomuNovel } from "~/lib/index.js";

describe("LF (`U+000A`)", () => {
  test("単一の`Break`に変換できる", () => {
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
    expect(fromKakuyomuNovel(source)).toEqual(expected);
  });

  test("`Paragraph`の末尾にある空行は除去される", () => {
    const source = "末尾に空行\n";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "末尾に空行",
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 6, offset: 5 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 2, column: 1, offset: 6 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 2, column: 1, offset: 6 },
      },
    };
    expect(fromKakuyomuNovel(source)).toEqual(expected);
  });
});

describe("CR (`U+000D`)", () => {
  test("単一の`Break`に変換できる", () => {
    const source = "一行目\r二行目";
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
    expect(fromKakuyomuNovel(source)).toEqual(expected);
  });

  test("`Paragraph`の末尾にある空行は除去される", () => {
    const source = "末尾に空行\r";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "末尾に空行",
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 6, offset: 5 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 2, column: 1, offset: 6 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 2, column: 1, offset: 6 },
      },
    };
    expect(fromKakuyomuNovel(source)).toEqual(expected);
  });
});

describe("CRLF (`U+000D` + `U+000A`)", () => {
  test("単一の`Break`に変換できる", () => {
    const source = "一行目\r\n二行目";
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
                end: { line: 2, column: 1, offset: 5 },
              },
            },
            {
              type: "text",
              value: "二行目",
              position: {
                start: { line: 2, column: 1, offset: 5 },
                end: { line: 2, column: 4, offset: 8 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 2, column: 4, offset: 8 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 2, column: 4, offset: 8 },
      },
    };
    expect(fromKakuyomuNovel(source)).toEqual(expected);
  });

  test("`Paragraph`の末尾にある空行は除去される", () => {
    const source = "末尾に空行\r\n";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "末尾に空行",
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 6, offset: 5 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 2, column: 1, offset: 7 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 2, column: 1, offset: 7 },
      },
    };
    expect(fromKakuyomuNovel(source)).toEqual(expected);
  });
});
