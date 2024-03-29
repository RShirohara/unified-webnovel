import type {
  Chapter,
  JumpPage,
  JumpUrl,
  NewPage,
  PixivImage,
  PixivNode,
  Ruby,
  Text,
} from "pixiv-novel-parser";

export type PixivContent = PixivFlowContent | PixivPhrasingContent;
export type PixivFlowContent = Chapter | NewPage | Paragraph;
export type PixivPhrasingContent =
  | JumpPage
  | JumpUrl
  | PixivImage
  | Ruby
  | Text;

export interface Paragraph {
  type: "tag";
  name: "paragraph";
  elements: PixivPhrasingContent[];
}

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: TODO refactor
export function transform(nodes: PixivNode[]): PixivFlowContent[] {
  const result: PixivFlowContent[] = [];
  let internalNodes: PixivPhrasingContent[] = [];

  for (const node of [...nodes]) {
    if (
      node.type === "tag" &&
      (node.name === "newpage" || node.name === "chapter")
    ) {
      if (internalNodes.length >= 1) {
        result.push({
          type: "tag",
          name: "paragraph",
          elements: internalNodes,
        });
        internalNodes = [];
      }
      result.push(node);
    } else if (node.type === "text") {
      const paragraphBorder = node.val
        .replaceAll(/\n{2,}/gmu, "\n\n")
        .split("\n\n");
      if (paragraphBorder.length >= 2) {
        paragraphBorder.forEach((text, index, array) => {
          internalNodes.push({ ...node, val: text });
          if (index + 1 < array.length) {
            result.push({
              type: "tag",
              name: "paragraph",
              elements: internalNodes,
            });
            internalNodes = [];
          }
        });
      } else {
        internalNodes.push(node);
      }
    } else {
      internalNodes.push(node);
    }
  }
  if (internalNodes.length >= 1) {
    result.push({ type: "tag", name: "paragraph", elements: internalNodes });
    internalNodes = [];
  }
  return result;
}
