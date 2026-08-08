import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { basename } from "node:path";

const themesDir = new URL("../themes/", import.meta.url);
const screenshotsDir = new URL("../docs/screenshots/", import.meta.url);
const schemaUrl = "https://raw.githubusercontent.com/earendil-works/pi/main/packages/coding-agent/src/modes/interactive/theme/theme-schema.json";

const requiredColorTokens = [
  "accent",
  "border",
  "borderAccent",
  "borderMuted",
  "success",
  "error",
  "warning",
  "muted",
  "dim",
  "text",
  "thinkingText",
  "selectedBg",
  "userMessageBg",
  "userMessageText",
  "customMessageBg",
  "customMessageText",
  "customMessageLabel",
  "toolPendingBg",
  "toolSuccessBg",
  "toolErrorBg",
  "toolTitle",
  "toolOutput",
  "mdHeading",
  "mdLink",
  "mdLinkUrl",
  "mdCode",
  "mdCodeBlock",
  "mdCodeBlockBorder",
  "mdQuote",
  "mdQuoteBorder",
  "mdHr",
  "mdListBullet",
  "toolDiffAdded",
  "toolDiffRemoved",
  "toolDiffContext",
  "syntaxComment",
  "syntaxKeyword",
  "syntaxFunction",
  "syntaxVariable",
  "syntaxString",
  "syntaxNumber",
  "syntaxType",
  "syntaxOperator",
  "syntaxPunctuation",
  "thinkingOff",
  "thinkingMinimal",
  "thinkingLow",
  "thinkingMedium",
  "thinkingHigh",
  "thinkingXhigh",
  "thinkingMax",
  "bashMode",
];

const requiredExportTokens = ["pageBg", "cardBg", "infoBg"];
const hexColor = /^#[0-9a-f]{6}$/i;
const slug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function loadThemes() {
  return readdirSync(themesDir)
    .filter((file) => file.endsWith(".json"))
    .sort((a, b) => a.localeCompare(b))
    .map((file) => {
      const path = new URL(file, themesDir);
      return { file, path, theme: JSON.parse(readFileSync(path, "utf8")) };
    });
}

function assertColorReference(theme, token, value) {
  if (value === "") return;
  if (hexColor.test(value)) return;
  assert.ok(
    Object.hasOwn(theme.vars, value),
    `${theme.name}: colors.${token} references missing var ${value}`,
  );
}

function jpegDimensions(buffer) {
  assert.equal(buffer[0], 0xff, "JPEG must start with SOI marker");
  assert.equal(buffer[1], 0xd8, "JPEG must start with SOI marker");

  let offset = 2;
  while (offset < buffer.length) {
    while (buffer[offset] === 0xff) offset += 1;
    const marker = buffer[offset];
    offset += 1;

    if (marker === 0xd9 || marker === 0xda) break;
    const length = buffer.readUInt16BE(offset);
    const isStartOfFrame =
      (marker >= 0xc0 && marker <= 0xc3) ||
      (marker >= 0xc5 && marker <= 0xc7) ||
      (marker >= 0xc9 && marker <= 0xcb) ||
      (marker >= 0xcd && marker <= 0xcf);

    if (isStartOfFrame) {
      return {
        height: buffer.readUInt16BE(offset + 3),
        width: buffer.readUInt16BE(offset + 5),
      };
    }

    offset += length;
  }

  throw new Error("Unable to read JPEG dimensions");
}

describe("pi themes", () => {
  const themes = loadThemes();

  it("contains a non-empty set of theme files", () => {
    assert.ok(themes.length > 0);
  });

  it("uses unique slug names matching file names", () => {
    const names = new Set();
    for (const { file, theme } of themes) {
      assert.match(theme.name, slug, `${file}: name must be a slug`);
      assert.equal(theme.name, basename(file, ".json"), `${file}: name must match file name`);
      assert.ok(!names.has(theme.name), `${theme.name}: duplicate theme name`);
      names.add(theme.name);
    }
  });

  it("declares the pi theme schema", () => {
    for (const { theme } of themes) {
      assert.equal(theme.$schema, schemaUrl, `${theme.name}: unexpected schema URL`);
    }
  });

  it("defines valid vars, color tokens, and export colors", () => {
    for (const { theme } of themes) {
      assert.equal(typeof theme.vars, "object", `${theme.name}: missing vars`);
      assert.equal(typeof theme.colors, "object", `${theme.name}: missing colors`);
      assert.equal(typeof theme.export, "object", `${theme.name}: missing export colors`);

      for (const [key, value] of Object.entries(theme.vars)) {
        assert.match(value, hexColor, `${theme.name}: vars.${key} must be a 6-digit hex color`);
      }

      for (const token of requiredColorTokens) {
        assert.ok(Object.hasOwn(theme.colors, token), `${theme.name}: missing colors.${token}`);
        assertColorReference(theme, token, theme.colors[token]);
      }

      for (const token of requiredExportTokens) {
        assert.match(theme.export[token], hexColor, `${theme.name}: export.${token} must be a 6-digit hex color`);
      }
    }
  });

  it("has a correctly sized preview screenshot for every theme", () => {
    for (const { file, theme } of themes) {
      const screenshot = new URL(`${basename(file, ".json")}.jpg`, screenshotsDir);
      assert.ok(existsSync(screenshot), `${theme.name}: missing screenshot`);

      const { width, height } = jpegDimensions(readFileSync(screenshot));
      assert.equal(width, 1440, `${theme.name}: screenshot width must be 1440px`);
      assert.equal(height, 1100, `${theme.name}: screenshot height must be 1100px`);
    }
  });

});
