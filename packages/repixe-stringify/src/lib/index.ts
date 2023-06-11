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
  return "";
}

type NodeRenderer<T extends PxastContent> = {
  match: (node: PxastContent) => node is T;
  render: (node: T, index?: number, array?: PxastContent[]) => string;
};

const renderers = {
  paragraph: {} as NodeRenderer<Paragraph>,
  heading: {} as NodeRenderer<Heading>,
  pageHeading: {} as NodeRenderer<PageHeading>,
  text: {} as NodeRenderer<Text>,
  ruby: {} as NodeRenderer<Ruby>,
  break: {} as NodeRenderer<Break>,
  link: {} as NodeRenderer<Link>,
  image: {} as NodeRenderer<Image>,
  pageReference: {} as NodeRenderer<PageReference>,
};
