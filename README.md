# Awesome Pi Themes

A collection of original dark themes for [pi](https://pi.dev), with a standalone web preview that can run locally or be published as a static GitHub Pages site.

## Live preview

Browse all themes here:

<https://isashi.github.io/awesome-pi-themes/>

## Themes

This repository currently includes 21 original themes:

- `alien-candy`
- `arctic-aurora`
- `breezy-ocean`
- `cosmic-lagoon`
- `crimson-noir`
- `cyber-mint`
- `ember-sunset`
- `enchanted-forest`
- `glitch-carnival`
- `golden-dusk`
- `laser-swamp`
- `lavender-mist`
- `midnight-orchid`
- `noodle-nebula`
- `paper-moon`
- `plasma-pomegranate`
- `princess-nam-rom`
- `quantum-pickle`
- `radioactive-lullaby`
- `static-dragonfruit`
- `volcanic-bubblegum`

## How to install a theme in pi

### Install all themes

Install the full package from npm:

```bash
pi install npm:awesome-pi-themes
```

Then select one of the themes from `/settings`, or set it in your pi settings file:

```json
{
  "theme": "princess-nam-rom"
}
```

### Install a single theme

If you only want one theme, copy that theme JSON file into your pi themes directory. For example:

```bash
mkdir -p ~/.pi/agent/themes
curl -fsSL https://raw.githubusercontent.com/isashi/awesome-pi-themes/main/themes/princess-nam-rom.json \
  -o ~/.pi/agent/themes/princess-nam-rom.json
```

Then select `princess-nam-rom` from `/settings`, or set it in your pi settings file:

```json
{
  "theme": "princess-nam-rom"
}
```

If you have cloned this repository locally, you can also copy one or more files from `themes/`:

```bash
mkdir -p ~/.pi/agent/themes
cp themes/princess-nam-rom.json ~/.pi/agent/themes/
```

### Try a theme without installing it

You can also load a local theme file directly from the CLI:

```bash
pi --theme ./themes/princess-nam-rom.json
```

## How to run locally the project

Requirements:

- Node.js 18+
- npm

Install dependencies, if any are added in the future:

```bash
npm install
```

Run the local preview server:

```bash
npm run preview
```

Then open the URL printed in your terminal.

## Build for GitHub Pages

Generate the static site:

```bash
npm run build
```

The output is written to:

```txt
docs/index.html
```

Publish the `docs/` folder with GitHub Pages using **Deploy from a branch**. This avoids requiring a GitHub Actions workflow for the preview site.

## Validate the project

```bash
npm run check
```

This checks the preview script syntax and parses every JSON theme file.

## Add a new theme

1. Create a new JSON file in `themes/`, for example `themes/my-theme.json`.
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
```

## License

MIT
