import type { Root } from "@rshirohara/kkast";
import { expect, test } from "vitest";
import { fromKakuyomuNovel } from "~/lib/index.js";

test("ただのテキストは単一の`Text`に変換できる", () => {
  const source = "ただのテキスト";
  const expected: Root = {
    type: "root",
    children: [
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            value: "ただのテキスト",
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
    ],
    position: {
      start: { line: 1, column: 1, offset: 0 },
      end: { line: 1, column: 8, offset: 7 },
    },
  };
  expect(fromKakuyomuNovel(source)).toEqual(expected);
});
