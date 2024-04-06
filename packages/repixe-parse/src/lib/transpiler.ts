import type {
  Break,
  FlowContent,
  Heading,
  Image,
  Link,
  PageHeading,
  PageReference,
  Paragraph,
  PhrasingContent,
  PxastContent,
  Ruby,
  Text,
} from "@rshirohara/pxast";
import type {
  Chapter as PixivChapter,
  PixivImage,
  JumpPage as PixivJumpPage,
  JumpUrl as PixivJumpUrl,
  NewPage as PixivNewPage,
  Ruby as PixivRuby,
  Text as PixivText,
} from "pixiv-novel-parser";

import type {
  PixivContent,
  PixivFlowContent,
  Paragraph as PixivParagraph,
  PixivPhrasingContent,
} from "./transformer.js";

interface NodeTranspiler<T extends PixivContent, U extends PxastContent> {
  match: (node: PixivContent) => node is T;
  transpile: (options: {
    node: T;
    index?: number;
    array?: PixivContent[];
  }) => U;
}

type NodeProcessor<T extends "pre" | "post"> = (
  nodes: T extends "pre" ? PixivFlowContent[] : FlowContent[],
) => T extends "pre" ? PixivFlowContent[] : FlowContent[];

export function transpile(nodes: PixivFlowContent[]): FlowContent[] {
  // preProcess
  let preProcessedNodes = [...nodes];
  for (const processor of preProcessors) {
    preProcessedNodes = processor(preProcessedNodes);
  }

  // transpile
  const transpiledNodes = transpileFlowContent(preProcessedNodes);

  // postProcess
  let postProcessedNodes = [...transpiledNodes];
  for (const processor of postProcessors) {
    postProcessedNodes = processor(postProcessedNodes);
  }
  return postProcessedNodes;
}

// transpilers

function transpileFlowContent(nodes: PixivFlowContent[]): FlowContent[] {
  return [...nodes].map((node, index, array) => {
    if (transpilers.chapter.match(node)) {
      return transpilers.chapter.transpile({ node, index, array });
    }
    if (transpilers.newPage.match(node)) {
      return transpilers.newPage.transpile({ node, index, array });
    }
    return transpilers.paragraph.transpile({ node, index, array });
  });
}

function transpilePhrasingContent(
  nodes: PixivPhrasingContent[],
): PhrasingContent[] {
  return [...nodes].map((node, index, array) => {
    if (transpilers.jumpPage.match(node)) {
      return transpilers.jumpPage.transpile({ node, index, array });
    }
    if (transpilers.jumpUrl.match(node)) {
      return transpilers.jumpUrl.transpile({ node, index, array });
    }
    if (transpilers.pixivImage.match(node)) {
      return transpilers.pixivImage.transpile({ node, index, array });
    }
    if (transpilers.ruby.match(node)) {
      return transpilers.ruby.transpile({ node, index, array });
    }
    return transpilers.text.transpile({ node, index, array });
  });
}

const transpilers = {
  chapter: {
    match: (node) => {
      return node.type === "tag" && node.name === "chapter";
    },
    transpile: ({ node }) => {
      return {
        type: "heading",
        children: transpilePhrasingContent(node.title),
      };
    },
  } as NodeTranspiler<PixivChapter, Heading>,

  newPage: {
    match: (node) => {
      return node.type === "tag" && node.name === "newpage";
    },
    transpile: ({ index, array }) => {
      const pageNumber =
        [...(array ?? [])]
          .map((node, index) => {
            return { node, index };
          })
          .filter(
            (node) => node.node.type === "tag" && node.node.name === "newpage",
          )
          .findIndex((node) => node.index === (index ?? 0)) + 1;
      return { type: "pageHeading", pageNumber };
    },
  } as NodeTranspiler<PixivNewPage, PageHeading>,

  paragraph: {
    match: (node) => {
      return node.type === "tag" && node.name === "paragraph";
    },
    transpile: ({ node }) => {
      return {
        type: "paragraph",
        children: transpilePhrasingContent(node.elements),
      };
    },
  } as NodeTranspiler<PixivParagraph, Paragraph>,

  jumpPage: {
    match: (node) => {
      return node.type === "tag" && node.name === "jump";
    },
    transpile: ({ node }) => {
      return { type: "pageReference", pageNumber: node.pageNumber };
    },
  } as NodeTranspiler<PixivJumpPage, PageReference>,

  jumpUrl: {
    match: (node) => {
      return node.type === "tag" && node.name === "jumpuri";
    },
    transpile: ({ node }) => {
      return {
        type: "link",
        url: node.uri,
        children: transpilePhrasingContent(node.title),
      };
    },
  } as NodeTranspiler<PixivJumpUrl, Link>,

  pixivImage: {
    match: (node) => {
      return node.type === "tag" && node.name === "pixivimage";
    },
    transpile: ({ node }) => {
      return {
        type: "image",
        illustId: node.illustID,
        pageNumber: node.pageNumber ?? undefined,
      };
    },
  } as NodeTranspiler<PixivImage, Image>,

  ruby: {
    match: (node) => {
      return node.type === "tag" && node.name === "rb";
    },
    transpile: ({ node }) => {
      return { type: "ruby", value: node.rubyBase, ruby: node.rubyText };
    },
  } as NodeTranspiler<PixivRuby, Ruby>,

  text: {
    match: (node) => {
      return node.type === "text";
    },
    transpile: ({ node }) => {
      if (node.val === "\n") {
        return { type: "break" };
      }
      return { type: "text", value: node.val };
    },
  } as NodeTranspiler<PixivText, Text | Break>,
};

// preProcessors
const preProcessors: NodeProcessor<"pre">[] = [
  // add first page headings
  (nodes) => {
    const containsPageHeadingRef =
      [...nodes].filter(
        (node) =>
          node.name === "newpage" ||
          (node.name === "paragraph" &&
            node.elements.filter(
              (node) => node.type === "tag" && node.name === "jump",
            ).length >= 1),
      ).length >= 1;
    return [
      containsPageHeadingRef ? { type: "tag", name: "newpage" } : undefined,
      ...nodes,
    ].filter((node): node is PixivFlowContent => node !== undefined);
  },

  // split line breaks
  (nodes) => {
    return [...nodes].map((node) => {
      if (node.name !== "paragraph") {
        return node;
      }
      return {
        ...node,
        elements: node.elements.flatMap((node): typeof node | PixivText[] => {
          if (node.type !== "text") {
            return node;
          }
          return node.val
            .replaceAll("\n", "\0\n\0")
            .split("\0")
            .filter((val) => val.length >= 1)
            .map((val) => {
              return { ...node, val };
            });
        }),
      };
    });
  },
];

// postProcessors
const postProcessors: NodeProcessor<"post">[] = [
  // remove empty elements
  (nodes) => {
    return [...nodes].map((node) => {
      if (node.type !== "paragraph") {
        return node;
      }
      return {
        ...node,
        children: node.children.filter(emptyElementsFilter).map((node) => {
          if (node.type !== "link") {
            return node;
          }
          return {
            ...node,
            children: node.children.filter(emptyElementsFilter),
          };
        }),
      };
    });
  },
];

const emptyElementsFilter = (
  value: PxastContent,
  index: number,
  array: PxastContent[],
) => {
  return !(
    (value.type === "break" || (value.type === "text" && value.value === "")) &&
    (index === 0 || index === array.length - 1)
  );
};
