import { readFile } from "node:fs/promises";
import path from "node:path";
import { installSteps, setupDocUrl } from "./agent-docs";
import { dependencyLine } from "./component-markdown";

export interface BlockRegistryFile {
  path: string;
  target: string;
  content: string;
}

export interface BlockRegistryItem {
  name: string;
  dependencies: string[];
  registryDependencies?: string[];
  meta?: { entry?: { component: string; file: string } };
  files: BlockRegistryFile[];
}

export interface BlockMarkdownInput {
  name: string;
  title: string;
  description: string;
  site: string;
  itemUrl: string;
  entry: { component: string; path: string };
  files: { path: string; url: string }[];
  dependencies: { components: string[]; packages: string[] };
}

export async function readBlockRegistryItem(
  name: string,
): Promise<BlockRegistryItem> {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name))
    throw new Error("Invalid block name");
  return JSON.parse(
    await readFile(
      path.join(process.cwd(), "public/r", `${name}.json`),
      "utf8",
    ),
  ) as BlockRegistryItem;
}

export function buildBlockMarkdown({
  name,
  title,
  description,
  site,
  itemUrl,
  entry,
  files,
  dependencies,
}: BlockMarkdownInput): string {
  const importPath = entry.path.replace(/\.tsx?$/, "");
  const lines: string[] = [
    `# ${title} block`,
    "",
    description.trim(),
    "",
    "## Installation",
    "",
    `The block goes to \`components/blocks/${name}/\`.`,
    "",
    `If the project has no \`components/vip-ui\` folder, do the [setup](${setupDocUrl(site)}) first. Also do it if the import alias is missing from the root \`tsconfig.json\` or, outside Next.js, from the bundler config. Then:`,
    "",
    ...installSteps(itemUrl),
    "",
    "## Usage",
    "",
    `Render \`<${entry.component} />\` from \`${entry.path}\` on any page.`,
    "",
    "```tsx",
    `import { ${entry.component} } from "@/${importPath}";`,
    "",
    "export function Page() {",
    `  return <${entry.component} />;`,
    "}",
    "```",
  ];

  const dependency = dependencyLine(dependencies, "this block");
  lines.push("", "## Manual installation", "");
  lines.push("Use these steps only if you cannot run the shadcn CLI.", "");
  if (dependency) lines.push(dependency, "");
  lines.push(
    "Each URL returns JSON. Write `files[0].content` to the path. Keep files that already exist.",
    "",
  );
  for (const file of files) {
    lines.push(`- \`${file.path}\`: ${file.url}`);
  }
  lines.push(
    "",
    "Then do step 6 of [Installation](#installation).",
    "",
    `Documentation: ${site}/blocks/${name}`,
  );

  return `${lines.join("\n").trimEnd()}\n`;
}
