import type { Root } from "@rshirohara/pxast";
import { describe, expect, test } from "vitest";
import { fromPixivNovel } from "~/lib/index.js";

describe("tokenize", () => {
	test("`[[` の後にスペースを挟まず文字列が存在する場合、Ruby になる", () => {
		const source = "[[rb:ルビ>るび]]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "ruby",
							value: "ルビ",
							ruby: "るび",
							position: {
								start: { line: 1, column: 1, offset: 0 },
								end: { line: 1, column: 13, offset: 12 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 13, offset: 12 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 13, offset: 12 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("`[[` の後に1つのスペースを挟んで文字列が存在する場合、ただの Text になる", () => {
		const source = "[[ rb:ルビ>るび]]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "text",
							value: "[[ rb:ルビ>るび]]",
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
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 14, offset: 13 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("`:` の前にスペースを挟まず文字列が存在する場合、Ruby になる", () => {
		const source = "[[rb:ルビ>るび]]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "ruby",
							value: "ルビ",
							ruby: "るび",
							position: {
								start: { line: 1, column: 1, offset: 0 },
								end: { line: 1, column: 13, offset: 12 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 13, offset: 12 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 13, offset: 12 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("`:` の前に1つのスペースを挟んで文字列が存在する場合、ただの Text になる", () => {
		const source = "[[rb :ルビ>るび]]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "text",
							value: "[[rb :ルビ>るび]]",
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
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 14, offset: 13 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("`:` の後にスペースを挟まず文字列が存在する場合、Ruby になる", () => {
		const source = "[[rb:ルビ>るび]]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "ruby",
							value: "ルビ",
							ruby: "るび",
							position: {
								start: { line: 1, column: 1, offset: 0 },
								end: { line: 1, column: 13, offset: 12 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 13, offset: 12 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 13, offset: 12 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("`:` の後に1つのスペースを挟んで文字列が存在する場合、Ruby になる", () => {
		const source = "[[rb: ルビ>るび]]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "ruby",
							value: "ルビ",
							ruby: "るび",
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
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 14, offset: 13 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("`:` の後に2つ以上のスペースを挟んで文字列が存在する場合、Ruby になる", () => {
		const source = "[[rb: 　ルビ>るび]]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "ruby",
							value: "ルビ",
							ruby: "るび",
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

	test("`>` の前にスペースを挟まず文字列が存在する場合、Ruby になる", () => {
		const source = "[[rb:ルビ>るび]]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "ruby",
							value: "ルビ",
							ruby: "るび",
							position: {
								start: { line: 1, column: 1, offset: 0 },
								end: { line: 1, column: 13, offset: 12 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 13, offset: 12 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 13, offset: 12 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("`>` の前に1つのスペースを挟んで文字列が存在する場合、Ruby になる", () => {
		const source = "[[rb:ルビ >るび]]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "ruby",
							value: "ルビ",
							ruby: "るび",
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
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 14, offset: 13 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("`>` の前に2つ以上のスペースを挟んで文字列が存在する場合、Ruby になる", () => {
		const source = "[[rb:ルビ 　>るび]]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "ruby",
							value: "ルビ",
							ruby: "るび",
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

	test("`>` の後にスペースを挟まず文字列が存在する場合、Ruby になる", () => {
		const source = "[[rb:ルビ>るび]]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "ruby",
							value: "ルビ",
							ruby: "るび",
							position: {
								start: { line: 1, column: 1, offset: 0 },
								end: { line: 1, column: 13, offset: 12 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 13, offset: 12 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 13, offset: 12 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("`>` の後に1つのスペースを挟んで文字列が存在する場合、Ruby になる", () => {
		const source = "[[rb:ルビ> るび]]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "ruby",
							value: "ルビ",
							ruby: "るび",
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
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 14, offset: 13 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("`>` の後に2つ以上のスペースを挟んで文字列が存在する場合、Ruby になる", () => {
		const source = "[[rb:ルビ> 　るび]]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "ruby",
							value: "ルビ",
							ruby: "るび",
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

	test("`]]` の前にスペースを挟まず文字列が存在する場合、Ruby になる", () => {
		const source = "[[rb:ルビ>るび]]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "ruby",
							value: "ルビ",
							ruby: "るび",
							position: {
								start: { line: 1, column: 1, offset: 0 },
								end: { line: 1, column: 13, offset: 12 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 13, offset: 12 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 13, offset: 12 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("`]]` の前に1つのスペースを挟んで文字列が存在する場合、Ruby になる", () => {
		const source = "[[rb:ルビ>るび ]]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "ruby",
							value: "ルビ",
							ruby: "るび",
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
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 14, offset: 13 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("`]]` の前に2つ以上のスペースを挟んで文字列が存在する場合、Ruby になる", () => {
		const source = "[[rb:ルビ>るび 　]]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "ruby",
							value: "ルビ",
							ruby: "るび",
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
});

describe("内部コンテンツ", () => {
	test("ルビをちゃんと認識できる", () => {
		const source =
			"[[rb: 換言 > かんげん]]すれば[[rb:畢竟>ひっきょう]]ももんが";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "ruby",
							value: "換言",
							ruby: "かんげん",
							position: {
								start: { line: 1, column: 1, offset: 0 },
								end: { line: 1, column: 18, offset: 17 },
							},
						},
						{
							type: "text",
							value: "すれば",
							position: {
								start: { line: 1, column: 18, offset: 17 },
								end: { line: 1, column: 21, offset: 20 },
							},
						},
						{
							type: "ruby",
							value: "畢竟",
							ruby: "ひっきょう",
							position: {
								start: { line: 1, column: 21, offset: 20 },
								end: { line: 1, column: 36, offset: 35 },
							},
						},
						{
							type: "text",
							value: "ももんが",
							position: {
								start: { line: 1, column: 36, offset: 35 },
								end: { line: 1, column: 40, offset: 39 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 40, offset: 39 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 40, offset: 39 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});
});
