import { setupDocUrl } from "@/lib/agent-docs";
import { blockCategories, blocksIn } from "@/lib/blocks";
import { catalogGroups } from "@/lib/catalog";
import { guideMarkdownUrl } from "@/lib/guide-markdown";
import { docsGuides } from "@/lib/navigation";
import { agentSiteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

export function GET() {
  const site = agentSiteUrl();
  const lines: string[] = [
    "# vip/ui",
    "",
    "> Copyable React components built on React Aria, Tailwind CSS v4, and Motion. Every component and block page is available as Markdown by appending `.md` to its URL, with installation steps, usage, examples, API, and links to the source files.",
    "",
    "## Start here",
    "",
    `- [Agent setup](${setupDocUrl(site)}): read this before you install an item.`,
    "",
    "## Guides",
    "",
    ...docsGuides.map(
      (guide) =>
        `- [${guide.label}](${site}${guide.href}) ([Markdown](${guideMarkdownUrl(site, guide.href)})): ${guide.description}`,
    ),
    `- [Charts Markdown](${site}/charts.md): install the chart frame, then add a chart example.`,
    `- [Typography Markdown](${site}/typography.md): install the styles, then choose a preset and fonts.`,
    `- [Themes Markdown](${site}/themes.md): install a theme item, or copy its CSS.`,
    `- [Components](${site}/components): the full catalog, grouped by purpose.`,
    `- [Themes](${site}/themes): color themes made from the vip/ui color scales, with a live preview, radius and font controls, and copyable CSS.`,
    `- [Colors](${site}/colors): OKLCH neutral and accent color scales with 12 steps each, for light and dark mode, with copyable CSS and Tailwind colors.`,
    `- [Charts](${site}/charts): chart examples built on TanStack Charts.`,
    `- [Blocks](${site}/blocks): complete page sections, such as dashboards, sign-in forms, and settings, that install as React components.`,
    "",
  ];

  for (const group of catalogGroups) {
    lines.push(`## ${group.title}`, "", group.description, "");
    for (const component of group.components) {
      lines.push(
        `- [${component.name}](${site}/components/${component.slug}.md): ${component.description}`,
      );
    }
    lines.push("");
  }

  lines.push(
    "## Blocks",
    "",
    "Complete page sections that install as React components, grouped by category.",
    "",
  );
  for (const category of blockCategories) {
    const items = blocksIn(category.slug);
    if (!items.length) continue;
    lines.push(`### ${category.label}`, "");
    for (const block of items) {
      lines.push(
        `- [${block.title}](${site}/blocks/${block.name}.md): ${block.description}`,
      );
    }
    lines.push("");
  }

  return new Response(`${lines.join("\n").trimEnd()}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
