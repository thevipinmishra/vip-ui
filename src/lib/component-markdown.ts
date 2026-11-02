import { type ApiPart, showsPartHeadings } from "./component-api";
import { displayPath, fileName, type ManualInstallPlan } from "./registry-docs";

export interface ComponentMarkdownInput {
  slug: string;
  name: string;
  description: string;
  site: string;
  manual: ManualInstallPlan;
  cliUrl?: string | null;
  usage?: { code: string; filename: string };
  api?: readonly ApiPart[];
  examples?: {
    title: string;
    description?: string;
    code?: string;
    filename?: string;
    uses?: readonly string[];
  }[];
  reactAria?: { name: string; href: string };
}

export function buildComponentMarkdown({
  slug,
  name,
  description,
  site,
  manual,
  cliUrl,
  usage,
  api,
  examples,
  reactAria,
}: ComponentMarkdownInput): string {
  const pageUrl = `${site}/components/${slug}`;
  const lines: string[] = [`# ${name}`, "", description.trim()];

  if (usage) {
    lines.push(
      "",
      "```tsx",
      usage.code.trim(),
      "```",
      "",
      `Source: \`${usage.filename}\``,
    );
  }

  lines.push(
    "",
    "## Links",
    "",
    `- [Documentation](${pageUrl})`,
    `- [Installation](${site}/components/installation)`,
  );
  lines.push(
    `- [Registry item](${cliUrl ?? `${site}/r/vip-${slug}.json`})`,
    "",
    "## Installation",
    "",
  );

  if (cliUrl) {
    lines.push("```bash", `pnpm dlx shadcn@latest add ${cliUrl}`, "```", "");
  }

  lines.push(
    "### Manual",
    "",
    `Complete the [one-time setup](${site}/components/installation#manual) first.`,
  );
  if (manual.packages.length > 0) {
    lines.push(
      "",
      "Install the packages:",
      "",
      "```bash",
      `pnpm add ${manual.packages.join(" ")}`,
      "```",
    );
  }
  if (manual.requires.length > 0) {
    lines.push("", "Add the required files:", "");
    for (const file of manual.requires) {
      lines.push(
        file.kind === "component"
          ? `- [${file.name}](${site}/components/${file.slug}.md): \`${displayPath(file.file)}\``
          : `- [\`${fileName(file.file)}\`](${site}/components/installation#file-${file.slug}): ${file.description}`,
      );
    }
  }
  lines.push(
    "",
    `Add \`${displayPath(manual.component)}\`:`,
    "",
    "```tsx",
    manual.component.content.trim(),
    "```",
  );

  if (examples && examples.length > 0) {
    examples.forEach((example) => {
      lines.push("", `## ${example.title}`);
      if (example.description) {
        lines.push("", example.description.trim());
      }
      if (example.uses?.length) {
        lines.push("", `Also install: ${example.uses.join(", ")}.`);
      }
      if (example.code) {
        lines.push("", "```tsx", example.code.trim(), "```");
        if (example.filename) {
          lines.push("", `Source: \`${example.filename}\``);
        }
      }
    });
  }

  if (api?.length || reactAria) {
    lines.push("", "## API reference");
    if (reactAria) {
      const link = `[React Aria ${reactAria.name}](${reactAria.href})`;
      lines.push(
        "",
        api?.length
          ? `vip/ui adds or changes the props below. For all other props, see ${link}.`
          : `${name} takes the props of ${link}.`,
      );
    }
    if (api?.length) {
      const headings = showsPartHeadings(api, slug);
      for (const part of api) {
        lines.push("");
        if (headings) lines.push(`### ${part.name}`, "");
        if (part.description) lines.push(part.description, "");
        for (const prop of part.props) {
          const value = prop.default ? ` = ${prop.default}` : "";
          const required = prop.required ? " (required)" : "";
          lines.push(
            `- \`${prop.name}: ${prop.type}${value}\`${required}: ${prop.description}`,
          );
        }
      }
    }
  }

  return `${lines.join("\n").trimEnd()}\n`;
}
