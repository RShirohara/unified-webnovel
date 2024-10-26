import type {
  Break as KkastBreak,
  KkastContent,
  FlowContent as KkastFlowContent,
  Paragraph as KkastParagraph,
  PhrasingContent as KkastPhrasingContent,
  Root as KkastRoot,
  Ruby as KkastRuby,
  Text as KkastText,
} from "@rshirohara/kkast";
import type {
  Break as PxastBreak,
  PxastContent,
  FlowContent as PxastFlowContent,
  Heading as PxastHeading,
  Image as PxastImage,
  InlinePhrasingContent as PxastInlinePhrasingContent,
  Link as PxastLink,
  PageBreak as PxastPageBreak,
  PageReference as PxastPageReference,
  Paragraph as PxastParagraph,
  PhrasingContent as PxastPhrasingContent,
  Root as PxastRoot,
  Ruby as PxastRuby,
  Text as PxastText,
} from "@rshirohara/pxast";
import type { Options } from "./options.js";

export function convertRoot(tree: PxastRoot, options: Options): KkastRoot {
  return {
    type: "root",
    children: [...tree.children]
      .flatMap((node) => convertRootChildren(node, options))
      .filter((node) => node !== undefined),
  };
}

export function convertRootChildren(
  node: PxastContent,
  options: Options,
): (KkastContent | undefined)[] {
  return [node].flatMap((node): (KkastContent | undefined)[] | undefined => {
    switch (node.type) {
      case "heading":
      case "pageBreak":
      case "paragraph": {
        return convertFlowContent(node, options).filter(
          (node) => node !== undefined,
        );
      }
      case "break":
      case "image":
      case "link":
      case "pageReference":
      case "ruby":
      case "text": {
        return convertPhrasingContent(node, options).filter(
          (node) => node !== undefined,
        );
      }
      default: {
        return undefined;
      }
    }
  });
}

// FlowContent
export function convertFlowContent(
  node: PxastFlowContent,
  options: Options,
): (KkastFlowContent | undefined)[] {
  return [node].flatMap((node) => {
    switch (node.type) {
      case "heading": {
        return convertHeading(node, options);
      }
      case "pageBreak": {
        return convertPageBreak(node, options);
      }
      case "paragraph": {
        return convertParagraph(node, options);
      }
      default: {
        return undefined;
      }
    }
  });
}

function convertHeading(node: PxastHeading, options: Options): KkastParagraph {
  return {
    type: "paragraph",
    children: [...node.children]
      .flatMap((node) => convertInlinePhrasingContent(node, options))
      .filter((node) => node !== undefined),
  };
}

function convertPageBreak(
  _: PxastPageBreak,
  options: Options,
): KkastParagraph | undefined {
  if (options.preserveUnmatchedSyntax) {
    return {
      type: "paragraph",
      children: [{ type: "text", value: "[newpage]" }],
    };
  }
  return undefined;
}

function convertParagraph(
  node: PxastParagraph,
  options: Options,
): KkastParagraph {
  return {
    type: "paragraph",
    children: [...node.children]
      .flatMap((node) => convertPhrasingContent(node, options))
      .filter((node) => node !== undefined),
  };
}

// PhrasingContent
export function convertPhrasingContent(
  node: PxastPhrasingContent,
  options: Options,
): (KkastPhrasingContent | undefined)[] {
  return [node].flatMap(
    (
      node,
    ):
      | KkastPhrasingContent
      | undefined
      | (KkastPhrasingContent | undefined)[] => {
      switch (node.type) {
        case "break": {
          return convertBreak(node, options);
        }
        case "image": {
          return convertImage(node, options);
        }
        case "link": {
          return convertLink(node, options);
        }
        case "pageReference": {
          return convertPageReference(node, options);
        }
        case "ruby":
        case "text": {
          return convertInlinePhrasingContent(node, options).filter(
            (node) => node !== undefined,
          );
        }
        default: {
          return undefined;
        }
      }
    },
  );
}

function convertBreak(_node: PxastBreak, _options: Options): KkastBreak {
  return { type: "break" };
}

function convertImage(
  node: PxastImage,
  options: Options,
): KkastText | undefined {
  if (options.preserveUnmatchedSyntax) {
    return {
      type: "text",
      value: `[pixivimage:${node.illustId}${node.pageNumber !== undefined ? `-${node.pageNumber}` : ""}]`,
    };
  }
  return undefined;
}

function convertLink(
  node: PxastLink,
  options: Options,
): (KkastText | KkastRuby)[] {
  if (options.preserveUnmatchedSyntax) {
    const text = [...node.children]
      .map((node) => {
        switch (node.type) {
          case "ruby": {
            return `[[rb: ${node.value} > ${node.ruby}]]`;
          }
          case "text": {
            return node.value;
          }
          default: {
            return "";
          }
        }
      })
      .join("");
    return [{ type: "text", value: `[[jumpuri: ${text} > ${node.url}]]` }];
  }
  return [...node.children]
    .flatMap((node) => convertInlinePhrasingContent(node, options))
    .filter((node) => node !== undefined);
}

function convertPageReference(
  node: PxastPageReference,
  options: Options,
): KkastText | undefined {
  if (options.preserveUnmatchedSyntax) {
    return { type: "text", value: `[jump:${node.pageNumber}]` };
  }
  return undefined;
}

// InlinePhrasingContent
type KkastInlinePhrasingContent = KkastRuby | KkastText;

export function convertInlinePhrasingContent(
  node: PxastInlinePhrasingContent,
  options: Options,
): (KkastInlinePhrasingContent | undefined)[] {
  return [node].flatMap((node) => {
    switch (node.type) {
      case "ruby": {
        return convertRuby(node, options);
      }
      case "text": {
        return convertText(node, options);
      }
      default: {
        return undefined;
      }
    }
  });
}

function convertRuby(node: PxastRuby, _: Options): KkastRuby {
  return { type: "ruby", value: node.value, ruby: node.ruby };
}

function convertText(node: PxastText, _: Options): KkastText {
  return { type: "text", value: node.value };
}
