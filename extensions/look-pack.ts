/**
 * Awesome Pi Themes — Look Pack (opt-in)
 *
 * Companion extension to the color themes in this repo. Ships with the
 * package but does nothing until explicitly enabled with /look-pack, so
 * installing npm:awesome-pi-themes for the colors alone changes nothing.
 *
 * Once enabled, it replaces pi's built-in startup header with a branded
 * banner, and the footer with a bolder, powerline-style status line (git
 * branch, context-usage gauge, model, tokens, cost). Every color and
 * background comes from the active theme's tokens (theme.fg/theme.bg), so
 * it matches whichever of the 52 themes is active without extra config.
 *
 * The header is only redrawable while it's still on screen — like pi's own
 * built-in banner, it scrolls into real terminal scrollback once the
 * conversation grows and can't be swapped in place after that. The enabled
 * state is persisted, so the header reliably appears at the top of every
 * future session (right after toggling on, start a fresh one with /new or
 * by relaunching pi). The footer lives in the always-redrawn bottom region
 * and updates instantly.
 *
 * Try it standalone:
 *   pi -e ./extensions/look-pack.ts
 *   then run /look-pack, then /new to see the header at the top
 *
 * Toggle on/off (persisted across sessions):
 *   /look-pack
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
import type { AssistantMessage } from "@earendil-works/pi-ai";
import type { ExtensionAPI, ExtensionContext } from "@earendil-works/pi-coding-agent";
import { truncateToWidth, visibleWidth } from "@earendil-works/pi-tui";

function formatCount(n: number): string {
	return n < 1000 ? String(n) : `${(n / 1000).toFixed(1)}k`;
}

function statePath(): string {
	const dir = process.env.PI_CODING_AGENT_DIR || join(homedir(), ".pi", "agent");
	return join(dir, "awesome-pi-themes-look-pack.json");
}

function readEnabled(): boolean {
	try {
		const raw = readFileSync(statePath(), "utf8");
		return JSON.parse(raw).enabled === true;
	} catch {
		return false;
	}
}

function writeEnabled(value: boolean): void {
	try {
		const path = statePath();
		if (!existsSync(dirname(path))) mkdirSync(dirname(path), { recursive: true });
		writeFileSync(path, JSON.stringify({ enabled: value }), "utf8");
	} catch {
		// Best effort — the toggle still works for the current session.
	}
}

// 10-cell gauge, e.g. "▰▰▰▰▰▰▱▱▱▱"
function contextGauge(percent: number): string {
	const filled = Math.max(0, Math.min(10, Math.round(percent / 10)));
	return "▰".repeat(filled) + "▱".repeat(10 - filled);
}

function applyLook(ctx: ExtensionContext): void {
	ctx.ui.setHeader((_tui, theme) => ({
		render(width: number): string[] {
			const brand = theme.bg("selectedBg", theme.fg("accent", " awesome-pi-themes "));
			const subtitle = theme.fg("muted", ` theme: ${theme.name ?? "unknown"}`);
			const rule = theme.fg("border", "─".repeat(Math.max(1, width)));
			return ["", `  ${brand}${subtitle}`, rule];
		},
	}));

	ctx.ui.setFooter((tui, theme, footerData) => {
		const unsubscribe = footerData.onBranchChange(() => tui.requestRender());
		return {
			dispose: unsubscribe,
			render(width: number): string[] {
				const branch = footerData.getGitBranch();
				const left = branch ? theme.bg("selectedBg", theme.fg("accent", ` ⎇ ${branch} `)) : "";

				const usage = ctx.getContextUsage();
				const percent = usage?.percent != null ? Math.round(usage.percent) : null;
				const gaugeBg = percent == null || percent < 50 ? "toolSuccessBg" : percent < 80 ? "selectedBg" : "toolErrorBg";
				const gaugeFg = percent == null || percent < 50 ? "success" : percent < 80 ? "warning" : "error";
				const gaugeSeg =
					percent != null
						? theme.bg(gaugeBg, theme.fg(gaugeFg, ` ${contextGauge(percent)} ${percent}% `))
						: theme.fg("dim", " — ");

				let input = 0;
				let output = 0;
				let cost = 0;
				for (const entry of ctx.sessionManager.getBranch()) {
					if (entry.type === "message" && entry.message.role === "assistant") {
						const message = entry.message as AssistantMessage;
						input += message.usage.input;
						output += message.usage.output;
						cost += message.usage.cost.total;
					}
				}
				const modelSeg = theme.bg("selectedBg", theme.fg("muted", ` ${ctx.model?.id ?? "no-model"} `));
				const statsSeg = theme.fg("dim", `↑${formatCount(input)} ↓${formatCount(output)} $${cost.toFixed(3)}`);
				const sep = theme.fg("dim", " │ ");

				const right = [modelSeg, statsSeg, gaugeSeg].join(sep);
				const pad = " ".repeat(Math.max(1, width - visibleWidth(left) - visibleWidth(right)));
				return [truncateToWidth(left + pad + right, width)];
			},
		};
	});
}

function restoreDefault(ctx: ExtensionContext): void {
	ctx.ui.setHeader(undefined);
	ctx.ui.setFooter(undefined);
}

export default function (pi: ExtensionAPI) {
	let enabled = readEnabled();

	pi.on("session_start", async (_event, ctx) => {
		if (ctx.mode !== "tui" || !enabled) return;
		applyLook(ctx);
	});

	pi.registerCommand("look-pack", {
		description: "Toggle the awesome-pi-themes header/footer look pack (persists across sessions)",
		handler: async (_args, ctx) => {
			if (ctx.mode !== "tui") {
				ctx.ui.notify("Look pack only applies to interactive (tui) mode", "warning");
				return;
			}

			enabled = !enabled;
			writeEnabled(enabled);

			if (enabled) {
				applyLook(ctx);
				ctx.ui.notify(
					"Look pack enabled. Footer updates now; the header only shows at the top of a session — run /new or restart pi to see it.",
					"info",
				);
			} else {
				restoreDefault(ctx);
				ctx.ui.notify("Look pack disabled — built-in header/footer restored", "info");
			}
		},
	});
}
