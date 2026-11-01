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
    `- [Themes](${site}/themes): live OKLCH theme tokens and ten 12-step color scales, with copyable CSS.`,
    `- [Charts](${site}/charts): chart examples built on TanStack Charts.`,
    `- [Blocks](${site}/blocks): complete page sections, such as dashboards, sign-in forms, and settings, that install as Next.js routes.`,
    `- [License](${site}/license): MIT.`,
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
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
