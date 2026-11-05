import { catalogGroups } from "@/lib/catalog";
import { docsGuides } from "@/lib/navigation";
import { siteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

export function GET() {
  const site = siteUrl();
  const lines: string[] = [
    "# vip/ui",
    "",
    "> Copyable React components built on React Aria, Tailwind CSS v4, and Motion. Every component page is available as Markdown by appending `.md` to its URL, with the same description, installation files, usage source, named examples with source, and API tables as the HTML page. Pages without named examples export the description, installation, usage, and API sections.",
    "",
    "## Guides",
    "",
    ...docsGuides.map(
      (guide) =>
        `- [${guide.label}](${site}${guide.href}): ${guide.description}`,
    ),
    `- [Components](${site}/components): the full catalog, grouped by purpose.`,
    `- [Themes](${site}/themes): ten color themes made from the vip/ui color scales, with a live preview and copyable CSS.`,
    `- [Colors](${site}/colors): ten OKLCH color scales with 12 steps each, for light and dark mode, with copyable CSS and Tailwind colors.`,
    `- [Charts](${site}/charts): chart examples built on TanStack Charts.`,
    `- [Blocks](${site}/blocks): complete page sections, such as dashboards, sign-in forms, and settings, that install as Next.js routes.`,
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

  return new Response(`${lines.join("\n").trimEnd()}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
