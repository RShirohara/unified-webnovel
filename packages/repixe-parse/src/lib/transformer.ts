import type {
  Chapter,
  NewPage,
  Ruby,
  Text,
  PixivImage,
  JumpPage,
  JumpUrl,
  PixivNode,
} from "pixiv-novel-parser";

export type PixivFlowContent = NewPage | Chapter | PixivPhrasingContent[];
export type PixivPhrasingContent =
  | Text
  | Ruby
  | PixivImage
  | JumpPage
  | JumpUrl;

export function transform(nodes: PixivNode[]): PixivFlowContent[] {
  const result: PixivFlowContent[] = [];
  let internalNodes: PixivPhrasingContent[] = [];

  [...nodes].forEach((node) => {
    if (
      node.type === "tag" &&
      (node.name === "newpage" || node.name === "chapter")
    ) {
      if (internalNodes.length >= 1) {
        result.push(internalNodes);
        internalNodes = [];
      }
      result.push(node);
    } else {
      internalNodes.push(node);
    }
  });
  if (internalNodes.length >= 1) {
    result.push(internalNodes);
    internalNodes = [];
  }
  return result;
}
