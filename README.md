# Awesome Pi Themes

[![npm version](https://img.shields.io/npm/v/awesome-pi-themes?style=flat-square)](https://www.npmjs.com/package/awesome-pi-themes)
[![npm downloads](https://img.shields.io/npm/dm/awesome-pi-themes?style=flat-square)](https://www.npmjs.com/package/awesome-pi-themes)
[![license: MIT](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)

A curated collection of **28 original dark themes** for [pi](https://pi.dev), with a standalone browser preview and ready-to-copy JSON theme files.

The goal of this project is to make pi feel more personal and readable during real coding sessions. Feedback is very welcome, especially on contrast, syntax colors, warnings/errors, diffs, and long-session readability.

## Preview

Browse the live gallery:

<https://isashi.github.io/awesome-pi-themes/>

Featured theme:

[![Starry Night screenshot](docs/screenshots/starry-night.jpg)](https://isashi.github.io/awesome-pi-themes/#starry-night)

## Install

### Install all themes from npm

```bash
pi install npm:awesome-pi-themes
```

Then select a theme from `/settings`, or set it in your pi settings file:

```json
{
  "theme": "princess-nam-rom"
}
```

### Install one theme manually

```bash
mkdir -p ~/.pi/agent/themes
curl -fsSL https://raw.githubusercontent.com/isashi/awesome-pi-themes/main/themes/princess-nam-rom.json \
  -o ~/.pi/agent/themes/princess-nam-rom.json
```

Then select `princess-nam-rom` from `/settings`, or set it as your active theme.

### Try a local theme without installing it

```bash
pi --theme ./themes/princess-nam-rom.json
```

## Themes

Click a name to open the live preview for that theme.

| Theme | Screenshot |
| --- | --- |
| [alien-candy](https://isashi.github.io/awesome-pi-themes/#alien-candy) | [<img src="docs/screenshots/alien-candy.jpg" alt="Screenshot of alien-candy" width="360">](docs/screenshots/alien-candy.jpg) |
| [arctic-aurora](https://isashi.github.io/awesome-pi-themes/#arctic-aurora) | [<img src="docs/screenshots/arctic-aurora.jpg" alt="Screenshot of arctic-aurora" width="360">](docs/screenshots/arctic-aurora.jpg) |
| [breezy-ocean](https://isashi.github.io/awesome-pi-themes/#breezy-ocean) | [<img src="docs/screenshots/breezy-ocean.jpg" alt="Screenshot of breezy-ocean" width="360">](docs/screenshots/breezy-ocean.jpg) |
| [cosmic-lagoon](https://isashi.github.io/awesome-pi-themes/#cosmic-lagoon) | [<img src="docs/screenshots/cosmic-lagoon.jpg" alt="Screenshot of cosmic-lagoon" width="360">](docs/screenshots/cosmic-lagoon.jpg) |
| [crimson-noir](https://isashi.github.io/awesome-pi-themes/#crimson-noir) | [<img src="docs/screenshots/crimson-noir.jpg" alt="Screenshot of crimson-noir" width="360">](docs/screenshots/crimson-noir.jpg) |
| [cyber-mint](https://isashi.github.io/awesome-pi-themes/#cyber-mint) | [<img src="docs/screenshots/cyber-mint.jpg" alt="Screenshot of cyber-mint" width="360">](docs/screenshots/cyber-mint.jpg) |
| [dragon-lulu](https://isashi.github.io/awesome-pi-themes/#dragon-lulu) | [<img src="docs/screenshots/dragon-lulu.jpg" alt="Screenshot of dragon-lulu" width="360">](docs/screenshots/dragon-lulu.jpg) |
| [ember-sunset](https://isashi.github.io/awesome-pi-themes/#ember-sunset) | [<img src="docs/screenshots/ember-sunset.jpg" alt="Screenshot of ember-sunset" width="360">](docs/screenshots/ember-sunset.jpg) |
| [enchanted-forest](https://isashi.github.io/awesome-pi-themes/#enchanted-forest) | [<img src="docs/screenshots/enchanted-forest.jpg" alt="Screenshot of enchanted-forest" width="360">](docs/screenshots/enchanted-forest.jpg) |
| [glitch-carnival](https://isashi.github.io/awesome-pi-themes/#glitch-carnival) | [<img src="docs/screenshots/glitch-carnival.jpg" alt="Screenshot of glitch-carnival" width="360">](docs/screenshots/glitch-carnival.jpg) |
| [golden-dusk](https://isashi.github.io/awesome-pi-themes/#golden-dusk) | [<img src="docs/screenshots/golden-dusk.jpg" alt="Screenshot of golden-dusk" width="360">](docs/screenshots/golden-dusk.jpg) |
| [laser-swamp](https://isashi.github.io/awesome-pi-themes/#laser-swamp) | [<img src="docs/screenshots/laser-swamp.jpg" alt="Screenshot of laser-swamp" width="360">](docs/screenshots/laser-swamp.jpg) |
| [lavender-mist](https://isashi.github.io/awesome-pi-themes/#lavender-mist) | [<img src="docs/screenshots/lavender-mist.jpg" alt="Screenshot of lavender-mist" width="360">](docs/screenshots/lavender-mist.jpg) |
| [meomeo-mang](https://isashi.github.io/awesome-pi-themes/#meomeo-mang) | [<img src="docs/screenshots/meomeo-mang.jpg" alt="Screenshot of meomeo-mang" width="360">](docs/screenshots/meomeo-mang.jpg) |
| [midnight-orchid](https://isashi.github.io/awesome-pi-themes/#midnight-orchid) | [<img src="docs/screenshots/midnight-orchid.jpg" alt="Screenshot of midnight-orchid" width="360">](docs/screenshots/midnight-orchid.jpg) |
| [neon-sakura](https://isashi.github.io/awesome-pi-themes/#neon-sakura) | [<img src="docs/screenshots/neon-sakura.jpg" alt="Screenshot of neon-sakura" width="360">](docs/screenshots/neon-sakura.jpg) |
| [noodle-nebula](https://isashi.github.io/awesome-pi-themes/#noodle-nebula) | [<img src="docs/screenshots/noodle-nebula.jpg" alt="Screenshot of noodle-nebula" width="360">](docs/screenshots/noodle-nebula.jpg) |
| [paper-moon](https://isashi.github.io/awesome-pi-themes/#paper-moon) | [<img src="docs/screenshots/paper-moon.jpg" alt="Screenshot of paper-moon" width="360">](docs/screenshots/paper-moon.jpg) |
| [plasma-pomegranate](https://isashi.github.io/awesome-pi-themes/#plasma-pomegranate) | [<img src="docs/screenshots/plasma-pomegranate.jpg" alt="Screenshot of plasma-pomegranate" width="360">](docs/screenshots/plasma-pomegranate.jpg) |
| [princess-nam-rom](https://isashi.github.io/awesome-pi-themes/#princess-nam-rom) | [<img src="docs/screenshots/princess-nam-rom.jpg" alt="Screenshot of princess-nam-rom" width="360">](docs/screenshots/princess-nam-rom.jpg) |
| [quantum-pickle](https://isashi.github.io/awesome-pi-themes/#quantum-pickle) | [<img src="docs/screenshots/quantum-pickle.jpg" alt="Screenshot of quantum-pickle" width="360">](docs/screenshots/quantum-pickle.jpg) |
| [radioactive-lullaby](https://isashi.github.io/awesome-pi-themes/#radioactive-lullaby) | [<img src="docs/screenshots/radioactive-lullaby.jpg" alt="Screenshot of radioactive-lullaby" width="360">](docs/screenshots/radioactive-lullaby.jpg) |
| [rainbow-prism](https://isashi.github.io/awesome-pi-themes/#rainbow-prism) | [<img src="docs/screenshots/rainbow-prism.jpg" alt="Screenshot of rainbow-prism" width="360">](docs/screenshots/rainbow-prism.jpg) |
| [starry-night](https://isashi.github.io/awesome-pi-themes/#starry-night) | [<img src="docs/screenshots/starry-night.jpg" alt="Screenshot of starry-night" width="360">](docs/screenshots/starry-night.jpg) |
| [static-dragonfruit](https://isashi.github.io/awesome-pi-themes/#static-dragonfruit) | [<img src="docs/screenshots/static-dragonfruit.jpg" alt="Screenshot of static-dragonfruit" width="360">](docs/screenshots/static-dragonfruit.jpg) |
| [tuscan-sun](https://isashi.github.io/awesome-pi-themes/#tuscan-sun) | [<img src="docs/screenshots/tuscan-sun.jpg" alt="Screenshot of tuscan-sun" width="360">](docs/screenshots/tuscan-sun.jpg) |
| [velvet-meteor](https://isashi.github.io/awesome-pi-themes/#velvet-meteor) | [<img src="docs/screenshots/velvet-meteor.jpg" alt="Screenshot of velvet-meteor" width="360">](docs/screenshots/velvet-meteor.jpg) |
| [volcanic-bubblegum](https://isashi.github.io/awesome-pi-themes/#volcanic-bubblegum) | [<img src="docs/screenshots/volcanic-bubblegum.jpg" alt="Screenshot of volcanic-bubblegum" width="360">](docs/screenshots/volcanic-bubblegum.jpg) |

## Feedback wanted

If you try these themes, please open an issue with notes about:

- readability during longer coding sessions
- low-contrast text, borders, warnings, or errors
- confusing diff colors
- themes you would add, remove, rename, or tune
- screenshots or terminal/font combinations where a theme looks worse than expected

Issues: <https://github.com/isashi/awesome-pi-themes/issues>

## Local development

Requirements:

- Node.js 18+
- npm

Install dependencies:

```bash
npm install
```

Run the local preview server:

```bash
npm run preview
```

Build the static GitHub Pages site:

```bash
npm run build
```

Validate the project:

```bash
npm run check
```

## Add a new theme

1. Create a JSON file in `themes/`, for example `themes/my-theme.json`.
2. Make sure the theme `name` matches the file slug, for example `my-theme`.
3. Run:

```bash
npm run check
npm run build
```

4. Commit the theme and regenerated `docs/index.html`.

## Project structure

```txt
awesome-pi-themes/
  preview-themes-web.js
  package.json
  README.md
  themes/
    *.json
  docs/
    index.html
    screenshots/
      *.jpg
```

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

## License

MIT
