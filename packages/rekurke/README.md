# rekurke

[![LICENSE][license-badge]][license]

[**unified**][unified] processor with support for parsing and serializing [kakuyomu novel][kakuyomu-novel] format input/output.

## Contents

- [rekurke](#rekurke)
  - [Contents](#contents)
  - [What is this?](#what-is-this)
  - [Install](#install)
  - [Use](#use)
  - [API](#api)
    - [`rekurke()`](#rekurke-1)
  - [Syntax](#syntax)
  - [Syntax Tree](#syntax-tree)
  - [types](#types)
  - [License](#license)

## What is this?

This package is a [unified][] processor with support
for parsing and serializing [kakuyomu novel][kakuyomu-novel] format input/output
by using unified with [`rekurke-parse`][rekurke-parse] and [`rekurke-stringify`][rekurke-stringify].

- **unified** is a project that transforms content with abstract syntax trees (ASTs).
- **rekurke** add support for [kakuyomu novel][kakuyomu-novel] format to unified.
- [**kkast**][kkast] is the [kakuyomu novel][kakuyomu-novel] AST that rekurke uses.

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).
in Node.js (18.0+), Install with [npm][]:

```shell
npm install @rshirohara/rekurke
```

## Use

Say we have the following module `example.js`:

```js
import { rekurke } from "@rshirohara/rekurke";

main();

async function main() {
  const source = [
    "これが一段落目。\n",
    "これが二段落目。",
    "これは｜ルビ振《るびふ》り。\r\n\n",
    "ここから三段落《さんだんらく》目。",
    "これは《《強調》》。",
  ].join("\n");
  const file = await rekurke.process(source);

  console.log(String(file));
}
```

Running that with `node example.js` yields:

```text
これが一段落目。

これが二段落目。
これは|ルビ振《るびふ》り。


ここから|三段落《さんだんらく》目。
これは《《強調》》。
```

## API

### `rekurke()`

Create a new (frozen) unified processor that already uses
`rekurke-parse` and `rekurke-stringify`.
See [`unified`][unified] for more information.

## Syntax

Kakuyomu novel format is parsed and serialized according to the
[official article][kakuyomu-novel-syntax].

## Syntax Tree

The syntax tree format used in rekurke is [kkast][].

## types

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
[kakuyomu-novel-syntax]: https://kakuyomu.jp/help/entry/notation
[rekurke-parse]: ../rekurke-parse
[rekurke-stringify]: ../rekurke-stringify
[typescript]: https://www.typescriptlang.org
[unified]: https://github.com/unifiedjs/unified
