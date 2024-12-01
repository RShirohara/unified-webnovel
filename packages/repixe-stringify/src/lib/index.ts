import type {
	Break,
	FlowContent,
	Heading,
	Image,
	InlinePhrasingContent,
	Link,
	PageBreak,
	PageReference,
	Paragraph,
	PhrasingContent,
	PxastContent,
	Root,
	Ruby,
	Text,
} from "@rshirohara/pxast";

export function toPixivNovel(tree: Root): string {
	return [...tree.children]
		.map((node) => compileRootChildren(node))
		.filter((text) => text !== "")
		.join("\n\n");
}

function compileRootChildren(node: PxastContent): string {
	switch (node.type) {
		case "heading":
		case "pageBreak":
		case "paragraph": {
			return compileFlowContent(node);
		}
		case "break":
		case "image":
		case "link":
		case "pageReference":
		case "ruby":
		case "text": {
			return compilePhrasingContent(node);
		}
		default: {
			return "";
		}
	}
}

// FlowContent
function compileFlowContent(node: FlowContent): string {
	switch (node.type) {
		case "heading": {
			return compileHeading(node);
		}
		case "pageBreak": {
			return compilePageBreak(node);
		}
		case "paragraph": {
			return compileParagraph(node);
		}
		default: {
			return "";
		}
	}
}

function compileHeading(node: Heading): string {
	return `[chapter: ${[...node.children].map(compileInlinePhrasingContent).join("")}]`;
}

function compilePageBreak(_: PageBreak): string {
	return "[newpage]";
}

function compileParagraph(node: Paragraph): string {
	return [...node.children].map(compilePhrasingContent).join("");
}

// PhrasingContent
function compilePhrasingContent(node: PhrasingContent): string {
	switch (node.type) {
		case "break": {
			return compileBreak(node);
		}
		case "image": {
			return compileImage(node);
		}
		case "link": {
			return compileLink(node);
		}
		case "pageReference": {
			return compilePageReference(node);
		}
		case "ruby":
		case "text": {
			return compileInlinePhrasingContent(node);
		}
		default: {
			return "";
		}
	}
}

function compileBreak(_: Break): string {
	return "\n";
}

function compileImage(node: Image): string {
	return `[pixivimage:${node.illustId}${
		node.pageNumber !== undefined ? `-${node.pageNumber}` : ""
	}]`;
}

function compileLink(node: Link): string {
	return `[[jumpuri: ${[...node.children].map(compileInlinePhrasingContent).join("")} > ${node.url}]]`;
}

function compilePageReference(node: PageReference): string {
	return `[jump:${node.pageNumber}]`;
}

// InlinePhrasingContent
function compileInlinePhrasingContent(node: InlinePhrasingContent): string {
	switch (node.type) {
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
}

function compileRuby(node: Ruby): string {
	return `[[rb: ${node.value} > ${node.ruby}]]`;
}

function compileText(node: Text): string {
	return node.value;
}
