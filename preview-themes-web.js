#!/usr/bin/env node
import { createServer } from "node:http";
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = __dirname;
const themesDir = join(repoRoot, "themes");
const pagesDir = join(repoRoot, "docs");
const pagesIndex = join(pagesDir, "index.html");
const port = Number(process.env.PORT || 4173);
const host = "127.0.0.1";

function loadThemes() {
  return readdirSync(themesDir)
    .filter((file) => file.endsWith(".json"))
    .sort((a, b) => a.localeCompare(b))
    .map((file) => {
      const theme = JSON.parse(readFileSync(join(themesDir, file), "utf8"));
      return { file, ...theme };
    });
}

function resolveColor(theme, token, fallback = "#ffffff") {
  if (!token) return theme.vars?.fg || fallback;
  if (typeof token === "string" && token.startsWith("#")) return token;
  return theme.vars?.[token] || fallback;
}

function enrichTheme(theme) {
  const c = theme.colors || {};
  return {
    ...theme,
    resolved: {
      bg: theme.export?.pageBg || theme.vars?.bg || "#111111",
      fg: theme.vars?.fg || "#eeeeee",
      panel: theme.vars?.panel || theme.export?.cardBg || theme.vars?.bg || "#181818",
      panelAlt: theme.vars?.panelAlt || theme.export?.infoBg || theme.vars?.bg || "#202020",
      accent: resolveColor(theme, c.accent, theme.vars?.accent || "#ffd166"),
      border: resolveColor(theme, c.border, theme.vars?.gray || "#666666"),
      muted: resolveColor(theme, c.muted, theme.vars?.gray || "#888888"),
      success: resolveColor(theme, c.success, theme.vars?.success || "#70e000"),
      error: resolveColor(theme, c.error, theme.vars?.error || "#ff5c8a"),
      warning: resolveColor(theme, c.warning, theme.vars?.warning || "#ffd166"),
      secondary: theme.vars?.secondary || resolveColor(theme, c.mdLink, "#80bfff"),
      mdHeading: resolveColor(theme, c.mdHeading, theme.vars?.white || theme.vars?.fg || "#ffffff"),
      mdCode: resolveColor(theme, c.mdCode, theme.vars?.accent || "#ffd166"),
      syntaxComment: resolveColor(theme, c.syntaxComment, theme.vars?.gray || "#888888"),
      syntaxKeyword: resolveColor(theme, c.syntaxKeyword, theme.vars?.accent || "#ffd166"),
      syntaxFunction: resolveColor(theme, c.syntaxFunction, theme.vars?.secondary || "#80bfff"),
      syntaxString: resolveColor(theme, c.syntaxString, theme.vars?.success || "#70e000"),
      syntaxNumber: resolveColor(theme, c.syntaxNumber, theme.vars?.warning || "#ffd166"),
      syntaxOperator: resolveColor(theme, c.syntaxOperator, theme.vars?.error || "#ff5c8a"),
      diffAdded: resolveColor(theme, c.toolDiffAdded, theme.vars?.success || "#70e000"),
      diffRemoved: resolveColor(theme, c.toolDiffRemoved, theme.vars?.error || "#ff5c8a"),
      diffContext: resolveColor(theme, c.toolDiffContext, theme.vars?.fg || "#eeeeee"),
      selectedBg: resolveColor(theme, c.selectedBg, theme.vars?.panelInfo || theme.vars?.panelAlt || "#202020"),
      userMessageBg: resolveColor(theme, c.userMessageBg, theme.vars?.panel || "#181818"),
      userMessageText: resolveColor(theme, c.userMessageText, theme.vars?.fg || "#eeeeee"),
      customMessageBg: resolveColor(theme, c.customMessageBg, theme.vars?.panelAlt || "#202020"),
      customMessageText: resolveColor(theme, c.customMessageText, theme.vars?.fg || "#eeeeee"),
      customMessageLabel: resolveColor(theme, c.customMessageLabel, theme.vars?.accent || "#ffd166"),
      toolPendingBg: resolveColor(theme, c.toolPendingBg, theme.vars?.panelAlt || "#202020"),
      toolSuccessBg: resolveColor(theme, c.toolSuccessBg, theme.vars?.panelSuccess || theme.vars?.panel || "#182218"),
      toolErrorBg: resolveColor(theme, c.toolErrorBg, theme.vars?.panelError || theme.vars?.panel || "#221818"),
      toolTitle: resolveColor(theme, c.toolTitle, theme.vars?.white || theme.vars?.fg || "#ffffff"),
      toolOutput: resolveColor(theme, c.toolOutput, theme.vars?.fg || "#eeeeee"),
    },
  };
}

const themes = loadThemes().map(enrichTheme);

const html = String.raw`<!doctype html>
<html lang="it">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>awesome pi themes preview</title>
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif; background: #111; color: #eee; }
    .app { display: grid; grid-template-columns: 310px 1fr; min-height: 100vh; }
    aside { border-right: 1px solid #333; background: #151515; padding: 14px; position: sticky; top: 0; height: 100vh; overflow: auto; }
    h1 { font-size: 16px; margin: 0 0 12px; }
    input { width: 100%; padding: 10px 12px; border-radius: 10px; border: 1px solid #444; background: #0f0f0f; color: #fff; margin-bottom: 10px; }
    .hint { color: #aaa; font-size: 12px; line-height: 1.4; margin-bottom: 10px; }
    .theme-list { display: grid; gap: 6px; }
    .theme-btn { text-align: left; padding: 8px; border: 1px solid #333; border-radius: 10px; background: #202020; color: #ddd; cursor: pointer; display: grid; gap: 6px; }
    .theme-btn:hover, .theme-btn.active { border-color: var(--accent, #ffd166); outline: 1px solid var(--accent, #ffd166); }
    .swatches { display: flex; gap: 4px; }
    .swatch { width: 18px; height: 12px; border-radius: 3px; border: 1px solid rgba(255,255,255,.15); }
    main { background: #111; color: #eee; padding: 28px; transition: background .12s, color .12s; }
    .topbar { display: flex; justify-content: space-between; gap: 16px; align-items: start; margin-bottom: 18px; }
    .title { margin: 0; color: #eee; font-size: 30px; }
    .sub { color: #aaa; margin-top: 4px; }
    .copy { border: 1px solid #444; background: #202020; color: #eee; padding: 9px 12px; border-radius: 10px; cursor: pointer; }
    .grid { display: grid; grid-template-columns: repeat(2, minmax(320px, 1fr)); gap: 16px; }
    .wide { grid-column: 1 / -1; }
    .card { background: #151515; border: 1px solid #333; border-radius: 16px; padding: 16px; box-shadow: 0 16px 40px rgba(0,0,0,.22); }
    .card.alt { background: #202020; }
    .card h2 { color: #eee; margin: 0 0 12px; font-size: 18px; }
    .message { border-left: 4px solid var(--accent); padding: 10px 12px; background: color-mix(in srgb, var(--panelAlt) 78%, transparent); border-radius: 8px; margin: 10px 0; }
    .success { color: var(--success); } .error { color: var(--error); } .warning { color: var(--warning); } .muted { color: var(--muted); }
    pre { margin: 0; overflow: auto; padding: 14px; border: 1px solid var(--border); border-radius: 12px; background: var(--bg); line-height: 1.45; }
    code { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
    .kw { color: var(--kw); } .fn { color: var(--fn); } .str { color: var(--str); } .num { color: var(--num); } .op { color: var(--op); } .com { color: var(--comment); }
    .palette { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 8px; width: 100%; }
    .color { min-width: 0; border: 1px solid #333; border-radius: 10px; overflow: hidden; background: #202020; }
    .chip { height: 38px; }
    .label { padding: 7px; font-size: 10px; color: #aaa; overflow-wrap: anywhere; }
    .diff div { padding: 3px 8px; font-family: ui-monospace, monospace; border-radius: 4px; margin: 2px 0; }
    .add { color: var(--diffAdded); background: color-mix(in srgb, var(--diffAdded) 16%, transparent); }
    .del { color: var(--diffRemoved); background: color-mix(in srgb, var(--diffRemoved) 16%, transparent); }
    .ctx { color: var(--diffContext); }
    .pi-terminal { background: #020202; border: 1px solid color-mix(in srgb, var(--border) 55%, #000 45%); border-radius: 8px; overflow: hidden; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace; box-shadow: 0 24px 80px rgba(0,0,0,.5); }
    .pi-body { min-height: 760px; background: color-mix(in srgb, var(--bg) 38%, #000 62%); color: var(--fg); font-size: 13px; line-height: 1.42; overflow: auto; }
    .term-top { display: flex; align-items: center; justify-content: space-between; gap: 18px; padding: 0 10px 10px 0; color: color-mix(in srgb, var(--fg) 78%, var(--muted) 22%); white-space: nowrap; }
    .term-segment { color: inherit; font-weight: 400; }
    .term-status { color: color-mix(in srgb, var(--accent) 70%, var(--fg) 30%); }
    .term-content { padding: 10px 10px 0; min-width: 980px; }
    .term-line { white-space: pre-wrap; min-height: 1.42em; }
    .term-blank { height: 1.42em; }
    .term-dim { color: var(--muted); } .term-green { color: var(--success); } .term-red { color: var(--error); } .term-yellow { color: var(--warning); } .term-blue { color: color-mix(in srgb, var(--fn) 78%, var(--fg) 22%); } .term-magenta { color: color-mix(in srgb, var(--accent) 68%, var(--fg) 32%); } .term-cyan { color: color-mix(in srgb, var(--secondary) 72%, var(--fg) 28%); } .term-bold { color: var(--heading); font-weight: 700; }
    .term-rule { height: 1px; background: var(--warning); margin: 11px 0 9px; }
    .term-input { margin: 14px -9px 14px; padding: 14px 10px; background: color-mix(in srgb, var(--selectedBg) 52%, transparent); color: var(--userText); }
    .md-heading { color: var(--heading); font-weight: 800; }
    .fence { color: color-mix(in srgb, var(--accent) 82%, var(--fg) 18%); }
    .diff-add { color: var(--diffAdded); } .diff-del { color: var(--diffRemoved); }
    .note-line { color: var(--accent); font-style: italic; }
    .pi-footer { margin-top: 22px; border-top: 2px solid var(--accent); color: var(--muted); }
    .pi-footer-input { height: 32px; border-bottom: 2px solid var(--accent); background: rgba(255,255,255,.015); display: flex; align-items: center; }
    .pi-footer-path { padding-top: 6px; color: color-mix(in srgb, var(--accent) 68%, var(--fg) 32%); }
    .pi-footer-status { display: flex; justify-content: space-between; gap: 20px; padding: 2px 0 12px; color: color-mix(in srgb, var(--accent) 68%, var(--fg) 32%); }
    .pi-cursor { display: inline-block; width: 9px; height: 1.15em; background: var(--fg); vertical-align: -2px; margin-left: 2px; animation: blink 1.05s steps(1) infinite; }
    @keyframes blink { 50% { opacity: .12; } }
    @media (max-width: 900px) { .app { grid-template-columns: 1fr; } aside { position: static; height: auto; } .grid { grid-template-columns: 1fr; } .wide { grid-column: auto; } }
  </style>
</head>
<body>
  <div class="app">
    <aside>
      <h1>awesome pi themes</h1>
      <input id="search" placeholder="Search themes..." autofocus />
      <div class="hint"><span id="count"></span> themes. Use ↑/↓ to switch, Enter to copy the theme name.</div>
      <div id="list" class="theme-list"></div>
    </aside>
    <main id="preview"></main>
  </div>
<script>
const themes = __THEMES__;
let selected = 0;
let filtered = themes.slice();
const list = document.querySelector('#list');
const search = document.querySelector('#search');
const preview = document.querySelector('#preview');
const count = document.querySelector('#count');

function setVars(t) {
  const r = t.resolved;
  for (const [k, v] of Object.entries({
    bg:r.bg, fg:r.fg, panel:r.panel, panelAlt:r.panelAlt, accent:r.accent, border:r.border, muted:r.muted,
    success:r.success, error:r.error, warning:r.warning, heading:r.mdHeading, code:r.mdCode, kw:r.syntaxKeyword, fn:r.syntaxFunction,
    str:r.syntaxString, num:r.syntaxNumber, op:r.syntaxOperator, comment:r.syntaxComment, diffAdded:r.diffAdded,
    diffRemoved:r.diffRemoved, diffContext:r.diffContext, selectedBg:r.selectedBg, userBg:r.userMessageBg, userText:r.userMessageText,
    customBg:r.customMessageBg, customText:r.customMessageText, customLabel:r.customMessageLabel, toolBg:r.toolPendingBg,
    toolSuccessBg:r.toolSuccessBg, toolErrorBg:r.toolErrorBg, toolTitle:r.toolTitle, toolOutput:r.toolOutput
  })) preview.style.setProperty('--' + k, v);
}
function renderList() {
  count.textContent = filtered.length;
  list.innerHTML = filtered.map((t, i) => '<button class="theme-btn '+(i===selected?'active':'')+'" data-i="'+i+'" style="--accent:'+t.resolved.accent+'"><b>'+t.name+'</b><div class="swatches">'+
    ['bg','fg','accent','secondary','success','warning','error'].map(k => '<span class="swatch" style="background:'+ (t.resolved[k] || t.vars[k]) +'"></span>').join('') +
    '</div></button>').join('');
  list.querySelectorAll('button').forEach(b => b.onclick = () => select(Number(b.dataset.i)));
  list.querySelector('.active')?.scrollIntoView({ block: 'nearest' });
}
function renderPreview() {
  const t = filtered[selected] || themes[0];
  if (!t) return;
  setVars(t);
  const vars = ['bg','fg','panel','panelAlt','accent','secondary','success','warning','error','muted','diffAdded','diffRemoved'];
  const themeList = themes.map(theme => theme.name).join(', ');
  const terminalLines = [
    '<div class="term-top"><div><span class="term-segment">/awesome-pi-themes</span> pi</div><div class="term-status">✓  system  13:18:02</div></div>',
    '<div class="term-line"><span class="term-magenta">pi v0.80.10</span></div>',
    '<div class="term-line"><span class="term-dim">escape interrupt · ctrl+c/ctrl+d clear/exit · / commands · ! bash · ctrl+o more</span></div>',
    '<div class="term-line"><span class="term-dim">Press ctrl+o to show full startup help and loaded resources.</span></div>',
    '<div class="term-blank"></div>',
    '<div class="term-line">Pi can explain its own features and look up its docs. Ask it how to use or extend Pi.</div>',
    '<div class="term-blank"></div>',
    '<div class="term-line">[Context]</div>',
    '<div class="term-line">  <span class="term-magenta">AGENTS.md</span></div>',
    '<div class="term-blank"></div>',
    '<div class="term-line">[Skills]</div>',
    '<div class="term-line">  <span class="term-magenta">adapt-ghostty-theme-to-pi</span></div>',
    '<div class="term-blank"></div>',
    '<div class="term-line">[Themes]</div>',
    '<div class="term-line">  <span class="term-magenta">' + themeList + '</span></div>',
    '<div class="term-rule"></div>',
    '<div class="term-line"><span class="term-yellow term-bold">Update Available</span></div>',
    '<div class="term-line"><span class="term-magenta">New version 0.82.0 is available. Run pi update</span></div>',
    '<div class="term-line"><span class="term-magenta">Changelog: https://pi.dev/changelog</span></div>',
    '<div class="term-rule"></div>',
    '<div class="term-input">Hello Pi! Reply with sample data to showcase the theme!</div>',
    '<div class="term-line"><span class="note-line">Planning markdown samples with syntax highlighting</span></div>',
    '<div class="term-blank"></div>',
    '<div class="term-line">Sure Davide! Here are some sample for the theme <span class="term-magenta">' + t.name + '</span>.</div>',
    '<div class="term-blank"></div>',
    '<div class="term-line"><span class="md-heading">### JavaScript syntax highlighting</span></div>',
    '<div class="term-blank"></div>',
    '<div class="term-line"><span class="fence">\`\`\`js</span></div>',
    '<div class="term-line">  <span class="kw">function</span> <span class="fn">greet</span>(name) {</div>',
    '<div class="term-line">    <span class="kw">const</span> message <span class="op">=</span> <span class="str">&#96;Hello, \${name}!&#96;</span>;</div>',
    '<div class="term-line">    console.<span class="fn">log</span>(message);</div>',
    '<div class="term-line">    <span class="kw">return</span> message;</div>',
    '<div class="term-line">  }</div>',
    '<div class="term-blank"></div>',
    '<div class="term-line">  <span class="fn">greet</span>(<span class="str">"Pi"</span>);</div>',
    '<div class="term-line"><span class="fence">\`\`\`</span></div>',
    '<div class="term-blank"></div>',
    '<div class="term-line"><span class="md-heading">### Python syntax highlighting</span></div>',
    '<div class="term-blank"></div>',
    '<div class="term-line"><span class="fence">\`\`\`python</span></div>',
    '<div class="term-line">  <span class="kw">from</span> dataclasses <span class="kw">import</span> dataclass</div>',
    '<div class="term-blank"></div>',
    '<div class="term-line">  <span class="term-magenta">@dataclass</span></div>',
    '<div class="term-line">  <span class="kw">class</span> <span class="fn">Theme</span>:</div>',
    '<div class="term-line">      name: str</div>',
    '<div class="term-line">      dark: bool <span class="op">=</span> <span class="kw">True</span></div>',
    '<div class="term-blank"></div>',
    '<div class="term-line">  theme <span class="op">=</span> <span class="fn">Theme</span>(name<span class="op">=</span><span class="str">"' + t.name + '"</span>)</div>',
    '<div class="term-line">  <span class="fn">print</span>(theme)</div>',
    '<div class="term-line"><span class="fence">\`\`\`</span></div>',
    '<div class="term-blank"></div>',
    '<div class="term-line"><span class="md-heading">### Shell commands</span></div>',
    '<div class="term-blank"></div>',
    '<div class="term-line"><span class="fence">\`\`\`bash</span></div>',
    '<div class="term-line">  npm run check</div>',
    '<div class="term-line">  npm run build</div>',
    '<div class="term-line"><span class="fence">\`\`\`</span></div>',
    '<div class="term-blank"></div>',
    '<div class="term-line"><span class="md-heading">### JSON block</span></div>',
    '<div class="term-blank"></div>',
    '<div class="term-line"><span class="fence">\`\`\`json</span></div>',
    '<div class="term-line">  {</div>',
    '<div class="term-line">    <span class="str">"name"</span>: <span class="str">"' + t.name + '"</span>,</div>',
    '<div class="term-line">    <span class="str">"type"</span>: <span class="str">"dark"</span>,</div>',
    '<div class="term-line">    <span class="str">"colors"</span>: {</div>',
    '<div class="term-line">      <span class="str">"background"</span>: <span class="str">"' + t.resolved.bg + '"</span>,</div>',
    '<div class="term-line">      <span class="str">"foreground"</span>: <span class="str">"' + t.resolved.fg + '"</span></div>',
    '<div class="term-line">    }</div>',
    '<div class="term-line">  }</div>',
    '<div class="term-line"><span class="fence">\`\`\`</span></div>',
    '<div class="term-blank"></div>',
    '<div class="term-line"><span class="md-heading">### Code diff</span></div>',
    '<div class="term-blank"></div>',
    '<div class="term-line"><span class="fence">\`\`\`diff</span></div>',
    '<div class="term-line diff-del">  - const themeName = "old-theme";</div>',
    '<div class="term-line diff-add">  + const themeName = "' + t.name + '";</div>',
    '<div class="term-blank"></div>',
    '<div class="term-line diff-del">  - console.log("invalid");</div>',
    '<div class="term-line diff-add">  + console.log("validated");</div>',
    '<div class="term-line"><span class="fence">\`\`\`</span></div>',
    '<div class="term-blank"></div>',
    '<div class="term-line"><span class="md-heading">### Plain text block</span></div>',
    '<div class="term-blank"></div>',
    '<div class="term-line"><span class="fence">\`\`\`text</span></div>',
    '<div class="term-line">  Validation complete.</div>',
    '<div class="term-line">  All theme files are valid.</div>',
    '<div class="term-line">  No changes required.</div>',
    '<div class="term-line"><span class="fence">\`\`\`</span></div>',
    '<div class="term-blank"></div>',
    '<div class="term-line"><span class="md-heading">### Warning / note style</span></div>',
    '<div class="term-blank"></div>',
    '<div class="term-line"><span class="note-line">│ Note: I usually show file paths clearly, like themes/' + t.file + ', when discussing edits.</span></div>',
    '<div class="term-blank"></div>',
    '<div class="term-line"><span class="md-heading">### Checklist</span></div>',
    '<div class="term-blank"></div>',
    '<div class="term-line"><span class="term-magenta">- [x]</span> Read relevant files</div>',
    '<div class="term-line"><span class="term-magenta">- [x]</span> Make precise edits</div>',
    '<div class="term-line"><span class="term-magenta">- [x]</span> Run validation</div>',
    '<div class="term-line"><span class="term-magenta">- [ ]</span> Commit changes if requested</div>',
    '<div class="pi-footer"><div class="pi-footer-input"><span class="pi-cursor"></span></div><div class="pi-footer-path">/awesome-pi-themes</div><div class="pi-footer-status"><span>↑2.1k ↓334 $0.021 (sub) 0.9%/272k (auto)</span><span>your-favorite-model • medium</span></div></div>'
  ];
  preview.innerHTML = [
    '<div class="topbar"><div><h1 class="title">' + t.name + '</h1><div class="sub">' + t.file + '</div></div><button class="copy" id="copy">Copy theme name</button></div>',
    '<div class="grid">',
    '<section class="card wide"><h2>Palette</h2><div class="palette">' + vars.map(k => '<div class="color"><div class="chip" style="background:' + (t.resolved[k] || t.vars[k]) + '"></div><div class="label">' + k + '<br>' + (t.resolved[k] || t.vars[k]) + '</div></div>').join('') + '</div></section>',
    '<section class="card wide"><h2>Terminal</h2><div class="pi-terminal"><div class="pi-body"><div class="term-content">' + terminalLines.join('') + '</div></div></div></section>',
    '</div>'
  ].join('');
  document.querySelector('#copy').onclick = async () => navigator.clipboard.writeText(t.name);
}
function select(i) { selected = Math.max(0, Math.min(i, filtered.length - 1)); renderList(); renderPreview(); }
search.oninput = () => { const q = search.value.toLowerCase(); filtered = themes.filter(t => t.name.toLowerCase().includes(q)); selected = 0; renderList(); renderPreview(); };
document.addEventListener('keydown', e => { if (e.key === 'ArrowDown') { e.preventDefault(); select(selected + 1); } if (e.key === 'ArrowUp') { e.preventDefault(); select(selected - 1); } if (e.key === 'Enter') { navigator.clipboard.writeText((filtered[selected] || themes[0]).name); } });
renderList(); renderPreview();
</script>
</body>
</html>`;

const page = html.replace("__THEMES__", JSON.stringify(themes));

function buildStaticSite() {
  mkdirSync(pagesDir, { recursive: true });
  writeFileSync(pagesIndex, page, "utf8");
  console.log(`Static build ready: ${pagesIndex}`);
}

function servePreview() {
  const server = createServer((req, res) => {
    res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    res.end(page);
  });

  server.listen(port, host, () => {
    console.log(`Web preview ready: http://${host}:${port}`);
    console.log("Open this URL in your browser. Press Ctrl+C to stop the server.");
  });
}

if (process.argv.includes("--build")) {
  buildStaticSite();
} else if (process.argv.includes("--check-themes")) {
  console.log(`Valid themes: ${themes.length}`);
} else {
  servePreview();
}
