# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.3.1](https://github.com/RShirohara/unified-webnovel/compare/@rshirohara/repixe-parse@0.3.0...@rshirohara/repixe-parse@0.3.1) (2024-12-01)

### Build System

* **deps-dev:** bump peggy from 4.0.3 to 4.1.1 in the peggy group ([#354](https://github.com/RShirohara/unified-webnovel/issues/354)) ([f02ff8e](https://github.com/RShirohara/unified-webnovel/commit/f02ff8e9591e59f64307695f4d274f3ce91b370a))
* **deps-dev:** bump peggy from 4.1.1 to 4.2.0 in the peggy group ([#366](https://github.com/RShirohara/unified-webnovel/issues/366)) ([df606d0](https://github.com/RShirohara/unified-webnovel/commit/df606d0d73a868570d3d9a1b36c53ff1cd994d1d))

## [0.3.0](https://github.com/RShirohara/unified-webnovel/compare/@rshirohara/repixe-parse@0.2.4...@rshirohara/repixe-parse@0.3.0) (2024-10-27)

### ⚠ BREAKING CHANGES

* replace `PageHeading` to `PageBreak` in pxast (#329)

### Features

* replace `PageHeading` to `PageBreak` in pxast ([#329](https://github.com/RShirohara/unified-webnovel/issues/329)) ([cb9c913](https://github.com/RShirohara/unified-webnovel/commit/cb9c91302a24d994cc136017842303d5fdd4819c))

### Bug Fixes

* url characters pattern in `PhrasingContent/Link` for repixe ([#344](https://github.com/RShirohara/unified-webnovel/issues/344)) ([b0082d3](https://github.com/RShirohara/unified-webnovel/commit/b0082d35e3ed1164474b4c753d180c0917cb0263)), closes [#343](https://github.com/RShirohara/unified-webnovel/issues/343)

### Code Refactoring

* rewrite parser for repixe-parse ([#341](https://github.com/RShirohara/unified-webnovel/issues/341)) ([bcf2948](https://github.com/RShirohara/unified-webnovel/commit/bcf29480598bd0e08a4f7f714d75eabdb7924414))

## [0.2.4](https://github.com/RShirohara/unified-webnovel/compare/@rshirohara/repixe-parse@0.2.3...@rshirohara/repixe-parse@0.2.4) (2024-09-08)

* build(deps): bump unified from 11.0.4 to 11.0.5 (#308) ([2c675ee](https://github.com/RShirohara/unified-webnovel/commit/2c675ee)), closes [#308](https://github.com/RShirohara/unified-webnovel/issues/308)

## [0.2.3](https://github.com/RShirohara/unified-webnovel/compare/@rshirohara/repixe-parse@0.2.2...@rshirohara/repixe-parse@0.2.3) (2024-04-14)

### Documents

* fix package description and keyword ([#284](https://github.com/RShirohara/unified-webnovel/issues/284)) ([5772405](https://github.com/RShirohara/unified-webnovel/commit/5772405051d050e8e7a6f9fbf2e03c6b88304e54))

## [0.2.2](https://github.com/RShirohara/unified-webnovel/compare/@rshirohara/repixe-parse@0.2.1...@rshirohara/repixe-parse@0.2.2) (2024-04-09)

### Documents

* maintenance documents ([#268](https://github.com/RShirohara/unified-webnovel/issues/268)) ([a255d67](https://github.com/RShirohara/unified-webnovel/commit/a255d67a6bf5e94af9d5daf0d62c074bc0d6a5e3))

### Code Refactoring

* fix some issues ([#281](https://github.com/RShirohara/unified-webnovel/issues/281)) ([97e0d91](https://github.com/RShirohara/unified-webnovel/commit/97e0d9136b0e310dedad44e581ba70eea6d23e30))

### Build System

* remove items related to local development environment from `package.json` ([#269](https://github.com/RShirohara/unified-webnovel/issues/269)) ([399de86](https://github.com/RShirohara/unified-webnovel/commit/399de869f96a624d023e574e94a83754261b03a2))

## [0.2.1](https://github.com/RShirohara/unified-webnovel/compare/@rshirohara/repixe-parse@0.2.0...@rshirohara/repixe-parse@0.2.1) (2024-02-25)

### Build System

* fix section to be deleted by clean-package ([#260](https://github.com/RShirohara/unified-webnovel/issues/260)) ([a7b8c84](https://github.com/RShirohara/unified-webnovel/commit/a7b8c840872ac99be29995da743100d7be68281a))

## [0.2.0](https://github.com/RShirohara/unified-webnovel/compare/@rshirohara/repixe-parse@0.1.5...@rshirohara/repixe-parse@0.2.0) (2024-02-25)

### ⚠ BREAKING CHANGES

* definition of pxast content model stored in other phrasing content (#131)
* drop Node.js v16 support (#158)

### Code Refactoring

* fix code reported by biome ([#244](https://github.com/RShirohara/unified-webnovel/issues/244)) ([59900d0](https://github.com/RShirohara/unified-webnovel/commit/59900d08e01e4d6ce25cdb5da2e5ab85b18e8129)), closes [#190](https://github.com/RShirohara/unified-webnovel/issues/190)

### Build System

* **deps:** bump unified from 10.1.2 to 11.0.2 ([#120](https://github.com/RShirohara/unified-webnovel/issues/120)) ([667a622](https://github.com/RShirohara/unified-webnovel/commit/667a622f090052bc3ba6242a35b353b2cb80bca9))
* **deps:** bump unified from 11.0.2 to 11.0.3 ([#134](https://github.com/RShirohara/unified-webnovel/issues/134)) ([bca6c3c](https://github.com/RShirohara/unified-webnovel/commit/bca6c3c31fe473160d726a6e9f0c74fcc6526cc7))
* **deps:** bump unified from 11.0.3 to 11.0.4 ([#179](https://github.com/RShirohara/unified-webnovel/issues/179)) ([47eb58f](https://github.com/RShirohara/unified-webnovel/commit/47eb58f337a54ba6a91e684ce7efbef173dd2e88))
* drop Node.js v16 support ([#158](https://github.com/RShirohara/unified-webnovel/issues/158)) ([c1c87c8](https://github.com/RShirohara/unified-webnovel/commit/c1c87c89416c1a212e13d1b8efb494819e65a8f0))
* use `*.ts` files with exports. ([#220](https://github.com/RShirohara/unified-webnovel/issues/220)) ([e1a4784](https://github.com/RShirohara/unified-webnovel/commit/e1a478402b68331636da1fc9c46cb9274004ba87)), closes [#191](https://github.com/RShirohara/unified-webnovel/issues/191)

## [0.1.5](https://github.com/RShirohara/unified-webnovel/compare/@rshirohara/repixe-parse@0.1.4...@rshirohara/repixe-parse@0.1.5) (2023-08-06)

**Note:** Version bump only for package @rshirohara/repixe-parse

## [0.1.4](https://github.com/RShirohara/unified-webnovel/compare/@rshirohara/repixe-parse@0.1.3...@rshirohara/repixe-parse@0.1.4) (2023-08-06)

### Documents

* fix format ([#90](https://github.com/RShirohara/unified-webnovel/issues/90)) ([bc319ab](https://github.com/RShirohara/unified-webnovel/commit/bc319ab1cee362593f36fb2b823aa73d169c23c5))
* fix typo and format ([#88](https://github.com/RShirohara/unified-webnovel/issues/88)) ([5110c3c](https://github.com/RShirohara/unified-webnovel/commit/5110c3cc0c175a3efccfe5b857f7ef3016fa802c))

## [0.1.3](https://github.com/RShirohara/unified-webnovel/compare/@rshirohara/repixe-parse@0.1.2...@rshirohara/repixe-parse@0.1.3) (2023-07-31)

**Note:** Version bump only for package @rshirohara/repixe-parse

## [0.1.2](https://github.com/RShirohara/unified-webnovel/compare/@rshirohara/repixe-parse@0.1.1...@rshirohara/repixe-parse@0.1.2) (2023-07-31)

### Code Refactoring

* fix eslint errors ([#80](https://github.com/RShirohara/unified-webnovel/issues/80)) ([0712e57](https://github.com/RShirohara/unified-webnovel/commit/0712e5783d97f5ff044b22e575a85632feae3ffd))

### Build System

* **deps-dev:** bump typescript from 5.1.3 to 5.1.6 ([#49](https://github.com/RShirohara/unified-webnovel/issues/49)) ([f5bf3d9](https://github.com/RShirohara/unified-webnovel/commit/f5bf3d9ad316501e09d48b4df19f4da778c00567))
* **deps-dev:** bump typescript-eslint to v6 ([#77](https://github.com/RShirohara/unified-webnovel/issues/77)) ([1057e67](https://github.com/RShirohara/unified-webnovel/commit/1057e67b7430bf0fdf3bf75d7ea9615e48826ca4))

## [0.1.1](https://github.com/RShirohara/unified-webnovel/compare/@rshirohara/repixe-parse@0.1.0...@rshirohara/repixe-parse@0.1.1) (2023-06-20)

**Note:** Version bump only for package @rshirohara/repixe-parse
