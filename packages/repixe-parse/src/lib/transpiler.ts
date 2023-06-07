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
} from "./transformer";

type NodeTranspiler<T extends PixivContent, U extends PxastContent> = {
  matchPixiv: (node: PixivContent) => node is T;
  matchPxast: (node: PxastContent) => node is U;
  transpile: (node: T, index?: number, array?: PixivContent[]) => U;
  preProcess?: (node: T, index?: number, array?: PixivContent[]) => T;
  postProcess?: (node: U, index?: number, array?: PxastContent[]) => U;
};

export function transpile(nodes: PixivFlowContent[]): FlowContent[] {
  return [...nodes]
    .map((node) => {
      // preprocess
      if (
        transpilers.chapter.matchPixiv(node) &&
        transpilers.chapter.preProcess
      ) {
        return transpilers.chapter.preProcess(node);
      } else if (
        transpilers.newPage.matchPixiv(node) &&
        transpilers.newPage.preProcess
      ) {
        return transpilers.newPage.preProcess(node);
      } else if (
        transpilers.paragraph.matchPixiv(node) &&
        transpilers.paragraph.preProcess
      ) {
        return transpilers.paragraph.preProcess(node);
      }
      return node;
    })
    .map((node) => {
      // transpile
      if (transpilers.chapter.matchPixiv(node)) {
        return transpilers.chapter.transpile(node);
      } else if (transpilers.newPage.matchPixiv(node)) {
        return transpilers.newPage.transpile(node);
      } else {
        return transpilers.paragraph.transpile(node);
      }
    })
    .map((node) => {
      // postprocess
      if (
        transpilers.chapter.matchPxast(node) &&
        transpilers.chapter.postProcess
      ) {
        return transpilers.chapter.postProcess(node);
      } else if (
        transpilers.newPage.matchPxast(node) &&
        transpilers.newPage.postProcess
      ) {
        return transpilers.newPage.postProcess(node);
      } else if (
        transpilers.paragraph.matchPxast(node) &&
        transpilers.paragraph.postProcess
      ) {
        return transpilers.paragraph.postProcess(node);
      } else {
        return node;
      }
    });
}

function transpilePhrasingContent(
  nodes: PixivPhrasingContent[]
): PhrasingContent[] {
  return [...nodes]
    .map((node) => {
      // preprocess
      if (
        transpilers.jumpPage.matchPixiv(node) &&
        transpilers.jumpPage.preProcess
      ) {
        return transpilers.jumpPage.preProcess(node);
      } else if (
        transpilers.jumpUrl.matchPixiv(node) &&
        transpilers.jumpUrl.preProcess
      ) {
        return transpilers.jumpUrl.preProcess(node);
      } else if (
        transpilers.pixivImage.matchPixiv(node) &&
        transpilers.pixivImage.preProcess
      ) {
        return transpilers.pixivImage.preProcess(node);
      } else if (
        transpilers.ruby.matchPixiv(node) &&
        transpilers.ruby.preProcess
      ) {
        return transpilers.ruby.preProcess(node);
      } else if (
        transpilers.text.matchPixiv(node) &&
        transpilers.text.preProcess
      ) {
        return transpilers.text.preProcess(node);
      } else {
        return node;
      }
    })
    .map((node) => {
      // transpile
      if (transpilers.jumpPage.matchPixiv(node)) {
        return transpilers.jumpPage.transpile(node);
      } else if (transpilers.jumpUrl.matchPixiv(node)) {
        return transpilers.jumpUrl.transpile(node);
      } else if (transpilers.pixivImage.matchPixiv(node)) {
        return transpilers.pixivImage.transpile(node);
      } else if (transpilers.ruby.matchPixiv(node)) {
        return transpilers.ruby.transpile(node);
      } else {
        return transpilers.text.transpile(node);
      }
    })
    .map((node) => {
      // postprocess
      if (
        transpilers.jumpPage.matchPxast(node) &&
        transpilers.jumpPage.postProcess
      ) {
        return transpilers.jumpPage.postProcess(node);
      } else if (
        transpilers.jumpUrl.matchPxast(node) &&
        transpilers.jumpUrl.postProcess
      ) {
        return transpilers.jumpUrl.postProcess(node);
      } else if (
        transpilers.pixivImage.matchPxast(node) &&
        transpilers.pixivImage.postProcess
      ) {
        return transpilers.pixivImage.postProcess(node);
      } else if (
        transpilers.ruby.matchPxast(node) &&
        transpilers.ruby.postProcess
      ) {
        return transpilers.ruby.postProcess(node);
      } else if (
        transpilers.text.matchPxast(node) &&
        transpilers.text.postProcess
      ) {
        return transpilers.text.postProcess(node);
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
        children: transpilePhrasingContent(node.title),
      };
    },
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
      return node;
    },
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
        children: transpilePhrasingContent(node.elements),
      };
    },
    preProcess: (node) => {
      return node;
    },
    postProcess: (node) => {
      return node;
    },
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
    },
  } as NodeTranspiler<PixivJumpPage, PageReference>,

  jumpUrl: {
    matchPixiv: (node) => {
      return node.type === "tag" && node.name === "jumpuri";
    },
    matchPxast: (node) => {
      return node.type === "link";
    },
    transpile: (node) => {
      return { type: "link", url: node.uri };
    },
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
        pageNumber: node.pageNumber ?? undefined,
      };
    },
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
    },
  } as NodeTranspiler<PixivRuby, Ruby>,

  text: {
    matchPixiv: (node) => {
      return node.type === "text";
    },
    matchPxast: (node) => {
      return node.type === "text" || node.type === "break";
    },
    transpile: (node) => {
      return { type: "text", value: node.val };
    },
  } as NodeTranspiler<PixivText, Text | Break>,
};
