import type {
	Break,
	Emphasis,
	Paragraph,
	ParagraphMargin,
	Root,
	Ruby,
	Text,
} from "@rshirohara/kkast";

export function toKakuyomuNovel(tree: Root): string {
	return [...tree.children]
		.map((node) => {
			switch (node.type) {
				case "paragraph": {
					return compileParagraph(node);
				}
				case "paragraphMargin": {
					return compileParagraphMargin(node);
				}
				default: {
					return "";
				}
			}
		})
		.join("");
}

function compileParagraph(tree: Paragraph): string {
	return [...tree.children]
		.map((node) => {
			switch (node.type) {
				case "break": {
					return compileBreak(node);
				}
				case "emphasis": {
					return compileEmphasis(node);
				}
				case "ruby": {
					return compileRuby(node);
				}
				case "text": {
					return compileText(node);
				}
				default: {
					return "";
				}
			}
		})
		.join("");
}

function compileParagraphMargin(tree: ParagraphMargin): string {
	return "\n".repeat(tree.size + 1);
}

function compileBreak(_: Break): string {
	return "\n";
}

function compileEmphasis(tree: Emphasis): string {
	return `《《${tree.value}》》`;
}

function compileRuby(tree: Ruby): string {
	return `|${tree.value}《${tree.ruby}》`;
}

function compileText(tree: Text): string {
	return tree.value;
}
