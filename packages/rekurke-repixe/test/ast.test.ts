import type { Root as KkastRoot } from "@rshirohara/kkast";
import type { Root as PxastRoot } from "@rshirohara/pxast";
import { describe, expect, test } from "vitest";
import { toPxast } from "~/lib/index.js";

describe("FlowContent", () => {
	describe("Paragraph", () => {
		test("Paragraph に変換される", () => {
			const source: KkastRoot = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [{ type: "text", value: "これは一段落目" }],
					},
				],
			};
			const expected: PxastRoot = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [{ type: "text", value: "これは一段落目" }],
					},
				],
			};
			expect(toPxast(source)).toEqual(expected);
		});
	});

	describe("ParagraphMargin", () => {
		test("ParagraphMargin は削除される", () => {
			const source: KkastRoot = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [{ type: "text", value: "これは一段落目" }],
					},
					{ type: "paragraphMargin", size: 2 },
					{
						type: "paragraph",
						children: [{ type: "text", value: "これは二段落目" }],
					},
				],
			};
			const expected: PxastRoot = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [{ type: "text", value: "これは一段落目" }],
					},
					{
						type: "paragraph",
						children: [{ type: "text", value: "これは二段落目" }],
					},
				],
			};
			expect(toPxast(source)).toEqual(expected);
		});
	});
});

describe("PhrasingContent", () => {
	describe("Text", () => {
		test("Text に変換される", () => {
			const source: KkastRoot = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [{ type: "text", value: "これは一行目" }],
					},
				],
			};
			const expected: PxastRoot = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [{ type: "text", value: "これは一行目" }],
					},
				],
			};
			expect(toPxast(source)).toEqual(expected);
		});
	});

	describe("Ruby", () => {
		test("Ruby に変換される", () => {
			const source: KkastRoot = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{ type: "ruby", value: "換言", ruby: "かんげん" },
							{ type: "text", value: "すれば" },
							{ type: "ruby", value: "畢竟", ruby: "ひっきょう" },
							{ type: "text", value: "ももんが" },
						],
					},
				],
			};
			const expected: PxastRoot = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{ type: "ruby", value: "換言", ruby: "かんげん" },
							{ type: "text", value: "すれば" },
							{ type: "ruby", value: "畢竟", ruby: "ひっきょう" },
							{ type: "text", value: "ももんが" },
						],
					},
				],
			};
			expect(toPxast(source)).toEqual(expected);
		});
	});

	describe("Emphasis", () => {
		test("convertEmphasisToRuby が false の場合、Text 要素のみが変換される", () => {
			const source: KkastRoot = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{ type: "text", value: "これは" },
							{ type: "emphasis", value: "強調" },
						],
					},
				],
			};
			const expected: PxastRoot = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{ type: "text", value: "これは" },
							{ type: "text", value: "強調" },
						],
					},
				],
			};
			expect(
				toPxast(source, { convertEmphasisToRuby: { enable: false } }),
			).toEqual(expected);
		});

		test("convertEmphasisToRuby が true の場合、Ruby へ変換される", () => {
			const source: KkastRoot = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{ type: "text", value: "これは" },
							{ type: "emphasis", value: "強調" },
						],
					},
				],
			};
			const expected: PxastRoot = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{ type: "text", value: "これは" },
							{ type: "ruby", value: "強調", ruby: "••" },
						],
					},
				],
			};
			expect(
				toPxast(source, { convertEmphasisToRuby: { enable: true } }),
			).toEqual(expected);
		});

		test("convertEmphasisToRuby へ傍点の文字を指定できる", () => {
			const source: KkastRoot = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{ type: "text", value: "これは" },
							{ type: "emphasis", value: "強調" },
						],
					},
				],
			};
			const expected: PxastRoot = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{ type: "text", value: "これは" },
							{ type: "ruby", value: "強調", ruby: "﹅﹅" },
						],
					},
				],
			};
			expect(
				toPxast(source, {
					convertEmphasisToRuby: { enable: true, character: "﹅" },
				}),
			).toEqual(expected);
		});

		test("preserveUnmatchedSyntax が false の場合、Text 要素のみが変換される", () => {
			const source: KkastRoot = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{ type: "text", value: "これは" },
							{ type: "emphasis", value: "強調" },
						],
					},
				],
			};
			const expected: PxastRoot = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{ type: "text", value: "これは" },
							{ type: "text", value: "強調" },
						],
					},
				],
			};
			expect(toPxast(source, { preserveUnmatchedSyntax: false })).toEqual(
				expected,
			);
		});

		test("preserveUnmatchedSyntax が true の場合、カクヨムの構文を保持したまま Text に変換される", () => {
			const source: KkastRoot = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{ type: "text", value: "これは" },
							{ type: "emphasis", value: "強調" },
						],
					},
				],
			};
			const expected: PxastRoot = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{ type: "text", value: "これは" },
							{ type: "text", value: "《《強調》》" },
						],
					},
				],
			};
			expect(
				toPxast(source, {
					preserveUnmatchedSyntax: true,
					convertEmphasisToRuby: { enable: true },
				}),
			).toEqual(expected);
		});
	});

	describe("Break", () => {
		test("Break に変換される", () => {
			const source: KkastRoot = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{ type: "text", value: "これは" },
							{ type: "break" },
							{ type: "text", value: "改行" },
						],
					},
				],
			};
			const expected: PxastRoot = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{ type: "text", value: "これは" },
							{ type: "break" },
							{ type: "text", value: "改行" },
						],
					},
				],
			};
			expect(toPxast(source)).toEqual(expected);
		});
	});
});
