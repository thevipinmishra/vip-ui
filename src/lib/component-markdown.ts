import type { ApiProp } from "./component-api";
import type { RegistryItem } from "./registry-docs";

export interface ComponentMarkdownInput {
  slug: string;
  name: string;
  description: string;
  /** Public site origin, without a trailing slash. */
  site: string;
  registryItem: RegistryItem;
  cliUrl?: string | null;
  usage?: { code: string; filename: string };
  guidance?: string;
  api?: ApiProp[];
  examples?: {
    title: string;
    description: string;
    /** Example source, already rewritten to the consumer import path. */
    code?: string;
    filename?: string;
    /** Setup the install list does not already cover. */
    prerequisite?: string;
  }[];
  reactAriaDocsHref?: string;
}

function cell(value: string) {
  return value.replaceAll("|", "\\|").replaceAll("\n", " ").trim();
}

/**
 * Builds the Markdown version of a component page. Used by the Copy page
 * button and served from `/components/<slug>.md` for agents.
 */
export function buildComponentMarkdown({
  slug,
  name,
  description,
  site,
  registryItem,
  cliUrl,
  usage,
  guidance,
  api,
  examples,
  reactAriaDocsHref,
}: ComponentMarkdownInput): string {
  const pageUrl = `${site}/components/${slug}`;
  const lines: string[] = [`# ${name}`, "", description.trim()];

  lines.push(
    "",
    "## Links",
    "",
    `- [Documentation](${pageUrl})`,
    `- [Installation](${site}/components/installation)`,
  );
  if (reactAriaDocsHref) {
    lines.push(`- [React Aria API](${reactAriaDocsHref})`);
  }
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

  lines.push("", "This adds:", "");
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

  if (usage) {
    lines.push(
      "",
      "## Usage",
      "",
      "```tsx",
      usage.code.trim(),
      "```",
      "",
      `Source: \`${usage.filename}\``,
    );
  }

  if (guidance) lines.push("", guidance.trim());

  if (examples && examples.length > 0) {
    lines.push("", "## Examples", "");
    examples.forEach((example, index) => {
      if (index > 0) lines.push("");
      lines.push(`### ${example.title}`, "", example.description.trim());
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

  if (api && api.length > 0) {
    lines.push(
      "",
      "## API reference",
      "",
      "| Component | Prop | Type | Default | Description |",
      "| --- | --- | --- | --- | --- |",
    );
    for (const row of api) {
      lines.push(
        `| ${[
          row.component,
          row.prop,
          row.type,
          row.defaultValue,
          row.description,
        ]
          .map(cell)
          .join(" | ")} |`,
      );
    }
  } else if (reactAriaDocsHref) {
    lines.push(
      "",
      "## API reference",
      "",
      `Props and behavior are inherited from [React Aria](${reactAriaDocsHref}).`,
    );
  }

  return `${lines.join("\n").trimEnd()}\n`;
}
