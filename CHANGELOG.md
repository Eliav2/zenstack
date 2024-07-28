# Changelog

## [2.0.0-alpha.2](https://github.com/Eliav2/zenstack/compare/v2.0.0-alpha.1...v2.0.0-alpha.2) (2024-07-28)


### Features

* a better "zod" plugin ([#521](https://github.com/Eliav2/zenstack/issues/521)) ([2280f83](https://github.com/Eliav2/zenstack/commit/2280f83cd7f1f597fddfd6ab0c99417200124452))
* add "loadPath" options to runtime API and server adapter options ([#696](https://github.com/Eliav2/zenstack/issues/696)) ([fc50deb](https://github.com/Eliav2/zenstack/commit/fc50deb6e70acc78dcb66b17e564a6fc84475970))
* add @[@auth](https://github.com/auth) option for declaring auth model ([#787](https://github.com/Eliav2/zenstack/issues/787)) ([c390de1](https://github.com/Eliav2/zenstack/commit/c390de10cfa91ae3f954404bc07e0905973b0898))
* add `check` hooks generation to tanstack and swr plugins ([#1422](https://github.com/Eliav2/zenstack/issues/1422)) ([1030770](https://github.com/Eliav2/zenstack/commit/10307700c53bb015423b3125c3cdebe05dbc3821))
* add support for comparing fields in the same model ([#631](https://github.com/Eliav2/zenstack/issues/631)) ([4776685](https://github.com/Eliav2/zenstack/commit/477668579e3d95e7371ca752244ad2e319a96477))
* add switch to zod plugin to control whether unchecked input types are generated ([#693](https://github.com/Eliav2/zenstack/issues/693)) ([cea2019](https://github.com/Eliav2/zenstack/commit/cea2019aee4f27ff4bf12677906a48daa91aa854))
* add zenstack CLI repl command ([#808](https://github.com/Eliav2/zenstack/issues/808)) ([616be65](https://github.com/Eliav2/zenstack/commit/616be65c3b8362be8a2cca2fa3abb77f8d0fe947))
* allow comparing fields from different models in mutation policies ([#1476](https://github.com/Eliav2/zenstack/issues/1476)) ([6610bd0](https://github.com/Eliav2/zenstack/commit/6610bd09f8d43b62b073044bb60a8a3cc40ef9e2))
* allow specifying zmodel location in package.json ([#879](https://github.com/Eliav2/zenstack/issues/879)) ([bb149bd](https://github.com/Eliav2/zenstack/commit/bb149bd22e820a9ba5a6c5325d1a330a7c495c71))
* allow to pass in a custom `Prisma` module when calling `enhance` ([#1160](https://github.com/Eliav2/zenstack/issues/1160)) ([018d59f](https://github.com/Eliav2/zenstack/commit/018d59f58295cee4530b9650c49dc868251029dd))
* allow to use custom fetch with generated hooks ([#556](https://github.com/Eliav2/zenstack/issues/556)) ([2a6b31a](https://github.com/Eliav2/zenstack/commit/2a6b31a29c71a786a27a0ddda5c64f8c973c7739))
* allow users to import from node_modules ([#1021](https://github.com/Eliav2/zenstack/issues/1021)) ([f8f214d](https://github.com/Eliav2/zenstack/commit/f8f214d8d22919d49de17e648b3c1f98ab98b507))
* always use superjson to serialize/deserialize in the api layer ([#585](https://github.com/Eliav2/zenstack/issues/585)) ([46fec66](https://github.com/Eliav2/zenstack/commit/46fec666c3af971010c69e467f08f55830655441))
* automatic optimistic update for tanstack hooks ([#830](https://github.com/Eliav2/zenstack/issues/830)) ([93dc7df](https://github.com/Eliav2/zenstack/commit/93dc7df472427a4546ba71ec3703135d2d638ded))
* CLI improvements ([#694](https://github.com/Eliav2/zenstack/issues/694)) ([eba3390](https://github.com/Eliav2/zenstack/commit/eba3390b3b40af3ac4c71fd92cea983ae310fb74))
* field-level access control ([#638](https://github.com/Eliav2/zenstack/issues/638)) ([9a6f39b](https://github.com/Eliav2/zenstack/commit/9a6f39bdb8940f7cef89fd7ee423658b8ed4c49f))
* field-level policy override ([#889](https://github.com/Eliav2/zenstack/issues/889)) ([271d568](https://github.com/Eliav2/zenstack/commit/271d568ad3695e85f216ad7a293d9b9e802e7aaa))
* flexible 'createRouter' typings ([#654](https://github.com/Eliav2/zenstack/issues/654)) ([e147412](https://github.com/Eliav2/zenstack/commit/e14741231b37ef1430fa8a02446f5748a76a02d7))
* fluent API support ([#666](https://github.com/Eliav2/zenstack/issues/666)) ([4ae5a96](https://github.com/Eliav2/zenstack/commit/4ae5a96ee2976dedbdb0b207f48c082c48b3f9ce))
* implement relation check() function in ZModel ([#1556](https://github.com/Eliav2/zenstack/issues/1556)) ([be82307](https://github.com/Eliav2/zenstack/commit/be8230715cfc5b2a83f378645146a0c0e9222491))
* implementing access control for Prisma Pulse ([#643](https://github.com/Eliav2/zenstack/issues/643)) ([d8c2e87](https://github.com/Eliav2/zenstack/commit/d8c2e8717e5fd3facb177443c8ef1baec89a81d5))
* implementing permission checker ([#1411](https://github.com/Eliav2/zenstack/issues/1411)) ([0aa6ee9](https://github.com/Eliav2/zenstack/commit/0aa6ee961bab005705287184b670ae9a3a57f06d))
* improved automatic query invalidation for tanstack-query ([#790](https://github.com/Eliav2/zenstack/issues/790)) ([42d654f](https://github.com/Eliav2/zenstack/commit/42d654fcfaa40b09fde578db79792c69e1e3b908))
* include raw zod errors in response ([#691](https://github.com/Eliav2/zenstack/issues/691)) ([b5da998](https://github.com/Eliav2/zenstack/commit/b5da998b7fa11c19b85cebd0956803d854332b4d))
* infinite query for swr plugin ([#680](https://github.com/Eliav2/zenstack/issues/680)) ([757ccb5](https://github.com/Eliav2/zenstack/commit/757ccb54cbaecf2274159b83b256cfa46a517f89))
* infinite query support for tanstack-query ([#679](https://github.com/Eliav2/zenstack/issues/679)) ([3300499](https://github.com/Eliav2/zenstack/commit/330049949bfce7e8d463d7be8f1c8653df10203a))
* JetBrains plugin for ZModel ([#904](https://github.com/Eliav2/zenstack/issues/904)) ([c79be9e](https://github.com/Eliav2/zenstack/commit/c79be9eb7f6b602bc84214bded2b927935b6273a))
* make parameters of transactions configurable ([#988](https://github.com/Eliav2/zenstack/issues/988)) ([d0745b1](https://github.com/Eliav2/zenstack/commit/d0745b149a5ce6abfef546de0b9243ddc4f6e765))
* Make ZModel color schema looks cool and consistent ([#791](https://github.com/Eliav2/zenstack/issues/791)) ([6dabb02](https://github.com/Eliav2/zenstack/commit/6dabb02dfa76e58b7538ea38d9d9a0ff27d3609d)), closes [#716](https://github.com/Eliav2/zenstack/issues/716)
* more flexible "createRouter" typings ([#651](https://github.com/Eliav2/zenstack/issues/651)) ([d2bffb6](https://github.com/Eliav2/zenstack/commit/d2bffb62d48a550937ebe3c147f55b6fab55f172))
* **nestjs:** Add prop as optional parameter of getEnhancedPrisma [#1537](https://github.com/Eliav2/zenstack/issues/1537) ([#1538](https://github.com/Eliav2/zenstack/issues/1538)) ([4672875](https://github.com/Eliav2/zenstack/commit/46728754d9da71c71f7eb9fc53ecbaf559bf7438))
* Nuxt server adapter and tanstack-query for "vue" hooks generation ([#757](https://github.com/Eliav2/zenstack/issues/757)) ([033d95d](https://github.com/Eliav2/zenstack/commit/033d95dcdeef67bc8183d1daeb3172ec9ee02b9b))
* optimistic update support for SWR ([#860](https://github.com/Eliav2/zenstack/issues/860)) ([0ca4670](https://github.com/Eliav2/zenstack/commit/0ca46704f4c02b7d3e69470c68601835f426da59))
* RedwoodJS integration package ([#911](https://github.com/Eliav2/zenstack/issues/911)) ([e4aeee3](https://github.com/Eliav2/zenstack/commit/e4aeee32ae3a5ab1718fd1daa2f93043fb68a8d5))
* runtime support for custom `@[@auth](https://github.com/auth)` model ([#793](https://github.com/Eliav2/zenstack/issues/793)) ([08b9677](https://github.com/Eliav2/zenstack/commit/08b967735c938de1e770a2409c36c5a50173b01d))
* **runtime:** support for Prisma 5.14's `createManyAndReturn` ([#1479](https://github.com/Eliav2/zenstack/issues/1479)) ([a783800](https://github.com/Eliav2/zenstack/commit/a7838000ba509db6191c7ed93329eaaa02325692))
* support configuring what models to include for zod and trpc plugins ([#747](https://github.com/Eliav2/zenstack/issues/747)) ([a5d15a3](https://github.com/Eliav2/zenstack/commit/a5d15a30e7a22a3e875cc974391feb9ad6da7646))
* Support multiple levels inheritance ([#863](https://github.com/Eliav2/zenstack/issues/863)) ([2d43692](https://github.com/Eliav2/zenstack/commit/2d43692e591e2aaa48539991128846fc4a6a8b1c))
* support Prisma v5 ([#587](https://github.com/Eliav2/zenstack/issues/587)) ([b0d9154](https://github.com/Eliav2/zenstack/commit/b0d9154270a89c6c93c7a8f1aada85c413d16d6f))
* support Prisma view ([#579](https://github.com/Eliav2/zenstack/issues/579)) ([af151b7](https://github.com/Eliav2/zenstack/commit/af151b7b311ee96b626376b8a17103b18c261f65))
* support using collection predicate expression with `auth()` ([#831](https://github.com/Eliav2/zenstack/issues/831)) ([ff1e8a5](https://github.com/Eliav2/zenstack/commit/ff1e8a5e98ec94337f08576a29ffbee07ba8fd88))
* Support ZModel format command in CLI ([#869](https://github.com/Eliav2/zenstack/issues/869)) ([bf85ceb](https://github.com/Eliav2/zenstack/commit/bf85ceb3ef84ca68a6c370c6d6349af1edb79428))
* tanstack-query v5 support ([#788](https://github.com/Eliav2/zenstack/issues/788)) ([0d04d8e](https://github.com/Eliav2/zenstack/commit/0d04d8e6dabd66ee06e98971cb4e1007c4ecd466))


### Bug Fixes

* '[@password](https://github.com/password)' attribute doesn't work well with data validation ([#1547](https://github.com/Eliav2/zenstack/issues/1547)) ([9294f04](https://github.com/Eliav2/zenstack/commit/9294f04d4f0befba586e2f20a088707090724080))
* [@omit](https://github.com/omit) doesn't remove fields inside to-many relation ([#993](https://github.com/Eliav2/zenstack/issues/993)) ([a4d3f15](https://github.com/Eliav2/zenstack/commit/a4d3f15746269257bc7fb56332766e3f598e2996))
* [ZModelCodeGenerator] Remove the extra space between the collection predicate operator ([#839](https://github.com/Eliav2/zenstack/issues/839)) ([9a0895b](https://github.com/Eliav2/zenstack/commit/9a0895bedd82b429ddcc45db4cee0f9e82c54198))
* `@[@validate](https://github.com/validate)` should ignore fields that are not present ([#1104](https://github.com/Eliav2/zenstack/issues/1104)) ([79ef57a](https://github.com/Eliav2/zenstack/commit/79ef57a67cbdf3b015c92f607d86543a4a169bcb))
* `createManyAndReturn` doesn't work  for polymorphic models ([#1590](https://github.com/Eliav2/zenstack/issues/1590)) ([8438e2b](https://github.com/Eliav2/zenstack/commit/8438e2b4f7e1517d0f0f0682c5b400559afd66d6))
* add "exports" to generated package.json, make trpc code-gen compatible with vite ([#677](https://github.com/Eliav2/zenstack/issues/677)) ([df67f30](https://github.com/Eliav2/zenstack/commit/df67f301119db23e5048464de2f73bff1a2adffc))
* add "interactiveTransactions" preview features for lower version of Prisma ([#569](https://github.com/Eliav2/zenstack/issues/569)) ([bd5666a](https://github.com/Eliav2/zenstack/commit/bd5666ae03110392e0fc578e37c6fcddba9cf50d))
* add `CheckSelect` type into code for Prisma version backward compatibility ([#619](https://github.com/Eliav2/zenstack/issues/619)) ([3e09a3a](https://github.com/Eliav2/zenstack/commit/3e09a3a6646ae0f6e393cc0f92991c9b5d0c4d29))
* add enum import to zod generation ([#528](https://github.com/Eliav2/zenstack/issues/528)) ([2a4b5cc](https://github.com/Eliav2/zenstack/commit/2a4b5cc328645387a604f2fdf7c8855804306243))
* add eslint ignore to generated trpc helper source ([#759](https://github.com/Eliav2/zenstack/issues/759)) ([f7e8a08](https://github.com/Eliav2/zenstack/commit/f7e8a08987da4f6af3ad5058209cdc22720dce8f))
* add IntField as a valid mapping to TinyInt ([#822](https://github.com/Eliav2/zenstack/issues/822)) ([db9cc7f](https://github.com/Eliav2/zenstack/commit/db9cc7f4e5028ac0342a8df9993260d134f37d18))
* add missing "/runtime" exports to tanstack-query ([#688](https://github.com/Eliav2/zenstack/issues/688)) ([a3064dc](https://github.com/Eliav2/zenstack/commit/a3064dc2ce9319977a01844fd0aac40bb92be7d9))
* add missing auth export ([#1449](https://github.com/Eliav2/zenstack/issues/1449)) ([81a2adf](https://github.com/Eliav2/zenstack/commit/81a2adfe43c958ffe1645d24bcfb119a3daf8edd))
* add missing exports for the generated .zenstack package ([#760](https://github.com/Eliav2/zenstack/issues/760)) ([8ac0915](https://github.com/Eliav2/zenstack/commit/8ac091574892d14edb66baf447f8ea6c5f4907ba))
* add missing MSSQL related stdlib declarations and parameters ([#748](https://github.com/Eliav2/zenstack/issues/748)) ([4e6531e](https://github.com/Eliav2/zenstack/commit/4e6531ece28650844e9baad25d0d49395bfe931b))
* add package.json exports ([#597](https://github.com/Eliav2/zenstack/issues/597)) ([8ccfc93](https://github.com/Eliav2/zenstack/commit/8ccfc93ba8135ced89754fbd912a02fe11962a53))
* add the missing "count" schema/router for zod/trpc ([#667](https://github.com/Eliav2/zenstack/issues/667)) ([6e9a3b3](https://github.com/Eliav2/zenstack/commit/6e9a3b3ce4f306716234a9598e4aac3c89e1e0be))
* additional fixes and tests related to cross-model field comparison ([#1496](https://github.com/Eliav2/zenstack/issues/1496)) ([28c2bc8](https://github.com/Eliav2/zenstack/commit/28c2bc89314ed1e0a49f069e170ac230ee36d874))
* additional fixes for unique constraint conflict detection ([#1165](https://github.com/Eliav2/zenstack/issues/1165)) ([9f89c7e](https://github.com/Eliav2/zenstack/commit/9f89c7ea76adfa73406843e3c2f222ea0bfcb969))
* allow "view" and "import" as identifier ([#750](https://github.com/Eliav2/zenstack/issues/750)) ([2e15dfb](https://github.com/Eliav2/zenstack/commit/2e15dfb747fa871a5b25661e3e320a1a5f3cc92a))
* allow empty expr for dbgenerated() ([#1400](https://github.com/Eliav2/zenstack/issues/1400)) ([#1401](https://github.com/Eliav2/zenstack/issues/1401)) ([4e61a8b](https://github.com/Eliav2/zenstack/commit/4e61a8b5c41195420c5bcb08a7ff2489a1ed9155))
* allow models without field declarations ([#749](https://github.com/Eliav2/zenstack/issues/749)) ([43322e1](https://github.com/Eliav2/zenstack/commit/43322e111adfc7d888aa8dc04445a5b0f8c2dbcc))
* auth() cannot be resolved if the auth model is marked @[@ignore](https://github.com/ignore) ([#844](https://github.com/Eliav2/zenstack/issues/844)) ([73f2cec](https://github.com/Eliav2/zenstack/commit/73f2cec82fea64cea05f7306523f7c6f9ac91f84))
* Auto fix code generate to the wrong place for the imported module ([#1377](https://github.com/Eliav2/zenstack/issues/1377)) ([f6c6b65](https://github.com/Eliav2/zenstack/commit/f6c6b653c018c5cde0a0a8c38b441c48c200d172))
* automatically enable "@core/zod" plugin when there're validation rules ([#535](https://github.com/Eliav2/zenstack/issues/535)) ([0519421](https://github.com/Eliav2/zenstack/commit/05194219f28e49ee11d1a1bd9a78146e9b76eada))
* avoid generating error log when getting machine id ([#977](https://github.com/Eliav2/zenstack/issues/977)) ([c50e013](https://github.com/Eliav2/zenstack/commit/c50e01346030406c7d1433863a6b7da1914ecdaf))
* avoid importing prisma-related code into language server ([#1441](https://github.com/Eliav2/zenstack/issues/1441)) ([b22c6a3](https://github.com/Eliav2/zenstack/commit/b22c6a3ce238ec766d910f23e83aea4e8f10c05d))
* bug in enhancement proxy for detecting nested transactions ([#941](https://github.com/Eliav2/zenstack/issues/941)) ([85a0525](https://github.com/Eliav2/zenstack/commit/85a052594c447120ecc8123d30c7b098afcc8841))
* bug with NOT clause reduction when condition is an array ([#848](https://github.com/Eliav2/zenstack/issues/848)) ([debd35b](https://github.com/Eliav2/zenstack/commit/debd35b3531262c4df453653cbee10dc85baf222))
* bugs related to model name casing ([#645](https://github.com/Eliav2/zenstack/issues/645)) ([32d5b26](https://github.com/Eliav2/zenstack/commit/32d5b262cacdd03209a56027e4c2cbda1bc408c0))
* build, lint and etc. ([#833](https://github.com/Eliav2/zenstack/issues/833)) ([cccbc3c](https://github.com/Eliav2/zenstack/commit/cccbc3c82ad522d40bc76ad7b84b1305d378b1db))
* change back to loading from literal ".zenstack" path otherwise Vercel breaks :( ([#701](https://github.com/Eliav2/zenstack/issues/701)) ([2d41a9f](https://github.com/Eliav2/zenstack/commit/2d41a9fcffab2fa228356a5cc45b4c2ecd62fd63))
* clean up zod generation ([#883](https://github.com/Eliav2/zenstack/issues/883)) ([909281f](https://github.com/Eliav2/zenstack/commit/909281f8090734322c0cab09d0187b6b5e813c9a))
* clean up zod generation ([#883](https://github.com/Eliav2/zenstack/issues/883)) ([9d4a8ed](https://github.com/Eliav2/zenstack/commit/9d4a8ede7d42d1966fd5a12d64a5992092f4bc7d))
* client-extension test failures ([#874](https://github.com/Eliav2/zenstack/issues/874)) ([f2ab6a5](https://github.com/Eliav2/zenstack/commit/f2ab6a521195c4981fd89a5d4094e4130c5b336c))
* **cli:** generated TS typing for `auth()` access is too strong ([#1589](https://github.com/Eliav2/zenstack/issues/1589)) ([6439fd6](https://github.com/Eliav2/zenstack/commit/6439fd6c6b1621fc3504d54411b0e6bad254099f))
* **cli:** set timeout for latest version check and avoid failing the CLI ([#1559](https://github.com/Eliav2/zenstack/issues/1559)) ([df32680](https://github.com/Eliav2/zenstack/commit/df3268023be937746d042afddcd229d953ea85b7))
* compatibility with pnpm monorepo ([#1393](https://github.com/Eliav2/zenstack/issues/1393)) ([fc8d03d](https://github.com/Eliav2/zenstack/commit/fc8d03d97d0330df0f70d6cc690125e4d2162cff))
* compatibility with Prisma's "omit" feature ([#1432](https://github.com/Eliav2/zenstack/issues/1432)) ([296ca25](https://github.com/Eliav2/zenstack/commit/296ca259c8dd3e38fa988378df4a9e351a11b20b))
* condition error in zod generator ([#810](https://github.com/Eliav2/zenstack/issues/810)) ([eb6ef1f](https://github.com/Eliav2/zenstack/commit/eb6ef1f3e24988066d41cc16ad718d6379bfbfed))
* conditions hoisted from nested read overwrites toplevel where conditions ([#635](https://github.com/Eliav2/zenstack/issues/635)) ([9a35f88](https://github.com/Eliav2/zenstack/commit/9a35f88c059ff4e616d1f54b1e0e01c3c5ce6e19))
* cross-model field comparison validation issue ([#1509](https://github.com/Eliav2/zenstack/issues/1509)) ([9c7527f](https://github.com/Eliav2/zenstack/commit/9c7527f713ef549f7d631b21e63004a059d2d53d))
* deal with payload field value with undefined ([#778](https://github.com/Eliav2/zenstack/issues/778)) ([e41fc74](https://github.com/Eliav2/zenstack/commit/e41fc747c5a8389d820820c5f8fd95ee13717160))
* decimal field zod validation ([#660](https://github.com/Eliav2/zenstack/issues/660)) ([522df7a](https://github.com/Eliav2/zenstack/commit/522df7ac0d42aee1dbc29b42e8acfa431771bb3b))
* **delegate:** avoid merging into object of Decimal, Date, etc. ([#1489](https://github.com/Eliav2/zenstack/issues/1489)) ([ab9d27f](https://github.com/Eliav2/zenstack/commit/ab9d27f669388764139eb42caeef1bb9f19c7524))
* **delegate:** entity create fails when inheriting from a delegate model that extends an abstract model ([#1561](https://github.com/Eliav2/zenstack/issues/1561)) ([ac2b291](https://github.com/Eliav2/zenstack/commit/ac2b291bde3d0f66684784c7bc8694c027827319))
* **delegate:** fields from delegate models used in logical groups inside filter are not translated ([#1418](https://github.com/Eliav2/zenstack/issues/1418)) ([1243422](https://github.com/Eliav2/zenstack/commit/12434220a5328ec3885a35f7fc1481788fc536e2))
* **delegate:** generated logical prisma schema has errors when abstra… ([#1490](https://github.com/Eliav2/zenstack/issues/1490)) ([4c74169](https://github.com/Eliav2/zenstack/commit/4c74169aa78df818a92e3236e834ced83f38068d))
* **delegate:** make sure concrete fields are included when a polymorphic model field is included in deep nesting ([#1524](https://github.com/Eliav2/zenstack/issues/1524)) ([b34531d](https://github.com/Eliav2/zenstack/commit/b34531dcd47b875aae083d1a820aa896f3766c8b))
* **delegate:** make sure nested `createMany` is converted into regular `create` ([#1526](https://github.com/Eliav2/zenstack/issues/1526)) ([3e77974](https://github.com/Eliav2/zenstack/commit/3e77974c74cb33496d9568fa1d95727449e18522))
* **delegate:** null reference when reading an optional relation ([#1491](https://github.com/Eliav2/zenstack/issues/1491)) ([41880f3](https://github.com/Eliav2/zenstack/commit/41880f38d2ee71545aa2ce9f2e6ac8f5575c717d))
* **delegate:** push base-level id assignment to base payload when creating a concrete entity ([#1521](https://github.com/Eliav2/zenstack/issues/1521)) ([a14bf29](https://github.com/Eliav2/zenstack/commit/a14bf29de4d903c0a226a1604991dd760cbf8614))
* **delegate:** several generation issues ([#1417](https://github.com/Eliav2/zenstack/issues/1417)) ([153dd4f](https://github.com/Eliav2/zenstack/commit/153dd4f1e6db502f00ab33a5d92d59b64a766811))
* disable textmate bundle when JetBrains plugin is uninstalled ([#918](https://github.com/Eliav2/zenstack/issues/918)) ([7e9cc35](https://github.com/Eliav2/zenstack/commit/7e9cc35a68ed31e25e7c7eac764528f55a18ac7b))
* don't import unused enum when generating policy guards ([#686](https://github.com/Eliav2/zenstack/issues/686)) ([a5c110b](https://github.com/Eliav2/zenstack/commit/a5c110b41351d1d28cbe7f61264e04a890e752d8))
* duplicated zod schema imported when there're multiple fields with an enum type ([#633](https://github.com/Eliav2/zenstack/issues/633)) ([4b70853](https://github.com/Eliav2/zenstack/commit/4b70853868c8f456ed1fd3dd836f0f2e36ed3e11))
* enable auto completion inside attribute ([#949](https://github.com/Eliav2/zenstack/issues/949)) ([20d5bfc](https://github.com/Eliav2/zenstack/commit/20d5bfc506a42b520eb1cf390149b7afc7c38701))
* enhanced client doesn't work with client extensions that add new model methods ([7dec167](https://github.com/Eliav2/zenstack/commit/7dec167b8c3bb03c3cae57e6566b223bfce57cca))
* enhanced client doesn't work with client extensions that add new model methods ([#851](https://github.com/Eliav2/zenstack/issues/851)) ([ea564c9](https://github.com/Eliav2/zenstack/commit/ea564c93e9ca2a888c0e53216633d66c733f6beb))
* expression context check issue on initial loading ([#544](https://github.com/Eliav2/zenstack/issues/544)) ([05b5554](https://github.com/Eliav2/zenstack/commit/05b55541f3ae55214318db4f0de20b8ba97bb2f8))
* fastify plugin correctly returning the reply [#684](https://github.com/Eliav2/zenstack/issues/684) ([#685](https://github.com/Eliav2/zenstack/issues/685)) ([7a04ce5](https://github.com/Eliav2/zenstack/commit/7a04ce5ad0a208fb05887198b8b598742834a15b))
* field-level access is incorrectly rejected when there're no allow rules ([#1510](https://github.com/Eliav2/zenstack/issues/1510)) ([484b920](https://github.com/Eliav2/zenstack/commit/484b920b659618b64f78521715ff67501035c9ba))
* fix policy generation for collection predicate expressions ([#706](https://github.com/Eliav2/zenstack/issues/706)) ([b8a875e](https://github.com/Eliav2/zenstack/commit/b8a875e6be6ce6cba7d2683cf8f71b840444601a))
* fix the incorrect query args reduction when there're mixed boolean operators ([#690](https://github.com/Eliav2/zenstack/issues/690)) ([c0c5a16](https://github.com/Eliav2/zenstack/commit/c0c5a164c50c15c8d1982f331cbcac4eae5138b7))
* generate both cjs and esm builds for swr plugin ([#892](https://github.com/Eliav2/zenstack/issues/892)) ([385839f](https://github.com/Eliav2/zenstack/commit/385839f101941234c5293d70d07e064c1c458387))
* generate foreign key field in zod schemas ([#868](https://github.com/Eliav2/zenstack/issues/868)) ([124a0a2](https://github.com/Eliav2/zenstack/commit/124a0a2a15306022501f071beb855fe03de21aa3))
* generate suspense queries in tanstack-query plugin ([#996](https://github.com/Eliav2/zenstack/issues/996)) ([43eb615](https://github.com/Eliav2/zenstack/commit/43eb61508fbde4431831343566dd637dff7a6d49))
* handle foreign key field-level access check during relation update ([#847](https://github.com/Eliav2/zenstack/issues/847)) ([3c8cba7](https://github.com/Eliav2/zenstack/commit/3c8cba71b283d6029087971fc3b160892d0d143e))
* hooks generation emits Provider export for backward compatibility ([#594](https://github.com/Eliav2/zenstack/issues/594)) ([ca3ebda](https://github.com/Eliav2/zenstack/commit/ca3ebdae4e213d3901bb5834fd9ebf1217da94a7))
* improve binary & unary expression applicability check ([#589](https://github.com/Eliav2/zenstack/issues/589)) ([eb2d896](https://github.com/Eliav2/zenstack/commit/eb2d896b415f5426944960a58cca7d2f028bf581))
* improve consistency of generated guard code ([#616](https://github.com/Eliav2/zenstack/issues/616)) ([1b7b5bd](https://github.com/Eliav2/zenstack/commit/1b7b5bda3f5106d31b7f5e70be27158fb8217600))
* incorrect calculation of backlink field for self-relations ([#1540](https://github.com/Eliav2/zenstack/issues/1540)) ([303f103](https://github.com/Eliav2/zenstack/commit/303f103e0e541e3e7e64711b3731ff4b2555fe62))
* incorrect cross-model comparision for && and || expressions ([#1512](https://github.com/Eliav2/zenstack/issues/1512)) ([908048b](https://github.com/Eliav2/zenstack/commit/908048b01430ff6552e8df558d5b5905136ea5cc))
* incorrect policy injection for nested to-one relation inside a to-many parent ([#777](https://github.com/Eliav2/zenstack/issues/777)) ([876e013](https://github.com/Eliav2/zenstack/commit/876e01392112ed369cde37cb77ca983126f2d881))
* incorrect prisma query executed when count using a where filter involving a polymorphic base field ([#1586](https://github.com/Eliav2/zenstack/issues/1586)) ([3140d9b](https://github.com/Eliav2/zenstack/commit/3140d9bee91171665a8f1f69b8939a38643f9cb1))
* incorrect relation owner analysis ([bb64b8a](https://github.com/Eliav2/zenstack/commit/bb64b8a22c10032111d2c947c59e45e5995e6ed4))
* incorrect relation owner analysis ([#610](https://github.com/Eliav2/zenstack/issues/610)) ([c89012b](https://github.com/Eliav2/zenstack/commit/c89012bcb8d32588cc7f5a1df19088292e571cec))
* incorrect reverse query built for to-many relation ([d2ad3a5](https://github.com/Eliav2/zenstack/commit/d2ad3a59f93a74189c29d3ee2960fc887b14851c))
* incorrect reverse query built for to-many relation ([#815](https://github.com/Eliav2/zenstack/issues/815)) ([2c345e1](https://github.com/Eliav2/zenstack/commit/2c345e1d4fe7274b7a08c1178afccede1d694327))
* incorrect typing when Prisma client extension is used with logical client ([#1557](https://github.com/Eliav2/zenstack/issues/1557)) ([7f9e408](https://github.com/Eliav2/zenstack/commit/7f9e408d1c6a01e65237b942d2533dbc00ddafda))
* incorrect validation errors for abstract models with validation rules ([#991](https://github.com/Eliav2/zenstack/issues/991)) ([fa0dafb](https://github.com/Eliav2/zenstack/commit/fa0dafb98f2f9c034731f380ac190e048d0c0d3f))
* infinite recursion when injecting field selection for field-level permission check ([#1452](https://github.com/Eliav2/zenstack/issues/1452)) ([29962e0](https://github.com/Eliav2/zenstack/commit/29962e0b48a73ae6d42f43f2575048ba9cf6a953))
* invalid query sent to Prisma when doing nested update with multi-id ([#553](https://github.com/Eliav2/zenstack/issues/553)) ([24760be](https://github.com/Eliav2/zenstack/commit/24760be0f6286089c58df893ec1ae9c192ba17e2))
* issue [#627](https://github.com/Eliav2/zenstack/issues/627) ([#628](https://github.com/Eliav2/zenstack/issues/628)) ([2ef93cb](https://github.com/Eliav2/zenstack/commit/2ef93cb932e7aed6923cd3d7e69069d0c9ff161b))
* issue 599, throw error if the given user context doesn't contain full id fields ([#629](https://github.com/Eliav2/zenstack/issues/629)) ([4bc72a8](https://github.com/Eliav2/zenstack/commit/4bc72a8b93558059a80dc465dc408da33b0adba3))
* issue 961, incorrect policy injection for nested `updateMany` ([bf690a0](https://github.com/Eliav2/zenstack/commit/bf690a072771ab95907a8f56079c4f6aaf655849))
* issue 961, incorrect policy injection for nested `updateMany` ([#962](https://github.com/Eliav2/zenstack/issues/962)) ([2b2bfcf](https://github.com/Eliav2/zenstack/commit/2b2bfcff965f9a70ff2764e6fbc7613b6f061685))
* issue with client typing generation in trpc plugin ([#673](https://github.com/Eliav2/zenstack/issues/673)) ([576c4f7](https://github.com/Eliav2/zenstack/commit/576c4f7a4858dfa2dcb9c1a7f75af8d1ca48a8ce))
* issues with cross-model comparison identification and injection ([#1508](https://github.com/Eliav2/zenstack/issues/1508)) ([665f9b3](https://github.com/Eliav2/zenstack/commit/665f9b33b58acc5170c4ccb8e73be525fbb89734))
* lint issue in generated swr/tanstack hooks ([#877](https://github.com/Eliav2/zenstack/issues/877)) ([4577232](https://github.com/Eliav2/zenstack/commit/45772326c7980f5338452d4048c43f76a6b09bf0))
* make sure Buffer is imported ([#596](https://github.com/Eliav2/zenstack/issues/596)) ([76a0bac](https://github.com/Eliav2/zenstack/commit/76a0bac9c63707baf34a072e398b63156c1e0640))
* make sure fields inherited from  abstract base models are properly recognized as id ([#1130](https://github.com/Eliav2/zenstack/issues/1130)) ([4d9d093](https://github.com/Eliav2/zenstack/commit/4d9d09338ae88eac331ec06ec908ca1256f5b8a5))
* make sure zod schemas have type annotations ([#574](https://github.com/Eliav2/zenstack/issues/574)) ([51985b1](https://github.com/Eliav2/zenstack/commit/51985b1279dca8e82a7275330a7b6597f37d15a4))
* model meta generator doesn't correctly identify relation names ([#1244](https://github.com/Eliav2/zenstack/issues/1244)) ([4c7fbd4](https://github.com/Eliav2/zenstack/commit/4c7fbd480214f1e2508fc9a520c571f6274dce8f))
* more precise Zod refinement types ([#678](https://github.com/Eliav2/zenstack/issues/678)) ([1564fe3](https://github.com/Eliav2/zenstack/commit/1564fe3a72cfafd73702d6d092a53b685d681686))
* nested `createMany` with `skipDuplicates` option is not handled correctly ([#1163](https://github.com/Eliav2/zenstack/issues/1163)) ([fef6e83](https://github.com/Eliav2/zenstack/commit/fef6e83a36f451f671ac2b7db1bc06e2e29faf43))
* nullify field instead of reject when an optional relation field is not readable ([#588](https://github.com/Eliav2/zenstack/issues/588)) ([fc16008](https://github.com/Eliav2/zenstack/commit/fc16008ba20aba18f39948f3ff13ec3bc79729e3))
* number literal precision issue ([#659](https://github.com/Eliav2/zenstack/issues/659)) ([6275701](https://github.com/Eliav2/zenstack/commit/627570166f858488aa7fb6a6291fccfadb0d9f9f))
* openapi - do not generate "id" field in create input if the field has default value ([#758](https://github.com/Eliav2/zenstack/issues/758)) ([787a244](https://github.com/Eliav2/zenstack/commit/787a24453c3a32250260ebc138c26a829074ae8f))
* **openapi:** `CreateManyArgs` does not take array as input ([#1246](https://github.com/Eliav2/zenstack/issues/1246)) ([8137481](https://github.com/Eliav2/zenstack/commit/813748160e35913f5b26b79b81886ab9ddb02070))
* optimize generated trpc typing and fix "select" issue ([#972](https://github.com/Eliav2/zenstack/issues/972)) ([c0d60a0](https://github.com/Eliav2/zenstack/commit/c0d60a00eac9392cb061927126a41a5287467289))
* optimize the way how generated packages are loaded in test environment ([#549](https://github.com/Eliav2/zenstack/issues/549)) ([18267f6](https://github.com/Eliav2/zenstack/commit/18267f6377a926cc332bedab6cf74e8a9b9f2343))
* **plugins/prisma:** add missing enum value documentations in generated prisma schema ([#1390](https://github.com/Eliav2/zenstack/issues/1390)) ([ef22b70](https://github.com/Eliav2/zenstack/commit/ef22b7063ddc9fe7006e68dbd750f4d373606b0e))
* policy compilation error for deeply nested post-update rules ([#1382](https://github.com/Eliav2/zenstack/issues/1382)) ([08471d5](https://github.com/Eliav2/zenstack/commit/08471d5e0932bf696e8b6929c4490f191710060d))
* policy generation error when field-level rules contain "this" expression ([#670](https://github.com/Eliav2/zenstack/issues/670)) ([dc106a9](https://github.com/Eliav2/zenstack/commit/dc106a905f732c90c70f7622df5a1207b442e1ff))
* Policy generator error for Auth() with multiple level member access ([#922](https://github.com/Eliav2/zenstack/issues/922)) ([ecf0c19](https://github.com/Eliav2/zenstack/commit/ecf0c1975403a2b8b70300140b92518cbc34a886))
* policy generator fails on Windows for custom output path ([#583](https://github.com/Eliav2/zenstack/issues/583)) ([32c7279](https://github.com/Eliav2/zenstack/commit/32c727934456127470a53ed13ad65d33ff94e97d))
* **policy:** field-level override rules don't work properly with non-optional to-one relations ([#1592](https://github.com/Eliav2/zenstack/issues/1592)) ([050f760](https://github.com/Eliav2/zenstack/commit/050f7600f59c7d9e02e18cfe25545ae737c2bdba))
* **policy:** properly handle array-form of upsert payload ([#1101](https://github.com/Eliav2/zenstack/issues/1101)) ([e7e1873](https://github.com/Eliav2/zenstack/commit/e7e1873744ac2d48e118ae48b23e10723d16db44))
* **policy:** relation filter should respect field-level policies ([#1495](https://github.com/Eliav2/zenstack/issues/1495)) ([54e1e02](https://github.com/Eliav2/zenstack/commit/54e1e02839c4f010e21fa50c48289f872d8ae0eb))
* polymorphic logical Prisma schema has identifiers with too long names ([#1482](https://github.com/Eliav2/zenstack/issues/1482)) ([65443f8](https://github.com/Eliav2/zenstack/commit/65443f854718c6080f6bd68f7776a326d8790c1a))
* post-update rule for id field is not effective if id is updated ([#1237](https://github.com/Eliav2/zenstack/issues/1237)) ([5fe85ff](https://github.com/Eliav2/zenstack/commit/5fe85ffa50d012c65db542602448d5522b71ef9b))
* post-update rules incorrectly reject update ([#826](https://github.com/Eliav2/zenstack/issues/826)) ([d921a7c](https://github.com/Eliav2/zenstack/commit/d921a7ca6bef0341ccf5bc50e195156695129e7f))
* post-update rules incorrectly reject update ([#826](https://github.com/Eliav2/zenstack/issues/826)) ([e85831e](https://github.com/Eliav2/zenstack/commit/e85831e98d08a433febb5a8fecf8d539150ced08))
* prisma schema generation issue with calling attribute function with literal ([#930](https://github.com/Eliav2/zenstack/issues/930)) ([91fe8e7](https://github.com/Eliav2/zenstack/commit/91fe8e71b513804de36d08b03c37b0c175580906))
* properly handle missing fields when evaluating `@[@validate](https://github.com/validate)` model-level rules ([#1097](https://github.com/Eliav2/zenstack/issues/1097)) ([e8268d0](https://github.com/Eliav2/zenstack/commit/e8268d03ae12f3ccbcf1bb1c531a2816b22f6da8))
* properly handle nullable fields in openapi generator ([#906](https://github.com/Eliav2/zenstack/issues/906)) ([0e422ad](https://github.com/Eliav2/zenstack/commit/0e422adf1a7f274b850eeba09ef1781b13ce9f1b))
* query injection error when create (in array form) is nested inside an update ([#865](https://github.com/Eliav2/zenstack/issues/865)) ([ca55bf6](https://github.com/Eliav2/zenstack/commit/ca55bf61edff7a67765cd8a9eac2b97daaf33506))
* reference resolution issue inside collection predicate expressions ([#927](https://github.com/Eliav2/zenstack/issues/927)) ([d8dce13](https://github.com/Eliav2/zenstack/commit/d8dce13505e5753aa646fc3aa168da754b75e8aa))
* relation fields are included even if they are set `false` in select clause ([#1429](https://github.com/Eliav2/zenstack/issues/1429)) ([6a71742](https://github.com/Eliav2/zenstack/commit/6a717428d3d0176eb3651b488fe0660895dab14d))
* remove warning in vercel environment ([#954](https://github.com/Eliav2/zenstack/issues/954)) ([0aa69d9](https://github.com/Eliav2/zenstack/commit/0aa69d987d8a2eb60800d7ff76347ebf078b70f6))
* repl in pnpm environment, improve relative path module loading ([#866](https://github.com/Eliav2/zenstack/issues/866)) ([e7d29fd](https://github.com/Eliav2/zenstack/commit/e7d29fda6e80bee46c9e05ff5a2af5266478b9ad))
* report validation error when binary expressions have arrays ([#719](https://github.com/Eliav2/zenstack/issues/719)) ([2e9fe67](https://github.com/Eliav2/zenstack/commit/2e9fe67cf8e247bae7838417dd567de94adac39e))
* require with default ([#546](https://github.com/Eliav2/zenstack/issues/546)) ([1e9fe1c](https://github.com/Eliav2/zenstack/commit/1e9fe1cfcf50b691bf788021b8a460b1f3ecb29e))
* resolve member access expr only in the context of operand type ([#761](https://github.com/Eliav2/zenstack/issues/761)) ([ccae413](https://github.com/Eliav2/zenstack/commit/ccae413418d7f8259068e2668bdb8fdafb7305b6))
* **runtime:** always use id fields to address existing entity during upsert ([#1273](https://github.com/Eliav2/zenstack/issues/1273)) ([d8c1513](https://github.com/Eliav2/zenstack/commit/d8c15135a7edb75b459b6f5f1736e5fa2d96a9fa))
* **runtime:** avoid duplicating non-plain objects ([#1545](https://github.com/Eliav2/zenstack/issues/1545)) ([ba2a113](https://github.com/Eliav2/zenstack/commit/ba2a113126bad4f2719e60b0a6b23df4125a562d))
* should not reject "update" when there's only field-level override but no model-level policy ([#1052](https://github.com/Eliav2/zenstack/issues/1052)) ([912c831](https://github.com/Eliav2/zenstack/commit/912c83176a57ae2e2397c0aab68c0299a6115025))
* Show the correct incomplete error for multiple level inheritance  ([#916](https://github.com/Eliav2/zenstack/issues/916)) ([b71c1c5](https://github.com/Eliav2/zenstack/commit/b71c1c53983f77bcfe8f40a1f931547499c9d4ff))
* Show validation error for the field comparison not in the same model ([#912](https://github.com/Eliav2/zenstack/issues/912)) ([8d5bfe4](https://github.com/Eliav2/zenstack/commit/8d5bfe402e2219b69520dbd0b820c9f3ba16a2ea))
* stricter binary operation operand type compatibility check ([#846](https://github.com/Eliav2/zenstack/issues/846)) ([03315cc](https://github.com/Eliav2/zenstack/commit/03315cc9dfe19e5bf23b23178cba2dfbce89686e))
* support default values in generated zod schemas ([#914](https://github.com/Eliav2/zenstack/issues/914)) ([0f73e56](https://github.com/Eliav2/zenstack/commit/0f73e569b496da1dbedff61e1846af3b2bdc2b03))
* support for custom prisma client output path ([#514](https://github.com/Eliav2/zenstack/issues/514)) ([5f3669e](https://github.com/Eliav2/zenstack/commit/5f3669e53363bbfb035f100d0c6e2d14cef69c24))
* support for Prisma 5.16.0 ([#1541](https://github.com/Eliav2/zenstack/issues/1541)) ([0a293ca](https://github.com/Eliav2/zenstack/commit/0a293ca0afebee621848463e05408a39dfa934e2))
* support for string escaping in ZModel ([#668](https://github.com/Eliav2/zenstack/issues/668)) ([f034839](https://github.com/Eliav2/zenstack/commit/f034839867fa438da866bd87548b4a18246dee21))
* support loading plugin.zmodel from a relative path ([#837](https://github.com/Eliav2/zenstack/issues/837)) ([66ab915](https://github.com/Eliav2/zenstack/commit/66ab915dc152259e74d12e12d23a95eea310ec86))
* support postgres extensions ([#718](https://github.com/Eliav2/zenstack/issues/718)) ([cdc98e0](https://github.com/Eliav2/zenstack/commit/cdc98e08224a23ea3f6e5d620c11c90a34ed6435))
* support string literal keys for object expressions in ZModel ([#752](https://github.com/Eliav2/zenstack/issues/752)) ([22b1bf9](https://github.com/Eliav2/zenstack/commit/22b1bf9ddd4062000f2cd7d183e004dd3d5917c6))
* supporting using type names as reference target as well ([d17a85c](https://github.com/Eliav2/zenstack/commit/d17a85c1020d616085e7957816c17d7481894169))
* supports for complex usage of "@[@index](https://github.com/index)" in zmodel ([#995](https://github.com/Eliav2/zenstack/issues/995)) ([541cd97](https://github.com/Eliav2/zenstack/commit/541cd973081cbbf2d9e2e571ee8f971bc859150c))
* swr hooks support no revalidation ([#871](https://github.com/Eliav2/zenstack/issues/871)) ([673bdd3](https://github.com/Eliav2/zenstack/commit/673bdd3a4d54db72cdb0561669801b7be633c904))
* tanstack-query build issues and bugs in optimistic update ([#843](https://github.com/Eliav2/zenstack/issues/843)) ([08d317d](https://github.com/Eliav2/zenstack/commit/08d317d150b99fc38b8e5fb56bb4ab27fe1b4470))
* tanstack-query, fix the incorrect query typing when user provides a custom selector ([#967](https://github.com/Eliav2/zenstack/issues/967)) ([cc98e30](https://github.com/Eliav2/zenstack/commit/cc98e306559d7729d96d4ed77cda2815454fbb8f))
* **tanstack,swr:** create/upsert hooks shouldn't be generated for delegate models ([#1567](https://github.com/Eliav2/zenstack/issues/1567)) ([814d64e](https://github.com/Eliav2/zenstack/commit/814d64e653aa561fc383ec8f50407c8a6cf209b5))
* **tanstack:** improve typing of mutation errors ([#1066](https://github.com/Eliav2/zenstack/issues/1066)) ([a01065c](https://github.com/Eliav2/zenstack/commit/a01065c0aa791d6591776b908f3e1e3c4d21424b))
* **tanstack:** incorrect InfiniteData import for vue-query ([#1498](https://github.com/Eliav2/zenstack/issues/1498)) ([92f187f](https://github.com/Eliav2/zenstack/commit/92f187f9190517df5baca795f12386c12c6694e9))
* **tanstack:** incorrect typing for svelte query hooks ([#1492](https://github.com/Eliav2/zenstack/issues/1492)) ([ed5133c](https://github.com/Eliav2/zenstack/commit/ed5133c0e8df96764a765c462863c0f9f3fb5735))
* **tanstack:** incorrect vue-query options typing for vue-query v5 ([#1565](https://github.com/Eliav2/zenstack/issues/1565)) ([a4efa6e](https://github.com/Eliav2/zenstack/commit/a4efa6e3fef670572e7abd284eb9a6071734007c))
* **tanstack:** infinite query typing issues ([#1480](https://github.com/Eliav2/zenstack/issues/1480)) ([e158372](https://github.com/Eliav2/zenstack/commit/e15837285e6bb6de0bd229d3c81bb5e0e21d9e9f))
* **tanstack:** make sure vue-query hooks' input is reactive ([#1185](https://github.com/Eliav2/zenstack/issues/1185)) ([f259d73](https://github.com/Eliav2/zenstack/commit/f259d733b88b5bb310d49f0af8c3b78e4822c6bb))
* trpc client helper bugs ([#532](https://github.com/Eliav2/zenstack/issues/532)) ([4097915](https://github.com/Eliav2/zenstack/commit/40979154c88d31d3891c361caf4ab16a4888b178))
* **trpc:** create/upsert routers shouldn't be generated for delegate models ([#1566](https://github.com/Eliav2/zenstack/issues/1566)) ([4f56c15](https://github.com/Eliav2/zenstack/commit/4f56c156fb95528ea9f60a04a4264f81489a5978))
* **trpc:** make sure "import type" is used for type-only imports ([#1425](https://github.com/Eliav2/zenstack/issues/1425)) ([3b38311](https://github.com/Eliav2/zenstack/commit/3b38311e049761c226791224afab07fae21edd1f))
* **trpc:** temp workaround for Node.js importing from CJS module issue ([#1436](https://github.com/Eliav2/zenstack/issues/1436)) ([d2709f6](https://github.com/Eliav2/zenstack/commit/d2709f6a597c91015985188d435d26c799d514d1))
* typing generated for options parameter in the hooks method ([#946](https://github.com/Eliav2/zenstack/issues/946)) ([acb23d1](https://github.com/Eliav2/zenstack/commit/acb23d1d1e3f5ff1ce3452971ac7103c6a38326c))
* typing of policy definition ([#640](https://github.com/Eliav2/zenstack/issues/640)) ([acd0753](https://github.com/Eliav2/zenstack/commit/acd075392a2237e12ef88a55f13de701e172f57d))
* update rule check for connect with implicit many-to-many relation ([#565](https://github.com/Eliav2/zenstack/issues/565)) ([ffdad27](https://github.com/Eliav2/zenstack/commit/ffdad2713e71071b53ac3fd13b82b38673d7b6f6))
* use zod parse result data as mutation input ([#997](https://github.com/Eliav2/zenstack/issues/997)) ([613ac8d](https://github.com/Eliav2/zenstack/commit/613ac8d2cd638272bcc7b24e0fb96e60c0d43acc))
* validate zod schema before update operation is executed ([#1051](https://github.com/Eliav2/zenstack/issues/1051)) ([9db52db](https://github.com/Eliav2/zenstack/commit/9db52dbb77650d7c99380308803b7b4b4b7ae42d))
* Validation error when @[@unique](https://github.com/unique) attribute is defined in the different model of the relation field ([#1430](https://github.com/Eliav2/zenstack/issues/1430)) ([23a9bbb](https://github.com/Eliav2/zenstack/commit/23a9bbbae4febd7fe74718201fe14fde582b9d0c))
* Validation errors when using true or false as prefix of id ([#530](https://github.com/Eliav2/zenstack/issues/530)) ([551b33d](https://github.com/Eliav2/zenstack/commit/551b33d8bec622e445b5635ae4a147774c91c0fe))
* VsCode error textDocument/codeAction failed ([#915](https://github.com/Eliav2/zenstack/issues/915)) ([3afe42f](https://github.com/Eliav2/zenstack/commit/3afe42f9b0b1fda4dfbe18d359824d0f4829fc3b))
* vscode language accidentally bundles prisma packages  ([#625](https://github.com/Eliav2/zenstack/issues/625)) ([f6b68da](https://github.com/Eliav2/zenstack/commit/f6b68dabc9e089230bc6d8f8e802e8fbc43a8a69))
* vscode language accidentally bundles prisma packages ([#623](https://github.com/Eliav2/zenstack/issues/623)) ([a81913e](https://github.com/Eliav2/zenstack/commit/a81913e69d3533874c038279d1d4d226ad685d8d))
* **vscode:** language server error when formatting models with `Unsupported` fields ([#1558](https://github.com/Eliav2/zenstack/issues/1558)) ([b46743b](https://github.com/Eliav2/zenstack/commit/b46743b26706767401764c86014fa44b6a5c76b3))
* **vscode:** more robustly handle VSCode document URI ([#1376](https://github.com/Eliav2/zenstack/issues/1376)) ([5cc8f18](https://github.com/Eliav2/zenstack/commit/5cc8f186409b3b50ede1a5f435ab990f500f4e91))
* vue-query typing issue ([#1009](https://github.com/Eliav2/zenstack/issues/1009)) ([b2e1635](https://github.com/Eliav2/zenstack/commit/b2e1635cb1857afebde286a0c077c0f561d0bbec))
* when field policy only has deny rule, access should be allowed when the rule doesn't satisfy ([#818](https://github.com/Eliav2/zenstack/issues/818)) ([62a8200](https://github.com/Eliav2/zenstack/commit/62a82001cde1c8e0ac598035b8df77b9049fabaa))
* wrong payload injected for nested create in update ([#715](https://github.com/Eliav2/zenstack/issues/715)) ([d8f0954](https://github.com/Eliav2/zenstack/commit/d8f0954fc15b6ea3df033a7c5fea414ff4aba8c9))
* zenstack cli errors while using bun/bunx during docker build ([#1011](https://github.com/Eliav2/zenstack/issues/1011)) ([0704f9d](https://github.com/Eliav2/zenstack/commit/0704f9db945fc922746ecd480ae833fd64415784))
* zenstack generate fails when path contains space ([#845](https://github.com/Eliav2/zenstack/issues/845)) ([e99ad2c](https://github.com/Eliav2/zenstack/commit/e99ad2cdd495251e15abc47172aa37814f55c7b4))
* Zmodel linker doesn't recursively visit base types when building resolution scopes ([#992](https://github.com/Eliav2/zenstack/issues/992)) ([da33881](https://github.com/Eliav2/zenstack/commit/da3388190020041965ff104a346f932a8d32b59d))
* **zmodel:** allow type names to be used as declaration names ([#1424](https://github.com/Eliav2/zenstack/issues/1424)) ([5806a4d](https://github.com/Eliav2/zenstack/commit/5806a4dc4585293e1da746bdc1485c54d7e993b7))
* **zmodel:** check optionality consistency between relation and fk fields ([#1053](https://github.com/Eliav2/zenstack/issues/1053)) ([583520e](https://github.com/Eliav2/zenstack/commit/583520e5dce1d898becf3da9553c6faf08db6343))
* **zmodel:** enum is resolved to wrong element after merging base models ([#1437](https://github.com/Eliav2/zenstack/issues/1437)) ([6852958](https://github.com/Eliav2/zenstack/commit/68529580028dfcfce50cb9af78a9b67d72e2a6a5))
* **zmodel:** fix grammar ambiguity ([#1433](https://github.com/Eliav2/zenstack/issues/1433)) ([2c7c82b](https://github.com/Eliav2/zenstack/commit/2c7c82b29f54a7df4752aa74dfcda2c8f0a69a24))
* **zmodel:** resolve `auth()` from all loaded and reachable documents ([#1428](https://github.com/Eliav2/zenstack/issues/1428)) ([cb50826](https://github.com/Eliav2/zenstack/commit/cb508260c3dd1c91f5223685b2703e16c8a7a8ed))
* zod and openapi generation error when "fullTextSearch" is enabled ([#658](https://github.com/Eliav2/zenstack/issues/658)) ([0cb7cd1](https://github.com/Eliav2/zenstack/commit/0cb7cd1ae5e8c5d4a72d0891c9624291aafcbcd8))
* zod schema compilation errors in pnpm environment due to peer dependencies ([#568](https://github.com/Eliav2/zenstack/issues/568)) ([858b075](https://github.com/Eliav2/zenstack/commit/858b075ca193ae26673aaefc052cc7c029a26c08))
* **zod:** add coercion call when generating schema for DateTime field ([#1068](https://github.com/Eliav2/zenstack/issues/1068)) ([b60627c](https://github.com/Eliav2/zenstack/commit/b60627c167706728ac232ce06366d914e3dde23f))
* **zod:** createMany types shouldn't be generated when Prisma version doesn't support it ([#1434](https://github.com/Eliav2/zenstack/issues/1434)) ([273c107](https://github.com/Eliav2/zenstack/commit/273c10701e3e646468997a050da1233a77e2a5ad))
* **zod:** generate optional field as `z.optional()` rather than `z.nullish()` to be consistent with Prisma's typing ([#1426](https://github.com/Eliav2/zenstack/issues/1426)) ([bca13a7](https://github.com/Eliav2/zenstack/commit/bca13a715b2eec530c2371e2b3df191670c37c9d))
* **zod:** support `[@default](https://github.com/default)` for `BigInt` values ([#1486](https://github.com/Eliav2/zenstack/issues/1486)) ([ba636c8](https://github.com/Eliav2/zenstack/commit/ba636c88b7e0bccdb7dc517e3edc3a6e25a28aaa))

## 0.5.0 (2022-12-15)

### Features

-   Serialization between client (hooks) and server now uses [superjson](https://github.com/blitz-js/superjson), [[#139](https://github.com/zenstackhq/zenstack/issues/139)]

### Fixes and improvements

-   Fixed goto definition issue in VSCode extension, [[#69](https://github.com/zenstackhq/zenstack/issues/69)]

### Breaking changes

-   Next-auth adapter and helper are moved to a separate package `@zenstackhq/next-auth`.

## 0.4.0 (2022-12-01)

### Features

-   `zenstack init` command for initializing a project, [#109](https://github.com/zenstackhq/zenstack/issues/109), [doc](https://zenstack.dev/#/quick-start?id=adding-to-an-existing-project).

-   Field constraint suport, [#94](https://github.com/zenstackhq/zenstack/issues/94), [doc](https://zenstack.dev/#/zmodel-field-constraint).

-   Support for server-side CRUD with access policy check (SSR), [#126](https://github.com/zenstackhq/zenstack/issues/126), [doc](https://zenstack.dev/#/server-side-rendering).

-   Options for disabling fetching in hooks (useful when arguments are not ready), [#57](https://github.com/zenstackhq/zenstack/issues/57), [doc](https://zenstack.dev/#/runtime-api?id=requestoptions).

-   Telemetry in CLI, [#102](https://github.com/zenstackhq/zenstack/issues/102), [doc](https://zenstack.dev/#/telemetry).

-   Iron-session based starter, [#95](https://github.com/zenstackhq/zenstack/issues/95), [link](https://github.com/zenstackhq/nextjs-iron-session-starter).

-   Barebone starter (without authentication), [link](https://github.com/zenstackhq/nextjs-barebone-starter).

-   [Website](https://zenstack.dev) is live!

### Fixes and improvements

-   Merge `@zenstackhq/internal` into `@zenstackhq/runtime` so as to have a single runtime dependency, [#70](https://github.com/zenstackhq/zenstack/issues/70).

-   More accurate log for access policy violation, [#71](https://github.com/zenstackhq/zenstack/issues/71).

-   `auth()` function's return type is now resolved to `User` model in ZModel, instead of `Any`, [#65](https://github.com/zenstackhq/zenstack/issues/65).

-   Improved ZModel type checking, [#67](https://github.com/zenstackhq/zenstack/issues/67), [#46](https://github.com/zenstackhq/zenstack/issues/46), [#99](https://github.com/zenstackhq/zenstack/issues/99).

-   Upgraded to Prisma 4.7.

### Breaking changes

-   @zenstackhq/runtime doesn't export anything now.

    Use @zenstackhq/runtime/types for type definitions shared between client and server, @zenstackhq/runtime/client for client-specific libaries (like React hooks), and @zenstackhq/runtime/server for server-specific libraries.

## 0.3.0 (2022-11-08)

### Features

-   `@password` and `@omit` attribute support

-   Configurable logging (to stdout and emitting as events)

### Fixes and improvements

-   More robust policy checks

-   Properly handles complex types like BigInt, Date, Decimal, etc.

-   Makes sure Prisma schema is regenerated for related CLI commands

-   Lower VSCode engine version requirement for the extension

-   Better overall documentation

## 0.2.0 (2022-10-29)

### Features

-   `ZModel` data modeling schema (an extension to [Prisma Schema](https://www.prisma.io/docs/concepts/components/prisma-schema))

-   `zenstack` cli for generating RESTful services, auth adapters and React hooks from `ZModel`

-   Policy engine that transforms policy rules into Prisma query conditions

-   Runtime packages

-   An initial set of tests
