import { type ApiProp, groupApiProps } from "./component-api";
import type { RegistryItem } from "./registry-docs";

export interface ComponentMarkdownInput {
  slug: string;
  name: string;
  description: string;
  site: string;
  registryItem: RegistryItem;
  cliUrl?: string | null;
  usage?: { code: string; filename: string };
  api?: ApiProp[];
  examples?: {
    title: string;
    description?: string;
    code?: string;
    filename?: string;
    prerequisite?: string;
  }[];
  reactAriaDocsHref?: string;
}

export function buildComponentMarkdown({
  slug,
  name,
  description,
  site,
  registryItem,
  cliUrl,
  usage,
  api,
  examples,
  reactAriaDocsHref,
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
    lines.push("```bash", `pnpm dlx shadcn@latest add ${cliUrl}`, "```");
  } else {
    lines.push(
      `Copy the files manually from the [installation guide](${site}/components/installation).`,
    );
  }

  if (!cliUrl) {
    lines.push("", "Copy these files:", "");
    for (const file of registryItem.files) {
      lines.push(`- \`${file.target}\``);
    }
    if (registryItem.dependencies.length > 0) {
      lines.push(
        "",
        `Dependencies: ${registryItem.dependencies
          .map((dependency) => `\`${dependency}\``)
          .join(", ")}.`,
      );
    }
  }

  if (examples && examples.length > 0) {
    examples.forEach((example) => {
      lines.push("", `## ${example.title}`);
      if (example.description) {
        lines.push("", example.description.trim());
      }
      if (example.code) {
        lines.push("", "```tsx", example.code.trim(), "```");
        if (example.filename) {
          lines.push("", `Source: \`${example.filename}\``);
        }
        if (example.prerequisite) {
          lines.push("", `Prerequisite: ${example.prerequisite}`);
        }
      }
    });
  }

  if ((api && api.length > 0) || reactAriaDocsHref) {
    lines.push("", "## API reference");
    if (reactAriaDocsHref) {
      lines.push("", `[React Aria props](${reactAriaDocsHref})`);
    }
    if (api?.length) {
      const groups = groupApiProps(api);
      for (const { component, props } of groups) {
        if (
          groups.length > 1 ||
          component.toLowerCase() !== slug.replaceAll("-", "")
        ) {
          lines.push("", `### ${component}`);
        } else {
          lines.push("");
        }
        for (const row of props) {
          const defaultText =
            row.defaultValue === "—"
              ? ""
              : row.defaultValue === "required"
                ? "; required"
                : `; default: \`${row.defaultValue}\``;
          lines.push(
            `- \`${row.prop}\` (\`${row.type}\`${defaultText}): ${row.description}`,
          );
        }
      }
    }
  }

  return `${lines.join("\n").trimEnd()}\n`;
}
