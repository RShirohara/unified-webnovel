// Type definition for npm module "pixiv-novel-parser".

declare module "pixiv-novel-parser" {
  export class Parser<T extends PixivNode> {
    static parse<T extends PixivNode>(novel: string): T[];
    tree: T[];
    parse(novel: string): Parser<T>;
  }

  export type PixivNode = Text | PixivTag;
  export type PixivTag =
    | NewPage
    | Ruby
    | Chapter
    | PixivImage
    | JumpPage
    | JumpUrl;

  interface Node {
    type: string;
  }

  interface Tag extends Node {
    type: "tag";
    name: string;
  }

  export interface Text extends Node {
    type: "text";
    val: string;
  }

  export interface NewPage extends Tag {
    name: "newpage";
  }

  export interface Ruby extends Tag {
    name: "rb";
    rubyBase: string;
    rubyText: string;
  }

  export interface Chapter extends Tag {
    name: "chapter";
    title: (Text | Ruby)[];
  }

  export interface PixivImage extends Tag {
    name: "pixivimage";
    illustID: string;
    pageNumber?: number;
  }

  export interface JumpPage extends Tag {
    name: "jump";
    pageNumber: number;
  }

  export interface JumpUrl extends Tag {
    name: "jumpuri";
    title: (Text | Ruby)[];
    uri: string;
  }
}
