import type { KkastContent, Root } from "@rshirohara/kkast";
import type { Options } from "./options.js";

type KkastNode = KkastContent | Root;
type Postprocessor<T extends KkastNode> = (node: T, option: Options) => T;

export const postprocess: Postprocessor<Root> = (node, options) => {
  const processors: Postprocessor<Root>[] = [
    removeEmptyNode,
    insertParagraphMargin,
  ];
  let result: Root = { ...node };
  for (const processor of processors) {
    result = processor(result, options);
  }
  return result;
};

function removeEmptyNode<T extends Root>(node: T, _: Options): T {
  function removeNode<T extends KkastContent>(node: T): T | undefined {
    if (node.type === "paragraph" && node.children.length === 0) {
      return undefined;
    }
    return node;
  }

  return {
    ...node,
    children: [...node.children]
      .map((node) => removeNode(node))
      .filter((node) => node !== undefined),
  };
}

function insertParagraphMargin<T extends Root>(node: T, _: Options): T {
  return {
    ...node,
    children: [...node.children].flatMap((value, index) =>
      index + 1 < node.children.length
        ? [value, { type: "paragraphMargin", size: 1 }]
        : [value],
    ),
  };
}
