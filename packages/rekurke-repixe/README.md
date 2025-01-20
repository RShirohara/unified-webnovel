# rekurke-repixe

[![LICENSE][license-badge]][license]

**rekurke** plugins that turns [kakuyomu novel][kakuyomu-novel] format into [pixiv novel][pixiv-novel] format to support repixe.

## Contents

- [rekurke-repixe](#rekurke-repixe)
  - [Contents](#contents)
  - [What is this?](#what-is-this)
  - [Install](#install)
  - [Use](#use)
  - [API](#api)
    - [`unified().use(rekurkeRepixe[, description][, options])`](#unifieduserekurkerepixe-description-options)
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

This package is a [unified] (rekurke) plugin that switches from rekurke to repixe.
It does this by transforming the current kakuyomu novel ([kkast][]) syntax tree
into an pixiv novel ([pxast][]) syntax tree.

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).
in Node.js (18.0+), Install with [npm][]:

```shell
npm install @rshirohara/rekurke-repixe
```

## Use

Say our document `example.txt` contains:

```text
これが一段落目。

ここから二段落目。
これは|二行目《にぎょうめ》。
《《強調》》も使える。
```

Our module `example.js` contains:

```javascript
import { rekurkeParse } from "@rshirohara/rekurke-parse";
import { rekurkeRepixe } from "@rshirohara/rekurke-repixe";
import { repixeStringify } from "@rshirohara/repixe-stringify";
import { read } from "to-vfile";
import { unified } from "unified";

const file = await unified()
  .use(rekurkeParse)
  .use(rekurkeRepixe)
  .use(repixeStringify)
  .process(await read("example.txt"));

console.log(String(file));
```

Running that with `node example.js` yields:

```text
これが一段落目。

ここから二段落目。
これは[[rb: 二行目 > にぎょうめ]]。
強調も使える。
```

## API

### `unified().use(rekurkeRepixe[, description][, options])`

Turn kakuyomu novel format to pixiv novel format.

#### Parameters

- `description` ([`Processor`][unified-processor], optional) - processor
- `options` ([`Options`](#options), optional) - configuration

##### Notes

###### Signature

- if a [processor][unified-processor] is given, runs the (repixe) plugins
  used on it with a pxast tree, then discards the result.
  ([*bridge mode*][unified-transformer-ecosystem])
- otherwise, returns a pxast tree, the plugins used
  after `rekurkeRepixe` are repixe plugins.
  ([*mutate mode*][unified-transformer-ecosystem])

> [!NOTE]
> It's highly unlikely that you want to pass a `processor`.

#### Returns

Transform ([`Transformer`][unified-transformer])

### Options

#### Fields

- `preserveUnmatchedSyntax` (`boolean`, default: `false`) -
  whether to preserve the syntax of unmatched nodes.
- `convertEmphasisToRuby` (`object`) -
  whether to convert emphasis to ruby.
  - `enable` (`boolean`, default: `false`)
  - `character` (`string`, default: `•`) - Use the given string as emphasis character.

## Syntax tree

This project turns [kkast][] (kakuyomu novel) into [pxast][] (pixiv novel).

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
[typescript]: https://www.typescriptlang.org
[unified-processor]: https://github.com/unifiedjs/unified#processor
[unified-transformer-ecosystem]: https://github.com/unifiedjs/unified#transforming-between-ecosystems
[unified-transformer]: https://github.com/unifiedjs/unified#transformer
[unified]: https://github.com/unifiedjs/unified
