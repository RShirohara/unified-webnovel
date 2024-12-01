import type {
	Break as KkastBreak,
	Emphasis as KkastEmphasis,
	Paragraph as KkastParagraph,
	ParagraphMargin as KkastParagraphMargin,
	Root as KkastRoot,
	Ruby as KkastRuby,
	Text as KkastText,
} from "@rshirohara/kkast";
import type {
	Break as PxastBreak,
	Paragraph as PxastParagraph,
	Root as PxastRoot,
	Ruby as PxastRuby,
	Text as PxastText,
} from "@rshirohara/pxast";
import type { InternalOptions } from "./options.js";

export function convertRoot(
	tree: KkastRoot,
	options: InternalOptions,
): PxastRoot {
	return {
		type: "root",
		children: [...tree.children]
			.map((node) => {
				switch (node.type) {
					case "paragraph": {
						return convertParagraph(node, options);
					}
					case "paragraphMargin": {
						return convertParagraphMargin(node, options);
					}
					case "text": {
						return convertText(node, options);
					}
					case "ruby": {
						return convertRuby(node, options);
					}
					case "emphasis": {
						return convertEmphasis(node, options);
					}
					case "break": {
						return convertBreak(node, options);
					}
					default: {
						return undefined;
					}
				}
			})
			.filter((node) => node !== undefined),
	};
}

// FlowContent
function convertParagraph(
	tree: KkastParagraph,
	options: InternalOptions,
): PxastParagraph {
	return {
		type: "paragraph",
		children: [...tree.children]
			.map((node) => {
				switch (node.type) {
					case "text": {
						return convertText(node, options);
					}
					case "ruby": {
						return convertRuby(node, options);
					}
					case "emphasis": {
						return convertEmphasis(node, options);
					}
					case "break": {
						return convertBreak(node, options);
					}
					default: {
						return undefined;
					}
				}
			})
			.filter((node) => node !== undefined),
	};
}

function convertParagraphMargin(
	_tree: KkastParagraphMargin,
	_options: InternalOptions,
): undefined {
	return undefined;
}

// PhrasingContent
function convertText(tree: KkastText, _: InternalOptions): PxastText {
	return {
		type: "text",
		value: tree.value,
	};
}

function convertRuby(tree: KkastRuby, _options: InternalOptions): PxastRuby {
	return {
		type: "ruby",
		value: tree.value,
		ruby: tree.ruby,
	};
}

function convertEmphasis(
	tree: KkastEmphasis,
	options: InternalOptions,
): PxastText | PxastRuby {
	if (options.preserveUnmatchedSyntax) {
		return { type: "text", value: `《《${tree.value}》》` };
	}
	if (options.convertEmphasisToRuby.enable) {
		return {
			type: "ruby",
			value: tree.value,
			ruby:
				options.convertEmphasisToRuby.character[0]?.repeat(tree.value.length) ??
				"",
		};
	}
	return { type: "text", value: tree.value };
}

function convertBreak(
	_tree: KkastBreak,
	_options: InternalOptions,
): PxastBreak {
	return { type: "break" };
}
