// Type definition for kkast.

import type {
  Node,
  Literal as UnistLiteral,
  Parent as UnistParent,
  Data as UnistData
} from "unist";

// Node

export interface Parent extends UnistParent {
  children: KkastContent[];
}

export interface Literal extends UnistLiteral {
  value: string;
}

export interface Root extends Parent {
  type: "root";
}

export interface Paragraph extends Parent {
  type: "paragraph";
  children: PhrasingContent[];
  data?: ParagraphData;
}

export interface Text extends Literal {
  type: "text";
}

export interface Ruby extends Literal {
  type: "ruby";
  ruby: string;
}

export interface Emphasis extends Literal {
  type: "emphasis";
}

export interface Break extends Node {
  type: "break";
}

export interface ParagraphData extends UnistData {
  empty: boolean;
}

// Content model

export type KkastContent = FlowContent | PhrasingContent;

export type FlowContent = Paragraph;

export type PhrasingContent = Text | Ruby | Emphasis | Break;
