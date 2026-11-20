import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");
const read = (file) => readFile(path.join(root, file), "utf8");

test("CONTRIBUTING lists the button size scale", async () => {
  const styles = await read("src/components/ui/button-styles.tsx");
  const heights = [...styles.matchAll(/^\s+(xs|sm|md|lg|xl): ["`]h-(\d+)\s/gm)];
  assert.equal(heights.length, 5);
  const scale = heights
    .map(([, size, step], index) => {
      const entry = `${size} ${Number(step) * 4}px`;
      return index === heights.length - 1 ? `and ${entry}` : entry;
    })
    .join(", ");
  const contributing = await read("CONTRIBUTING.md");
  assert.ok(
    contributing.includes(`The control heights are ${scale}.`),
    `CONTRIBUTING.md must state: The control heights are ${scale}.`,
  );
});

const catalog = JSON.parse(await read("src/lib/catalog.json"));
const slugs = catalog.groups.flatMap((group) =>
  group.items.map((item) => item.slug),
);

function objectKeys(source, start, end, pattern) {
  const body = source.slice(source.indexOf(start), source.indexOf(end));
  return new Set([...body.matchAll(pattern)].map((match) => match[1]));
}

const objectEntry = /^ {2}"?([a-z0-9-]+)"?: \{$/gm;
const arrayEntry = /^ {2}"?([a-z0-9-]+)"?: \[$/gm;

const examples = await read("src/lib/component-examples.ts");
const pageStart = "const pageSources = {";
const pageEnd = "} as const satisfies Record<string, ComponentPageSource>";
const pageBody = examples.slice(
  examples.indexOf(pageStart),
  examples.indexOf(pageEnd),
);
const pageKeys = objectKeys(examples, pageStart, pageEnd, objectEntry);
const demoFiles = new Set(
  [...pageBody.matchAll(/(?:usage|sourcePath): "([^"]+)"/g)].map(
    (match) => match[1],
  ),
);

const apiPending = new Set([
  "breadcrumbs",
  "color-swatch",
  "color-swatch-picker",
  "context-menu",
  "description-list",
  "disclosure",
  "drop-zone",
  "fieldset",
  "form",
  "grid-list",
  "kbd-code",
  "link",
  "list-box",
  "range-calendar",
  "separator",
  "skeleton",
]);

function demoExportName(file) {
  return file
    .replace(/\.tsx$/, "")
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join("");
}

test("every catalog component has a source file, page data, and index preview", async () => {
  const previews = objectKeys(
    await read("src/components/docs/catalog-preview-registry.ts"),
    "export const catalogPreviews",
    "\n};",
    objectEntry,
  );
  for (const slug of slugs) {
    await assert.doesNotReject(
      read(`src/components/ui/${slug}.tsx`),
      `src/components/ui/${slug}.tsx`,
    );
    assert.ok(pageKeys.has(slug), `${slug} needs pageSources`);
    assert.ok(previews.has(slug), `${slug} needs catalogPreviews`);
  }
  for (const key of pageKeys) {
    assert.ok(slugs.includes(key), `pageSources.${key} is not in the catalog`);
  }
});

test("every catalog component has an API table", async () => {
  const api = await read("src/lib/component-api.ts");
  const keys = objectKeys(api, "export const componentApi", "\n};", arrayEntry);
  for (const slug of slugs) {
    if (apiPending.has(slug)) {
      assert.ok(!keys.has(slug), `remove ${slug} from apiPending`);
    } else {
      assert.ok(keys.has(slug), `${slug} needs componentApi`);
    }
  }
});

test("page demos exist and export the name of their file", async () => {
  for (const file of demoFiles) {
    const source = await read(`src/components/docs/${file}`);
    const name = demoExportName(file);
    assert.match(
      source,
      new RegExp(String.raw`export (function|const) ${name}\b`),
      `${file} must export ${name}`,
    );
  }
});

test("every demo file is used", async () => {
  const docs = path.join(root, "src/components/docs");
  const files = await readdir(path.join(root, "src"), { recursive: true });
  const sources = (
    await Promise.all(
      files
        .filter((file) => /\.tsx?$/.test(file))
        .map((file) => readFile(path.join(root, "src", file), "utf8")),
    )
  ).join("\n");
  for (const file of await readdir(docs)) {
    if (!file.endsWith("-demo.tsx") || demoFiles.has(file)) continue;
    const name = file.replace(/\.tsx$/, "");
    assert.ok(
      sources.includes(`/${name}"`) || sources.includes(`./${name}"`),
      `${file} is not used`,
    );
  }
});

test("kit components follow the prop and import conventions", async () => {
  const directory = path.join(root, "src/components/ui");
  for (const file of await readdir(directory)) {
    if (!file.endsWith(".tsx")) continue;
    const source = await readFile(path.join(directory, file), "utf8");
    const client = /^(?:\/\/[^\n]*\n|\s)*"use client";/.test(source);
    assert.equal(
      /from "@phosphor-icons\/react"/.test(source),
      /from "@phosphor-icons\/react"/.test(source) && client,
      `${file} imports @phosphor-icons/react without "use client"; use @phosphor-icons/react/ssr`,
    );
    assert.doesNotMatch(
      source,
      /^\s+(onCheckedChange|defaultChecked)\?:/m,
      `${file} declares an alias prop; keep the React Aria name`,
    );
    assert.doesNotMatch(
      source,
      /matchMedia\("\(prefers-reduced-motion/,
      `${file} queries reduced motion inline; use prefersReducedMotion or reducedMotionQuery from @/lib/motion`,
    );
  }
});
