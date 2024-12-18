// Type definitions for kkast.

import type {
	Node,
	Literal as UnistLiteral,
	Parent as UnistParent,
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
}

export interface ParagraphMargin extends Node {
	type: "paragraphMargin";
	size: number;
}

export interface Break extends Node {
	type: "break";
}

export interface Emphasis extends Literal {
	type: "emphasis";
}

export interface Ruby extends Literal {
	type: "ruby";
	ruby: string;
}

export interface Text extends Literal {
	type: "text";
}

// Content model
export type KkastContent = FlowContent | PhrasingContent;

export type FlowContent = Paragraph | ParagraphMargin;

export type PhrasingContent = Break | Emphasis | Ruby | Text;
