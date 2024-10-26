# `pxast`

**P**i**x**iv novel **A**bstract **S**yntax **T**ree

---

**pxast** is a specification for representing [pixiv novel][pixiv-novel] format
in a syntax tree.
It implements [unist][].

## Contents

- [`pxast`](#pxast)
  - [Contents](#contents)
  - [Introduction](#introduction)
  - [Types](#types)
  - [Nodes](#nodes)
    - [`Parent`](#parent)
    - [`Literal`](#literal)
    - [`Root`](#root)
    - [`Heading`](#heading)
    - [`PageBreak`](#pagebreak)
    - [`Paragraph`](#paragraph)
    - [`Break`](#break)
    - [`Image`](#image)
    - [`Link`](#link)
    - [`PageReference`](#pagereference)
    - [`Ruby`](#ruby)
    - [`Text`](#text)
  - [Content model](#content-model)
    - [`FlowContent`](#flowcontent)
    - [`PhrasingContent`](#phrasingcontent)
    - [`InlinePhrasingContent`](#inlinephrasingcontent)
  - [License](#license)

## Introduction

This document defines a format for representing [pixiv novel][pixiv-novel] format
as an [abstract syntax tree][syntax-tree].
This specification is written in a [Web IDL][web-idl]-like grammar.

## Types

If you are using [TypeScript][],
you can use the unist types by installing them with [npm][]:

```shell
npm install @rshirohara/pxast
```

## Nodes

### `Parent`

```idl
interface Parent <: UnistParent {
  children: [PxastContent]
}
```

**Parent** ([**UnistParent**][dfn-unist-parent]) represents an abstract interface
in pxast containing other nodes (said to be [_children_][term-child]).

Its content is limited to only other [pxast content][dfn-pxast-content].

### `Literal`

```idl
interface Literal <: UnistLiteral {
  value: string
}
```

**Literal** ([**UnistLiteral**][dfn-unist-literal]) represents an abstract interface
in pxast containing a value.

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

### `Heading`

```idl
interface Heading <: Parent {
  type: "heading"
  children: [InlinePhrasingContent]
}
```

**Heading** ([**Parent**][dfn-parent]) represents a heading of a section.

**Heading** can be used where [**flow**][dfn-flow-content] content is expected.
Its content model is [**inline phrasing**][dfn-inline-phrasing-content] content.

For example, the following text:

```text
[chapter:まえがき]
```

Yields:

```js
{
  type: "heading";
  children: [{ type: "text", value: "まえがき" }];
}
```

### `PageBreak`

```idl
interface PageBreak <: Node {
  type: "pageBreak"
}
```

**PageBreak** ([**Node**][dfn-node]) represents a breaks of a page.

**PageBreak** can be used where [**flow**][dfn-flow-content] content is expected.
It has no content model.

For example, the following text:

```text
ここは一ページ目。
[newpage]
ここが二ページ目。
```

Yields:

```js
{
  type: "root",
  children: [
    {
      type: "paragraph",
      children: [{ type: "text", value: "ここは一ページ目。" }]
    },
    { type: "pageBreak" },
    {
      type: "paragraph",
      children: [{ type: "text", value: "ここが二ページ目。" }]
    }
  ]
}
```

### `Paragraph`

```idl
interface Paragraph <: Parent {
  type: "paragraph"
  children: [PhrasingContent]
}
```

**Paragraph** ([**Parent**][dfn-parent]) represents a unit of discourse dealing with a particular point.

**Paragraph** can be used where [**content**][dfn-content] is expected.
Its content model is [**phrasing**][dfn-phrasing-content] content.

For example, the following text:

```text
たとえば私はこの文章を書く。
```

Yields:

```js
{
  type: "paragraph",
  children: [{ type: "text", value: "たとえば私はこの文章を書く。" }]
}
```

### `Break`

```idl
interface Break <: Node {
  type: "break"
}
```

**Break** ([**Node**][dfn-node]) represents a line break.

**Break** can be used where [**phrasing**][dfn-phrasing-content] content is expected.
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

### `Image`

```idl
interface Image <: Node {
  type: "image"
  illustId: string
  pageNumber: 1 <= number?
}
```

**Image** ([**Node**][dfn-node]) represents a reference to pixiv image.

**Image** can be used where [**phrasing**][dfn-phrasing-content] content is expected.
It has no content model.

For example, the following text:

```text
[pixivimage:000001-02]
```

Yields:

```js
{
  type: "image",
  illustId: "000001",
  pageNumber: 2
}
```

### `Link`

```idl
interface Link <: Parent {
  type: "link"
  url: string
  children: [InlinePhrasingContent]
}
```

**Link** ([**Parent**][dfn-parent]) represents a hyperlink.

**Link** can be used where [**phrasing**][dfn-phrasing-content] content is expected.
Its content model is [**inline phrasing**][dfn-inline-phrasing-content] content.

For example, the following text:

```text
[[jumpurl:リンク例>https://example.com]]
```

Yields:

```js
{
  type: "link",
  url: "https://example.com",
  children: [{ type: "text", value: "リンク例" }]
}
```

### `PageReference`

```idl
interface PageReference <: Node {
  type: "pageReference"
  pageNumber: 1 <= number
}
```

**PageReference** ([**Node**][dfn-node]) represents a reference to page.

**PageReference** can be used where [**phrasing**][dfn-phrasing-content] content is expected.
It has no content model.

A `pageNumber` field must be present.
A value of `1` is said to be the minimum value.

For example, the following text:

```text
[jump:01]
```

Yields:

```js
{
  type: "pageReference",
  pageNumber: 1
}
```

### `Ruby`

```idl
interface Ruby <: Literal {
  type: "ruby"
  ruby: string
}
```

**Ruby** ([**Literal**][dfn-literal]) represents a small annotations that are rendered above, below, or next to text.

**Ruby** can be used where [**phrasing**][dfn-phrasing-content] content is expected.
Its content is represented by its `value` and `ruby` fields.

For example, the following text:

```text
[[rb:私>わたし]]
```

Yields:

```js
{
  type: "ruby",
  value: "私",
  ruby: "わたし"
}
```

### `Text`

```idl
interface Text <: Literal {
  type: "text"
}
```

**Text** ([**Literal**][dfn-literal]) represents everything that is just text.

**Text** can be used where [**phrasing**][dfn-phrasing-content] content is expected.
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
type PxastContent = FlowContent | PhrasingContent
```

Each node in pxast falls into one or more categories of **Content** that group nodes with similar characteristics together.

### `FlowContent`

```idl
type FlowContent = Heading | PageBreak | Paragraph
```

**Flow** content represent the sections of document.

### `PhrasingContent`

```idl
type PhrasingContent = Break | Image | Link | PageReference | InlinePhrasingContent
```

**Phrasing** content represent the text in a document, and its markup.

### `InlinePhrasingContent`

```idl
type InlinePhrasingContent = Ruby | Text
```

**Inline Phrasing** content represent the text in a document, and its markup,
that is intended to be stored in [**phrasing**][dfn-phrasing-content] content.

## License

[MIT][license]

<!-- Link Definitions -->

[dfn-content]: #contents
[dfn-flow-content]: #flowcontent
[dfn-inline-phrasing-content]: #inlinephrasingcontent
[dfn-literal]: #literal
[dfn-node]: https://github.com/syntax-tree/unist#node
[dfn-parent]: #parent
[dfn-phrasing-content]: #phrasingcontent
[dfn-pxast-content]: #content-model
[dfn-unist-literal]: https://github.com/syntax-tree/unist#literal
[dfn-unist-parent]: https://github.com/syntax-tree/unist#parent
[license]: ./LICENSE.md
[npm]: https://docs.npmjs.com/cli/install
[pixiv-novel]: https://www.pixiv.net/novel
[syntax-tree]: https://github.com/syntax-tree/unist#syntax-tree
[term-child]: https://github.com/syntax-tree/unist#child
[term-root]: https://github.com/syntax-tree/unist#root
[term-tree]: https://github.com/syntax-tree/unist#tree
[typescript]: https://www.typescriptlang.org
[unist]: https://github.com/syntax-tree/unist
[web-idl]: https://webidl.spec.whatwg.org
