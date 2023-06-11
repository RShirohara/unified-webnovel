import type {
  Break,
  Heading,
  Image,
  Link,
  PageHeading,
  PageReference,
  Paragraph,
  PxastContent,
  Root,
  Ruby,
  Text,
} from "@rshirohara/pxast";

export function toPixivNovel(tree: Root): string {
  return compileContent(tree.children)
    .filter((text) => text !== "")
    .join("\n\n");
}

function compileContent(nodes: PxastContent[]): string[] {
  return [...nodes].map((node) => {
    switch (node.type) {
      case "heading": {
        return compilers.heading.compile(node);
      }
      case "pageHeading": {
        return compilers.pageHeading.compile(node);
      }
      case "paragraph": {
        return compilers.paragraph.compile(node);
      }
      case "link": {
        return compilers.link.compile(node);
      }
      case "image": {
        return compilers.image.compile(node);
      }
      case "pageReference": {
        return compilers.pageReference.compile(node);
      }
      case "break": {
        return compilers.break.compile(node);
      }
      case "ruby": {
        return compilers.ruby.compile(node);
      }
      case "text": {
        return compilers.text.compile(node);
      }
    }
  });
}

type NodeCompiler<T extends PxastContent> = {
  compile: (node: T, index?: number, array?: PxastContent[]) => string;
};

const compilers = {
  heading: {
    compile: (node) => {
      return `[chapter: ${compileContent(node.children).join("")}]`;
    },
  } as NodeCompiler<Heading>,

  pageHeading: {
    compile: (node) => {
      if (node.pageNumber === 1) {
        return "";
      } else {
        return "[newpage]";
      }
    },
  } as NodeCompiler<PageHeading>,

  paragraph: {
    compile: (node) => {
      return compileContent(node.children).join("");
    },
  } as NodeCompiler<Paragraph>,

  link: {
    compile: (node) => {
      return `[[jumpuri: ${compileContent(node.children).join("")} > ${
        node.url
      }]]`;
    },
  } as NodeCompiler<Link>,

  image: {
    compile: (node) => {
      return `[pixivimage:${node.illustId}${
        node.pageNumber !== undefined ? "-" + node.pageNumber.toString() : ""
      }]`;
    },
  } as NodeCompiler<Image>,

  pageReference: {
    compile: (node) => {
      return `[jump:${node.pageNumber}]`;
    },
  } as NodeCompiler<PageReference>,

  break: {
    compile: (_) => {
      return "\n";
    },
  } as NodeCompiler<Break>,

  ruby: {
    compile: (node) => {
      return `[[rb: ${node.value} > ${node.ruby}]]`;
    },
  } as NodeCompiler<Ruby>,

  text: {
    compile: (node) => {
      return node.value;
    },
  } as NodeCompiler<Text>,
};
