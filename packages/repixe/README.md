# repixe

[![LICENSE][license-badge]][license]

[**unified**][unified] processor with support for parsing and serializing [pixiv novel][pixiv-novel] format input/output.

## Contents

- [repixe](#repixe)
  - [Contents](#contents)
  - [What is this?](#what-is-this)
  - [Install](#install)
  - [Use](#use)
  - [API](#api)
    - [`repixe()`](#repixe-1)
  - [Syntax](#syntax)
  - [Syntax tree](#syntax-tree)
  - [Types](#types)
  - [License](#license)

## What is this?

This package is a [unified][] processor with support
for parsing and serializing [pixiv novel][pixiv-novel] format input/output
by using unified with [`repixe-parse`][repixe-parse] and [`repixe-stringify`][repixe-stringify].

- **unified** is a project that transforms content with abstract syntax trees (ASTs).
- **repixe** adds support for [pixiv novel][pixiv-novel] format to unified.
- [**pxast**][pxast] is the [pixiv novel][pixiv-novel] AST that repixe uses.

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).
in Node.js (18.0+), Install with [npm][]:

```shell
npm install @rshirohara/repixe
```

## Use

Say we have the following module `example.js`:

```js
import { repixe } from "@rshirohara/repixe";

main();

async function main() {
  const source = [
    "これが一段落目\n\n",
    "ここから二段落目",
    "[[rb:二行目>にぎょうめ]]",
    "[[jumpuri:リンク>https://example.com]]も使える。"
  ].join("\n");
  const file = await repixe().process(source);

  console.log(String(file));
}
```

Running that with `node example.js` yields:

```text
これが一段落目

ここから二段落目
[[rb: 二行目 > にぎょうめ]]
[[jumpuri: リンク > https://example.com]]も使える。
```

## API

### `repixe()`

Create a new (unfrozen) unified processor that already uses
`repixe-parse` and `repixe-stringify`.
See [`unified`][unified] for more information.

## Syntax

Pixiv novel format is parsed and serialized according
to [official article][pixiv-novel-syntax]
and [`pixiv-novel-parser`][pixiv-novel-parser].

## Syntax tree

The syntax tree format used in repixe is [pxast][].

## Types

This package is fully typed with [TypeScript][].
There are no extra exported types.

## License

[MIT][license]

<!-- Lind definitions -->

[license-badge]: https://img.shields.io/github/license/RShirohara/unified-webnovel
[license]: ./LICENSE.md
[npm]: https://docs.npmjs.com/cli/install
[pixiv-novel-parser]: https://github.com/pixiv/pixiv-novel-parser
[pixiv-novel-syntax]: https://www.pixiv.help/hc/ja/articles/235584168-%E5%B0%8F%E8%AA%AC%E4%BD%9C%E5%93%81%E3%81%AE%E6%9C%AC%E6%96%87%E5%86%85%E3%81%AB%E4%BD%BF%E3%81%88%E3%82%8B%E7%89%B9%E6%AE%8A%E3%82%BF%E3%82%B0%E3%81%A8%E3%81%AF-
[pixiv-novel]: https://www.pixiv.net/novel
[pxast]: ../pxast
[repixe-parse]: ../repixe-parse
[repixe-stringify]: ../repixe-stringify
[typescript]: https://www.typescriptlang.org
[unified]: https://github.com/unifiedjs/unified
