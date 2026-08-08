---
description: Add one new original Pi theme and publish a patch release
argument-hint: "[optional style/name hint]"
---
You are working in the `awesome-pi-themes` repository. Complete this workflow end-to-end without stopping unless validation, git auth, or npm/GitHub release auth fails.

Goal: add exactly one new original dark Pi theme, generate the correct preview screenshot, update every related file, commit, tag a new patch version, push, and verify the npm patch release.

Optional user hint: ${ARGUMENTS:-invent the name and palette freely, keeping them coherent}.

Required workflow:

1. Inspect repository state first.
   - Run `git status --short` and do not overwrite unrelated user changes.
   - Read `package.json`, `README.md`, `CHANGELOG.md`, `preview-themes-web.js`, and one or two existing files in `themes/` to follow the existing structure.

2. Create one new theme.
   - Invent a coherent slug name and palette unless the user supplied a hint.
   - Add `themes/<slug>.json` with a unique `name` matching the file name.
   - Preserve the existing schema URL and all required `vars`, `colors`, and `export` fields.
   - Keep it a dark theme and make the palette internally consistent and readable.

3. Update related project files.
   - Bump `package.json` and `package-lock.json` by exactly one patch version using `npm version patch --no-git-tag-version`.
   - Update the package description theme count if needed.
   - Update `README.md`: theme count, gallery table row, links, and screenshot reference.
   - Add a new top entry in `CHANGELOG.md` with today's date, the new version, the theme summary, and the updated theme count.
   - Run `npm run build` so `docs/index.html` reflects the new theme.

4. Generate the correct screenshot.
   - The screenshot must be the real web preview page, not a simplified mock card.
   - Use the local generated page for the new theme hash:
     `file://$PWD/docs/index.html#<slug>`
   - Capture viewport `1440x1100` and save as `docs/screenshots/<slug>.jpg`.
   - Example commands, adapting paths as needed:
     ```bash
     chromium-browser --headless --no-sandbox --disable-gpu \
       --window-size=1440,1100 \
       --screenshot="/tmp/<slug>.png" \
       "file://$PWD/docs/index.html#<slug>"
     convert "/tmp/<slug>.png" -quality 88 "docs/screenshots/<slug>.jpg"
     ```
   - If `chromium-browser` or `convert` is unavailable, find an equivalent Chromium/ImageMagick command.
   - Verify that the JPG is exactly `1440x1100` and visually shows the full preview page with sidebar, palette, and terminal.

5. Validate everything.
   - Run `npm run check`.
   - Confirm tests cover screenshot presence and dimensions.
   - Run `git diff --check`.
   - Review `git diff --stat` and the important file diffs.
   - Ensure no generated or temporary files are accidentally staged.

6. Commit and tag the patch release.
   - Stage all intended changes.
   - Commit with a patch-level Conventional Commit message:
     `fix: add <slug> theme`
   - Read the new version from `package.json`.
   - Create an annotated tag:
     `git tag -a v<version> -m "v<version>"`

7. Push and release.
   - Push the commit and tag:
     ```bash
     git push origin main
     git push origin v<version>
     ```
   - This repository publishes to npm from `.github/workflows/publish.yml` on `v*.*.*` tags. Verify the publish workflow starts and succeeds if the GitHub CLI is available:
     ```bash
     gh run list --workflow publish.yml --limit 3
     gh run watch
     ```
   - Verify npm eventually shows the new version:
     `npm view awesome-pi-themes version`
   - If trusted publishing/workflow auth is unavailable, report the exact command/status needed; otherwise finish only after the patch release is visible or the release workflow status is clear.

Final response checklist:
- New theme slug and version.
- Screenshot path and confirmed dimensions.
- Validation commands run.
- Commit hash and tag.
- Push/release/npm verification status.
