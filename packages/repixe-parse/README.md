# repixe-parse

[![LICENSE][license-badge]][license]

**repixe** plugin to add support for parsing [pixiv novel][pixiv-novel] format.

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

This package is a [unified][] plugin that defines how to take [pixiv novel][pixiv-novel] format
as input and turn it into a syntax tree.

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).
in Node.js (18.0+), Install with [npm][]:

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

Pixiv novel format text is parsed according to the [official documentation][pixiv-novel-notation].

## Syntax tree

The syntax tree format used in repixe is [pxast][].

## Types

This package is fully typed with [TypeScript][].
There are no extra exported types.

## License

[MIT][license]

<!-- Link Definitions -->

[license-badge]: https://img.shields.io/github/license/RShirohara/unified-webnovel
[license]: ./LICENSE.md
[npm]: https://docs.npmjs.com/cli/install
[pixiv-novel-notation]: https://www.pixiv.help/hc/ja/articles/235584168-%E5%B0%8F%E8%AA%AC%E4%BD%9C%E5%93%81%E3%81%AE%E6%9C%AC%E6%96%87%E5%86%85%E3%81%AB%E4%BD%BF%E3%81%88%E3%82%8B%E7%89%B9%E6%AE%8A%E3%82%BF%E3%82%B0%E3%81%A8%E3%81%AF
[pixiv-novel]: https://www.pixiv.net/novel
[pxast]: ../pxast
[typescript]: https://www.typescriptlang.org
[unified]: https://github.com/unifiedjs/unified
