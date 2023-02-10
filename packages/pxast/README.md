# `pxast`

**P**i**x**iv novel **A**bstract **S**yntax **T**ree

----------

**pxast** is a specification for representing [pixiv novel][pixiv-novel] in a syntax tree. It implements [unist][unist].

**Warning**: This project still in draft.

## Contents

## Introduction

This document defines a format for representing [pixiv novel][pixiv-novel] as an [abstract syntax tree][syntax-tree].

## Types

## Nodes

### `Parent`

```idl
interface Parent <: UnistParent {
  children: [PxastContent]
}
```

### `Literal`

```idl
interface Literal <: UnistLiteral {
  value: string
}
```

### `Root`

```idl
interface Root <: Parent {
  type: 'root'
}
```

### `Paragraph`

```idl
interface Paragraph <: Parent {
  type: 'paragraph'
  children: [PhrasingContent]
}
```

### `Heading`

```idl
interface Heading <: Parent {
  type: 'heading'
  children: [StaticPhrasingContent]
}
```

### `PageHeading`

```idl
interface Page <: Node {
  type: 'pageHeading'
  pageNumber: 1 <= number
}
```

### `Text`

```idl
interface Text <: Literal {
  type: 'text'
}
```

### `Ruby`

```idl
interface Ruby <: Literal {
  type: 'ruby'
  ruby: string
}
```

### `Break`

```idl
interface Break <: Node {
  type: 'break'
}
```

### `Link`

```idl
interface Link <: Parent {
  type: 'link'
  url: string
  children: [StaticPhrasingContent]
}
```

### `Image`

```idl
interface Image <: Node {
  type: 'image'
  illustId: string
  pageNumber: 1 <= number?
}
```

### `PageReference`

```idl
interface PageReference <: Node {
  type: 'pageReference'
  pageNumber: 1 <= number
}
```

## Content model

```idl
type PxastContent = FlowContent | PhrasingContent
```

### `FlowContent`

```idl
type FlowContent = Heading | PageHeading | Paragraph
```

### `PhrasingContent`

```idl
type PhrasingContent = Link | Image | PageReference | StaticPhrasingContent
```

### `StaticPhrasingContent`

```idl
type StaticPhrasingContent = Break | Ruby | Text
```

## License

[MIT][license]

<!-- Link Definitions -->

[license]: ./LICENSE
[pixiv-novel]: https://www.pixiv.net/novel/
[unist]: https://github.com/syntax-tree/unist
[syntax-tree]: https://github.com/syntax-tree/unist#syntax-tree
