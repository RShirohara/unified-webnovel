// Type definitions for pxast.

import { Parent as UnistParent, Literal as UnistLiteral } from "unist";

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

// Mixin

export interface Resource {
  url: string;
  title?: string | null | undefined;
}

export interface Association {
  identifier: string;
  label?: string | null | undefined;
}

export interface Reference extends Association {
  referenceType: ReferenceType;
}

export type ReferenceType = "shortcut" | "collapsed" | "full";

// Content model

export type PxastContent = UnistLiteral;
