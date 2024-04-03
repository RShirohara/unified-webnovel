# rekurke-stringify

[![LICENSE][license-badge]][license]

[**rekurke**][rekurke] plugin to support for serializing
[kakuyomu novel][kakuyomu-novel] format.

## Contents

- [rekurke-stringify](#rekurke-stringify)
  - [Contents](#contents)
  - [What is this?](#what-is-this)
  - [Install](#install)
  - [Use](#use)
  - [API](#api)
    - [`unified().use(rekurkeStringify)`](#unifieduserekurkestringify)
  - [Syntax](#syntax)
  - [Syntax tree](#syntax-tree)
  - [Types](#types)
  - [License](#license)

## What is this?

This package is a [unified][] plugin that defines how to take a syntax tree as input and turn into serialized [kakuyomu novel][kakuyomu-novel] format.

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).
in Node.js (18.0+), Install with [npm][]:

```shell
npm install @rshirohara/rekurke-stringify
```

## Use

Say we have the following module `example.js`:

```js
import { unified } from "unified";
import { rekurkeStringify } from "@rshirohara/rekurke-stringify";

main();

async function main() {
  const source = {
    type: "root",
    children: [
      {
        type: "paragraph",
        children: [{ type: "text", value: "これが一段落目。" }],
      },
      { type: "paragraphMargin", size: 1 },
      {
        type: "paragraph",
        children: [
          { type: "text", value: "これが二段落目。" },
          { type: "break" },
          { type: "text", value: "これは" },
          { type: "ruby", value: "ルビ振", ruby: "るびふ" },
          { type: "text", value: "り。" },
        ],
      },
      { type: "paragraphMargin", size: 2 },
      {
        type: "paragraph",
        children: [
          { type: "text", value: "ここから三段落目。" },
          { type: "break" },
          { type: "text", value: "これは" },
          { type: "emphasis", value: "強調" },
          { type: "text", value: "。" },
        ],
      },
    ],
  };
  const text = await unified().use(rekurkeStringify).compile(source);

  console.log(text);
}
```

Running that with `node example.js` yields:

```text
これが一段落目。

これが二段落目。
これは|ルビ振《るびふ》り。


ここから三段落目。
これは《《強調》》。
```

## API

### `unified().use(rekurkeStringify)`

Add support for serializing kakuyomu novel format input.
The are no options.

## Syntax

The package serializes according to [kakuyomu novel][kakuyomu-novel] format.

## Syntax tree

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
[rekurke]: ../rekurke
[typescript]: https://www.typescriptlang.org
[unified]: https://github.com/unifiedjs/unified
