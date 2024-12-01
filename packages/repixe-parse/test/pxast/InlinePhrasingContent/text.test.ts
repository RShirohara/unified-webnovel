import type { Root } from "@rshirohara/pxast";
import { describe, expect, test } from "vitest";
import { fromPixivNovel } from "~/lib/index.js";

describe("内部コンテンツ", () => {
	test("ただのテキストはちゃんと Text になる", () => {
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
		expect(fromPixivNovel(source)).toEqual(expected);
	});
});
