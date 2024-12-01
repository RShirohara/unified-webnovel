import type { Root } from "@rshirohara/kkast";
import { describe, expect, test } from "vitest";
import { fromKakuyomuNovel } from "~/lib/index.js";

describe("親文字を自動検出するルビ", () => {
	describe("ルビを指定可能な文字種", () => {
		test("漢字へのルビを`Ruby`へ変換できる", () => {
			const source = "この漢字《かんじ》にルビをふる";
			const expected: Root = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{
								type: "text",
								value: "この",
								position: {
									start: { line: 1, column: 1, offset: 0 },
									end: { line: 1, column: 3, offset: 2 },
								},
							},
							{
								type: "ruby",
								value: "漢字",
								ruby: "かんじ",
								position: {
									start: { line: 1, column: 3, offset: 2 },
									end: { line: 1, column: 10, offset: 9 },
								},
							},
							{
								type: "text",
								value: "にルビをふる",
								position: {
									start: { line: 1, column: 10, offset: 9 },
									end: { line: 1, column: 16, offset: 15 },
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
			expect(fromKakuyomuNovel(source)).toEqual(expected);
		});

		test("ひらがなへのルビはただの`Text`になる", () => {
			const source = "このひらがな《ひらがな》にルビをふる";
			const expected: Root = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{
								type: "text",
								value: "このひらがな《ひらがな》にルビをふる",
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
					},
				],
				position: {
					start: { line: 1, column: 1, offset: 0 },
					end: { line: 1, column: 19, offset: 18 },
				},
			};
			expect(fromKakuyomuNovel(source)).toEqual(expected);
		});

		test("カタカナへのルビはただの`Text`になる", () => {
			const source = "このカタカナ《かたかな》にルビをふる";
			const expected: Root = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{
								type: "text",
								value: "このカタカナ《かたかな》にルビをふる",
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
					},
				],
				position: {
					start: { line: 1, column: 1, offset: 0 },
					end: { line: 1, column: 19, offset: 18 },
				},
			};
			expect(fromKakuyomuNovel(source)).toEqual(expected);
		});

		test("他種類文字へのルビはただの`Text`になる", () => {
			const source = "このalphabet《あるふぁべっと》にルビをふる";
			const expected: Root = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{
								type: "text",
								value: "このalphabet《あるふぁべっと》にルビをふる",
								position: {
									start: { line: 1, column: 1, offset: 0 },
									end: { line: 1, column: 26, offset: 25 },
								},
							},
						],
						position: {
							start: { line: 1, column: 1, offset: 0 },
							end: { line: 1, column: 26, offset: 25 },
						},
					},
				],
				position: {
					start: { line: 1, column: 1, offset: 0 },
					end: { line: 1, column: 26, offset: 25 },
				},
			};
			expect(fromKakuyomuNovel(source)).toEqual(expected);
		});
	});

	describe("改行の判定", () => {
		test("親文字とルビ開始文字の間に改行がある場合は、ただの`Text`になる", () => {
			const source = "この文字\n《もじ》にルビをふる";
			const expected: Root = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{
								type: "text",
								value: "この文字",
								position: {
									start: { line: 1, column: 1, offset: 0 },
									end: { line: 1, column: 5, offset: 4 },
								},
							},
							{
								type: "break",
								position: {
									start: { line: 1, column: 5, offset: 4 },
									end: { line: 2, column: 1, offset: 5 },
								},
							},
							{
								type: "text",
								value: "《もじ》にルビをふる",
								position: {
									start: { line: 2, column: 1, offset: 5 },
									end: { line: 2, column: 11, offset: 15 },
								},
							},
						],
						position: {
							start: { line: 1, column: 1, offset: 0 },
							end: { line: 2, column: 11, offset: 15 },
						},
					},
				],
				position: {
					start: { line: 1, column: 1, offset: 0 },
					end: { line: 2, column: 11, offset: 15 },
				},
			};
			expect(fromKakuyomuNovel(source)).toEqual(expected);
		});

		test("ルビ開始文字とルビの間に改行がある場合は、ただの`Text`になる", () => {
			const source = "この文字《\nもじ》にルビをふる";
			const expected: Root = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{
								type: "text",
								value: "この文字《",
								position: {
									start: { line: 1, column: 1, offset: 0 },
									end: { line: 1, column: 6, offset: 5 },
								},
							},
							{
								type: "break",
								position: {
									start: { line: 1, column: 6, offset: 5 },
									end: { line: 2, column: 1, offset: 6 },
								},
							},
							{
								type: "text",
								value: "もじ》にルビをふる",
								position: {
									start: { line: 2, column: 1, offset: 6 },
									end: { line: 2, column: 10, offset: 15 },
								},
							},
						],
						position: {
							start: { line: 1, column: 1, offset: 0 },
							end: { line: 2, column: 10, offset: 15 },
						},
					},
				],
				position: {
					start: { line: 1, column: 1, offset: 0 },
					end: { line: 2, column: 10, offset: 15 },
				},
			};
			expect(fromKakuyomuNovel(source)).toEqual(expected);
		});

		test("ルビの中に改行がある場合は、ただの`Text`になる", () => {
			const source = "この文字《も\nじ》にルビをふる";
			const expected: Root = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{
								type: "text",
								value: "この文字《も",
								position: {
									start: { line: 1, column: 1, offset: 0 },
									end: { line: 1, column: 7, offset: 6 },
								},
							},
							{
								type: "break",
								position: {
									start: { line: 1, column: 7, offset: 6 },
									end: { line: 2, column: 1, offset: 7 },
								},
							},
							{
								type: "text",
								value: "じ》にルビをふる",
								position: {
									start: { line: 2, column: 1, offset: 7 },
									end: { line: 2, column: 9, offset: 15 },
								},
							},
						],
						position: {
							start: { line: 1, column: 1, offset: 0 },
							end: { line: 2, column: 9, offset: 15 },
						},
					},
				],
				position: {
					start: { line: 1, column: 1, offset: 0 },
					end: { line: 2, column: 9, offset: 15 },
				},
			};
			expect(fromKakuyomuNovel(source)).toEqual(expected);
		});

		test("ルビとルビ終了文字の間に改行がある場合は、ただの`Text`になる", () => {
			const source = "この文字《もじ\n》にルビをふる";
			const expected: Root = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{
								type: "text",
								value: "この文字《もじ",
								position: {
									start: { line: 1, column: 1, offset: 0 },
									end: { line: 1, column: 8, offset: 7 },
								},
							},
							{
								type: "break",
								position: {
									start: { line: 1, column: 8, offset: 7 },
									end: { line: 2, column: 1, offset: 8 },
								},
							},
							{
								type: "text",
								value: "》にルビをふる",
								position: {
									start: { line: 2, column: 1, offset: 8 },
									end: { line: 2, column: 8, offset: 15 },
								},
							},
						],
						position: {
							start: { line: 1, column: 1, offset: 0 },
							end: { line: 2, column: 8, offset: 15 },
						},
					},
				],
				position: {
					start: { line: 1, column: 1, offset: 0 },
					end: { line: 2, column: 8, offset: 15 },
				},
			};
			expect(fromKakuyomuNovel(source)).toEqual(expected);
		});
	});

	describe("文字数制限", () => {
		describe("親文字", () => {
			test("文字数が20文字の場合は`Ruby`へ変換できる", () => {
				const source =
					"一丁丂七丄丅丆万丈三上下丌不与丏丐丑丒专《とてもながいかんじ》";
				const expected: Root = {
					type: "root",
					children: [
						{
							type: "paragraph",
							children: [
								{
									type: "ruby",
									value: "一丁丂七丄丅丆万丈三上下丌不与丏丐丑丒专",
									ruby: "とてもながいかんじ",
									position: {
										start: { line: 1, column: 1, offset: 0 },
										end: { line: 1, column: 32, offset: 31 },
									},
								},
							],
							position: {
								start: { line: 1, column: 1, offset: 0 },
								end: { line: 1, column: 32, offset: 31 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 32, offset: 31 },
					},
				};
				expect(fromKakuyomuNovel(source)).toEqual(expected);
			});

			test("文字数が21文字以上の場合は、ルビ開始記号までの末尾20文字が`Ruby`へ変換される", () => {
				const source =
					"一丁丂七丄丅丆万丈三上下丌不与丏丐丑丒专且《とてもながいかんじ》";
				const expected: Root = {
					type: "root",
					children: [
						{
							type: "paragraph",
							children: [
								{
									type: "text",
									value: "一",
									position: {
										start: { line: 1, column: 1, offset: 0 },
										end: { line: 1, column: 2, offset: 1 },
									},
								},
								{
									type: "ruby",
									value: "丁丂七丄丅丆万丈三上下丌不与丏丐丑丒专且",
									ruby: "とてもながいかんじ",
									position: {
										start: { line: 1, column: 2, offset: 1 },
										end: { line: 1, column: 33, offset: 32 },
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
				expect(fromKakuyomuNovel(source)).toEqual(expected);
			});
		});

		describe("ルビ", () => {
			test("文字数が50文字の場合は`Ruby`へ変換できる", () => {
				const source =
					"很長的字符《ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひ》";
				const expected: Root = {
					type: "root",
					children: [
						{
							type: "paragraph",
							children: [
								{
									type: "ruby",
									value: "很長的字符",
									ruby: "ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひ",
									position: {
										start: { line: 1, column: 1, offset: 0 },
										end: { line: 1, column: 58, offset: 57 },
									},
								},
							],
							position: {
								start: { line: 1, column: 1, offset: 0 },
								end: { line: 1, column: 58, offset: 57 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 58, offset: 57 },
					},
				};
				expect(fromKakuyomuNovel(source)).toEqual(expected);
			});

			test("文字数が51文字の場合はただの`Text`になる", () => {
				const source =
					"很長的字符《ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひび》";
				const expected: Root = {
					type: "root",
					children: [
						{
							type: "paragraph",
							children: [
								{
									type: "text",
									value:
										"很長的字符《ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひび》",
									position: {
										start: { line: 1, column: 1, offset: 0 },
										end: { line: 1, column: 59, offset: 58 },
									},
								},
							],
							position: {
								start: { line: 1, column: 1, offset: 0 },
								end: { line: 1, column: 59, offset: 58 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 59, offset: 58 },
					},
				};
				expect(fromKakuyomuNovel(source)).toEqual(expected);
			});
		});
	});
});

describe("`|` (`U+007C`) から始まるルビ", () => {
	describe("ルビを指定可能な文字種", () => {
		test("漢字へのルビを`Ruby`へ変換できる", () => {
			const source = "この|漢字《かんじ》にルビをふる";
			const expected: Root = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{
								type: "text",
								value: "この",
								position: {
									start: { line: 1, column: 1, offset: 0 },
									end: { line: 1, column: 3, offset: 2 },
								},
							},
							{
								type: "ruby",
								value: "漢字",
								ruby: "かんじ",
								position: {
									start: { line: 1, column: 3, offset: 2 },
									end: { line: 1, column: 11, offset: 10 },
								},
							},
							{
								type: "text",
								value: "にルビをふる",
								position: {
									start: { line: 1, column: 11, offset: 10 },
									end: { line: 1, column: 17, offset: 16 },
								},
							},
						],
						position: {
							start: { line: 1, column: 1, offset: 0 },
							end: { line: 1, column: 17, offset: 16 },
						},
					},
				],
				position: {
					start: { line: 1, column: 1, offset: 0 },
					end: { line: 1, column: 17, offset: 16 },
				},
			};
			expect(fromKakuyomuNovel(source)).toEqual(expected);
		});

		test("ひらがなへのルビを`Ruby`へ変換できる", () => {
			const source = "この|ひらがな《ひらがな》にルビをふる";
			const expected: Root = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{
								type: "text",
								value: "この",
								position: {
									start: { line: 1, column: 1, offset: 0 },
									end: { line: 1, column: 3, offset: 2 },
								},
							},
							{
								type: "ruby",
								value: "ひらがな",
								ruby: "ひらがな",
								position: {
									start: { line: 1, column: 3, offset: 2 },
									end: { line: 1, column: 14, offset: 13 },
								},
							},
							{
								type: "text",
								value: "にルビをふる",
								position: {
									start: { line: 1, column: 14, offset: 13 },
									end: { line: 1, column: 20, offset: 19 },
								},
							},
						],
						position: {
							start: { line: 1, column: 1, offset: 0 },
							end: { line: 1, column: 20, offset: 19 },
						},
					},
				],
				position: {
					start: { line: 1, column: 1, offset: 0 },
					end: { line: 1, column: 20, offset: 19 },
				},
			};
			expect(fromKakuyomuNovel(source)).toEqual(expected);
		});

		test("カタカナへのルビを`Ruby`へ変換できる", () => {
			const source = "この|カタカナ《かたかな》にルビをふる";
			const expected: Root = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{
								type: "text",
								value: "この",
								position: {
									start: { line: 1, column: 1, offset: 0 },
									end: { line: 1, column: 3, offset: 2 },
								},
							},
							{
								type: "ruby",
								value: "カタカナ",
								ruby: "かたかな",
								position: {
									start: { line: 1, column: 3, offset: 2 },
									end: { line: 1, column: 14, offset: 13 },
								},
							},
							{
								type: "text",
								value: "にルビをふる",
								position: {
									start: { line: 1, column: 14, offset: 13 },
									end: { line: 1, column: 20, offset: 19 },
								},
							},
						],
						position: {
							start: { line: 1, column: 1, offset: 0 },
							end: { line: 1, column: 20, offset: 19 },
						},
					},
				],
				position: {
					start: { line: 1, column: 1, offset: 0 },
					end: { line: 1, column: 20, offset: 19 },
				},
			};
			expect(fromKakuyomuNovel(source)).toEqual(expected);
		});

		test("他種類文字へのルビを`Ruby`へ変換できる", () => {
			const source = "この|alphabet《あるふぁべっと》にルビをふる";
			const expected: Root = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{
								type: "text",
								value: "この",
								position: {
									start: { line: 1, column: 1, offset: 0 },
									end: { line: 1, column: 3, offset: 2 },
								},
							},
							{
								type: "ruby",
								value: "alphabet",
								ruby: "あるふぁべっと",
								position: {
									start: { line: 1, column: 3, offset: 2 },
									end: { line: 1, column: 21, offset: 20 },
								},
							},
							{
								type: "text",
								value: "にルビをふる",
								position: {
									start: { line: 1, column: 21, offset: 20 },
									end: { line: 1, column: 27, offset: 26 },
								},
							},
						],
						position: {
							start: { line: 1, column: 1, offset: 0 },
							end: { line: 1, column: 27, offset: 26 },
						},
					},
				],
				position: {
					start: { line: 1, column: 1, offset: 0 },
					end: { line: 1, column: 27, offset: 26 },
				},
			};
			expect(fromKakuyomuNovel(source)).toEqual(expected);
		});
	});

	describe("改行の判定", () => {
		test("開始文字と親文字の間に改行がある場合は、親文字を自動検出するルビとして`Ruby`に変換される", () => {
			const source = "この|\n文字《もじ》にルビをふる";
			const expected: Root = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{
								type: "text",
								value: "この|",
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
								type: "ruby",
								value: "文字",
								ruby: "もじ",
								position: {
									start: { line: 2, column: 1, offset: 4 },
									end: { line: 2, column: 7, offset: 10 },
								},
							},
							{
								type: "text",
								value: "にルビをふる",
								position: {
									start: { line: 2, column: 7, offset: 10 },
									end: { line: 2, column: 13, offset: 16 },
								},
							},
						],
						position: {
							start: { line: 1, column: 1, offset: 0 },
							end: { line: 2, column: 13, offset: 16 },
						},
					},
				],
				position: {
					start: { line: 1, column: 1, offset: 0 },
					end: { line: 2, column: 13, offset: 16 },
				},
			};
			expect(fromKakuyomuNovel(source)).toEqual(expected);
		});

		test("親文字の中に改行がある場合は、改行後の文字から親文字を自動検出するルビとして`Ruby`に変換される", () => {
			const source = "この|文\n字《もじ》にルビをふる";
			const expected: Root = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{
								type: "text",
								value: "この|文",
								position: {
									start: { line: 1, column: 1, offset: 0 },
									end: { line: 1, column: 5, offset: 4 },
								},
							},
							{
								type: "break",
								position: {
									start: { line: 1, column: 5, offset: 4 },
									end: { line: 2, column: 1, offset: 5 },
								},
							},
							{
								type: "ruby",
								value: "字",
								ruby: "もじ",
								position: {
									start: { line: 2, column: 1, offset: 5 },
									end: { line: 2, column: 6, offset: 10 },
								},
							},
							{
								type: "text",
								value: "にルビをふる",
								position: {
									start: { line: 2, column: 6, offset: 10 },
									end: { line: 2, column: 12, offset: 16 },
								},
							},
						],
						position: {
							start: { line: 1, column: 1, offset: 0 },
							end: { line: 2, column: 12, offset: 16 },
						},
					},
				],
				position: {
					start: { line: 1, column: 1, offset: 0 },
					end: { line: 2, column: 12, offset: 16 },
				},
			};
			expect(fromKakuyomuNovel(source)).toEqual(expected);
		});

		test("親文字とルビ開始文字の間に改行がある場合は、ただの`Text`になる", () => {
			const source = "この|文字\n《もじ》にルビをふる";
			const expected: Root = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{
								type: "text",
								value: "この|文字",
								position: {
									start: { line: 1, column: 1, offset: 0 },
									end: { line: 1, column: 6, offset: 5 },
								},
							},
							{
								type: "break",
								position: {
									start: { line: 1, column: 6, offset: 5 },
									end: { line: 2, column: 1, offset: 6 },
								},
							},
							{
								type: "text",
								value: "《もじ》にルビをふる",
								position: {
									start: { line: 2, column: 1, offset: 6 },
									end: { line: 2, column: 11, offset: 16 },
								},
							},
						],
						position: {
							start: { line: 1, column: 1, offset: 0 },
							end: { line: 2, column: 11, offset: 16 },
						},
					},
				],
				position: {
					start: { line: 1, column: 1, offset: 0 },
					end: { line: 2, column: 11, offset: 16 },
				},
			};
			expect(fromKakuyomuNovel(source)).toEqual(expected);
		});

		test("ルビ開始文字とルビの間に改行がある場合は、ただの`Text`になる", () => {
			const source = "この|文字《\nもじ》にルビをふる";
			const expected: Root = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{
								type: "text",
								value: "この|文字《",
								position: {
									start: { line: 1, column: 1, offset: 0 },
									end: { line: 1, column: 7, offset: 6 },
								},
							},
							{
								type: "break",
								position: {
									start: { line: 1, column: 7, offset: 6 },
									end: { line: 2, column: 1, offset: 7 },
								},
							},
							{
								type: "text",
								value: "もじ》にルビをふる",
								position: {
									start: { line: 2, column: 1, offset: 7 },
									end: { line: 2, column: 10, offset: 16 },
								},
							},
						],
						position: {
							start: { line: 1, column: 1, offset: 0 },
							end: { line: 2, column: 10, offset: 16 },
						},
					},
				],
				position: {
					start: { line: 1, column: 1, offset: 0 },
					end: { line: 2, column: 10, offset: 16 },
				},
			};
			expect(fromKakuyomuNovel(source)).toEqual(expected);
		});

		test("ルビの中に改行がある場合は、ただの`Text`になる", () => {
			const source = "この|文字《も\nじ》にルビをふる";
			const expected: Root = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{
								type: "text",
								value: "この|文字《も",
								position: {
									start: { line: 1, column: 1, offset: 0 },
									end: { line: 1, column: 8, offset: 7 },
								},
							},
							{
								type: "break",
								position: {
									start: { line: 1, column: 8, offset: 7 },
									end: { line: 2, column: 1, offset: 8 },
								},
							},
							{
								type: "text",
								value: "じ》にルビをふる",
								position: {
									start: { line: 2, column: 1, offset: 8 },
									end: { line: 2, column: 9, offset: 16 },
								},
							},
						],
						position: {
							start: { line: 1, column: 1, offset: 0 },
							end: { line: 2, column: 9, offset: 16 },
						},
					},
				],
				position: {
					start: { line: 1, column: 1, offset: 0 },
					end: { line: 2, column: 9, offset: 16 },
				},
			};
			expect(fromKakuyomuNovel(source)).toEqual(expected);
		});

		test("ルビとルビ終了文字の間に改行がある場合は、ただの`Text`になる", () => {
			const source = "この|文字《もじ\n》にルビをふる";
			const expected: Root = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{
								type: "text",
								value: "この|文字《もじ",
								position: {
									start: { line: 1, column: 1, offset: 0 },
									end: { line: 1, column: 9, offset: 8 },
								},
							},
							{
								type: "break",
								position: {
									start: { line: 1, column: 9, offset: 8 },
									end: { line: 2, column: 1, offset: 9 },
								},
							},
							{
								type: "text",
								value: "》にルビをふる",
								position: {
									start: { line: 2, column: 1, offset: 9 },
									end: { line: 2, column: 8, offset: 16 },
								},
							},
						],
						position: {
							start: { line: 1, column: 1, offset: 0 },
							end: { line: 2, column: 8, offset: 16 },
						},
					},
				],
				position: {
					start: { line: 1, column: 1, offset: 0 },
					end: { line: 2, column: 8, offset: 16 },
				},
			};
			expect(fromKakuyomuNovel(source)).toEqual(expected);
		});
	});

	describe("文字数制限", () => {
		describe("親文字", () => {
			test("文字数が20文字の場合は`Ruby`へ変換できる", () => {
				const source =
					"|一丁丂七丄丅丆万丈三上下丌不与丏丐丑丒专《とてもながいかんじ》";
				const expected: Root = {
					type: "root",
					children: [
						{
							type: "paragraph",
							children: [
								{
									type: "ruby",
									value: "一丁丂七丄丅丆万丈三上下丌不与丏丐丑丒专",
									ruby: "とてもながいかんじ",
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
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 33, offset: 32 },
					},
				};
				expect(fromKakuyomuNovel(source)).toEqual(expected);
			});

			test("文字数が21文字以上の場合は、親文字を自動検出するルビとしてルビ開始記号までの末尾20文字が`Ruby`へ変換される", () => {
				const source =
					"|一丁丂七丄丅丆万丈三上下丌不与丏丐丑丒专且《とてもながいかんじ》";
				const expected: Root = {
					type: "root",
					children: [
						{
							type: "paragraph",
							children: [
								{
									type: "text",
									value: "|一",
									position: {
										start: { line: 1, column: 1, offset: 0 },
										end: { line: 1, column: 3, offset: 2 },
									},
								},
								{
									type: "ruby",
									value: "丁丂七丄丅丆万丈三上下丌不与丏丐丑丒专且",
									ruby: "とてもながいかんじ",
									position: {
										start: { line: 1, column: 3, offset: 2 },
										end: { line: 1, column: 34, offset: 33 },
									},
								},
							],
							position: {
								start: { line: 1, column: 1, offset: 0 },
								end: { line: 1, column: 34, offset: 33 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 34, offset: 33 },
					},
				};
				expect(fromKakuyomuNovel(source)).toEqual(expected);
			});
		});

		describe("ルビ", () => {
			test("文字数が50文字の場合は`Ruby`へ変換できる", () => {
				const source =
					"|很長的字符《ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひ》";
				const expected: Root = {
					type: "root",
					children: [
						{
							type: "paragraph",
							children: [
								{
									type: "ruby",
									value: "很長的字符",
									ruby: "ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひ",
									position: {
										start: { line: 1, column: 1, offset: 0 },
										end: { line: 1, column: 59, offset: 58 },
									},
								},
							],
							position: {
								start: { line: 1, column: 1, offset: 0 },
								end: { line: 1, column: 59, offset: 58 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 59, offset: 58 },
					},
				};
				expect(fromKakuyomuNovel(source)).toEqual(expected);
			});

			test("文字数が51文字の場合はただの`Text`になる", () => {
				const source =
					"|很長的字符《ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひび》";
				const expected: Root = {
					type: "root",
					children: [
						{
							type: "paragraph",
							children: [
								{
									type: "text",
									value:
										"|很長的字符《ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひび》",
									position: {
										start: { line: 1, column: 1, offset: 0 },
										end: { line: 1, column: 60, offset: 59 },
									},
								},
							],
							position: {
								start: { line: 1, column: 1, offset: 0 },
								end: { line: 1, column: 60, offset: 59 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 60, offset: 59 },
					},
				};
				expect(fromKakuyomuNovel(source)).toEqual(expected);
			});
		});
	});

	describe("記号のエスケープ", () => {
		test("開始文字の直後にルビ開始文字がある場合は、ルビ開始文字が`Text`に変換される", () => {
			const source = "これはただの山括弧|《やまかっこ》";
			const expected: Root = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{
								type: "text",
								value: "これはただの山括弧《やまかっこ》",
								position: {
									start: { line: 1, column: 1, offset: 0 },
									end: { line: 1, column: 18, offset: 17 },
								},
							},
						],
						position: {
							start: { line: 1, column: 1, offset: 0 },
							end: { line: 1, column: 18, offset: 17 },
						},
					},
				],
				position: {
					start: { line: 1, column: 1, offset: 0 },
					end: { line: 1, column: 18, offset: 17 },
				},
			};
			expect(fromKakuyomuNovel(source)).toEqual(expected);
		});

		test("開始文字の直後にルビ終了文字がある場合、開始文字までがルビの内容として`Ruby`に変換される", () => {
			const source = "これはちゃんと山括弧《やまかっこ|》がルビになる";
			const expected: Root = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{
								type: "text",
								value: "これはちゃんと",
								position: {
									start: { line: 1, column: 1, offset: 0 },
									end: { line: 1, column: 8, offset: 7 },
								},
							},
							{
								type: "ruby",
								value: "山括弧",
								ruby: "やまかっこ|",
								position: {
									start: { line: 1, column: 8, offset: 7 },
									end: { line: 1, column: 19, offset: 18 },
								},
							},
							{
								type: "text",
								value: "がルビになる",
								position: {
									start: { line: 1, column: 19, offset: 18 },
									end: { line: 1, column: 25, offset: 24 },
								},
							},
						],
						position: {
							start: { line: 1, column: 1, offset: 0 },
							end: { line: 1, column: 25, offset: 24 },
						},
					},
				],
				position: {
					start: { line: 1, column: 1, offset: 0 },
					end: { line: 1, column: 25, offset: 24 },
				},
			};
			expect(fromKakuyomuNovel(source)).toEqual(expected);
		});
	});
});

describe("`｜` (`U+FF5C`) から始まるルビ", () => {
	describe("ルビを指定可能な文字種", () => {
		test("漢字へのルビを`Ruby`へ変換できる", () => {
			const source = "この｜漢字《かんじ》にルビをふる";
			const expected: Root = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{
								type: "text",
								value: "この",
								position: {
									start: { line: 1, column: 1, offset: 0 },
									end: { line: 1, column: 3, offset: 2 },
								},
							},
							{
								type: "ruby",
								value: "漢字",
								ruby: "かんじ",
								position: {
									start: { line: 1, column: 3, offset: 2 },
									end: { line: 1, column: 11, offset: 10 },
								},
							},
							{
								type: "text",
								value: "にルビをふる",
								position: {
									start: { line: 1, column: 11, offset: 10 },
									end: { line: 1, column: 17, offset: 16 },
								},
							},
						],
						position: {
							start: {
								line: 1,
								column: 1,
								offset: 0,
							},
							end: {
								line: 1,
								column: 17,
								offset: 16,
							},
						},
					},
				],
				position: {
					start: {
						line: 1,
						column: 1,
						offset: 0,
					},
					end: {
						line: 1,
						column: 17,
						offset: 16,
					},
				},
			};
			expect(fromKakuyomuNovel(source)).toEqual(expected);
		});

		test("ひらがなへのルビを`Ruby`へ変換できる", () => {
			const source = "この｜ひらがな《ひらがな》にルビをふる";
			const expected: Root = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{
								type: "text",
								value: "この",
								position: {
									start: { line: 1, column: 1, offset: 0 },
									end: { line: 1, column: 3, offset: 2 },
								},
							},
							{
								type: "ruby",
								value: "ひらがな",
								ruby: "ひらがな",
								position: {
									start: { line: 1, column: 3, offset: 2 },
									end: { line: 1, column: 14, offset: 13 },
								},
							},
							{
								type: "text",
								value: "にルビをふる",
								position: {
									start: { line: 1, column: 14, offset: 13 },
									end: { line: 1, column: 20, offset: 19 },
								},
							},
						],
						position: {
							start: { line: 1, column: 1, offset: 0 },
							end: { line: 1, column: 20, offset: 19 },
						},
					},
				],
				position: {
					start: { line: 1, column: 1, offset: 0 },
					end: { line: 1, column: 20, offset: 19 },
				},
			};
			expect(fromKakuyomuNovel(source)).toEqual(expected);
		});

		test("カタカナへのルビを`Ruby`へ変換できる", () => {
			const source = "この｜カタカナ《かたかな》にルビをふる";
			const expected: Root = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{
								type: "text",
								value: "この",
								position: {
									start: { line: 1, column: 1, offset: 0 },
									end: { line: 1, column: 3, offset: 2 },
								},
							},
							{
								type: "ruby",
								value: "カタカナ",
								ruby: "かたかな",
								position: {
									start: { line: 1, column: 3, offset: 2 },
									end: { line: 1, column: 14, offset: 13 },
								},
							},
							{
								type: "text",
								value: "にルビをふる",
								position: {
									start: { line: 1, column: 14, offset: 13 },
									end: { line: 1, column: 20, offset: 19 },
								},
							},
						],
						position: {
							start: { line: 1, column: 1, offset: 0 },
							end: { line: 1, column: 20, offset: 19 },
						},
					},
				],
				position: {
					start: { line: 1, column: 1, offset: 0 },
					end: { line: 1, column: 20, offset: 19 },
				},
			};
			expect(fromKakuyomuNovel(source)).toEqual(expected);
		});

		test("他種類文字へのルビを`Ruby`へ変換できる", () => {
			const source = "この｜alphabet《あるふぁべっと》にルビをふる";
			const expected: Root = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{
								type: "text",
								value: "この",
								position: {
									start: { line: 1, column: 1, offset: 0 },
									end: { line: 1, column: 3, offset: 2 },
								},
							},
							{
								type: "ruby",
								value: "alphabet",
								ruby: "あるふぁべっと",
								position: {
									start: { line: 1, column: 3, offset: 2 },
									end: { line: 1, column: 21, offset: 20 },
								},
							},
							{
								type: "text",
								value: "にルビをふる",
								position: {
									start: { line: 1, column: 21, offset: 20 },
									end: { line: 1, column: 27, offset: 26 },
								},
							},
						],
						position: {
							start: { line: 1, column: 1, offset: 0 },
							end: { line: 1, column: 27, offset: 26 },
						},
					},
				],
				position: {
					start: { line: 1, column: 1, offset: 0 },
					end: { line: 1, column: 27, offset: 26 },
				},
			};
			expect(fromKakuyomuNovel(source)).toEqual(expected);
		});
	});

	describe("改行の判定", () => {
		test("開始文字と親文字の間に改行がある場合は、親文字を自動検出するルビとして`Ruby`に変換される", () => {
			const source = "この｜\n文字《もじ》にルビをふる";
			const expected: Root = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{
								type: "text",
								value: "この｜",
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
								type: "ruby",
								value: "文字",
								ruby: "もじ",
								position: {
									start: { line: 2, column: 1, offset: 4 },
									end: { line: 2, column: 7, offset: 10 },
								},
							},
							{
								type: "text",
								value: "にルビをふる",
								position: {
									start: { line: 2, column: 7, offset: 10 },
									end: { line: 2, column: 13, offset: 16 },
								},
							},
						],
						position: {
							start: { line: 1, column: 1, offset: 0 },
							end: { line: 2, column: 13, offset: 16 },
						},
					},
				],
				position: {
					start: { line: 1, column: 1, offset: 0 },
					end: { line: 2, column: 13, offset: 16 },
				},
			};
			expect(fromKakuyomuNovel(source)).toEqual(expected);
		});

		test("親文字の中に改行がある場合は、改行後の文字から親文字を自動検出するルビとして`Ruby`に変換される", () => {
			const source = "この｜文\n字《もじ》にルビをふる";
			const expected: Root = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{
								type: "text",
								value: "この｜文",
								position: {
									start: { line: 1, column: 1, offset: 0 },
									end: { line: 1, column: 5, offset: 4 },
								},
							},
							{
								type: "break",
								position: {
									start: { line: 1, column: 5, offset: 4 },
									end: { line: 2, column: 1, offset: 5 },
								},
							},
							{
								type: "ruby",
								value: "字",
								ruby: "もじ",
								position: {
									start: { line: 2, column: 1, offset: 5 },
									end: { line: 2, column: 6, offset: 10 },
								},
							},
							{
								type: "text",
								value: "にルビをふる",
								position: {
									start: { line: 2, column: 6, offset: 10 },
									end: { line: 2, column: 12, offset: 16 },
								},
							},
						],
						position: {
							start: { line: 1, column: 1, offset: 0 },
							end: { line: 2, column: 12, offset: 16 },
						},
					},
				],
				position: {
					start: { line: 1, column: 1, offset: 0 },
					end: { line: 2, column: 12, offset: 16 },
				},
			};
			expect(fromKakuyomuNovel(source)).toEqual(expected);
		});

		test("親文字とルビ開始文字の間に改行がある場合は、ただの`Text`になる", () => {
			const source = "この｜文字\n《もじ》にルビをふる";
			const expected: Root = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{
								type: "text",
								value: "この｜文字",
								position: {
									start: { line: 1, column: 1, offset: 0 },
									end: { line: 1, column: 6, offset: 5 },
								},
							},
							{
								type: "break",
								position: {
									start: { line: 1, column: 6, offset: 5 },
									end: { line: 2, column: 1, offset: 6 },
								},
							},
							{
								type: "text",
								value: "《もじ》にルビをふる",
								position: {
									start: { line: 2, column: 1, offset: 6 },
									end: { line: 2, column: 11, offset: 16 },
								},
							},
						],
						position: {
							start: { line: 1, column: 1, offset: 0 },
							end: { line: 2, column: 11, offset: 16 },
						},
					},
				],
				position: {
					start: { line: 1, column: 1, offset: 0 },
					end: { line: 2, column: 11, offset: 16 },
				},
			};
			expect(fromKakuyomuNovel(source)).toEqual(expected);
		});

		test("ルビ開始文字とルビの間に改行がある場合は、ただの`Text`になる", () => {
			const source = "この｜文字《\nもじ》にルビをふる";
			const expected: Root = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{
								type: "text",
								value: "この｜文字《",
								position: {
									start: { line: 1, column: 1, offset: 0 },
									end: { line: 1, column: 7, offset: 6 },
								},
							},
							{
								type: "break",
								position: {
									start: { line: 1, column: 7, offset: 6 },
									end: { line: 2, column: 1, offset: 7 },
								},
							},
							{
								type: "text",
								value: "もじ》にルビをふる",
								position: {
									start: { line: 2, column: 1, offset: 7 },
									end: { line: 2, column: 10, offset: 16 },
								},
							},
						],
						position: {
							start: { line: 1, column: 1, offset: 0 },
							end: { line: 2, column: 10, offset: 16 },
						},
					},
				],
				position: {
					start: { line: 1, column: 1, offset: 0 },
					end: { line: 2, column: 10, offset: 16 },
				},
			};
			expect(fromKakuyomuNovel(source)).toEqual(expected);
		});

		test("ルビの中に改行がある場合は、ただの`Text`になる", () => {
			const source = "この｜文字《も\nじ》にルビをふる";
			const expected: Root = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{
								type: "text",
								value: "この｜文字《も",
								position: {
									start: { line: 1, column: 1, offset: 0 },
									end: { line: 1, column: 8, offset: 7 },
								},
							},
							{
								type: "break",
								position: {
									start: { line: 1, column: 8, offset: 7 },
									end: { line: 2, column: 1, offset: 8 },
								},
							},
							{
								type: "text",
								value: "じ》にルビをふる",
								position: {
									start: { line: 2, column: 1, offset: 8 },
									end: { line: 2, column: 9, offset: 16 },
								},
							},
						],
						position: {
							start: { line: 1, column: 1, offset: 0 },
							end: { line: 2, column: 9, offset: 16 },
						},
					},
				],
				position: {
					start: { line: 1, column: 1, offset: 0 },
					end: { line: 2, column: 9, offset: 16 },
				},
			};
			expect(fromKakuyomuNovel(source)).toEqual(expected);
		});

		test("ルビとルビ終了文字の間に改行がある場合は、ただの`Text`になる", () => {
			const source = "この｜文字《もじ\n》にルビをふる";
			const expected: Root = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{
								type: "text",
								value: "この｜文字《もじ",
								position: {
									start: { line: 1, column: 1, offset: 0 },
									end: { line: 1, column: 9, offset: 8 },
								},
							},
							{
								type: "break",
								position: {
									start: { line: 1, column: 9, offset: 8 },
									end: { line: 2, column: 1, offset: 9 },
								},
							},
							{
								type: "text",
								value: "》にルビをふる",
								position: {
									start: { line: 2, column: 1, offset: 9 },
									end: { line: 2, column: 8, offset: 16 },
								},
							},
						],
						position: {
							start: { line: 1, column: 1, offset: 0 },
							end: { line: 2, column: 8, offset: 16 },
						},
					},
				],
				position: {
					start: { line: 1, column: 1, offset: 0 },
					end: { line: 2, column: 8, offset: 16 },
				},
			};
			expect(fromKakuyomuNovel(source)).toEqual(expected);
		});
	});

	describe("文字数制限", () => {
		describe("親文字", () => {
			test("文字数が20文字の場合は`Ruby`へ変換できる", () => {
				const source =
					"｜一丁丂七丄丅丆万丈三上下丌不与丏丐丑丒专《とてもながいかんじ》";
				const expected: Root = {
					type: "root",
					children: [
						{
							type: "paragraph",
							children: [
								{
									type: "ruby",
									value: "一丁丂七丄丅丆万丈三上下丌不与丏丐丑丒专",
									ruby: "とてもながいかんじ",
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
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 33, offset: 32 },
					},
				};
				expect(fromKakuyomuNovel(source)).toEqual(expected);
			});

			test("文字数が21文字以上の場合は、親文字を自動検出するルビとしてルビ開始記号までの末尾20文字が`Ruby`へ変換される", () => {
				const source =
					"｜一丁丂七丄丅丆万丈三上下丌不与丏丐丑丒专且《とてもながいかんじ》";
				const expected: Root = {
					type: "root",
					children: [
						{
							type: "paragraph",
							children: [
								{
									type: "text",
									value: "｜一",
									position: {
										start: { line: 1, column: 1, offset: 0 },
										end: { line: 1, column: 3, offset: 2 },
									},
								},
								{
									type: "ruby",
									value: "丁丂七丄丅丆万丈三上下丌不与丏丐丑丒专且",
									ruby: "とてもながいかんじ",
									position: {
										start: { line: 1, column: 3, offset: 2 },
										end: { line: 1, column: 34, offset: 33 },
									},
								},
							],
							position: {
								start: { line: 1, column: 1, offset: 0 },
								end: { line: 1, column: 34, offset: 33 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 34, offset: 33 },
					},
				};
				expect(fromKakuyomuNovel(source)).toEqual(expected);
			});
		});

		describe("ルビ", () => {
			test("文字数が50文字の場合は`Ruby`へ変換できる", () => {
				const source =
					"｜很長的字符《ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひ》";
				const expected: Root = {
					type: "root",
					children: [
						{
							type: "paragraph",
							children: [
								{
									type: "ruby",
									value: "很長的字符",
									ruby: "ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひ",
									position: {
										start: { line: 1, column: 1, offset: 0 },
										end: { line: 1, column: 59, offset: 58 },
									},
								},
							],
							position: {
								start: { line: 1, column: 1, offset: 0 },
								end: { line: 1, column: 59, offset: 58 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 59, offset: 58 },
					},
				};
				expect(fromKakuyomuNovel(source)).toEqual(expected);
			});

			test("文字数が51文字の場合はただの`Text`になる", () => {
				const source =
					"｜很長的字符《ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひび》";
				const expected: Root = {
					type: "root",
					children: [
						{
							type: "paragraph",
							children: [
								{
									type: "text",
									value:
										"｜很長的字符《ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひび》",
									position: {
										start: { line: 1, column: 1, offset: 0 },
										end: { line: 1, column: 60, offset: 59 },
									},
								},
							],
							position: {
								start: { line: 1, column: 1, offset: 0 },
								end: { line: 1, column: 60, offset: 59 },
							},
						},
					],
					position: {
						start: { line: 1, column: 1, offset: 0 },
						end: { line: 1, column: 60, offset: 59 },
					},
				};
				expect(fromKakuyomuNovel(source)).toEqual(expected);
			});
		});
	});

	describe("記号のエスケープ", () => {
		test("開始文字の直後にルビ開始文字がある場合は、ルビ開始文字が`Text`に変換される", () => {
			const source = "これはただの山括弧｜《やまかっこ》";
			const expected: Root = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{
								type: "text",
								value: "これはただの山括弧《やまかっこ》",
								position: {
									start: { line: 1, column: 1, offset: 0 },
									end: { line: 1, column: 18, offset: 17 },
								},
							},
						],
						position: {
							start: { line: 1, column: 1, offset: 0 },
							end: { line: 1, column: 18, offset: 17 },
						},
					},
				],
				position: {
					start: { line: 1, column: 1, offset: 0 },
					end: { line: 1, column: 18, offset: 17 },
				},
			};
			expect(fromKakuyomuNovel(source)).toEqual(expected);
		});

		test("開始文字の直後にルビ終了文字がある場合、開始文字までがルビの内容として`Ruby`に変換される", () => {
			const source = "これはちゃんと山括弧《やまかっこ｜》がルビになる";
			const expected: Root = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{
								type: "text",
								value: "これはちゃんと",
								position: {
									start: { line: 1, column: 1, offset: 0 },
									end: { line: 1, column: 8, offset: 7 },
								},
							},
							{
								type: "ruby",
								value: "山括弧",
								ruby: "やまかっこ｜",
								position: {
									start: { line: 1, column: 8, offset: 7 },
									end: { line: 1, column: 19, offset: 18 },
								},
							},
							{
								type: "text",
								value: "がルビになる",
								position: {
									start: { line: 1, column: 19, offset: 18 },
									end: { line: 1, column: 25, offset: 24 },
								},
							},
						],
						position: {
							start: { line: 1, column: 1, offset: 0 },
							end: { line: 1, column: 25, offset: 24 },
						},
					},
				],
				position: {
					start: { line: 1, column: 1, offset: 0 },
					end: { line: 1, column: 25, offset: 24 },
				},
			};
			expect(fromKakuyomuNovel(source)).toEqual(expected);
		});
	});
});
