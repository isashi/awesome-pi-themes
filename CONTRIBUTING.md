# Contributing

Thanks for your interest in improving Awesome Pi Themes.

## Local checks

Before opening a pull request, run:

```bash
npm ci
npm run check
```

This validates the preview script, theme structure, required Pi color tokens, schema URLs, and tests.

## Theme contributions

When proposing theme changes:

- preserve readability and contrast during long coding sessions;
- keep theme names stable unless a breaking change is intentional;
- include or update screenshots/previews when visual output changes;
- document user-facing changes in `CHANGELOG.md`.

## Release notes

This project follows semantic versioning:

- patch: readability fixes, metadata, documentation, or small theme adjustments;
- minor: new themes or compatible feature additions;
- major: theme removals, renames, or package structure changes.
