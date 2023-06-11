# repixe-stringify

[![LICENSE][license-badge]][license]

**repixe** plugin to add support for serializing pixiv novel format.

## Contents

## What is this?

This package is a [unified][unified] plugin that defines how to take a syntax tree as input and turn it into selialized [pixiv-novel format text][pixiv-novel].

## Install

**Working**.

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).
in Node.js (16.0+), Install with npm[npm]:

```shell
npm install @rshirohara/repixe-stringify
```

## Use

**Working**.

## API

### `unified().use(repixeStringify)`

Add support for serializing pixiv-novel format input.
There are no options.

## Syntax

**Working**.

## Syntax tree

The syntax tree format used in repixe is [pxast][pxast].

## Types

This package is fully typed with [TypeScript][typescript]. There are no extra exported types.

## License

[MIT][license]

<!-- Link Definitions -->

[license-badge]: https://img.shields.io/github/license/RShirohara/unified-pixiv
[license]: ./LICENSE
[npm]: https://docs.npmjs.com/cli/install
[pixiv-novel]: https://www.pixiv.net/novel/
[pxast]: https://github.com/RShirohara/unified-pixiv/tree/main/packages/pxast
[typescript]: https://www.typescriptlang.org
[unified]: https://github.com/unifiedjs/unified/
