# Changelog

## [2.0.0-alpha.3](https://github.com/Eliav2/zenstack/compare/v2.0.0-alpha.2...v2.0.0-alpha.3) (2024-07-17)


### Features

* a better "zod" plugin ([#521](https://github.com/Eliav2/zenstack/issues/521)) ([2280f83](https://github.com/Eliav2/zenstack/commit/2280f83cd7f1f597fddfd6ab0c99417200124452))
* add "loadPath" options to runtime API and server adapter options ([#696](https://github.com/Eliav2/zenstack/issues/696)) ([fc50deb](https://github.com/Eliav2/zenstack/commit/fc50deb6e70acc78dcb66b17e564a6fc84475970))
* add `check` hooks generation to tanstack and swr plugins ([#1422](https://github.com/Eliav2/zenstack/issues/1422)) ([1030770](https://github.com/Eliav2/zenstack/commit/10307700c53bb015423b3125c3cdebe05dbc3821))
* allow to use custom fetch with generated hooks ([#556](https://github.com/Eliav2/zenstack/issues/556)) ([2a6b31a](https://github.com/Eliav2/zenstack/commit/2a6b31a29c71a786a27a0ddda5c64f8c973c7739))
* always use superjson to serialize/deserialize in the api layer ([#585](https://github.com/Eliav2/zenstack/issues/585)) ([46fec66](https://github.com/Eliav2/zenstack/commit/46fec666c3af971010c69e467f08f55830655441))
* improved automatic query invalidation for tanstack-query ([#790](https://github.com/Eliav2/zenstack/issues/790)) ([42d654f](https://github.com/Eliav2/zenstack/commit/42d654fcfaa40b09fde578db79792c69e1e3b908))
* infinite query for swr plugin ([#680](https://github.com/Eliav2/zenstack/issues/680)) ([757ccb5](https://github.com/Eliav2/zenstack/commit/757ccb54cbaecf2274159b83b256cfa46a517f89))
* make parameters of transactions configurable ([#988](https://github.com/Eliav2/zenstack/issues/988)) ([d0745b1](https://github.com/Eliav2/zenstack/commit/d0745b149a5ce6abfef546de0b9243ddc4f6e765))
* optimistic update support for SWR ([#860](https://github.com/Eliav2/zenstack/issues/860)) ([0ca4670](https://github.com/Eliav2/zenstack/commit/0ca46704f4c02b7d3e69470c68601835f426da59))
* support Prisma v5 ([#587](https://github.com/Eliav2/zenstack/issues/587)) ([b0d9154](https://github.com/Eliav2/zenstack/commit/b0d9154270a89c6c93c7a8f1aada85c413d16d6f))


### Bug Fixes

* add "exports" to generated package.json, make trpc code-gen compatible with vite ([#677](https://github.com/Eliav2/zenstack/issues/677)) ([df67f30](https://github.com/Eliav2/zenstack/commit/df67f301119db23e5048464de2f73bff1a2adffc))
* add `CheckSelect` type into code for Prisma version backward compatibility ([#619](https://github.com/Eliav2/zenstack/issues/619)) ([3e09a3a](https://github.com/Eliav2/zenstack/commit/3e09a3a6646ae0f6e393cc0f92991c9b5d0c4d29))
* avoid importing prisma-related code into language server ([#1441](https://github.com/Eliav2/zenstack/issues/1441)) ([b22c6a3](https://github.com/Eliav2/zenstack/commit/b22c6a3ce238ec766d910f23e83aea4e8f10c05d))
* bugs related to model name casing ([#645](https://github.com/Eliav2/zenstack/issues/645)) ([32d5b26](https://github.com/Eliav2/zenstack/commit/32d5b262cacdd03209a56027e4c2cbda1bc408c0))
* build, lint and etc. ([#833](https://github.com/Eliav2/zenstack/issues/833)) ([cccbc3c](https://github.com/Eliav2/zenstack/commit/cccbc3c82ad522d40bc76ad7b84b1305d378b1db))
* change back to loading from literal ".zenstack" path otherwise Vercel breaks :( ([#701](https://github.com/Eliav2/zenstack/issues/701)) ([2d41a9f](https://github.com/Eliav2/zenstack/commit/2d41a9fcffab2fa228356a5cc45b4c2ecd62fd63))
* clean up zod generation ([#883](https://github.com/Eliav2/zenstack/issues/883)) ([909281f](https://github.com/Eliav2/zenstack/commit/909281f8090734322c0cab09d0187b6b5e813c9a))
* clean up zod generation ([#883](https://github.com/Eliav2/zenstack/issues/883)) ([9d4a8ed](https://github.com/Eliav2/zenstack/commit/9d4a8ede7d42d1966fd5a12d64a5992092f4bc7d))
* compatibility with Prisma's "omit" feature ([#1432](https://github.com/Eliav2/zenstack/issues/1432)) ([296ca25](https://github.com/Eliav2/zenstack/commit/296ca259c8dd3e38fa988378df4a9e351a11b20b))
* enhanced client doesn't work with client extensions that add new model methods ([#851](https://github.com/Eliav2/zenstack/issues/851)) ([ea564c9](https://github.com/Eliav2/zenstack/commit/ea564c93e9ca2a888c0e53216633d66c733f6beb))
* generate both cjs and esm builds for swr plugin ([#892](https://github.com/Eliav2/zenstack/issues/892)) ([385839f](https://github.com/Eliav2/zenstack/commit/385839f101941234c5293d70d07e064c1c458387))
* hooks generation emits Provider export for backward compatibility ([#594](https://github.com/Eliav2/zenstack/issues/594)) ([ca3ebda](https://github.com/Eliav2/zenstack/commit/ca3ebdae4e213d3901bb5834fd9ebf1217da94a7))
* improve consistency of generated guard code ([#616](https://github.com/Eliav2/zenstack/issues/616)) ([1b7b5bd](https://github.com/Eliav2/zenstack/commit/1b7b5bda3f5106d31b7f5e70be27158fb8217600))
* incorrect cross-model comparision for && and || expressions ([#1512](https://github.com/Eliav2/zenstack/issues/1512)) ([908048b](https://github.com/Eliav2/zenstack/commit/908048b01430ff6552e8df558d5b5905136ea5cc))
* incorrect relation owner analysis ([#610](https://github.com/Eliav2/zenstack/issues/610)) ([c89012b](https://github.com/Eliav2/zenstack/commit/c89012bcb8d32588cc7f5a1df19088292e571cec))
* incorrect reverse query built for to-many relation ([#815](https://github.com/Eliav2/zenstack/issues/815)) ([2c345e1](https://github.com/Eliav2/zenstack/commit/2c345e1d4fe7274b7a08c1178afccede1d694327))
* infinite recursion when injecting field selection for field-level permission check ([#1452](https://github.com/Eliav2/zenstack/issues/1452)) ([29962e0](https://github.com/Eliav2/zenstack/commit/29962e0b48a73ae6d42f43f2575048ba9cf6a953))
* issue [#627](https://github.com/Eliav2/zenstack/issues/627) ([#628](https://github.com/Eliav2/zenstack/issues/628)) ([2ef93cb](https://github.com/Eliav2/zenstack/commit/2ef93cb932e7aed6923cd3d7e69069d0c9ff161b))
* issue 961, incorrect policy injection for nested `updateMany` ([#962](https://github.com/Eliav2/zenstack/issues/962)) ([2b2bfcf](https://github.com/Eliav2/zenstack/commit/2b2bfcff965f9a70ff2764e6fbc7613b6f061685))
* issues with cross-model comparison identification and injection ([#1508](https://github.com/Eliav2/zenstack/issues/1508)) ([665f9b3](https://github.com/Eliav2/zenstack/commit/665f9b33b58acc5170c4ccb8e73be525fbb89734))
* lint issue in generated swr/tanstack hooks ([#877](https://github.com/Eliav2/zenstack/issues/877)) ([4577232](https://github.com/Eliav2/zenstack/commit/45772326c7980f5338452d4048c43f76a6b09bf0))
* make sure Buffer is imported ([#596](https://github.com/Eliav2/zenstack/issues/596)) ([76a0bac](https://github.com/Eliav2/zenstack/commit/76a0bac9c63707baf34a072e398b63156c1e0640))
* make sure zod schemas have type annotations ([#574](https://github.com/Eliav2/zenstack/issues/574)) ([51985b1](https://github.com/Eliav2/zenstack/commit/51985b1279dca8e82a7275330a7b6597f37d15a4))
* nullify field instead of reject when an optional relation field is not readable ([#588](https://github.com/Eliav2/zenstack/issues/588)) ([fc16008](https://github.com/Eliav2/zenstack/commit/fc16008ba20aba18f39948f3ff13ec3bc79729e3))
* optimize generated trpc typing and fix "select" issue ([#972](https://github.com/Eliav2/zenstack/issues/972)) ([c0d60a0](https://github.com/Eliav2/zenstack/commit/c0d60a00eac9392cb061927126a41a5287467289))
* post-update rules incorrectly reject update ([#826](https://github.com/Eliav2/zenstack/issues/826)) ([d921a7c](https://github.com/Eliav2/zenstack/commit/d921a7ca6bef0341ccf5bc50e195156695129e7f))
* post-update rules incorrectly reject update ([#826](https://github.com/Eliav2/zenstack/issues/826)) ([e85831e](https://github.com/Eliav2/zenstack/commit/e85831e98d08a433febb5a8fecf8d539150ced08))
* properly handle nullable fields in openapi generator ([#906](https://github.com/Eliav2/zenstack/issues/906)) ([0e422ad](https://github.com/Eliav2/zenstack/commit/0e422adf1a7f274b850eeba09ef1781b13ce9f1b))
* **runtime:** always use id fields to address existing entity during upsert ([#1273](https://github.com/Eliav2/zenstack/issues/1273)) ([d8c1513](https://github.com/Eliav2/zenstack/commit/d8c15135a7edb75b459b6f5f1736e5fa2d96a9fa))
* support for custom prisma client output path ([#514](https://github.com/Eliav2/zenstack/issues/514)) ([5f3669e](https://github.com/Eliav2/zenstack/commit/5f3669e53363bbfb035f100d0c6e2d14cef69c24))
* supports for complex usage of "@[@index](https://github.com/index)" in zmodel ([#995](https://github.com/Eliav2/zenstack/issues/995)) ([541cd97](https://github.com/Eliav2/zenstack/commit/541cd973081cbbf2d9e2e571ee8f971bc859150c))
* swr hooks support no revalidation ([#871](https://github.com/Eliav2/zenstack/issues/871)) ([673bdd3](https://github.com/Eliav2/zenstack/commit/673bdd3a4d54db72cdb0561669801b7be633c904))
* **tanstack,swr:** create/upsert hooks shouldn't be generated for delegate models ([#1567](https://github.com/Eliav2/zenstack/issues/1567)) ([814d64e](https://github.com/Eliav2/zenstack/commit/814d64e653aa561fc383ec8f50407c8a6cf209b5))
* **tanstack:** incorrect InfiniteData import for vue-query ([#1498](https://github.com/Eliav2/zenstack/issues/1498)) ([92f187f](https://github.com/Eliav2/zenstack/commit/92f187f9190517df5baca795f12386c12c6694e9))
* vscode language accidentally bundles prisma packages  ([#625](https://github.com/Eliav2/zenstack/issues/625)) ([f6b68da](https://github.com/Eliav2/zenstack/commit/f6b68dabc9e089230bc6d8f8e802e8fbc43a8a69))

## [2.0.0-alpha.2](https://github.com/zenstackhq/zenstack/compare/v2.0.0-alpha.1...v2.0.0-alpha.2) (2024-02-21)


### Miscellaneous Chores

* release 2.0.0-alpha.2 ([f40d7e3](https://github.com/zenstackhq/zenstack/commit/f40d7e3718d4210137a2e131d28b5491d065b914))
