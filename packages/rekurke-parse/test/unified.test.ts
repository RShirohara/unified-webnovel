import type { Root } from "@rshirohara/kkast";
import { unified } from "unified";
import { expect, test } from "vitest";
import { rekurkeParse } from "~/index.js";

test("rekurkeParse", () => {
	const source = [
		"unified でカクヨム小説構文をパースできるかのテスト。\n",
		"ここから二段落目。",
		"ここは二行目。\n\r",
		"ここから三段落目。",
		"これはルビ振《ふ》り。",
		"こうやっても|振《ふ》れる。",
		"これでもルビが｜振《ふ》れる。",
		"|alphabet《あるふぁべっと》とかもできる。\r\r\n\r",
		"ここから四段落目。",
		"|《これはただの山括弧。",
		"｜《これもただの山括弧。",
		"これは《《強調》》。",
	].join("\r\n");

	const expected: Root = {
		type: "root",
		children: [
			{
				type: "paragraph",
				children: [
					{
						type: "text",
						value: "unified でカクヨム小説構文をパースできるかのテスト。",
					},
				],
			},
			{ type: "paragraphMargin", size: 1 },
			{
				type: "paragraph",
				children: [
					{ type: "text", value: "ここから二段落目。" },
					{ type: "break" },
					{ type: "text", value: "ここは二行目。" },
				],
			},
			{ type: "paragraphMargin", size: 2 },
			{
				type: "paragraph",
				children: [
					{ type: "text", value: "ここから三段落目。" },
					{ type: "break" },
					{ type: "text", value: "これはルビ" },
					{ type: "ruby", value: "振", ruby: "ふ" },
					{ type: "text", value: "り。" },
					{ type: "break" },
					{ type: "text", value: "こうやっても" },
					{ type: "ruby", value: "振", ruby: "ふ" },
					{ type: "text", value: "れる。" },
					{ type: "break" },
					{ type: "text", value: "これでもルビが" },
					{ type: "ruby", value: "振", ruby: "ふ" },
					{ type: "text", value: "れる。" },
					{ type: "break" },
					{ type: "ruby", value: "alphabet", ruby: "あるふぁべっと" },
					{ type: "text", value: "とかもできる。" },
				],
			},
			{ type: "paragraphMargin", size: 3 },
			{
				type: "paragraph",
				children: [
					{ type: "text", value: "ここから四段落目。" },
					{ type: "break" },
					{ type: "text", value: "《これはただの山括弧。" },
					{ type: "break" },
					{ type: "text", value: "《これもただの山括弧。" },
					{ type: "break" },
					{ type: "text", value: "これは" },
					{ type: "emphasis", value: "強調" },
					{ type: "text", value: "。" },
				],
			},
		],
	};

	expect(unified().use(rekurkeParse).parse(source)).toMatchObject(expected);
});
