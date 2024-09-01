import type {
  Break as KkastBreak,
  Paragraph as KkastParagraph,
  Root as KkastRoot,
  Ruby as KkastRuby,
  Text as KkastText,
} from "@rshirohara/kkast";
import type {
  Break as PxastBreak,
  Heading as PxastHeading,
  Image as PxastImage,
  Link as PxastLink,
  PageHeading as PxastPageHeading,
  PageReference as PxastPageReference,
  Paragraph as PxastParagraph,
  Root as PxastRoot,
  Ruby as PxastRuby,
  Text as PxastText,
} from "@rshirohara/pxast";
import type { Options } from "./options.js";

export function convertRoot(tree: PxastRoot, options: Options): KkastRoot {
  return {
    type: "root",
    children: [...tree.children]
      .flatMap((node) => {
        switch (node.type) {
          case "heading": {
            return convertHeading(node, options);
          }
          case "pageHeading": {
            return convertPageHeading(node, options);
          }
          case "paragraph": {
            return convertParagraph(node, options);
          }
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
          case "ruby": {
            return convertRuby(node, options);
          }
          case "text": {
            return convertText(node, options);
          }
        }
      })
      .filter((node) => node !== undefined),
  };
}

// FlowContent
function convertHeading(node: PxastHeading, options: Options): KkastParagraph {
  return {
    type: "paragraph",
    children: [...node.children].map((node) => {
      switch (node.type) {
        case "ruby": {
          return convertRuby(node, options);
        }
        case "text": {
          return convertText(node, options);
        }
      }
    }),
  };
}

function convertPageHeading(
  _: PxastPageHeading,
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
      .flatMap((node) => {
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
          case "ruby": {
            return convertRuby(node, options);
          }
          case "text": {
            return convertText(node, options);
          }
        }
      })
      .filter((node) => node !== undefined),
  };
}

// PhrasingContent
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
      value: `[pixivimage:${node.illustId}${
        node.pageNumber !== undefined ? `-${node.pageNumber.toString()}` : ""
      }]`,
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
        }
      })
      .join("");
    return [{ type: "text", value: `[[jumpuri: ${text} > ${node.url}]]` }];
  }
  return [...node.children].map((node) => {
    switch (node.type) {
      case "ruby": {
        return convertRuby(node, options);
      }
      case "text": {
        return convertText(node, options);
      }
    }
  });
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

function convertRuby(node: PxastRuby, _: Options): KkastRuby {
  return { type: "ruby", value: node.value, ruby: node.ruby };
}

function convertText(node: PxastText, _: Options): KkastText {
  return { type: "text", value: node.value };
}
