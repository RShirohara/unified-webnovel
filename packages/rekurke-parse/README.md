# rekurke-parse

[![LICENSE][license-badge]][license]

**rekurke** plugin to support for parsing
[kakuyomu novel][kakuyomu-novel] format.

## Contents

- [rekurke-parse](#rekurke-parse)
  - [Contents](#contents)
  - [What is this?](#what-is-this)
  - [Install](#install)
  - [Use](#use)
  - [API](#api)
    - [`unified().use(rekurkeParse)`](#unifieduserekurkeparse)
  - [Syntax](#syntax)
  - [Syntax Tree](#syntax-tree)
  - [Types](#types)
  - [License](#license)

## What is this?

This package is a [unified][] plugin that defines how to take [kakuyomu novel][kakuyomu-novel] format
as input and turn it into a syntax tree.

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).
in Node.js (18.0+), Install with [npm][]:

```shell
npm install @rshirohara/rekurke-parse
```

## Use

Say we have the following module `example.js`:

```js
import { rekurkeParse } from "@rshirohara/rekurke-parse";
import { unified } from "unified";

main();

async function main() {
  const source = [
    "これが一段落目\r\n",
    "ここから二段落目",
    "これはルビ|振《ふ》り",
    "これは《《強調》》",
  ].join("\n");
  const ast = await unified().use(rekurkeParse).parse(source);

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
      children: [{ type: "text", value: "これが一段落目" }],
    },
    {
      type: "paragraphMargin",
      size: 1,
    },
    {
      type: "paragraph",
      children: [
        { type: "text", value: "ここから二段落目" },
        { type: "break" },
        { type: "text", value: "これはルビ" },
        { type: "ruby", value: "振", ruby: "ふ" },
        { type: "text", value: "り" },
        { type: "break" },
        { type: "text", value: "これは" },
        { type: "emphasis", value: "強調" },
      ],
    },
  ],
}
```

## API

### `unified().use(rekurkeParse)`

Add support for parsing kakuyomu novel format input.
There are no options.

## Syntax

Kakuyomu novel format text is parsed according to the [official documentation](https://kakuyomu.jp/help/entry/notation).

## Syntax Tree

The syntax tree format uses in rekurke is [kkast][].

## Types

This package is fully typed with [TypeScript][].
There are no extra exported types.

## License

[MIT][License]

<!-- Link definitions -->

[kakuyomu-novel]: https://kakuyomu.jp
[kkast]: ../kkast
[license-badge]: https://img.shields.io/github/license/RShirohara/unified-webnovel
[license]: ./LICENSE.md
[npm]: https://docs.npmjs.com/cli/install
[typescript]: https://www.typescriptlang.org
[unified]: https://github.com/unifiedjs/unified
