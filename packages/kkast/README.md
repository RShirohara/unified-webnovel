# `kkast`

**K**a**k**uyomu novel **A**bstract **S**yntax **T**ree

---

**kkast** is a specification for representing [kakuyomu novel][kakuyomu-novel]
format in a syntax tree.
It implements [unist][].

## Contents

- [`kkast`](#kkast)
  - [Contents](#contents)
  - [Introduction](#introduction)
  - [Types](#types)
  - [Nodes](#nodes)
    - [`Parent`](#parent)
    - [`Literal`](#literal)
    - [`Root`](#root)
    - [`Paragraph`](#paragraph)
    - [`ParagraphMargin`](#paragraphmargin)
    - [`Break`](#break)
    - [`Emphasis`](#emphasis)
    - [`Ruby`](#ruby)
    - [`Text`](#text)
  - [Content model](#content-model)
    - [`FlowContent`](#flowcontent)
    - [`PhrasingContent`](#phrasingcontent)
  - [License](#license)

## Introduction

This document defines a format for representing [kakuyomu novel][kakuyomu-novel]
format as an [abstract syntax tree][syntax-tree].
This specification is written in a [Web IDL][web-idl]-like grammar.

## Types

If you are using [TypeScript][],
you can use the unist types by installing them with [npm][]:

```shell
npm install @rshirohara/kkast
```

## Nodes

### `Parent`

```idl
interface Parent <: UnistParent {
  children: [KkastContent]
}
```

**Parent** ([**UnistParent**][dfn-unist-parent]) represents an abstract
interface in kkast containing order nodes (said to be [_children_][term-child]).

Its content is limited to only other [kkast content][dfn-kkast-content].

### `Literal`

```idl
interface Literal <: UnistLiteral {
  value: string
}
```

**Literal** ([**UnistLiteral**][dfn-unist-literal]) represents an abstract
interface in kkast containing a value.

Its `value` field is a `string`.

### `Root`

```idl
interface Root <: Parent {
  type: "root"
}
```

**Root** ([**Parent**][dfn-parent]) represents a document.

**Root** can be used as the [_root_][term-root] of a [_tree_][term-tree],
never as a [_child_][term-child].

### `Paragraph`

```idl
interface Paragraph <: Parent {
  type: "paragraph"
  children: [PhrasingContent]
}
```

**Paragraph** ([**Parent**][dfn-parent]) represents a unit of discourse dealing
with a particular point.

**Paragraph** can be used where [**content**][dfn-content] is expected.
Its content model is [**phrasing**][dfn-phrasing-content] content.

### `ParagraphMargin`

```idl
interface ParagraphMargin <: Node {
  type: "paragraphMargin"
  size: 1 <= number
}
```

**ParagraphMargin** ([**Node**][dfn-node]) represents the margins between
paragraphs.

**ParagraphMargin** can only be used between two
[**paragraphs**][dfn-paragraph].
It has no content model.

A `size` field must be present.
A value of `1` is said to be minimum value.

For example, the following text:

```text
これは一段落目。


これは二段落目。

```

Yields:

```js
{
  type: "root",
  children: [
    {
      type: "paragraph",
      children: [{ type: "text", value: "これは一段落目。" }],
    },
    { type: "paragraphMargin", size: 2 },
    {
      type: "paragraph",
      children: [{ type: "text", value: "これは二段落目。" }],
    },
  ],
}
```

### `Break`

```idl
interface Break <: Node {
  type: "break"
}
```

**Break** ([**Node**][dfn-node]) represents a line break.

**Break** can be used where [**phrasing**][dfn-phrasing-content] content is
expected.
It has no content model.

For example, the following text:

```text
これは一行目。
これが二行目。
```

Yields:

```js
{
  type: "paragraph",
  children: [
    { type: "text", value: "これは一行目。" },
    { type: "break" },
    { type: "text", value: "これが二行目。" }
  ]
}
```

### `Emphasis`

```idl
interface Emphasis <: Literal {
  type: "emphasis"
}
```

**Emphasis** ([**Literal**][dfn-literal]) represents a highlighted text.

**Emphasis** can be used where [**phrasing**][dfn-phrasing-content] content is
expected.
Its content is represented by its `value` field.

For example, the following text:

```text
《《強調された》》テキスト
```

Yields:

```js
{
  type: "paragraph",
  children: [
    { type: "emphasis", value: "強調された" },
    { type: "text", value: "テキスト" }
  ]
}
```

### `Ruby`

```idl
interface Ruby <: Literal {
  type: "ruby"
  ruby: "string"
}
```

**Ruby** ([**Literal**][dfn-literal]) represents a small annotations that are rendered above, below, or next to text.

**Ruby** can be used where [**phrasing**][dfn-phrasing-content] content is
expected.
Its content is represented by its `value` and `ruby` fields.

If the node start symbol ("`《`") is preceded by either the characters
"`|`" or "`｜`",
the node start symbol ("`《`") is treated as a plain [**text**][dfn-text] node.

For example, the following text:

```text
私《わたし》
|etc《えとせとら》
｜書き方《でっちあげかた》
|《山括弧
｜《これも山括弧
```

Yields:

```js
{
  type: "paragraph",
  children: [
    { type: "ruby", value: "私", ruby: "わたし" },
    { type: "break" },
    { type: "ruby", value: "etc", ruby: "えとせとら" },
    { type: "break" },
    { type: "ruby", value: "書き方", ruby: "でっちあげかた" },
    { type: "break" },
    { type: "text", value: "《山括弧" },
    { type: "break" },
    { type: "text", value: "《これも山括弧" }
  ]
}
```

### `Text`

```idl
interface text <: Literal {
  type: "text"
}
```

**Text** ([**Literal**][dfn-literal]) represents everything that is just text.

**Text** can be used where [**phrasing**][dfn-phrasing-content] content is
expected.
Its content is represented by its `value` field.

For example, the following text:

```text
たとえば私はこの文章を書く。
```

Yields:

```js
{ type: "text", value: "たとえば私はこの文章を書く。" }
```

## Content model

```idl
type KkastContent = FlowContent | PhrasingContent;
```

Each node in kkast falls into one or more categories of **Content** that group
nodes with similar characteristics together.

### `FlowContent`

```idl
type FlowContent = Paragraph | ParagraphMargin;
```

**Flow** content represent the sections of document.

### `PhrasingContent`

```idl
type PhrasingContent = Text | Ruby | Emphasis | Break;
```

**Phrasing** content represent the text in a document, and its markup.

## License

[MIT][License]

<!-- Link definitions -->

[dfn-content]: #contents
[dfn-kkast-content]: #content-model
[dfn-literal]: #literal
[dfn-node]: https://github.com/syntax-tree/unist#node
[dfn-paragraph]: #paragraph
[dfn-parent]: #parent
[dfn-phrasing-content]: #phrasingcontent
[dfn-text]: #text
[dfn-unist-literal]: https://github.com/syntax-tree/unist#literal
[dfn-unist-parent]: https://github.com/syntax-tree/unist#parent
[kakuyomu-novel]: https://kakuyomu.jp
[license]: ./LICENSE.md
[npm]: https://docs.npmjs.com/cli/install
[syntax-tree]: https://github.com/syntax-tree/unist#syntax-tree
[term-child]: https://github.com/syntax-tree/unist#child
[term-root]: https://github.com/syntax-tree/unist#root
[term-tree]: https://github.com/syntax-tree/unist#tree
[typescript]: https://www.typescriptlang.org
[unist]: https://github.com/syntax-tree/unist
[web-idl]: https://webidl.spec.whatwg.org
