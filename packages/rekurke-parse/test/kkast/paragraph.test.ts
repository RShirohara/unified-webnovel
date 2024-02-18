import type { Root } from "@rshirohara/kkast";
import { expect, test } from "vitest";
import { fromKakuyomuNovel } from "~/lib/index.js";

test("空行を除く要素はすべて`Paragraph`に格納される", () => {
  const source =
    "これは一行目\nこれは|二行目《にぎょうめ》\rこれは《《三行目》》\r\n";
  const expected: Root = {
    type: "root",
    children: [
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            value: "これは一行目",
            position: {
              start: { line: 1, column: 1, offset: 0 },
              end: { line: 1, column: 7, offset: 6 },
            },
          },
          {
            type: "break",
            position: {
              start: { line: 1, column: 7, offset: 6 },
              end: { line: 2, column: 1, offset: 7 },
            },
          },
          {
            type: "text",
            value: "これは",
            position: {
              start: { line: 2, column: 1, offset: 7 },
              end: { line: 2, column: 4, offset: 10 },
            },
          },
          {
            type: "ruby",
            value: "二行目",
            ruby: "にぎょうめ",
            position: {
              start: { line: 2, column: 4, offset: 10 },
              end: { line: 2, column: 15, offset: 21 },
            },
          },
          {
            type: "break",
            position: {
              start: { line: 2, column: 15, offset: 21 },
              end: { line: 3, column: 1, offset: 22 },
            },
          },
          {
            type: "text",
            value: "これは",
            position: {
              start: { line: 3, column: 1, offset: 22 },
              end: { line: 3, column: 4, offset: 25 },
            },
          },
          {
            type: "emphasis",
            value: "三行目",
            position: {
              start: { line: 3, column: 4, offset: 25 },
              end: { line: 3, column: 11, offset: 32 },
            },
          },
        ],
        position: {
          start: { line: 1, column: 1, offset: 0 },
          end: { line: 4, column: 1, offset: 34 },
        },
      },
    ],
    position: {
      start: { line: 1, column: 1, offset: 0 },
      end: { line: 4, column: 1, offset: 34 },
    },
  };
  expect(fromKakuyomuNovel(source)).toEqual(expected);
});
