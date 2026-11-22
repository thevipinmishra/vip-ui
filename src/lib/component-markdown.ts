import { installSteps, setupDocUrl } from "./agent-docs";
import { type ApiPart, showsPartHeadings } from "./component-api";
import type { ExampleDependencies } from "./example-dependencies";
import { displayPath, fileSlug, type ManualInstallPlan } from "./registry-docs";

export interface ComponentMarkdownInput {
  slug: string;
  name: string;
  description: string;
  site: string;
  manual: ManualInstallPlan;
  cliUrl?: string | null;
  usage?: {
    code: string;
    filename: string;
    note?: string;
    uses?: ExampleDependencies;
  };
  exampleFile?: { filename: string; code: string };
  api?: readonly ApiPart[];
  examples?: {
    title: string;
    description?: string;
    code?: string;
    filename?: string;
    uses?: ExampleDependencies;
  }[];
  reactAria?: { name: string; href: string };
}

function dependencyLine(uses?: ExampleDependencies) {
  if (!uses) return null;
  const parts = [
    { noun: "registry item", names: uses.components },
    { noun: "npm package", names: uses.packages },
  ].flatMap(({ noun, names }) =>
    names.length
      ? [
          `the ${noun}${names.length > 1 ? "s" : ""} ${names.map((name) => `\`${name}\``).join(", ")}`,
        ]
      : [],
  );
  return parts.length
    ? `To use this example, install ${parts.join(" and ")}.`
    : null;
}

export function buildComponentMarkdown({
  slug,
  name,
  description,
  site,
  manual,
  cliUrl,
  usage,
  exampleFile,
  api,
  examples,
  reactAria,
}: ComponentMarkdownInput): string {
  const itemUrl = cliUrl ?? `${site}/r/${slug}.json`;
  const needsItems = [usage, ...(examples ?? [])].some(
    (example) => example?.uses?.components.length,
  );
  const lines: string[] = [
    `# ${name}`,
    "",
    description.trim(),
    "",
    "## Installation",
    "",
    `The component goes to \`${displayPath(manual.component)}\`. Add examples only if the user asks for them.`,
    "",
    ...(needsItems
      ? [
          `To install another registry item, use the steps below with \`${new URL(".", itemUrl)}<slug>.json\`.`,
          "",
        ]
      : []),
    `If the project has no \`components/vip-ui\` folder, do the [setup](${setupDocUrl(site)}) first. Also do it if the import alias is missing from the root \`tsconfig.json\` or, outside Next.js, from the bundler config. Then:`,
    "",
    ...installSteps(itemUrl),
  ];

  if (manual.note) lines.push("", "## Finish setup", "", manual.note);

  if (usage) {
    lines.push("", "## Usage", "");
    if (usage.note) lines.push(usage.note.trim(), "");
    const install = dependencyLine(usage.uses);
    if (install) lines.push(install, "");
    lines.push(
      "```tsx",
      usage.code.trim(),
      "```",
      "",
      `Source: \`${usage.filename}\``,
    );
  }

  if (exampleFile) {
    lines.push(
      "",
      "## Example file",
      "",
      `Save \`${exampleFile.filename}\` in the same folder as the copied example files.`,
      "",
      "```tsx",
      exampleFile.code.trim(),
      "```",
    );
  }

  if (examples && examples.length > 0) {
    examples.forEach((example) => {
      lines.push("", `## ${example.title}`);
      if (example.description) {
        lines.push("", example.description.trim());
      }
      const install = dependencyLine(example.uses);
      if (install) lines.push("", install);
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

  lines.push(
    "",
    "## Manual installation",
    "",
    `Use these steps only if you cannot run the shadcn CLI. Do the [manual setup](${setupDocUrl(site)}#manual) first.`,
  );
  if (manual.packages.length > 0) {
    lines.push("", `Install these packages: ${manual.packages.join(" ")}`);
  }
  lines.push(
    "",
    "Each URL returns JSON. Write `files[0].content` to the path. Keep files that already exist.",
    "",
  );
  for (const file of [
    ...manual.requires.map((required) => required.file),
    manual.component,
  ]) {
    const url = new URL(`${fileSlug(file)}.json`, itemUrl);
    lines.push(`- \`${displayPath(file)}\`: ${url}`);
  }
  const finish = manual.note ? "[Finish setup](#finish-setup) and " : "";
  lines.push(
    "",
    `Then do ${finish}step 6 of [Installation](#installation).`,
    "",
    `Documentation: ${site}/components/${slug}`,
  );

  return `${lines.join("\n").trimEnd()}\n`;
}
