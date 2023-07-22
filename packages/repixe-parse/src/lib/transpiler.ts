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
  Text
} from "@rshirohara/pxast";
import type {
  Chapter as PixivChapter,
  PixivImage,
  JumpPage as PixivJumpPage,
  JumpUrl as PixivJumpUrl,
  NewPage as PixivNewPage,
  Ruby as PixivRuby,
  Text as PixivText
} from "pixiv-novel-parser";

import type {
  PixivContent,
  PixivFlowContent,
  Paragraph as PixivParagraph,
  PixivPhrasingContent
} from "./transformer.js";

type NodeTranspiler<T extends PixivContent, U extends PxastContent> = {
  matchPixiv: (node: PixivContent) => node is T;
  matchPxast: (node: PxastContent) => node is U;
  transpile: (node: T, index?: number, array?: PixivContent[]) => U;
  preProcess?: (node: T, index?: number, array?: PixivContent[]) => T;
  postProcess?: (node: U, index?: number, array?: PxastContent[]) => U;
};

export function transpile(nodes: PixivFlowContent[]): FlowContent[] {
  return [...nodes]
    .map((node, index, array) => {
      // preprocess
      if (
        transpilers.chapter.matchPixiv(node) &&
        transpilers.chapter.preProcess
      ) {
        return transpilers.chapter.preProcess(node, index, array);
      } else if (
        transpilers.newPage.matchPixiv(node) &&
        transpilers.newPage.preProcess
      ) {
        return transpilers.newPage.preProcess(node, index, array);
      } else if (
        transpilers.paragraph.matchPixiv(node) &&
        transpilers.paragraph.preProcess
      ) {
        return transpilers.paragraph.preProcess(node, index, array);
      } else {
        return node;
      }
    })
    .map((node, index, array) => {
      // transpile
      if (transpilers.chapter.matchPixiv(node)) {
        return transpilers.chapter.transpile(node, index, array);
      } else if (transpilers.newPage.matchPixiv(node)) {
        return transpilers.newPage.transpile(node, index, array);
      } else {
        return transpilers.paragraph.transpile(node, index, array);
      }
    })
    .map((node, index, array) => {
      // postprocess
      if (
        transpilers.chapter.matchPxast(node) &&
        transpilers.chapter.postProcess
      ) {
        return transpilers.chapter.postProcess(node, index, array);
      } else if (
        transpilers.newPage.matchPxast(node) &&
        transpilers.newPage.postProcess
      ) {
        return transpilers.newPage.postProcess(node, index, array);
      } else if (
        transpilers.paragraph.matchPxast(node) &&
        transpilers.paragraph.postProcess
      ) {
        return transpilers.paragraph.postProcess(node, index, array);
      } else {
        return node;
      }
    });
}

function transpilePhrasingContent(
  nodes: PixivPhrasingContent[]
): PhrasingContent[] {
  return [...nodes]
    .map((node, index, array) => {
      // preprocess
      if (
        transpilers.jumpPage.matchPixiv(node) &&
        transpilers.jumpPage.preProcess
      ) {
        return transpilers.jumpPage.preProcess(node, index, array);
      } else if (
        transpilers.jumpUrl.matchPixiv(node) &&
        transpilers.jumpUrl.preProcess
      ) {
        return transpilers.jumpUrl.preProcess(node, index, array);
      } else if (
        transpilers.pixivImage.matchPixiv(node) &&
        transpilers.pixivImage.preProcess
      ) {
        return transpilers.pixivImage.preProcess(node, index, array);
      } else if (
        transpilers.ruby.matchPixiv(node) &&
        transpilers.ruby.preProcess
      ) {
        return transpilers.ruby.preProcess(node, index, array);
      } else if (
        transpilers.text.matchPixiv(node) &&
        transpilers.text.preProcess
      ) {
        return transpilers.text.preProcess(node, index, array);
      } else {
        return node;
      }
    })
    .map((node, index, array) => {
      // transpile
      if (transpilers.jumpPage.matchPixiv(node)) {
        return transpilers.jumpPage.transpile(node, index, array);
      } else if (transpilers.jumpUrl.matchPixiv(node)) {
        return transpilers.jumpUrl.transpile(node, index, array);
      } else if (transpilers.pixivImage.matchPixiv(node)) {
        return transpilers.pixivImage.transpile(node, index, array);
      } else if (transpilers.ruby.matchPixiv(node)) {
        return transpilers.ruby.transpile(node, index, array);
      } else {
        return transpilers.text.transpile(node, index, array);
      }
    })
    .map((node, index, array) => {
      // postprocess
      if (
        transpilers.jumpPage.matchPxast(node) &&
        transpilers.jumpPage.postProcess
      ) {
        return transpilers.jumpPage.postProcess(node, index, array);
      } else if (
        transpilers.jumpUrl.matchPxast(node) &&
        transpilers.jumpUrl.postProcess
      ) {
        return transpilers.jumpUrl.postProcess(node, index, array);
      } else if (
        transpilers.pixivImage.matchPxast(node) &&
        transpilers.pixivImage.postProcess
      ) {
        return transpilers.pixivImage.postProcess(node, index, array);
      } else if (
        transpilers.ruby.matchPxast(node) &&
        transpilers.ruby.postProcess
      ) {
        return transpilers.ruby.postProcess(node, index, array);
      } else if (
        transpilers.text.matchPxast(node) &&
        transpilers.text.postProcess
      ) {
        return transpilers.text.postProcess(node, index, array);
      } else {
        return node;
      }
    });
}

const transpilers = {
  chapter: {
    matchPixiv: (node) => {
      return node.type === "tag" && node.name === "chapter";
    },
    matchPxast: (node) => {
      return node.type === "heading";
    },
    transpile: (node) => {
      return {
        type: "heading",
        children: transpilePhrasingContent(node.title)
      };
    }
  } as NodeTranspiler<PixivChapter, Heading>,

  newPage: {
    matchPixiv: (node) => {
      return node.type === "tag" && node.name === "newpage";
    },
    matchPxast: (node) => {
      return node.type === "pageHeading";
    },
    transpile: (_) => {
      return { type: "pageHeading", pageNumber: 1 };
    },
    postProcess: (node, index, array) => {
      const pageNumber = [...(array ?? [])]
        .map((node, index) => {
          return { node, index };
        })
        .filter((node) => node.node.type === "pageHeading")
        .findIndex((node) => node.index === index ?? 0);
      return { ...node, pageNumber: pageNumber + 1 };
    }
  } as NodeTranspiler<PixivNewPage, PageHeading>,

  paragraph: {
    matchPixiv: (node) => {
      return node.type === "tag" && node.name === "paragraph";
    },
    matchPxast: (node) => {
      return node.type === "paragraph";
    },
    transpile: (node) => {
      return {
        type: "paragraph",
        children: transpilePhrasingContent(node.elements)
      };
    },
    preProcess: (node) => {
      return {
        ...node,
        elements: node.elements
          .map((node) => {
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
          })
          .flat()
      };
    },
    postProcess: (node) => {
      return {
        ...node,
        children: node.children.filter(
          (value, index, array) =>
            !(
              (value.type === "break" ||
                (value.type === "text" && value.value === "")) &&
              (index === 0 || index === array.length - 1)
            )
        )
      };
    }
  } as NodeTranspiler<PixivParagraph, Paragraph>,

  jumpPage: {
    matchPixiv: (node) => {
      return node.type === "tag" && node.name === "jump";
    },
    matchPxast: (node) => {
      return node.type === "pageReference";
    },
    transpile: (node) => {
      return { type: "pageReference", pageNumber: node.pageNumber };
    }
  } as NodeTranspiler<PixivJumpPage, PageReference>,

  jumpUrl: {
    matchPixiv: (node) => {
      return node.type === "tag" && node.name === "jumpuri";
    },
    matchPxast: (node) => {
      return node.type === "link";
    },
    transpile: (node) => {
      return {
        type: "link",
        url: node.uri,
        children: transpilePhrasingContent(node.title)
      };
    },
    postProcess: (node) => {
      return {
        ...node,
        children: node.children.filter(
          (value, index, array) =>
            !(
              (value.type === "break" ||
                (value.type === "text" && value.value === "")) &&
              (index === 0 || index === array.length - 1)
            )
        )
      };
    }
  } as NodeTranspiler<PixivJumpUrl, Link>,

  pixivImage: {
    matchPixiv: (node) => {
      return node.type === "tag" && node.name === "pixivimage";
    },
    matchPxast: (node) => {
      return node.type === "image";
    },
    transpile: (node) => {
      return {
        type: "image",
        illustId: node.illustID,
        pageNumber: node.pageNumber ?? undefined
      };
    }
  } as NodeTranspiler<PixivImage, Image>,

  ruby: {
    matchPixiv: (node) => {
      return node.type === "tag" && node.name === "rb";
    },
    matchPxast: (node) => {
      return node.type === "ruby";
    },
    transpile: (node) => {
      return { type: "ruby", value: node.rubyBase, ruby: node.rubyText };
    }
  } as NodeTranspiler<PixivRuby, Ruby>,

  text: {
    matchPixiv: (node) => {
      return node.type === "text";
    },
    matchPxast: (node) => {
      return node.type === "text" || node.type === "break";
    },
    transpile: (node) => {
      if (node.val === "\n") {
        return { type: "break" };
      }
      return { type: "text", value: node.val };
    }
  } as NodeTranspiler<PixivText, Text | Break>
};
