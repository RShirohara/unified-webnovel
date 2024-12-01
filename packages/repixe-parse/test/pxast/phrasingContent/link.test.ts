import type { Root } from "@rshirohara/pxast";
import { describe, expect, test } from "vitest";
import { fromPixivNovel } from "~/lib/index.js";

describe("Tokenize", () => {
	test("`[[` の後にスペースを挟まず文字列が存在する場合、Link になる", () => {
		const source = "[[jumpuri:example>https://example.org]]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "link",
							url: "https://example.org",
							children: [
								{
									type: "text",
									value: "example",
									position: {
										start: { line: 1, column: 11, offset: 10 },
										end: { line: 1, column: 18, offset: 17 },
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
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 40, offset: 39 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("`[[` の後に1つのスペースを挟んで文字列が存在する場合、ただの Text になる", () => {
		const source = "[[ jumpuri:example>https://example.org]]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "text",
							value: "[[ jumpuri:example>https://example.org]]",
							position: {
								start: { line: 1, column: 1, offset: 0 },
								end: { line: 1, column: 41, offset: 40 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 41, offset: 40 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 41, offset: 40 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("`:` の前にスペースを挟まず文字列が存在する場合、Link になる", () => {
		const source = "[[jumpuri:example>https://example.org]]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "link",
							url: "https://example.org",
							children: [
								{
									type: "text",
									value: "example",
									position: {
										start: { line: 1, column: 11, offset: 10 },
										end: { line: 1, column: 18, offset: 17 },
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
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 40, offset: 39 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("`:` の前に1つのスペースを挟んで文字列が存在する場合、ただの Text になる", () => {
		const source = "[[jumpuri :example>https://example.org]]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "text",
							value: "[[jumpuri :example>https://example.org]]",
							position: {
								start: { line: 1, column: 1, offset: 0 },
								end: { line: 1, column: 41, offset: 40 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 41, offset: 40 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 41, offset: 40 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("`:` の後にスペースを挟まず文字列が存在する場合、Link になる", () => {
		const source = "[[jumpuri:example>https://example.org]]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "link",
							url: "https://example.org",
							children: [
								{
									type: "text",
									value: "example",
									position: {
										start: { line: 1, column: 11, offset: 10 },
										end: { line: 1, column: 18, offset: 17 },
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
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 40, offset: 39 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("`:` の後に1つのスペースを挟んで文字列が存在する場合、Link になる", () => {
		const source = "[[jumpuri: example>https://example.org]]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "link",
							url: "https://example.org",
							children: [
								{
									type: "text",
									value: "example",
									position: {
										start: { line: 1, column: 12, offset: 11 },
										end: { line: 1, column: 19, offset: 18 },
									},
								},
							],
							position: {
								start: { line: 1, column: 1, offset: 0 },
								end: { line: 1, column: 41, offset: 40 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 41, offset: 40 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 41, offset: 40 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("`:` の後に2つ以上のスペースを挟んで文字列が存在する場合、Link になる", () => {
		const source = "[[jumpuri: 　example>https://example.org]]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "link",
							url: "https://example.org",
							children: [
								{
									type: "text",
									value: "example",
									position: {
										start: { line: 1, column: 13, offset: 12 },
										end: { line: 1, column: 20, offset: 19 },
									},
								},
							],
							position: {
								start: { line: 1, column: 1, offset: 0 },
								end: { line: 1, column: 42, offset: 41 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 42, offset: 41 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 42, offset: 41 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("`>` の前にスペースを挟まず文字列が存在する場合、Link になる", () => {
		const source = "[[jumpuri:example>https://example.org]]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "link",
							url: "https://example.org",
							children: [
								{
									type: "text",
									value: "example",
									position: {
										start: { line: 1, column: 11, offset: 10 },
										end: { line: 1, column: 18, offset: 17 },
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
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 40, offset: 39 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("`>` の前に1つのスペースを挟んで文字列が存在する場合、Link になる", () => {
		const source = "[[jumpuri:example >https://example.org]]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "link",
							url: "https://example.org",
							children: [
								{
									type: "text",
									value: "example",
									position: {
										start: { line: 1, column: 11, offset: 10 },
										end: { line: 1, column: 18, offset: 17 },
									},
								},
							],
							position: {
								start: { line: 1, column: 1, offset: 0 },
								end: { line: 1, column: 41, offset: 40 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 41, offset: 40 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 41, offset: 40 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("`>` の前に2つ以上のスペースを挟んで文字列が存在する場合、Link になる", () => {
		const source = "[[jumpuri:example 　>https://example.org]]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "link",
							url: "https://example.org",
							children: [
								{
									type: "text",
									value: "example",
									position: {
										start: { line: 1, column: 11, offset: 10 },
										end: { line: 1, column: 18, offset: 17 },
									},
								},
							],
							position: {
								start: { line: 1, column: 1, offset: 0 },
								end: { line: 1, column: 42, offset: 41 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 42, offset: 41 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 42, offset: 41 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("`>` の後にスペースを挟まず文字列が存在する場合、Link になる", () => {
		const source = "[[jumpuri:example>https://example.org]]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "link",
							url: "https://example.org",
							children: [
								{
									type: "text",
									value: "example",
									position: {
										start: { line: 1, column: 11, offset: 10 },
										end: { line: 1, column: 18, offset: 17 },
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
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 40, offset: 39 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("`>` の後に1つの半角スペースを挟んで文字列が存在する場合、Link になる", () => {
		const source = "[[jumpuri:example> https://example.org]]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "link",
							url: "https://example.org",
							children: [
								{
									type: "text",
									value: "example",
									position: {
										start: { line: 1, column: 11, offset: 10 },
										end: { line: 1, column: 18, offset: 17 },
									},
								},
							],
							position: {
								start: { line: 1, column: 1, offset: 0 },
								end: { line: 1, column: 41, offset: 40 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 41, offset: 40 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 41, offset: 40 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("`>` の後に1つの全角スペースを挟んで文字列が存在する場合、ただの Text になる", () => {
		const source = "[[jumpuri:example>　https://example.org]]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "text",
							value: "[[jumpuri:example>　https://example.org]]",
							position: {
								start: { line: 1, column: 1, offset: 0 },
								end: { line: 1, column: 41, offset: 40 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 41, offset: 40 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 41, offset: 40 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("`>` の後に2つ以上の半角スペースを挟んで文字列が存在する場合、Link になる", () => {
		const source = "[[jumpuri:example>  https://example.org]]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "link",
							url: "https://example.org",
							children: [
								{
									type: "text",
									value: "example",
									position: {
										start: { line: 1, column: 11, offset: 10 },
										end: { line: 1, column: 18, offset: 17 },
									},
								},
							],
							position: {
								start: { line: 1, column: 1, offset: 0 },
								end: { line: 1, column: 42, offset: 41 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 42, offset: 41 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 42, offset: 41 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("`>` の後に2つ以上の全角スペースを挟んで文字列が存在する場合、ただの Text になる", () => {
		const source = "[[jumpuri:example>　　https://example.org]]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "text",
							value: "[[jumpuri:example>　　https://example.org]]",
							position: {
								start: { line: 1, column: 1, offset: 0 },
								end: { line: 1, column: 42, offset: 41 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 42, offset: 41 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 42, offset: 41 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("`]]` の前にスペースを挟まず文字列が存在する場合、Link になる", () => {
		const source = "[[jumpuri:example>https://example.org]]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "link",
							url: "https://example.org",
							children: [
								{
									type: "text",
									value: "example",
									position: {
										start: { line: 1, column: 11, offset: 10 },
										end: { line: 1, column: 18, offset: 17 },
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
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 40, offset: 39 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("`]]` の前に1つの半角スペースを挟んで文字列が存在する場合、Link になる", () => {
		const source = "[[jumpuri:example>https://example.org ]]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "link",
							url: "https://example.org",
							children: [
								{
									type: "text",
									value: "example",
									position: {
										start: { line: 1, column: 11, offset: 10 },
										end: { line: 1, column: 18, offset: 17 },
									},
								},
							],
							position: {
								start: { line: 1, column: 1, offset: 0 },
								end: { line: 1, column: 41, offset: 40 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 41, offset: 40 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 41, offset: 40 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("`]]` の前に1つの全角スペースを挟んで文字列が存在する場合、ただの Text になる", () => {
		const source = "[[jumpuri:example>https://example.com　]]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "text",
							value: "[[jumpuri:example>https://example.com　]]",
							position: {
								start: { line: 1, column: 1, offset: 0 },
								end: { line: 1, column: 41, offset: 40 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 41, offset: 40 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 41, offset: 40 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("`]]` の前に2つ以上の半角スペースを挟んで文字列が存在する場合、Link になる", () => {
		const source = "[[jumpuri:example>https://example.org  ]]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "link",
							url: "https://example.org",
							children: [
								{
									type: "text",
									value: "example",
									position: {
										start: { line: 1, column: 11, offset: 10 },
										end: { line: 1, column: 18, offset: 17 },
									},
								},
							],
							position: {
								start: { line: 1, column: 1, offset: 0 },
								end: { line: 1, column: 42, offset: 41 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 42, offset: 41 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 42, offset: 41 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("`]]` の前に2つ以上の全角スペースを挟んで文字列が存在する場合、ただの Text になる", () => {
		const source = "[[jumpuri:example>https://example.com　　]]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "text",
							value: "[[jumpuri:example>https://example.com　　]]",
							position: {
								start: { line: 1, column: 1, offset: 0 },
								end: { line: 1, column: 42, offset: 41 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 42, offset: 41 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 42, offset: 41 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});
});

describe("内部コンテンツ", () => {
	test("HTTP URL を Link にできる", () => {
		const source = "[[jumpuri:example>http://example.org]]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "link",
							url: "http://example.org",
							children: [
								{
									type: "text",
									value: "example",
									position: {
										start: { line: 1, column: 11, offset: 10 },
										end: { line: 1, column: 18, offset: 17 },
									},
								},
							],
							position: {
								start: { line: 1, column: 1, offset: 0 },
								end: { line: 1, column: 39, offset: 38 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 39, offset: 38 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 39, offset: 38 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("HTTPS URL を Link にできる", () => {
		const source = "[[jumpuri:example>https://example.org]]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "link",
							url: "https://example.org",
							children: [
								{
									type: "text",
									value: "example",
									position: {
										start: { line: 1, column: 11, offset: 10 },
										end: { line: 1, column: 18, offset: 17 },
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
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 40, offset: 39 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("パーセントエンコーディングを含む URL を Link にできる", () => {
		const source =
			"[[jumpuri:example>https://example.com/%E3%83%86%E3%82%B9%E3%83%88]]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "link",
							url: "https://example.com/%E3%83%86%E3%82%B9%E3%83%88",
							children: [
								{
									type: "text",
									value: "example",
									position: {
										start: { line: 1, column: 11, offset: 10 },
										end: { line: 1, column: 18, offset: 17 },
									},
								},
							],
							position: {
								start: { line: 1, column: 1, offset: 0 },
								end: { line: 1, column: 68, offset: 67 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 68, offset: 67 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 68, offset: 67 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("Ruby を格納できる", () => {
		const source = "[[jumpuri:[[rb:ルビ>るび]]>https://example.org]]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "link",
							url: "https://example.org",
							children: [
								{
									type: "ruby",
									value: "ルビ",
									ruby: "るび",
									position: {
										start: { line: 1, column: 11, offset: 10 },
										end: { line: 1, column: 23, offset: 22 },
									},
								},
							],
							position: {
								start: { line: 1, column: 1, offset: 0 },
								end: { line: 1, column: 45, offset: 44 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 45, offset: 44 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 45, offset: 44 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});

	test("Text を格納できる", () => {
		const source = "[[jumpuri:テキスト>https://example.org]]";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "link",
							url: "https://example.org",
							children: [
								{
									type: "text",
									value: "テキスト",
									position: {
										start: { line: 1, column: 11, offset: 10 },
										end: { line: 1, column: 15, offset: 14 },
									},
								},
							],
							position: {
								start: { line: 1, column: 1, offset: 0 },
								end: { line: 1, column: 37, offset: 36 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 37, offset: 36 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 1, column: 37, offset: 36 },
			},
		};
		expect(fromPixivNovel(source)).toEqual(expected);
	});
});
