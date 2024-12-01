import type { Root } from "@rshirohara/pxast";
import { describe, expect, test } from "vitest";
import { fromPixivNovel } from "~/lib/index.js";

describe("内部コンテンツ", () => {
	describe("1つの改行は Break になる", () => {
		test("CR", () => {
			const source = "一行目\r二行目";
			const expected: Root = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{
								type: "text",
								value: "一行目",
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
								value: "二行目",
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
			expect(fromPixivNovel(source)).toEqual(expected);
		});

		test("LF", () => {
			const source = "一行目\n二行目";
			const expected: Root = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{
								type: "text",
								value: "一行目",
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
								value: "二行目",
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
			expect(fromPixivNovel(source)).toEqual(expected);
		});

		test("CRLF", () => {
			const source = "一行目\r\n二行目";
			const expected: Root = {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [
							{
								type: "text",
								value: "一行目",
								position: {
									start: { line: 1, column: 1, offset: 0 },
									end: { line: 1, column: 4, offset: 3 },
								},
							},
							{
								type: "break",
								position: {
									start: { line: 1, column: 4, offset: 3 },
									end: { line: 2, column: 1, offset: 5 },
								},
							},
							{
								type: "text",
								value: "二行目",
								position: {
									start: { line: 2, column: 1, offset: 5 },
									end: { line: 2, column: 4, offset: 8 },
								},
							},
						],
						position: {
							start: { line: 1, column: 1, offset: 0 },
							end: { line: 2, column: 4, offset: 8 },
						},
					},
				],
				position: {
					start: { line: 1, column: 1, offset: 0 },
					end: { line: 2, column: 4, offset: 8 },
				},
			};
			expect(fromPixivNovel(source)).toEqual(expected);
		});
	});
});
