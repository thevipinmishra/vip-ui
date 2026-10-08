import { catalogGroups } from "@/lib/catalog";
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
    `- [Installation](${site}/components/installation): one-time setup, CLI install, and the manual path.`,
    `- [React Aria](${site}/components/react-aria): contexts, forms, and internationalization, with links to the React Aria documentation.`,
    `- [Components](${site}/components): the full catalog, grouped by purpose.`,
    `- [Themes](${site}/themes): live OKLCH theme tokens with copyable CSS.`,
    `- [Charts](${site}/charts): chart examples built on TanStack Charts.`,
    `- [Examples](${site}/examples): complete app screens composed from the library.`,
    `- [License](${site}/license): MIT.`,
    "",
  ];

  for (const group of catalogGroups) {
    lines.push(`## ${group.title}`, "", group.description, "");
    for (const component of group.components) {
      lines.push(
        `- [${component.name}](${site}/components/${component.slug}.md): ${component.useFor}`,
      );
    }
    lines.push("");
  }

  return new Response(`${lines.join("\n").trimEnd()}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
