# repixe-rekurke

[![LICENSE][license-badge]][license]

[**repixe**][repixe] plugin that turns [pixiv novel][pixiv-novel] format into
[kakuyomu novel][kakuyomu-novel] format to support [rekurke][].

## Contents

- [repixe-rekurke](#repixe-rekurke)
  - [Contents](#contents)
  - [What is this?](#what-is-this)
  - [Install](#install)
  - [Use](#use)
  - [API](#api)
    - [`unified().use(repixeRekurke[, destination][, options])`](#unifieduserepixerekurke-destination-options)
      - [Parameters](#parameters)
        - [Notes](#notes)
          - [Signature](#signature)
      - [Returns](#returns)
    - [Options](#options)
      - [Fields](#fields)
  - [Syntax tree](#syntax-tree)
  - [Types](#types)
  - [License](#license)

## What is this?

This package is a [unified][] ([repixe][]) plugin that switches from repixe to rekurke.
It does this by transforming the current pixiv novel ([pxast][]) syntax tree
into an kakuyomu novel ([kkast][]) syntax tree.

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).
in Node.js (18.0+), Install with [npm][]:

```shell
npm install @rshirohara/repixe-rekurke
```

## Use

Say our document `example.txt` contains:

```text
これが一段落目。

ここから二段落目。
これは[[rb: 二行目 > にぎょうめ]]。
[[jumpuri: リンク > https://example.com]]も使える。
```

Our module `example.js` contains:

```javascript
import { rekurkeStringify } from "@rshirohara/rekurke-stringify";
import { repixeParse } from "@rshirohara/repixe-parse";
import { repixeRekurke } from "@rshirohara/repixe-rekurke";
import { read } from "to-vfile";
import { unified } from "unified";

const file = await unified()
  .use(repixeParse)
  .use(repixeRekurke)
  .use(rekurkeStringify)
  .process(await read("example.txt"));

console.log(String(file));
```

Running that with `node example.js` yields:

```text
これが一段落目。

ここから二段落目。
これは|二行目《にぎょうめ》。
リンクも使える。
```

## API

### `unified().use(repixeRekurke[, destination][, options])`

Turn pixiv novel format to kakuyomu novel format.

#### Parameters

- `destination` ([`Processor`][unified-processor], optional) - processor
- `options` ([`Options`](#options), optional) - configuration

##### Notes

###### Signature

- if a [processor][unified-processor] is given, runs the (rekurke) plugins
  used on it with a kkast tree, then discards the result.
  ([*bridge mode*][unified-transformer-ecosystem])
- otherwise, returns a kkast tree, the plugins used
  after `repixeRekurke` are rekurke plugins.
  ([*mutate mode*][unified-transformer-ecosystem])

> [!NOTE]
> It's highly unlikely that you want to pass a `processor`.

#### Returns

Transform ([`Transformer`][unified-transformer]).

### Options

#### Fields

- `preserveUnmatchedSyntax` (`boolean`, default: `false`) -
  whether to preserve the syntax of unmatched nodes.

## Syntax tree

This project turns [pxast][] (pixiv novel) into [kkast][] (kakuyomu novel).

## Types

This package is fully typed with [TypeScript][].
There are no extra exported types.

## License

[MIT][license]

<!-- Link Definitions -->

[kakuyomu-novel]: https://kakuyomu.jp
[kkast]: ../kkast
[license-badge]: https://img.shields.io/github/license/RShirohara/unified-webnovel
[license]: ./LICENSE.md
[npm]: https://docs.npmjs.com/cli/install
[pixiv-novel]: https://www.pixiv.net/novel
[pxast]: ../pxast
[rekurke]: ../rekurke
[repixe]: ../repixe
[typescript]: https://www.typescriptlang.org
[unified-processor]: https://github.com/unifiedjs/unified#processor
[unified-transformer-ecosystem]: https://github.com/unifiedjs/unified#transforming-between-ecosystems
[unified-transformer]: https://github.com/unifiedjs/unified#transformer
[unified]: https://github.com/unifiedjs/unified
