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

export type Paragraph = {
  type: "tag";
  name: "paragraph";
  elements: PixivPhrasingContent[];
};

export function transform(nodes: PixivNode[]): PixivFlowContent[] {
  const result: PixivFlowContent[] = [];
  let internalNodes: PixivPhrasingContent[] = [];

  [...nodes].forEach((node) => {
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
    } else {
      internalNodes.push(node);
    }
  });
  if (internalNodes.length >= 1) {
    result.push({ type: "tag", name: "paragraph", elements: internalNodes });
    internalNodes = [];
  }
  return result;
}
