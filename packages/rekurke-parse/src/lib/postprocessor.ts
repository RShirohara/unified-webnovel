import type { KkastContent, Root, Text } from "@rshirohara/kkast";

type KkastNode = KkastContent | Root;
type Postprocessor<T extends KkastNode> = (node: T) => T;

export const postprocess: Postprocessor<Root> = (node) => {
	const processors: Postprocessor<Root>[] = [joinTexts, removeLastBreaks];
	let result: Root = { ...node };
	for (const processor of processors) {
		result = processor(result);
	}
	return result;
};

function removeLastBreaks<T extends KkastNode>(node: T): T {
	switch (node.type) {
		case "root": {
			return {
				...node,
				children: [...node.children].map((node) =>
					removeLastBreaks<typeof node>(node),
				),
			};
		}
		case "paragraph": {
			if (
				node.children.length > 0 &&
				node.children[node.children.length - 1].type === "break"
			) {
				return { ...node, children: node.children.slice(0, -1) };
			}
			return node;
		}
		default: {
			return node;
		}
	}
}

function joinTexts<T extends KkastNode>(node: T): T {
	switch (node.type) {
		case "root": {
			return {
				...node,
				children: [...node.children].map((node) =>
					joinTexts<typeof node>(node),
				),
			};
		}
		case "paragraph": {
			const children: typeof node.children = [];
			let joinedText = resetTextNode();

			for (const item of node.children) {
				if (item.type !== "text") {
					if (joinedText.value !== "") {
						children.push(joinedText);
						joinedText = resetTextNode();
					}
					children.push(item);
					continue;
				}
				joinedText = generateJoinedText(joinedText, item);
			}

			if (joinedText.value !== "") {
				children.push(joinedText);
			}
			return { ...node, children };
		}
		default: {
			return node;
		}
	}
}

function resetTextNode(): Text {
	return {
		type: "text",
		value: "",
		position: {
			start: { line: 0, column: 0, offset: 0 },

			end: { line: 0, column: 0, offset: 0 },
		},
	};
}

function generateJoinedText(prev: Text, curr: Text): Text {
	return {
		type: "text",
		value: prev.value + curr.value,
		position: {
			start: {
				line:
					prev.value === ""
						? (curr.position?.start.line ?? 0)
						: (prev.position?.start.line ?? 0),
				column:
					prev.value === ""
						? (curr.position?.start.column ?? 0)
						: (prev.position?.start.column ?? 0),
				offset:
					prev.value === ""
						? (curr.position?.start.offset ?? 0)
						: (prev.position?.start.offset ?? 0),
			},
			end: {
				line: curr.position?.end.line ?? 0,
				column: curr.position?.end.column ?? 0,
				offset: curr.position?.end.offset ?? 0,
			},
		},
	};
}
