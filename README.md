# `unified-pixiv`

[![LICENSE][license-badge]][license]

[unified][unified] packages for [pixiv novel][pixiv-novel].

## Packages

- [pxast](./packages/pxast)
- [repixe-parse](./packages/repixe-parse)
- [repixe-stringify](./packages/repixe-stringify)

## Development

This package requires yarn v3+ and [workspace-tools][yarn-workspace-tools].

```shell
corepack prepare yarn@stable --activate
# in repo
yarn plugin import workspace-tools
```

## License

[MIT][license]

<!-- Link Definitions-->

[license-badge]: https://img.shields.io/github/license/RShirohara/unified-pixiv
[license]: ./LICENSE
[pixiv-novel]: https://www.pixiv.net/novel/
[unified]: https://github.com/unifiedjs/unified/
[yarn-workspace-tools]: https://github.com/yarnpkg/berry/blob/HEAD/packages/plugin-workspace-tools/README.md
