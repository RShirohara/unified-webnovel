# repixe-stringify

[![LICENSE][license-badge]][license]

**repixe** plugin to add support for serializing pixiv novel format.

## Contents

- [repixe-stringify](#repixe-stringify)
  - [Contents](#contents)
  - [What is this?](#what-is-this)
  - [Install](#install)
  - [Use](#use)
  - [API](#api)
    - [`unified().use(repixeStringify)`](#unifieduserepixestringify)
  - [Syntax](#syntax)
  - [Syntax tree](#syntax-tree)
  - [Types](#types)
  - [License](#license)

## What is this?

This package is a [unified][unified] plugin that defines how to take a syntax tree as input and turn it into serialized [pixiv novel][pixiv-novel] format text.

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).
in Node.js (16.0+), Install with [npm][npm]:

```shell
npm install @rshirohara/repixe-stringify
```

## Use

Say we have the following module `example.js`

```js
import { unified } from "unified";
import { repixeStringify } from "@rshirohara/repixeStringify";

main();

async function main() {
  const source = {
    type: "root",
    children: [
      { type: "pageHeading", pageNumber: 1 },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            value: "ここが一段落目。"
          }
        ]
      },
      {
        type: "paragraph",
        children: [
          { type: "text", value: "ここが二" },
          { type: "ruby", value: "段落", ruby: "だんらく" },
          { type: "text", value: "目。" },
          { type: "break" },
          { type: "text", value: "ここが二行目。" }
        ]
      },
      {
        type: "paragraph",
        children: [
          { type: "text", value: "ここから三段落目。" },
          { type: "break" },
          {
            type: "link",
            url: "https://example.com",
            children: [{ type: "text", value: "リンク" }]
          },
          { type: "text", value: "も使える。" }
        ]
      },
      { type: "pageHeading", pageNumber: 2 },
      {
        type: "paragraph",
        children: [
          { type: "text", value: "ここからページが変わる。" },
          { type: "break" },
          { type: "pageReference", pageNumber: 1 },
          { type: "text", value: "ページへの参照。" }
        ]
      }
    ]
  };
  const result = await unified().use(repixeStringify).compile(source);

  console.log(result);
}
```

Running that with `node example.js` yields:

```text
ここが一段落目。

ここが二[[rb: 段落 > だんらく]]目。
ここが二行目。

ここから三段落目。
[[jumpuri: リンク > https://example.com]]も使える。

[newpage]

ここからページが変わる。
[jump:1]ページへの参照。
```

## API

### `unified().use(repixeStringify)`

Add support for serializing pixiv novel format input.
There are no options.

## Syntax

This package serializes according to [pixiv novel][pixiv-novel] format.

## Syntax tree

The syntax tree format used in repixe is [pxast][pxast].

## Types

This package is fully typed with [TypeScript][typescript]. There are no extra exported types.

## License

[MIT][license]

<!-- Link Definitions -->

[license-badge]: https://img.shields.io/github/license/RShirohara/unified-webnovel
[license]: ./LICENSE
[npm]: https://docs.npmjs.com/cli/install
[pixiv-novel]: https://www.pixiv.net/novel/
[pxast]: https://github.com/RShirohara/unified-webnovel/tree/main/packages/pxast
[typescript]: https://www.typescriptlang.org
[unified]: https://github.com/unifiedjs/unified/
