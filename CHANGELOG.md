# Changelog

## [1.5.0](https://github.com/EPFL-ENAC/resslab-astra_82001/compare/v1.4.1...v1.5.0) (2025-01-23)

### Features

- add clipboard copy functionality with notifications and internationalization support [DESIGN] New Mockups - Design improvements [#36](https://github.com/EPFL-ENAC/resslab-astra_82001/issues/36) ([ed1c57c](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/ed1c57c6c37a5906da5d912843b9e7c2edc311b2))
- add getObjectiveLongitudinalSpan function and update getLongitudinalAlpha to use it Presenting of results. [#41](https://github.com/EPFL-ENAC/resslab-astra_82001/issues/41) ([4b1fe67](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/4b1fe6760ddd3832a1648dde47c05a1670d563c8))
- add internationalization support for data version and download references in MainLayout [#36](https://github.com/EPFL-ENAC/resslab-astra_82001/issues/36) ([d92e84c](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/d92e84c4812fcdee878132030367177037148296))
- add missing back data point ([75cb077](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/75cb077c5a07537d5723e94c2aeccc27bc5cadf5))
- add new SVG icons and update references in components for improved UI consistency ([4d6f181](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/4d6f181478078b896083f56ab9ba736c845e31e6))
- add new SVG icons for copy-paste, info, and CSV in multiple color variants ([56f5eb3](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/56f5eb3bd2041a58e1fb8b85081634d4f1adc6fc))
- add user-select mixin to prevent text selection in various components ([7cf41b7](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/7cf41b7ca62287794bca83470d0d9adf0e3998ec))
- add utility function to round numbers to two decimal places ([eb4d46f](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/eb4d46f65012b2c7201606d740983b47e655f5a6))
- dynamic value ([c33e300](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/c33e300cfd5d1d0c755f429e727a4258d849146f))
- enhance transversal verification logic with improved span handling and interpolation methods [#22](https://github.com/EPFL-ENAC/resslab-astra_82001/issues/22) ([d58cd54](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/d58cd541749cf8f7d35828e4a40d3ae931843ce8))
- **i18n:** add new translations and improve UI components for better user experience closes [#36](https://github.com/EPFL-ENAC/resslab-astra_82001/issues/36) ([1d7cd06](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/1d7cd064d395f7f5d540e48abd11e3bf1cd32d87))
- **i18n:** add tooltips for improved user guidance in various components [#43](https://github.com/EPFL-ENAC/resslab-astra_82001/issues/43) ([5a97544](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/5a975441d93546c3db9ae6ec2d1f200566a4c40a))
- **interpolation:** complete slab support type q-btn-toggle [#22](https://github.com/EPFL-ENAC/resslab-astra_82001/issues/22) ([4a01e81](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/4a01e8143c55bd00b90d87b4b1d630da1dbefbab))
- **interpolation:** correct slab interpolation with highest value [#22](https://github.com/EPFL-ENAC/resslab-astra_82001/issues/22) ([00c01d2](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/00c01d2bcce7c637fad93daa1605caa8583bca2c))
- refactor linear interpolation logic and clean up unused variables ([2b0b1f4](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/2b0b1f4381c5df51f5ec1fdedaf34da080835dac))
- refactor transversal span handling with computed properties and validation in verification store [#22](https://github.com/EPFL-ENAC/resslab-astra_82001/issues/22) ([94a2d3f](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/94a2d3f05919691f3b07893c1d97fe7fe0fbde14))
- remove deprecated Info.buttons.csv file to streamline data management, it was merged into data.csv ([74a5283](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/74a52833c1b98784f9db98c0b92fc69035c31d4e))
- update roundCeilWith2Decimals to return 'N/A' for undefined values [#41](https://github.com/EPFL-ENAC/resslab-astra_82001/issues/41) ([8f9534b](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/8f9534b422b7ff51b7434d518e1a2e080314563f))
- **wip:** add tooltips and icons for download buttons in MainLayout component ([db56c44](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/db56c443843c11c93b59f699e09fc3f127a0a3fb))

### Bug Fixes

- add TODO for updating span and width calculations based on bridge type ([b252bac](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/b252bac87a719166cc56aff07bcf3bdf0589ea9a))
- **design:** new layout grid ([b3598a1](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/b3598a17a42da1ea96db9ba74034722a808e3364))
- **interpolation:** enhance bilinear interpolation handling and update default values ([1c33d15](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/1c33d15601918c973d1c4618a8c32197782176a7))
- longitudinal fake interpolate ([fde39bd](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/fde39bdbb7a4880bdf852139e9f2ad489b4bf9fb))
- simplify getObjectiveLongitudinalWidth logic by returning 18 for widths between 12 and 18 for Box bridge [#41](https://github.com/EPFL-ENAC/resslab-astra_82001/issues/41) ([9e10bca](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/9e10bcac144928cebdf43708b7252ed3f985d991))
- support type and slab interpolation rules ([d3791fa](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/d3791faad29f1f44a0a2e13eaa92bb9cf7e4a83e))
- update alpha value calculations and improve type annotations in LongitudinalVerification component ([cc72e0e](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/cc72e0e08a643b97a0f62c083b5b0539eb38b242))
- update getObjectiveLongitudinalWidth to use VerificationState type and simplify conditional logic. [#41](https://github.com/EPFL-ENAC/resslab-astra_82001/issues/41) ([d09daf9](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/d09daf999bbc1e610390706e3663a43a62c15340))
- update interpolation rules for slab width conditions ([be53543](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/be53543072b9713751900188be8d667585214e91))
- update maxSpan and minSpan calculations based on bridge type ([db47b34](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/db47b34622ec28a5f94bd1261ec68c6bc90e92c0))
- update width conditions and improve readability in verification logic [#22](https://github.com/EPFL-ENAC/resslab-astra_82001/issues/22) #issuecomment-2606678153 ([63c0cba](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/63c0cba8ed875bb2a4d7c9718a0f04027dfe0f2b))
- wip new layout ([c238ca1](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/c238ca10ea608b8d2b346b36d54dc4d87eee05d8))

## [1.4.1](https://github.com/EPFL-ENAC/resslab-astra_82001/compare/v1.4.0...v1.4.1) (2025-01-06)

### Bug Fixes

- remove dead code and typescript errors ([0873ec2](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/0873ec2d4b6ab4bd24d1b861a21e9c0f4b6ba538))

## [1.4.0](https://github.com/EPFL-ENAC/resslab-astra_82001/compare/v1.3.0...v1.4.0) (2025-01-06)

### Features

- add images and components ([0be0408](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/0be0408b483277076978991d6d5607a79f094c44))
- add most of the components for the design ([703f28d](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/703f28d120960078851fbc43c85d59c2b402edf3))
- add most of the components for the design ([295e6e8](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/295e6e8f76b13238d6a498c071ed5a88c48748db))
- add most of the components for the design ([d76b65f](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/d76b65fc9368463053fd373241ebdd98aca39320))
- add most of the components for the design ([3da5282](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/3da52829adbadf57c21c21e21b54249f0a747ade))
- add most of the components for the design ([1033923](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/10339231f23d143a2a5718766740df169e3fae95))
- add most of the components for the design ([467508f](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/467508f7f709889bb3cf8dae80dc6dcdc73810ab))
- add transversal first draft ([7184223](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/7184223aa731088edfe07c985edc0912dfb689ed))
- enhance styling for bridge and traffic type components ([c78392e](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/c78392e38de93485a57f22c5fdc1927473abe8b8))
- **images:** add missing svg as png ([3d6456a](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/3d6456ab9955f5c178803b518f706470d2ffae15))
- improve a bit bridge selection css ([a36c59e](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/a36c59eedee1af663a1a83c91307a37733c21a72))
- improve a bit lane selection ([95ccc18](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/95ccc1831d5c4457509ee2dc7e9e09a1e1a29046))
- improve a bit lane selection ([ac6a6f6](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/ac6a6f6ab15e8c2bb2e64b308f416ac600c22c59))
- wip interpolation ([3701173](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/37011738696ecf556daed62cdc0af55f2567693c))

### Bug Fixes

- **bridge-selector:** better css for bridge selector ([cc1bb2d](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/cc1bb2dbe874321ebe6fb17fb58ec64ea9d751a4))

## [1.3.0](https://github.com/EPFL-ENAC/resslab-astra_82001/compare/v1.2.1...v1.3.0) (2024-12-09)

### Features

- **cd:** add better comment and outpus for matrix image push ([4ccecc4](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/4ccecc41aaff2e67539d184e1cbb2d291cbd7b85))
- **cd:** simplify matrix deployment ([2627981](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/26279810d5addb296c7a74f9bbab7a8a3620e113))
- **cd:** simplify matrix deployment ([68cbf71](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/68cbf713a303c3f1978fd6a1be285c280cce86f2))
- matrix build and deploy test ([5b46917](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/5b469172376809d1ede8e80e7c37e08cdccf900a))
- **types:** make form usable with default value, even when we don't have values ([89d44eb](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/89d44eb35fbe945baf7675797df6a115d4a63df5))

### Bug Fixes

- **AlphaValues:** apply beta 4.7 factor after minAlphaQ check ([b691c2d](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/b691c2d0a61dbb7615aa825a9fb6acdc46a1d272))
- **cd:** better json ([53cedf3](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/53cedf34f5c65372d7b4a751cef9fdaa7de07932))
- **cd:** better output ([47c734b](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/47c734b143b93a20f5997f752702dade4658d1e9))
- try with matrix ([d73ea4c](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/d73ea4cd53be231681b7dd74f56b328eac40fad4))

## [1.2.0](https://github.com/EPFL-ENAC/resslab-astra_82001/compare/v1.1.0...v1.2.0) (2024-11-27)

### Features

- **alpha-q:** change error message ([fca3e58](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/fca3e58eea8dfce68c5d0ac6ab190a8f57e446d0))
- **alpha-q:** override to 1.0 when road is good ([56dca88](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/56dca88907906360345d352e8fb5b543e27dcfa4))
- **i18n:** add bad and good road text ([6b062c9](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/6b062c9d785098068aecbaaa43595fd51a1fd191))
- **i18n:** add new changes from pull request [#28](https://github.com/EPFL-ENAC/resslab-astra_82001/issues/28) and [#29](https://github.com/EPFL-ENAC/resslab-astra_82001/issues/29) and comments on issue [#8](https://github.com/EPFL-ENAC/resslab-astra_82001/issues/8) ([4cbdcd2](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/4cbdcd2439c636b970134e2f2ebf48e1dfbbdc74))
- **i18n:** add total support of i18n ([b3189a2](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/b3189a2377d3a32916113898dfe002649fbf52e1))
- **i18n:** wip add i18n from internationalization.csv ([698ad1f](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/698ad1faef778639605a80a3bd579f649ed93d08))

### Bug Fixes

- **i18n:** add new file for i18n ([49c29db](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/49c29db7f4b91b09bc373f4b75ed7278f9115793))
- **i18n:** add new i18n values ([47124f3](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/47124f3bfef6961b3aa36fc58cbe27be6fc89e59))
- **i18n:** add new keys for i18n ([95ff083](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/95ff083a1a3f3bcbbbbb8e1fdab64a0577b606d9))

## [1.1.0](https://github.com/EPFL-ENAC/resslab-astra_82001/compare/v1.0.0...v1.1.0) (2024-11-19)

### Features

- **i18n:** add internationalization reference ([a517164](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/a517164d2b2c957dae3693c6f9f0cb601b8b2c50))
- **i18n:** add internationalization reference ([39b4a89](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/39b4a89005b47e77485096dca4d3c941c3204968))
- **i18n:** add internationalization reference ([65d4ad4](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/65d4ad49a3d2c19f00cc584938cffbe026b428eb))
- **i18n:** add internationalization reference ([38015f1](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/38015f1522bf34e7ac3c82b306de4e5316309a8f))
- new layout and typescript ([08d70d6](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/08d70d60d204eebb262479b33d459d7c71d9dba4))
- new layout and typescript ([c970b07](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/c970b0799131f949bd4a0d28d8c878959b8507ad))
- **new-layout:** add new variable ([726b5fc](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/726b5fcbf90b1a8388fcda6ea8f0156655776a06))
- **types:** reset behavior to have full feature ([564904c](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/564904c3ae406b8c5b0d223b82ffe45bfe325e53))
- **types:** update trafficClass prop type and clean up unused code ([501d530](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/501d5305fdf55089d561ab7218f3ed5576096260))
- **types:** wip recursive types ([9700888](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/9700888fddc49c5abe083e32cdf5ae2707f05742))

### Bug Fixes

- **app-name:** try updating the app name ([3dd10c3](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/3dd10c3cab7db1d15601d587fe8e709d452f46b7))
- **front:** improve a bit the frontend ([3cef1bd](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/3cef1bdfc5764e6e3c6bc35510f9096445b0b8a1))

## 1.0.0 (2024-11-07)

### Features

- **docker:** add proper docker build ([e7d80e7](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/e7d80e7f94fce4f0460383c8451b30b380663868))

### Bug Fixes

- better logic for form ([7dd2a8e](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/7dd2a8eb7de5cf0b2dd153f97e2595d3045bdc21))
- correct ([8ab1a10](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/8ab1a102b133bac6b6261a1f1b849d1de9fc44f0))

## [1.1.0](https://github.com/EPFL-ENAC/resslab-astra_82001/compare/v1.0.0...v1.1.0) (2024-10-22)

### Features

- add proper eslintrcjs ([b8a8db3](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/b8a8db368778f0388e5aee471f90929284b23baf))
- add proper eslintrcjs ([36eff2a](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/36eff2a4d744dc3d9339995a4e187a2159286c27))
- setup proper CI/CD and hooks ([3696b70](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/3696b707e5c345fde9bd499ac5ea9728bed194e4))

### Bug Fixes

- eslint ignore dist directory ([b3a536b](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/b3a536bf9ddb9c32870fecf3fa5d0b0edab7b43c))

## 1.0.0 (2024-10-22)

### Features

- add proper eslintrcjs ([b8a8db3](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/b8a8db368778f0388e5aee471f90929284b23baf))
- add proper eslintrcjs ([36eff2a](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/36eff2a4d744dc3d9339995a4e187a2159286c27))
- setup proper CI/CD and hooks ([3696b70](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/3696b707e5c345fde9bd499ac5ea9728bed194e4))

### Bug Fixes

- eslint ignore dist directory ([b3a536b](https://github.com/EPFL-ENAC/resslab-astra_82001/commit/b3a536bf9ddb9c32870fecf3fa5d0b0edab7b43c))
