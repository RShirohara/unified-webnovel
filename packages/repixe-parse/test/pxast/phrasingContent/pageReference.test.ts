import type { Root } from "@rshirohara/pxast";
import { describe, expect, test } from "vitest";
import { fromPixivNovel } from "~/lib/index.js";

describe("Tokenize", () => {
  test("`[` の後にスペースを挟まず文字列が存在する場合、PageReference になる", () => {
    const source = "[jump:01]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "pageReference",
              pageNumber: 1,
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 10, offset: 9 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 10, offset: 9 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 1, column: 10, offset: 9 },
      },
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`[` の後に1つのスペースを挟んで文字列が存在する場合、ただの Text になる", () => {
    const source = "[ jump:01]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "[ jump:01]",
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 11, offset: 10 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 11, offset: 10 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 1, column: 11, offset: 10 },
      },
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`:` の前にスペースを挟まず文字列が存在する場合、PageReference になる", () => {
    const source = "[jump:01]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "pageReference",
              pageNumber: 1,
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 10, offset: 9 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 10, offset: 9 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 1, column: 10, offset: 9 },
      },
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`:` の前に1つのスペースを挟んで文字列が存在する場合、ただの Text になる", () => {
    const source = "[jump :01]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "[jump :01]",
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 11, offset: 10 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 11, offset: 10 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 1, column: 11, offset: 10 },
      },
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`:` の後にスペースを挟まず文字列が存在する場合、PageReference になる", () => {
    const source = "[jump:01]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "pageReference",
              pageNumber: 1,
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 10, offset: 9 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 10, offset: 9 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 1, column: 10, offset: 9 },
      },
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`:` の後に1つのスペースを挟んで文字列が存在する場合、ただの Text になる", () => {
    const source = "[jump: 01]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "[jump: 01]",
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 11, offset: 10 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 11, offset: 10 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 1, column: 11, offset: 10 },
      },
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`]` の前にスペースを挟まず文字列が存在する場合、PageReference になる", () => {
    const source = "[jump:01]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "pageReference",
              pageNumber: 1,
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 10, offset: 9 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 10, offset: 9 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 1, column: 10, offset: 9 },
      },
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });

  test("`]` の前に1つのスペースを挟んで文字列が存在する場合、ただの Text になる", () => {
    const source = "[jump:01 ]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: "[jump:01 ]",
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 11, offset: 10 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 11, offset: 10 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 1, column: 11, offset: 10 },
      },
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });
});

describe("内部コンテンツ", () => {
  test("ページへの参照をちゃんと変換できる", () => {
    const source = "[jump:101]";
    const expected: Root = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "pageReference",
              pageNumber: 101,
              position: {
                start: { line: 1, column: 1, offset: 0 },
                end: { line: 1, column: 11, offset: 10 },
              },
            },
          ],
          position: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 11, offset: 10 },
          },
        },
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 1, column: 11, offset: 10 },
      },
    };
    expect(fromPixivNovel(source)).toEqual(expected);
  });
});
