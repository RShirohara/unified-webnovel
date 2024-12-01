import type { Root } from "@rshirohara/pxast";
import { describe, expect, test } from "vitest";
import { fromPixivNovel } from "~/lib/index.js";

describe("Tokenize", () => {
	test("`[` の前に改行が存在しない場合、Heading になる", () => {
		const source = "[chapter:見出し]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "heading",
					children: [
						{
							type: "text",
							value: "見出し",
							position: {
								start: { line: 1, column: 10, offset: 9 },
								end: { line: 1, column: 13, offset: 12 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 14, offset: 13 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 14, offset: 13 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("`[` の前に1つの改行が存在する場合、Heading になる", () => {
		const source = "\n[chapter:見出し]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "heading",
					children: [
						{
							type: "text",
							value: "見出し",
							position: {
								start: { line: 2, column: 10, offset: 10 },
								end: { line: 2, column: 13, offset: 13 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 2, column: 14, offset: 14 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 2, column: 14, offset: 14 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("`[` の前に2つ以上の改行が存在する場合、Heading になる", () => {
		const source = "\r\n\r[chapter:見出し]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "heading",
					children: [
						{
							type: "text",
							value: "見出し",
							position: {
								start: { line: 3, column: 10, offset: 12 },
								end: { line: 3, column: 13, offset: 15 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 3, column: 14, offset: 16 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 3, column: 14, offset: 16 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("`[` の後にスペースを挟まず文字列が存在する場合、Heading になる", () => {
		const source = "[chapter:見出し]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "heading",
					children: [
						{
							type: "text",
							value: "見出し",
							position: {
								start: { line: 1, column: 10, offset: 9 },
								end: { line: 1, column: 13, offset: 12 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 14, offset: 13 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 14, offset: 13 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("`[` の後に1つのスペースを挟んで文字列が存在する場合、ただの Text になる", () => {
		const source = "[ chapter:見出し]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "text",
							value: "[ chapter:見出し]",
							position: {
								start: { line: 1, column: 1, offset: 0 },
								end: { line: 1, column: 15, offset: 14 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 15, offset: 14 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 15, offset: 14 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("`:` の前にスペースを挟まず文字列が存在する場合、Heading になる", () => {
		const source = "[chapter:見出し]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "heading",
					children: [
						{
							type: "text",
							value: "見出し",
							position: {
								start: { line: 1, column: 10, offset: 9 },
								end: { line: 1, column: 13, offset: 12 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 14, offset: 13 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 14, offset: 13 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("`:` の前に1つのスペースを挟んで文字列が存在する場合、ただの Text になる", () => {
		const source = "[chapter :見出し]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "text",
							value: "[chapter :見出し]",
							position: {
								start: { line: 1, column: 1, offset: 0 },
								end: { line: 1, column: 15, offset: 14 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 15, offset: 14 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 15, offset: 14 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("`:` の後にスペースを挟まず文字列が存在する場合、Heading になる", () => {
		const source = "[chapter:見出し]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "heading",
					children: [
						{
							type: "text",
							value: "見出し",
							position: {
								start: { line: 1, column: 10, offset: 9 },
								end: { line: 1, column: 13, offset: 12 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 14, offset: 13 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 14, offset: 13 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("`:` の後に1つのスペースを挟んで文字列が存在する場合、Heading になる", () => {
		const source = "[chapter: 見出し]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "heading",
					children: [
						{
							type: "text",
							value: "見出し",
							position: {
								start: { line: 1, column: 11, offset: 10 },
								end: { line: 1, column: 14, offset: 13 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 15, offset: 14 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 15, offset: 14 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("`:` の後に2つ以上のスペースを挟んで文字列が存在する場合、Heading になる", () => {
		const source = "[chapter: 　見出し]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "heading",
					children: [
						{
							type: "text",
							value: "見出し",
							position: {
								start: { line: 1, column: 12, offset: 11 },
								end: { line: 1, column: 15, offset: 14 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 16, offset: 15 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 16, offset: 15 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("`]` の前にスペースを挟まず文字列が存在する場合、Heading になる", () => {
		const source = "[chapter:見出し]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "heading",
					children: [
						{
							type: "text",
							value: "見出し",
							position: {
								start: { line: 1, column: 10, offset: 9 },
								end: { line: 1, column: 13, offset: 12 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 14, offset: 13 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 14, offset: 13 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("`]` の前に1つのスペースを挟んで文字列が存在する場合、Heading になる", () => {
		const source = "[chapter:見出し ]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "heading",
					children: [
						{
							type: "text",
							value: "見出し",
							position: {
								start: { line: 1, column: 10, offset: 9 },
								end: { line: 1, column: 13, offset: 12 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 15, offset: 14 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 15, offset: 14 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("`]` の前に2つ以上のスペースを挟んで文字列が存在する場合、Heading になる", () => {
		const source = "[chapter:見出し 　]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "heading",
					children: [
						{
							type: "text",
							value: "見出し",
							position: {
								start: { line: 1, column: 10, offset: 9 },
								end: { line: 1, column: 13, offset: 12 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 16, offset: 15 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 16, offset: 15 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("`]` の後に改行が存在しない場合、Heading になる", () => {
		const source = "[chapter:見出し]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "heading",
					children: [
						{
							type: "text",
							value: "見出し",
							position: {
								start: { line: 1, column: 10, offset: 9 },
								end: { line: 1, column: 13, offset: 12 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 14, offset: 13 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 14, offset: 13 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("`]` の後に1つの改行が存在する場合、Heading になる", () => {
		const source = "[chapter:見出し]\n";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "heading",
					children: [
						{
							type: "text",
							value: "見出し",
							position: {
								start: { line: 1, column: 10, offset: 9 },
								end: { line: 1, column: 13, offset: 12 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 2, column: 1, offset: 14 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 2, column: 1, offset: 14 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("`]` の後に2つ以上の改行が存在する場合、Heading になる", () => {
		const source = "[chapter:見出し]\r\n\r";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "heading",
					children: [
						{
							type: "text",
							value: "見出し",
							position: {
								start: { line: 1, column: 10, offset: 9 },
								end: { line: 1, column: 13, offset: 12 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 3, column: 1, offset: 16 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 3, column: 1, offset: 16 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});
});

describe("他 Node との相互作用", () => {
	test("Heading の前に改行を挟まず Text が存在する場合、Text と Heading に分割される", () => {
		const source = "テキスト[chapter:見出し]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "text",
							value: "テキスト",
							position: {
								start: { line: 1, column: 1, offset: 0 },
								end: { line: 1, column: 5, offset: 4 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 5, offset: 4 },
					},
				},
				{
					type: "heading",
					children: [
						{
							type: "text",
							value: "見出し",
							position: {
								start: { line: 1, column: 14, offset: 13 },
								end: { line: 1, column: 17, offset: 16 },
							},
						},
					],
					position: {
						start: { line: 1, column: 5, offset: 4 },
						end: { line: 1, column: 18, offset: 17 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 18, offset: 17 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("Heading の前に1つの改行を挟んで Text が存在する場合、Text と Heading に分割される", () => {
		const source = "テキスト\n[chapter:見出し]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "text",
							value: "テキスト",
							position: {
								start: { line: 1, column: 1, offset: 0 },
								end: { line: 1, column: 5, offset: 4 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 2, column: 1, offset: 5 },
					},
				},
				{
					type: "heading",
					children: [
						{
							type: "text",
							value: "見出し",
							position: {
								start: { line: 2, column: 10, offset: 14 },
								end: { line: 2, column: 13, offset: 17 },
							},
						},
					],
					position: {
						start: { line: 2, column: 1, offset: 5 },
						end: { line: 2, column: 14, offset: 18 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 2, column: 14, offset: 18 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("Heading の前に2つ以上の改行を挟んで Text が存在する場合、Text と Heading に分割される", () => {
		const source = "テキスト\r\n\r[chapter:見出し]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "text",
							value: "テキスト",
							position: {
								start: { line: 1, column: 1, offset: 0 },
								end: { line: 1, column: 5, offset: 4 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 3, column: 1, offset: 7 },
					},
				},
				{
					type: "heading",
					children: [
						{
							type: "text",
							value: "見出し",
							position: {
								start: { line: 3, column: 10, offset: 16 },
								end: { line: 3, column: 13, offset: 19 },
							},
						},
					],
					position: {
						start: { line: 3, column: 1, offset: 7 },
						end: { line: 3, column: 14, offset: 20 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 3, column: 14, offset: 20 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("Heading の後に改行を挟まず Text が存在する場合、Heading と Text に分割される", () => {
		const source = "[chapter:見出し]テキスト";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "heading",
					children: [
						{
							type: "text",
							value: "見出し",
							position: {
								start: { line: 1, column: 10, offset: 9 },
								end: { line: 1, column: 13, offset: 12 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 14, offset: 13 },
					},
				},
				{
					type: "paragraph",
					children: [
						{
							type: "text",
							value: "テキスト",
							position: {
								start: { line: 1, column: 14, offset: 13 },
								end: { line: 1, column: 18, offset: 17 },
							},
						},
					],
					position: {
						start: { line: 1, column: 14, offset: 13 },
						end: { line: 1, column: 18, offset: 17 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 18, offset: 17 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("Heading の後に1つの改行を挟んで Text が存在する場合、Heading と Text に分割される", () => {
		const source = "[chapter:見出し]\nテキスト";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "heading",
					children: [
						{
							type: "text",
							value: "見出し",
							position: {
								start: { line: 1, column: 10, offset: 9 },
								end: { line: 1, column: 13, offset: 12 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 2, column: 1, offset: 14 },
					},
				},
				{
					type: "paragraph",
					children: [
						{
							type: "text",
							value: "テキスト",
							position: {
								start: { line: 2, column: 1, offset: 14 },
								end: { line: 2, column: 5, offset: 18 },
							},
						},
					],
					position: {
						start: { line: 2, column: 1, offset: 14 },
						end: { line: 2, column: 5, offset: 18 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 2, column: 5, offset: 18 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("Heading の後に2つ以上の改行を挟んで Text が存在する場合、Heading と Text に分割される", () => {
		const source = "[chapter:見出し]\r\n\rテキスト";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "heading",
					children: [
						{
							type: "text",
							value: "見出し",
							position: {
								start: { line: 1, column: 10, offset: 9 },
								end: { line: 1, column: 13, offset: 12 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 3, column: 1, offset: 16 },
					},
				},
				{
					type: "paragraph",
					children: [
						{
							type: "text",
							value: "テキスト",
							position: {
								start: { line: 3, column: 1, offset: 16 },
								end: { line: 3, column: 5, offset: 20 },
							},
						},
					],
					position: {
						start: { line: 3, column: 1, offset: 16 },
						end: { line: 3, column: 5, offset: 20 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 3, column: 5, offset: 20 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("Heading の前に改行を挟まず PageBreak が存在する場合、PageBreak と Heading に分割される", () => {
		const source = "[newpage][chapter:見出し]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "pageBreak",
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 10, offset: 9 },
					},
				},
				{
					type: "heading",
					children: [
						{
							type: "text",
							value: "見出し",
							position: {
								start: { line: 1, column: 19, offset: 18 },
								end: { line: 1, column: 22, offset: 21 },
							},
						},
					],
					position: {
						start: { line: 1, column: 10, offset: 9 },
						end: { line: 1, column: 23, offset: 22 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 23, offset: 22 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("Heading の前に1つの改行を挟んで PageBreak が存在する場合、PageBreak と Heading に分割される", () => {
		const source = "[newpage]\n[chapter:見出し]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "pageBreak",
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 2, column: 1, offset: 10 },
					},
				},
				{
					type: "heading",
					children: [
						{
							type: "text",
							value: "見出し",
							position: {
								start: { line: 2, column: 10, offset: 19 },
								end: { line: 2, column: 13, offset: 22 },
							},
						},
					],
					position: {
						start: { line: 2, column: 1, offset: 10 },
						end: { line: 2, column: 14, offset: 23 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 2, column: 14, offset: 23 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("Heading の前に2つ以上の改行を挟んで PageBreak が存在する場合、PageBreak と Heading に分割される", () => {
		const source = "[newpage]\r\n\r[chapter:見出し]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "pageBreak",
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 3, column: 1, offset: 12 },
					},
				},
				{
					type: "heading",
					children: [
						{
							type: "text",
							value: "見出し",
							position: {
								start: { line: 3, column: 10, offset: 21 },
								end: { line: 3, column: 13, offset: 24 },
							},
						},
					],
					position: {
						start: { line: 3, column: 1, offset: 12 },
						end: { line: 3, column: 14, offset: 25 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 3, column: 14, offset: 25 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("Heading の後に改行を挟まず PageBreak が存在する場合、Heading と PageBreak に分割される", () => {
		const source = "[chapter:見出し][newpage]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "heading",
					children: [
						{
							type: "text",
							value: "見出し",
							position: {
								start: { line: 1, column: 10, offset: 9 },
								end: { line: 1, column: 13, offset: 12 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 14, offset: 13 },
					},
				},
				{
					type: "pageBreak",
					position: {
						start: { line: 1, column: 14, offset: 13 },
						end: { line: 1, column: 23, offset: 22 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 23, offset: 22 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("Heading の後に1つの改行を挟んで PageBreak が存在する場合、Heading と PageBreak に分割される", () => {
		const source = "[chapter:見出し]\n[newpage]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "heading",
					children: [
						{
							type: "text",
							value: "見出し",
							position: {
								start: { line: 1, column: 10, offset: 9 },
								end: { line: 1, column: 13, offset: 12 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 2, column: 1, offset: 14 },
					},
				},
				{
					type: "pageBreak",
					position: {
						start: { line: 2, column: 1, offset: 14 },
						end: { line: 2, column: 10, offset: 23 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 2, column: 10, offset: 23 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("Heading の後に2つ以上の改行を挟んで PageBreak が存在する場合、Heading と PageBreak に分割される", () => {
		const source = "[chapter:見出し]\r\n\r[newpage]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "heading",
					children: [
						{
							type: "text",
							value: "見出し",
							position: {
								start: { line: 1, column: 10, offset: 9 },
								end: { line: 1, column: 13, offset: 12 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 3, column: 1, offset: 16 },
					},
				},
				{
					type: "pageBreak",
					position: {
						start: { line: 3, column: 1, offset: 16 },
						end: { line: 3, column: 10, offset: 25 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 3, column: 10, offset: 25 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});
});

describe("内部コンテンツ", () => {
	test("Ruby を格納できる", () => {
		const source = "[chapter:ルビが[[rb:使用>しよう]]できる見出し]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "heading",
					children: [
						{
							type: "text",
							value: "ルビが",
							position: {
								start: { line: 1, column: 10, offset: 9 },
								end: { line: 1, column: 13, offset: 12 },
							},
						},
						{
							type: "ruby",
							value: "使用",
							ruby: "しよう",
							position: {
								start: { line: 1, column: 13, offset: 12 },
								end: { line: 1, column: 26, offset: 25 },
							},
						},
						{
							type: "text",
							value: "できる見出し",
							position: {
								start: { line: 1, column: 26, offset: 25 },
								end: { line: 1, column: 32, offset: 31 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 33, offset: 32 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 33, offset: 32 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("Text を格納できる", () => {
		const source = "[chapter: ただのテキスト]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "heading",
					children: [
						{
							type: "text",
							value: "ただのテキスト",
							position: {
								start: { line: 1, column: 11, offset: 10 },
								end: { line: 1, column: 18, offset: 17 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 19, offset: 18 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 19, offset: 18 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});
});
