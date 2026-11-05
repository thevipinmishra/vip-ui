import { componentMarkdownHref } from "./catalog";
import { type ApiPart, showsPartHeadings } from "./component-api";
import { displayPath, fileName, type ManualInstallPlan } from "./registry-docs";

export interface ComponentMarkdownExample {
  title: string;
  description?: string;
  code?: string;
  filename?: string;
  uses?: readonly string[];
}

export interface ComponentMarkdownMember {
  slug: string;
  name: string;
  description: string;
  manual: ManualInstallPlan;
  cliUrl?: string | null;
  usage?: { code: string; filename: string };
  api?: readonly ApiPart[];
  examples?: readonly ComponentMarkdownExample[];
  reactAria?: { name: string; href: string };
}

export interface ComponentMarkdownInput {
  slug: string;
  name: string;
  description: string;
  site: string;
  manual: ManualInstallPlan;
  cliUrl?: string | null;
  usage?: { code: string; filename: string };
  api?: readonly ApiPart[];
  examples?: readonly ComponentMarkdownExample[];
  reactAria?: { name: string; href: string };
}

export interface GroupedComponentMarkdownInput {
  slug: string;
  name: string;
  description: string;
  site: string;
  members: readonly ComponentMarkdownMember[];
}

function heading(level: number) {
  return "#".repeat(level);
}

function pushUsage(
  lines: string[],
  usage: { code: string; filename: string } | undefined,
) {
  if (!usage) return;
  lines.push(
    "",
    "```tsx",
    usage.code.trim(),
    "```",
    "",
    `Source: \`${usage.filename}\``,
  );
}

function pushInstallation(
  lines: string[],
  site: string,
  member: Pick<ComponentMarkdownMember, "manual" | "cliUrl">,
  level: number,
) {
  lines.push("", `${heading(level)} Installation`, "");

  if (member.cliUrl) {
    lines.push(
      "```bash",
      `pnpm dlx shadcn@latest add ${member.cliUrl}`,
      "```",
      "",
    );
  }

  lines.push(
    `${heading(level + 1)} Manual`,
    "",
    `Complete the [one-time setup](${site}/components/installation#manual) first.`,
  );
  if (member.manual.packages.length > 0) {
    lines.push(
      "",
      "Install the packages:",
      "",
      "```bash",
      `pnpm add ${member.manual.packages.join(" ")}`,
      "```",
    );
  }
  if (member.manual.requires.length > 0) {
    lines.push("", "Add the required files:", "");
    for (const file of member.manual.requires) {
      lines.push(
        file.kind === "component"
          ? `- [${file.name}](${site}${componentMarkdownHref(file.slug)}): \`${displayPath(file.file)}\``
          : `- [\`${fileName(file.file)}\`](${site}/components/installation#file-${file.slug}): ${file.description}`,
      );
    }
  }
  lines.push(
    "",
    `Add \`${displayPath(member.manual.component)}\`:`,
    "",
    "```tsx",
    member.manual.component.content.trim(),
    "```",
  );
}

function pushExamples(
  lines: string[],
  examples: readonly ComponentMarkdownExample[] | undefined,
  level: number,
) {
  if (!examples?.length) return;
  examples.forEach((example) => {
    lines.push("", `${heading(level)} ${example.title}`);
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

function pushApi(
  lines: string[],
  member: Pick<ComponentMarkdownMember, "slug" | "name" | "api" | "reactAria">,
  level: number,
) {
  if (!member.api?.length && !member.reactAria) return;

  lines.push("", `${heading(level)} API reference`);
  if (member.reactAria) {
    const link = `[React Aria ${member.reactAria.name}](${member.reactAria.href})`;
    lines.push(
      "",
      member.api?.length
        ? `vip/ui adds or changes the props below. For all other props, see ${link}.`
        : `${member.name} takes the props of ${link}.`,
    );
  }
  if (member.api?.length) {
    const partHeadings = showsPartHeadings(member.api, member.slug);
    for (const part of member.api) {
      lines.push("");
      if (partHeadings) lines.push(`${heading(level + 1)} ${part.name}`, "");
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

  pushUsage(lines, usage);
  lines.push(
    "",
    "## Links",
    "",
    `- [Documentation](${pageUrl})`,
    `- [Installation](${site}/components/installation)`,
    `- [Registry item](${cliUrl ?? `${site}/r/vip-${slug}.json`})`,
  );

  pushInstallation(lines, site, { manual, cliUrl }, 2);
  pushExamples(lines, examples, 2);
  pushApi(lines, { slug, name, api, reactAria }, 2);

  return `${lines.join("\n").trimEnd()}\n`;
}

export function buildGroupedComponentMarkdown({
  slug,
  name,
  description,
  site,
  members,
}: GroupedComponentMarkdownInput): string {
  const lines: string[] = [
    `# ${name}`,
    "",
    description.trim(),
    "",
    "## Links",
    "",
    `- [Documentation](${site}/components/${slug})`,
    `- [Installation](${site}/components/installation)`,
  ];

  for (const member of members) {
    lines.push(
      `- [${member.name} registry item](${member.cliUrl ?? `${site}/r/vip-${member.slug}.json`})`,
    );
  }

  members.forEach((member, index) => {
    if (index > 0) {
      lines.push("", `## ${member.name}`, "", member.description.trim());
    }
    const level = index === 0 ? 2 : 3;
    pushUsage(lines, member.usage);
    pushInstallation(lines, site, member, level);
    pushExamples(lines, member.examples, level);
    pushApi(lines, member, level);
  });

  return `${lines.join("\n").trimEnd()}\n`;
}
