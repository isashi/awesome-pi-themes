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

## Release process

This project publishes to npm through GitHub Actions trusted publishing. Do not publish from a local shell unless explicitly required as an emergency fallback.

Normal release flow:

1. Ensure the npm package has this trusted publisher configured:
   - owner/user: `isashi`
   - repository: `awesome-pi-themes`
   - workflow: `publish.yml`
2. Run local validation:

   ```bash
   npm ci
   npm run check
   npm pack --dry-run
   ```

3. Bump the version and update `CHANGELOG.md`.
4. Commit the release changes with `chore: release x.y.z`.
5. Create and push the matching tag:

   ```bash
   git tag vx.y.z
   git push origin main
   git push origin vx.y.z
   ```

6. If the tag was pushed before the workflow existed or the automatic run needs to be retried, use GitHub Actions → `Publish to npm` → `Run workflow` on `main`.

The publish workflow runs on Node.js 24 and executes `npm publish --provenance`, so it should not require an `NPM_TOKEN`.

This project follows semantic versioning:

- patch: readability fixes, metadata, documentation, or small theme adjustments;
- minor: new themes or compatible feature additions;
- major: theme removals, renames, or package structure changes.
