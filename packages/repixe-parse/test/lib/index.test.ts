import { describe, expect, test } from "@jest/globals";

import { fromPixivNovel } from "@/lib";
import { Root } from "@rshirohara/pxast";

describe("FlowContent", () => {
  describe("Heading", () => {
    test("Ruby を格納できる", () => {
      const source = "";
      const expected: Root = {
        type: "root",
        children: []
      };
      expect(fromPixivNovel(source)).toEqual(expected);
    });
    test("Text を格納できる", () => {
      const source = "";
      const expected: Root = {
        type: "root",
        children: []
      };
      expect(fromPixivNovel(source)).toEqual(expected);
    });
  });
  describe("PageHeading", () => {
    test("ちゃんとページを分割できる", () => {
      const source = "";
      const expected: Root = {
        type: "root",
        children: []
      };
      expect(fromPixivNovel(source)).toEqual(expected);
    });
    test("ページ番号が連続で採番される", () => {
      const source = "";
      const expected: Root = {
        type: "root",
        children: []
      };
      expect(fromPixivNovel(source)).toEqual(expected);
    });
  });
  describe("Paragraph", () => {
    test("Link を格納できる", () => {
      const source = "";
      const expected: Root = {
        type: "root",
        children: []
      };
      expect(fromPixivNovel(source)).toEqual(expected);
    });
    test("Image を格納できる", () => {
      const source = "";
      const expected: Root = {
        type: "root",
        children: []
      };
      expect(fromPixivNovel(source)).toEqual(expected);
    });
    test("Ruby を格納できる", () => {
      const source = "";
      const expected: Root = {
        type: "root",
        children: []
      };
      expect(fromPixivNovel(source)).toEqual(expected);
    });
    test("Text を格納できる", () => {
      const source = "";
      const expected: Root = {
        type: "root",
        children: []
      };
      expect(fromPixivNovel(source)).toEqual(expected);
    });
    test("1個の改行は Break になる", () => {
      const source = "";
      const expected: Root = {
        type: "root",
        children: []
      };
      expect(fromPixivNovel(source)).toEqual(expected);
    });
    test("2個の改行は新たな Paragraph に分割される", () => {
      const source = "";
      const expected: Root = {
        type: "root",
        children: []
      };
      expect(fromPixivNovel(source)).toEqual(expected);
    });
    test("前後の改行を取り除く", () => {
      const source = "";
      const expected: Root = {
        type: "root",
        children: []
      };
      expect(fromPixivNovel(source)).toEqual(expected);
    });
  });
});
describe("PhrasingContent", () => {
  describe("Link", () => {
    test("正常な URL をちゃんと Link にできる", () => {
      const source = "";
      const expected: Root = {
        type: "root",
        children: []
      };
      expect(fromPixivNovel(source)).toEqual(expected);
    });
    test("Ruby を格納できる", () => {
      const source = "";
      const expected: Root = {
        type: "root",
        children: []
      };
      expect(fromPixivNovel(source)).toEqual(expected);
    });
    test("Text を格納できる", () => {
      const source = "";
      const expected: Root = {
        type: "root",
        children: []
      };
      expect(fromPixivNovel(source)).toEqual(expected);
    });
  });
  describe("Image", () => {
    test("画像形式の PixivImage をちゃんと変換できる", () => {
      const source = "";
      const expected: Root = {
        type: "root",
        children: []
      };
      expect(fromPixivNovel(source)).toEqual(expected);
    });
    test("漫画形式の PixivImage をちゃんと変換できる", () => {
      const source = "";
      const expected: Root = {
        type: "root",
        children: []
      };
      expect(fromPixivNovel(source)).toEqual(expected);
    });
  });
  describe("PageHeading", () => {
    test("ジャンプ先の PageHeading が必ず存在する", () => {
      const source = "";
      const expected: Root = {
        type: "root",
        children: []
      };
      expect(fromPixivNovel(source)).toEqual(expected);
    });
  });
});
describe("StaticPhrasingContent", () => {
  describe("Break", () => {
    test("1個の改行は Break になる", () => {
      const source = "";
      const expected: Root = {
        type: "root",
        children: []
      };
      expect(fromPixivNovel(source)).toEqual(expected);
    });
  });
  describe("Ruby", () => {
    test("ルビをちゃんと認識できる", () => {
      const source = "";
      const expected: Root = {
        type: "root",
        children: []
      };
      expect(fromPixivNovel(source)).toEqual(expected);
    });
  });
  describe("Text", () => {
    test("ただのテキストはちゃんとただのテキストになる", () => {
      const source = "";
      const expected: Root = {
        type: "root",
        children: []
      };
      expect(fromPixivNovel(source)).toEqual(expected);
    });
  });
});
