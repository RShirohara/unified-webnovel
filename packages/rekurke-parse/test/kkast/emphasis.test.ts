import type { Root } from "@rshirohara/kkast";
import { describe, expect, test } from "vitest";
import { fromKakuyomuNovel } from "~/lib/index.js";

test("強調を単一の`Emphasis`に変換できる", () => {
	const source = "これは《《強調》》";
	const expected: Root = {
		type: "root",
		children: [
			{
				type: "paragraph",
				children: [
					{
						type: "text",
						value: "これは",
						position: {
							start: { line: 1, column: 1, offset: 0 },
							end: { line: 1, column: 4, offset: 3 },
						},
					},
					{
						type: "emphasis",
						value: "強調",
						position: {
							start: { line: 1, column: 4, offset: 3 },
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
	expect(fromKakuyomuNovel(source)).toEqual(expected);
});

describe("改行の判定", () => {
	test("開始記号の途中に改行を含む場合は、ただの`Text`になる", () => {
		const source = "《\n《強調》》";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "text",
							value: "《",
							position: {
								start: { line: 1, column: 1, offset: 0 },
								end: { line: 1, column: 2, offset: 1 },
							},
						},
						{
							type: "break",
							position: {
								start: { line: 1, column: 2, offset: 1 },
								end: { line: 2, column: 1, offset: 2 },
							},
						},
						{
							type: "text",
							value: "《強調》》",
							position: {
								start: { line: 2, column: 1, offset: 2 },
								end: { line: 2, column: 6, offset: 7 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 2, column: 6, offset: 7 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 2, column: 6, offset: 7 },
			},
		};
		expect(fromKakuyomuNovel(source)).toEqual(expected);
	});

	test("強調する対象のテキストに改行を含む場合は、ただの`Text`になる", () => {
		const source = "《《強\r調》》";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "text",
							value: "《《強",
							position: {
								start: { line: 1, column: 1, offset: 0 },
								end: { line: 1, column: 4, offset: 3 },
							},
						},
						{
							type: "break",
							position: {
								start: { line: 1, column: 4, offset: 3 },
								end: { line: 2, column: 1, offset: 4 },
							},
						},
						{
							type: "text",
							value: "調》》",
							position: {
								start: { line: 2, column: 1, offset: 4 },
								end: { line: 2, column: 4, offset: 7 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 2, column: 4, offset: 7 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 2, column: 4, offset: 7 },
			},
		};
		expect(fromKakuyomuNovel(source)).toEqual(expected);
	});

	test("終了記号の途中に改行を含む場合は、ただの`Text`になる", () => {
		const source = "《《強調》\r\n》";
		const expected: Root = {
			type: "root",
			children: [
				{
					type: "paragraph",
					children: [
						{
							type: "text",
							value: "《《強調》",
							position: {
								start: { line: 1, column: 1, offset: 0 },
								end: { line: 1, column: 6, offset: 5 },
							},
						},
						{
							type: "break",
							position: {
								start: { line: 1, column: 6, offset: 5 },
								end: { line: 2, column: 1, offset: 7 },
							},
						},
						{
							type: "text",
							value: "》",
							position: {
								start: { line: 2, column: 1, offset: 7 },
								end: { line: 2, column: 2, offset: 8 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 2, column: 2, offset: 8 },
					},
				},
			],
			position: {
				start: { line: 1, column: 1, offset: 0 },
				end: { line: 2, column: 2, offset: 8 },
			},
		};
		expect(fromKakuyomuNovel(source)).toEqual(expected);
	});
});

describe("記号のエスケープ", () => {
	describe("`|` (`U+007C`)", () => {
		test("開始記号の前に`|`がある場合は、開始記号がただの`Text`になる", () => {
			const source = "これはただの|《《山括弧》》";
			const expected: Root = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{
								type: "text",
								value: "これはただの《《山括弧》》",
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
			expect(fromKakuyomuNovel(source)).toEqual(expected);
		});

		test("開始記号の途中に`|`がある場合は、開始記号がただの`Text`になる", () => {
			const source = "これはただの《|《山括弧》》";
			const expected: Root = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{
								type: "text",
								value: "これはただの《《山括弧》》",
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
			expect(fromKakuyomuNovel(source)).toEqual(expected);
		});

		test("終了記号の前に`|`がある場合は、`|`までが強調の対象として`Emphasis`に変換される", () => {
			const source = "これはただの《《山括弧|》》";
			const expected: Root = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{
								type: "text",
								value: "これはただの",
								position: {
									start: { line: 1, column: 1, offset: 0 },
									end: { line: 1, column: 7, offset: 6 },
								},
							},
							{
								type: "emphasis",
								value: "山括弧|",
								position: {
									start: { line: 1, column: 7, offset: 6 },
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
			expect(fromKakuyomuNovel(source)).toEqual(expected);
		});

		test("開始記号の途中に`|`がある場合は、ただの`Text`になる", () => {
			const source = "これはただの《《山括弧》|》";
			const expected: Root = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{
								type: "text",
								value: "これはただの《《山括弧》|》",
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
			expect(fromKakuyomuNovel(source)).toEqual(expected);
		});
	});

	describe("`｜` (`U+FF5C`)", () => {
		test("開始記号の前に`｜`がある場合は、開始記号がただの`Text`になる", () => {
			const source = "これはただの｜《《山括弧》》";
			const expected: Root = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{
								type: "text",
								value: "これはただの《《山括弧》》",
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
			expect(fromKakuyomuNovel(source)).toEqual(expected);
		});

		test("開始記号の途中に`｜`がある場合は、開始記号がただの`Text`になる", () => {
			const source = "これはただの《｜《山括弧》》";
			const expected: Root = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{
								type: "text",
								value: "これはただの《《山括弧》》",
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
			expect(fromKakuyomuNovel(source)).toEqual(expected);
		});

		test("終了記号の前に`｜`がある場合は、`｜`までが強調の対象として`Emphasis`に変換される", () => {
			const source = "これはただの《《山括弧｜》》";
			const expected: Root = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{
								type: "text",
								value: "これはただの",
								position: {
									start: { line: 1, column: 1, offset: 0 },
									end: { line: 1, column: 7, offset: 6 },
								},
							},
							{
								type: "emphasis",
								value: "山括弧｜",
								position: {
									start: { line: 1, column: 7, offset: 6 },
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
			expect(fromKakuyomuNovel(source)).toEqual(expected);
		});

		test("開始記号の途中に`｜`がある場合は、ただの`Text`になる", () => {
			const source = "これはただの《《山括弧》｜》";
			const expected: Root = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{
								type: "text",
								value: "これはただの《《山括弧》｜》",
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
			expect(fromKakuyomuNovel(source)).toEqual(expected);
		});
	});
});
