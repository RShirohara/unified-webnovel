# repixe-parse

[![LICENSE][license-badge]][license]

**repixe** plugin to add support for parsing pixiv novel format.

## Contents

- [repixe-parse](#repixe-parse)
  - [Contents](#contents)
  - [What is this?](#what-is-this)
  - [Install](#install)
  - [Use](#use)
  - [API](#api)
    - [`unified().use(repixeParse)`](#unifieduserepixeparse)
  - [Syntax](#syntax)
  - [Syntax tree](#syntax-tree)
  - [Types](#types)
  - [License](#license)

## What is this?

This package is a [unified][unified] plugin that defines how to take [pixiv novel][pixiv-novel] format text as input and turn it into a syntax tree.

This plugin uses [`pixiv-novel-parser`][pixiv-novel-parser]
for parsing pixiv novel format text into tokens
and turns those into [pxast][pxast] syntax trees.

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).
in Node.js (16.0+), Install with [npm][npm]:

```shell
npm install @rshirohara/repixe-parse
```

## Use

Say we have the following module `example.js`:

```js
import { unified } from "unified";
import { repixeParse } from "@rshirohara/repixe-parse";

main();

async function main() {
  const source = [
    "これが一段落目\n\n",
    "ここから二段落目",
    "[[rb:二行目>にぎょうめ]]",
    "[[jumpuri:リンク>https://example.com]]も使える。"
  ].join("\n");
  const ast = await unified().use(repixeParse).parse(source);

  console.log(ast);
}
```

Running that with `node example.js` yields:

```js
{
  type: "root",
  children: [
    {
      type: "paragraph",
      children: [
        {type: "text", value: "これが一段落目"}
      ]
    },
    {
      type: "paragraph",
      children: [
        {type: "text", value: "ここから二段落目"},
        {type: "break"},
        {type: "ruby", value: "二行目", ruby: "にぎょうめ"},
        {type: "break"},
        {type: "link", url: "https://example.com", children: [
          {type: "text", value: "リンク"}
        ]},
        {type: "text": value: "も使える"}
      ]
    }
  ]
}
```

## API

### `unified().use(repixeParse)`

Add support for parsing pixiv novel format input.
There are no options.

## Syntax

Pixiv novel format text is parsed according uses [`pixiv-novel-parser`][pixiv-novel-parser].

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
[pixiv-novel-parser]: https://github.com/pixiv/pixiv-novel-parser
[pixiv-novel]: https://www.pixiv.net/novel/
[pxast]: https://github.com/RShirohara/unified-webnovel/tree/main/packages/pxast
[typescript]: https://www.typescriptlang.org
[unified]: https://github.com/unifiedjs/unified/
