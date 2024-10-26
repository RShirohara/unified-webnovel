// Type definitions for pxast.

import type {
  Node,
  Literal as UnistLiteral,
  Parent as UnistParent,
} from "unist";

// Node
export interface Parent extends UnistParent {
  children: PxastContent[];
}

export interface Literal extends UnistLiteral {
  value: string;
}

export interface Root extends Parent {
  type: "root";
}

export interface Heading extends Parent {
  type: "heading";
  children: InlinePhrasingContent[];
}

export interface PageBreak extends Node {
  type: "pageBreak";
}

export interface Paragraph extends Parent {
  type: "paragraph";
  children: PhrasingContent[];
}

export interface Break extends Node {
  type: "break";
}

export interface Image extends Node {
  type: "image";
  illustId: string;
  pageNumber?: number;
}

export interface Link extends Parent {
  type: "link";
  url: string;
  children: InlinePhrasingContent[];
}

export interface PageReference extends Node {
  type: "pageReference";
  pageNumber: number;
}

export interface Ruby extends Literal {
  type: "ruby";
  ruby: string;
}

export interface Text extends Literal {
  type: "text";
}

// Content model
export type PxastContent = FlowContent | PhrasingContent;

export type FlowContent = Heading | PageBreak | Paragraph;

export type PhrasingContent =
  | Break
  | Image
  | Link
  | PageReference
  | InlinePhrasingContent;

export type InlinePhrasingContent = Ruby | Text;
