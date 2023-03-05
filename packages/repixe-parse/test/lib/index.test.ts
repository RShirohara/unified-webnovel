import { describe, expect, test } from "@jest/globals";

import { fromPixivNovel } from "@/lib";
import { Root } from "@rshirohara/pxast";

describe("FlowContent", () => {
  describe("Heading", () => {
    test("Ruby を格納できる", () => {
      const source = "";
      const expectedAst: Root = {
        type: "root",
        children: []
      };
      expect(fromPixivNovel(source)).toEqual(expectedAst);
    });
    test("Text を格納できる", () => {
      const source = "";
      const expectedAst: Root = {
        type: "root",
        children: []
      };
      expect(fromPixivNovel(source)).toEqual(expectedAst);
    });
  });
  describe("PageHeading", () => {
    test("ちゃんとページを分割できる", () => {
      const source = "";
      const expectedAst: Root = {
        type: "root",
        children: []
      };
      expect(fromPixivNovel(source)).toEqual(expectedAst);
    });
    test("ページ番号が連続で採番される", () => {
      const source = "";
      const expectedAst: Root = {
        type: "root",
        children: []
      };
      expect(fromPixivNovel(source)).toEqual(expectedAst);
    });
  });
  describe("Paragraph", () => {
    test("Link を格納できる", () => {
      const source = "";
      const expectedAst: Root = {
        type: "root",
        children: []
      };
      expect(fromPixivNovel(source)).toEqual(expectedAst);
    });
    test("Image を格納できる", () => {
      const source = "";
      const expectedAst: Root = {
        type: "root",
        children: []
      };
      expect(fromPixivNovel(source)).toEqual(expectedAst);
    });
    test("Ruby を格納できる", () => {
      const source = "";
      const expectedAst: Root = {
        type: "root",
        children: []
      };
      expect(fromPixivNovel(source)).toEqual(expectedAst);
    });
    test("Text を格納できる", () => {
      const source = "";
      const expectedAst: Root = {
        type: "root",
        children: []
      };
      expect(fromPixivNovel(source)).toEqual(expectedAst);
    });
    test("1個の改行は Break になる", () => {
      const source = "";
      const expectedAst: Root = {
        type: "root",
        children: []
      };
      expect(fromPixivNovel(source)).toEqual(expectedAst);
    });
    test("2個の改行は新たな Paragraph に分割される", () => {
      const source = "";
      const expectedAst: Root = {
        type: "root",
        children: []
      };
      expect(fromPixivNovel(source)).toEqual(expectedAst);
    });
    test("前後の改行を取り除く", () => {
      const source = "";
      const expectedAst: Root = {
        type: "root",
        children: []
      };
      expect(fromPixivNovel(source)).toEqual(expectedAst);
    });
  });
});
describe("PhrasingContent", () => {
  describe("Link", () => {
    test("正常な URL をちゃんと Link にできる", () => {
      const source = "";
      const expectedAst: Root = {
        type: "root",
        children: []
      };
      expect(fromPixivNovel(source)).toEqual(expectedAst);
    });
    test("Ruby を格納できる", () => {
      const source = "";
      const expectedAst: Root = {
        type: "root",
        children: []
      };
      expect(fromPixivNovel(source)).toEqual(expectedAst);
    });
    test("Text を格納できる", () => {
      const source = "";
      const expectedAst: Root = {
        type: "root",
        children: []
      };
      expect(fromPixivNovel(source)).toEqual(expectedAst);
    });
  });
  describe("Image", () => {
    test("画像形式の PixivImage をちゃんと変換できる", () => {
      const source = "";
      const expectedAst: Root = {
        type: "root",
        children: []
      };
      expect(fromPixivNovel(source)).toEqual(expectedAst);
    });
    test("漫画形式の PixivImage をちゃんと変換できる", () => {
      const source = "";
      const expectedAst: Root = {
        type: "root",
        children: []
      };
      expect(fromPixivNovel(source)).toEqual(expectedAst);
    });
  });
  describe("PageHeading", () => {
    test("ジャンプ先の PageHeading が必ず存在する", () => {
      const source = "";
      const expectedAst: Root = {
        type: "root",
        children: []
      };
      expect(fromPixivNovel(source)).toEqual(expectedAst);
    });
  });
});
describe("StaticPhrasingContent", () => {
  describe("Break", () => {
    test("1個の改行は Break になる", () => {
      const source = "";
      const expectedAst: Root = {
        type: "root",
        children: []
      };
      expect(fromPixivNovel(source)).toEqual(expectedAst);
    });
  });
  describe("Ruby", () => {
    test("ルビをちゃんと認識できる", () => {
      const source = "";
      const expectedAst: Root = {
        type: "root",
        children: []
      };
      expect(fromPixivNovel(source)).toEqual(expectedAst);
    });
  });
  describe("Text", () => {
    test("ただのテキストはちゃんとただのテキストになる", () => {
      const source = "";
      const expectedAst: Root = {
        type: "root",
        children: []
      };
      expect(fromPixivNovel(source)).toEqual(expectedAst);
    });
  });
});
