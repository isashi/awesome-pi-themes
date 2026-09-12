# Changelog

All notable changes to this project are documented here.

## 1.2.12 - 2026-09-12

- Added `verdigris-nocturne`, a patinated midnight dark theme with verdigris teal, nocturne blue, moon lilac, brass gold, fern mist, and rose-ember highlights.
- Updated the live preview build and README gallery for 64 themes.

## 1.2.11 - 2026-09-12

- Added `celadon-codex`, a moonlit library dark theme with celadon glow, codex blue, ink violet, vellum gold, harbor teal, and rose-seal highlights.
- Updated the live preview build and README gallery for 63 themes.

## 1.2.10 - 2026-09-11

- Added `quartz-fjord`, a glacial-fjord dark theme with quartz cyan, fjord blue, dusk violet, lantern gold, kelp mint, and coral-echo highlights.
- Updated the live preview build and README gallery for 62 themes.

## 1.2.9 - 2026-09-10

- Added `azurite-vespers`, a chapel-blue dark theme with azurite blue, vesper lilac, choral teal, lamp gold, sea-mint, and ember-rose highlights.
- Updated the live preview build and README gallery for 61 themes.

## 1.2.8 - 2026-09-10

- Added `opal-vespers`, a chapel-at-twilight dark theme with opal cyan, vesper violet, indigo harbor, candle amber, mint-glass, and rose-compline highlights.
- Updated the live preview build and README gallery for 60 themes.

## 1.2.7 - 2026-09-10

- Added `cobalt-sanctum`, a starlit sanctuary dark theme with cobalt blue, sanctum teal, relic gold, amethyst, moss-glass, and ember-rose highlights.
- Updated the live preview build and README gallery for 59 themes.

## 1.2.6 - 2026-09-09

- Added `signal-cloister`, a monastic dark theme with cloister teal, bell blue, vesper violet, candle gold, moss-stone, and reliquary-rose highlights.
- Updated the live preview build and README gallery for 58 themes.

## 1.2.5 - 2026-09-09

- Added `midnight-basilica`, a cathedral-at-midnight dark theme with stained-glass cyan, nave blue, chapel violet, incense gold, moss-votive, and altar-rose highlights.
- Updated the live preview build and README gallery for 57 themes.

## 1.2.4 - 2026-09-08

- Added `bramble-current`, a dark bramble-and-tide theme with current cyan, bramble violet, harbor blue, moss-glass, amber-seed, and rose-thorn highlights.
- Updated the live preview build and README gallery for 56 themes.

## 1.2.3 - 2026-09-08

- Added `graphite-seaglass`, a graphite-and-sea-glass dark theme with sea-glass cyan, beacon gold, slate-blue, kelp-green, lilac-mist, and ember-coral highlights.
- Updated the live preview build and README gallery for 55 themes.

## 1.2.2 - 2026-09-07

- Added `mercury-lantern`, a steel-and-harbor dark theme with mercury silver, lantern amber, signal cyan, harbor blue, moss-glass, and ember-rose highlights.
- Updated the live preview build and README gallery for 54 themes.

## 1.2.1 - 2026-09-07

- Added `moonstone-koi`, a moonlit koi-pond dark theme with moonstone cyan, koi vermilion, indigo, lotus gold, reed green, and plum-mist highlights.
- Updated the live preview build and README gallery for 53 themes.

## 1.2.0 - 2026-09-06

- Added an opt-in `extensions/look-pack.ts` companion extension: a branded startup
  header and a powerline-style footer (git branch, context-usage gauge, model,
  tokens, cost) built entirely from the active theme's own color tokens. Disabled
  by default; toggle with `/look-pack` inside pi. The choice persists across
  sessions.
- Fixed the web preview coloring plain terminal text from the theme's `fg`-like
  var instead of `colors.text`. Verified against real pi `/export` session HTML:
  every theme in this repo sets `colors.text` to `""`, which pi always renders as
  a neutral `#e5e5e7`, never the theme's accent foreground.
- Added a "Look pack" toggle to the live preview gallery to compare the default
  footer against the look-pack style for any theme.

## 1.1.25 - 2026-09-06

- Added `nebula-scriptorium`, a starbound archive dark theme with ink-violet, quill-cyan, parchment-gold, star-mint, comet-blue, and rose-seal highlights.
- Updated the live preview build and README gallery for 52 themes.

## 1.1.24 - 2026-09-06

- Added `lunar-alchemy`, a moonlit laboratory dark theme with alchemist-gold, elixir-teal, astral-blue, mystic-violet, verdant-glass, and ruby-phial highlights.
- Updated the live preview build and README gallery for 51 themes.

## 1.1.23 - 2026-09-05

- Added `violet-breakwater`, a deep coastal dark theme with breakwater cyan, violet, harbor-blue, seafoam, lantern-gold, and coral-signal highlights.
- Updated the live preview build and README gallery for 50 themes.

## 1.1.22 - 2026-09-04

- Added `chrome-orchid`, a polished dark theme with chrome silver, orchid violet, iris-blue, mint-glass, amber, and rose-quartz highlights.
- Updated the live preview build and README gallery for 49 themes.

## 1.1.21 - 2026-09-04

- Added `petrol-peony`, a dark petrol-night theme with peony pink, petrol teal, amber, jade, periwinkle, and plum highlights.
- Updated the live preview build and README gallery for 48 themes.

## 1.1.20 - 2026-09-03

- Added `inkfire-bay`, an inky coastal dark theme with inkfire-coral, tide-cyan, lantern-gold, seafoam, lilac-haze, and ember-rose highlights.
- Updated the live preview build and README gallery for 47 themes.

## 1.1.19 - 2026-08-25

- Added `sapphire-ember`, a blue-coal dark theme with sapphire, ember, flare-gold, aqua-smoke, mint-ash, violet-heat, and ruby-coal highlights.
- Updated the live preview build and README gallery for 46 themes.

## 1.1.18 - 2026-08-25

- Added `stormglass-forge`, a storm-tempered forge dark theme with stormglass-cyan, forge-gold, tempered-blue, verdigris, arc-violet, slag-green, and ember-rose highlights.
- Updated the live preview build and README gallery for 45 themes.

## 1.1.17 - 2026-08-24

- Added `nocturne-garden`, a moonlit botanical dark theme with moon-vine, firefly-gold, pond-cyan, iris-blue, night-lilac, moss-leaf, and rosehip highlights.
- Updated the live preview build and README gallery for 44 themes.

## 1.1.16 - 2026-08-24

- Added `moonlit-terrace`, a moon-washed Mediterranean terrace dark theme with pearl, terrace-gold, jasmine, sea-glass, tile-blue, wisteria, and terra-rose highlights.
- Updated the live preview build and README gallery for 43 themes.

## 1.1.15 - 2026-08-23

- Added `moss-mirage`, a moss-lit oasis dark theme with moss-glow, mirage-cyan, spring-blue, lichen, orchid-haze, dune-gold, and coral-bloom highlights.
- Standardized the Ligurian cove theme slug as `varigotti-sea` across theme files, gallery links, screenshots, and preview data.
- Updated the live preview build and README gallery for 42 themes.

## 1.1.14 - 2026-08-23

- Added `iron-lotus`, a blackened temple dark theme with lotus-pink, temple-gold, steel-blue, jade-mist, amethyst, and ember-clay highlights.
- Updated the live preview build and README gallery for 41 themes.

## 1.1.13 - 2026-08-22

- Added `copper-comet`, a deep-space dark theme with comet-copper, ember-gold, ion-teal, orbit-blue, nebula-violet, verdigris, and plasma-rose highlights.
- Updated the live preview build and README gallery for 40 themes.

## 1.1.12 - 2026-08-22

- Added `willow-wraith`, a haunted willow dark theme with willow-glow, ghost-mint, bog-cyan, moss, night-violet, foxfire, and specter-rose highlights.
- Updated the live preview build and README gallery for 39 themes.

## 1.1.11 - 2026-08-21

- Added `varigotti-sea`, a yellowish Ligurian cove dark theme with sunwashed gold, limoncello, sea-cove blue, olive, terracotta, and bougainvillea highlights.
- Updated the live preview build and README gallery for 38 themes.

## 1.1.10 - 2026-08-21

- Added `winter-wisp`, a frost-lit midnight dark theme with wisp-cyan, moon-gold, frost-blue, pine-green, violet haze, and rose highlights.
- Updated the live preview build and README gallery for 37 themes.

## 1.1.9 - 2026-08-10

- Added `polar-lantern`, an arctic midnight dark theme with lantern-gold, glacier-cyan, aurora-green, amethyst, berry, and ice highlights.
- Updated the live preview build and README gallery for 36 themes.

## 1.1.8 - 2026-08-10

- Added `sable-citadel`, a midnight fortress dark theme with citrine, aqua-glass, royal-violet, fern, ember-rose, and silver highlights.
- Updated the live preview build and README gallery for 35 themes.

## 1.1.7 - 2026-08-09

- Added `basalt-bloom`, a volcanic garden dark theme with copper, marigold, orchid, glacier-blue, lichen-green, and rose highlights.
- Updated the live preview build and README gallery for 34 themes.

## 1.1.6 - 2026-08-09

- Added `eclipse-tide`, a tidal eclipse dark theme with corona-gold, tide-cyan, lunar-blue, umbra-violet, reef-green, and flare-rose highlights.
- Updated the live preview build and README gallery for 33 themes.

## 1.1.5 - 2026-08-08

- Added `cinder-grove`, a smoky woodland dark theme with cinder-orange, moss, fern, creek-blue, violet, and wheat highlights.
- Updated the live preview build and README gallery for 32 themes.

## 1.1.4 - 2026-08-08

- Added `obsidian-harbor`, a deep nautical dark theme with seafoam, tide-cyan, harbor-blue, violet, lantern, and coral accents.
- Updated the live preview build and README gallery for 31 themes.

## 1.1.3 - 2026-08-04

- Added `opal-matrix`, a dark opalescent matrix theme with mint, cyan, violet, rose, and pearl highlights.
- Updated the live preview build and README gallery for 30 themes.

## 1.1.2 - 2026-07-31

- Added `aurora-circuit`, a polar neon dark theme with cyan, lime, mint, violet, and amber circuit accents.
- Updated the live preview build and README gallery for 29 themes.

## 1.1.1 - 2026-07-30

- Added `neon-sakura`, a cherry-blossom neon dark theme with sakura pink, sky blue, mint, and yuzu accents.
- Updated the live preview build and README gallery for 28 themes.

## 1.1.0 - 2026-07-29

- Added `velvet-meteor`, a plush violet dark theme with rose, aqua, mint, and meteor-gold accents.
- Updated the live preview build and README gallery for 27 themes.

## 1.0.2 - 2026-07-29

- Added repository health documentation for contributing and security reporting.
- Added a GitHub Actions CI workflow for package validation.
- Added a package lockfile for reproducible installs.
- Added local npm artifact ignores.

## 1.0.1 - 2026-07-28

- Added `rainbow-prism`, a neutral spectrum-inspired dark theme.
- Updated the live preview build and README gallery for 26 themes.

## 1.0.0 - 2026-07-28

- Marked the package as stable with the first `1.0.0` release.
- Added a Node.js test suite for theme structure, required Pi color tokens, schema URLs, and color references.
- Added an npm `test` script and included tests in the package tarball.
- Improved npm metadata with a more specific description, expanded keywords, author, Node.js engine, and changelog packaging.
- Added npm badges and a changelog link to the README.

## 0.1.5 - 2026-07-28

- Added `dragon-lulu`, a pastel green theme with a green-tinted gray background.
- Added `meomeo-mang`, a high-contrast red theme with a warm gray background.
- Added `tuscan-sun`, a retro yellow theme inspired by Tuscan sun tones.
- Updated the live preview build and README gallery for 25 themes.

## 0.1.4 - 2026-07-27

- Improved README presentation for npm, GitHub, and community sharing.
- Converted theme screenshots from PNG to JPG.
- Updated package preview image metadata.

## 0.1.3 - 2026-07-27

- Refreshed the generated GitHub Pages preview.

## 0.1.2 - 2026-07-27

- Added package metadata and preview image support.

## 0.1.0 - 2026-07-25

- Initial release with 22 original dark themes for Pi Coding Agent.
- Added local and static web preview support.
