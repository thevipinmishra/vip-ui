import { installSteps, setupDocUrl } from "@/lib/agent-docs";
import { agentSiteUrl } from "@/lib/site-url";
import { findFont } from "../fonts";
import { presetCss, presetMarkup, presets } from "../presets";

export const dynamic = "force-static";

function presetLine(preset: (typeof presets)[number]) {
  const { settings } = preset;
  const families = [
    ...new Set([settings.body, settings.heading, settings.mono]),
  ]
    .map((font) => findFont(font).name)
    .join(", ");
  const measure =
    settings.measure === null ? "full width" : `${settings.measure}ch measure`;
  return `- **${preset.name}**: ${families}. ${settings.size}px, ${settings.leading} line height, ${settings.flow}em spacing, ${measure}.`;
}

export function GET() {
  const site = agentSiteUrl();
  const docs = presetMarkup(presets[0].settings);
  const css = presetCss(presets[0].settings);
  const lines = [
    "# Typography",
    "",
    "One CSS file styles HTML and rendered markdown. It sets the font families, size, line height, spacing, and line length with CSS variables.",
    "",
    "## Installation",
    "",
    `The CLI adds the styles and the theme variables they use to the global CSS file. It adds no component files. If the project has no vip/ui theme tokens, do the [setup](${setupDocUrl(site)}) first. Then:`,
    "",
    ...installSteps(`${site}/r/typography.json`),
    "",
    "## Usage",
    "",
    "Add `typography` to an element that contains HTML content, then add a preset class. This is the Docs preset:",
    "",
    "```tsx",
    docs,
    "```",
    "",
    "## Presets",
    "",
    `A preset is a CSS class that sets the variables for one kind of content. Copy it from the [Typography page](${site}/typography) and change any value. The presets are:`,
    "",
    ...presets.map(presetLine),
    "",
    "This is the Docs preset CSS:",
    "",
    "```css",
    css,
    "```",
    "",
    "## Fonts",
    "",
    "The preset variables point to fonts that the app loads, not the item. Load each font in the root layout with `next/font` and put its variable on the `<html>` element. Use `geist/font/sans` and `geist/font/mono`, or `next/font/google`.",
    "",
    "The text fonts are Geist, Inter, IBM Plex Sans, Figtree, Manrope, Source Serif 4, Newsreader, and Lora. The mono fonts are Geist Mono, JetBrains Mono, and IBM Plex Mono.",
    "",
    `Documentation: ${site}/typography`,
  ];

  return new Response(`${lines.join("\n").trimEnd()}\n`, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
