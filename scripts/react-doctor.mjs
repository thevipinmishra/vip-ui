import { execFile } from "node:child_process";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { promisify } from "node:util";
import { writeChecks } from "./component-checks.mjs";

const root = path.resolve(import.meta.dirname, "..");
const uiDirectory = "src/components/ui";

const catalog = JSON.parse(
  await readFile(path.join(root, "src/lib/catalog.json"), "utf8"),
);
const slugs = catalog.groups.flatMap((group) =>
  group.items.map((item) => item.slug),
);
const files = (await readdir(path.join(root, uiDirectory)))
  .filter((file) => file.endsWith(".tsx"))
  .map((file) => `${uiDirectory}/${file}`);

const bin = path.join(root, "node_modules/react-doctor/bin/react-doctor.js");
const { stdout } = await promisify(execFile)(
  process.execPath,
  [
    bin,
    ...files,
    "--json",
    "--no-score",
    "--no-supply-chain",
    "--blocking",
    "none",
    "--yes",
  ],
  { cwd: root, maxBuffer: 64 * 1024 * 1024 },
);
const report = JSON.parse(stdout);
const project = report.projects?.[0];
if (!report.ok || !project?.complete || project.skippedChecks?.length) {
  console.error(
    `React Doctor did not finish: ${JSON.stringify(report.error ?? project?.skippedCheckReasons)}`,
  );
  process.exit(1);
}

const components = Object.fromEntries(slugs.map((slug) => [slug, []]));
for (const diagnostic of report.diagnostics) {
  const slug = path.basename(diagnostic.filePath, ".tsx");
  components[slug]?.push({
    rule: diagnostic.rule,
    severity: diagnostic.severity,
    title: diagnostic.title,
    line: diagnostic.line,
  });
}
for (const list of Object.values(components)) {
  list.sort((a, b) => a.line - b.line);
}

await writeChecks("reactDoctor", { version: report.version, components });

const affected = Object.values(components).filter((list) => list.length);
console.log(
  `React Doctor ${report.version}: ${report.summary.errorCount} errors and ${report.summary.warningCount} warnings in ${affected.length} of ${slugs.length} components.`,
);
