import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import {
  chartExampleItems,
  colorScaleItems,
  createBaseItem,
  createBlockItem,
  createItem,
  createLibItem,
  createStyleItem,
  dependencyName,
  fontItems,
  itemUrl,
  readBlockCatalog,
  readBlockFiles,
  readSiteTheme,
  styleNames,
  themeItems,
} from "./generate-registry.mjs";

const root = path.resolve(import.meta.dirname, "..");
const ui = path.join(root, "src/components/ui");
const libs = ["utils", "motion"];

const blocks = await readBlockCatalog();

const sources = new Map(
  await Promise.all(
    (await readdir(ui))
      .filter((file) => file.endsWith(".tsx"))
      .map(async (file) => [
        file.slice(0, -4),
        await readFile(path.join(ui, file), "utf8"),
      ]),
  ),
);

const items = new Map();
for (const name of sources.keys()) items.set(name, createItem(name, sources));
for (const lib of libs) items.set(lib, createLibItem(lib));
for (const name of styleNames) items.set(name, createStyleItem(name));
const themes = await themeItems();
const scales = await colorScaleItems();
const base = createBaseItem(await readSiteTheme());
const fonts = await fontItems();
const examples = await chartExampleItems(sources);
for (const item of themes) items.set(item.name, item);
for (const item of scales) items.set(item.name, item);
items.set(base.name, base);
for (const item of fonts) items.set(item.name, item);
for (const block of blocks)
  items.set(
    block.name,
    createBlockItem(
      block,
      sources,
      await readBlockFiles(path.join(root, "src/app/blocks", block.name)),
    ),
  );
for (const item of examples) items.set(item.name, item);

const onDisk = new Map();
for (const file of await readdir(path.join(root, "public/r"))) {
  if (file === "registry.json" || !file.endsWith(".json")) continue;
  const item = JSON.parse(
    await readFile(path.join(root, "public/r", file), "utf8"),
  );
  onDisk.set(item.name, item);
}
for (const [name, item] of onDisk) if (!items.has(name)) items.set(name, item);

function inMemoryType(name) {
  if (sources.has(name)) return "registry:ui";
  if (libs.includes(name)) return "registry:lib";
  if (styleNames.includes(name)) return "registry:style";
  if (blocks.some((block) => block.name === name)) return "registry:block";
  if (themes.some((item) => item.name === name)) return "registry:theme";
  if (scales.some((item) => item.name === name)) return "registry:theme";
  if (fonts.some((item) => item.name === name)) return "registry:font";
  if (examples.some((item) => item.name === name)) return "registry:block";
  if (name === base.name) return "registry:base";
  return null;
}

test("every registry item is covered by the weight report", () => {
  assert.deepEqual(
    [...onDisk.keys()].filter((name) => inMemoryType(name) === null).sort(),
    [],
    "public/r ships items the in-memory builders do not cover; extend scripts/registry-install-weight.test.mjs so their packages are reported.",
  );
});

const byUrl = new Map(
  [...items.values()].map((item) => [itemUrl(item.name), item]),
);

function installTree(item) {
  const tree = new Map();
  function visit(current) {
    if (tree.has(current.name)) return;
    assert.ok(current, `${item.name} links an unknown registry item`);
    tree.set(current.name, current);
    for (const url of current.registryDependencies ?? []) visit(byUrl.get(url));
  }
  visit(item);
  return {
    items: [...tree.values()],
    packages: new Set(
      [...tree.values()].flatMap((entry) =>
        entry.dependencies.map(dependencyName),
      ),
    ),
  };
}

const trees = new Map(
  [...items.values()].map((item) => [item.name, installTree(item)]),
);

const motionAllowlist = new Set([
  "animated-number",
  "attachment",
  "copy-button",
  "highlighter",
  "icon-swap",
  "layout-morph",
  "marquee",
  "presence",
  "presence-list",
  "progress-ring",
  "range-calendar",
  "rating-input",
  "settings-01",
  "sheet",
  "stagger-group",
  "stepper",
  "tabs",
  "tag-group",
  "text-loop",
  "text-reveal",
  "text-scramble",
  "text-swap",
  "toggle-button",
  "toggle-button-group",
  "tool-call",
  "tree",
]);

const convertingOffMotion = new Set([
  "agent-status",
  "border-beam",
  "color-thumb",
  "meter",
  "pagination",
  "password-field",
  "progress-bar",
  "skeleton",
  "spotlight-card",
  "text-shimmer",
]);

function motionDependents() {
  return new Set(
    [...items.values()]
      .filter((item) =>
        item.dependencies.some(
          (dependency) => dependencyName(dependency) === "motion",
        ),
      )
      .map((item) => item.name),
  );
}

const distribution = new Map();
for (const tree of trees.values())
  distribution.set(
    tree.packages.size,
    (distribution.get(tree.packages.size) ?? 0) + 1,
  );
const installs = new Map();
for (const tree of trees.values())
  for (const name of tree.packages)
    installs.set(name, (installs.get(name) ?? 0) + 1);
const heaviest = [...trees.entries()]
  .sort((a, b) => b[1].packages.size - a[1].packages.size)
  .slice(0, 3);

console.log(
  `Install weight: ${items.size} items; packages per install tree: ${[
    ...distribution.entries(),
  ]
    .sort((a, b) => a[0] - b[0])
    .map(([count, items]) => `${count}×${items}`)
    .join(" ")}`,
);
console.log(
  `Most installed packages: ${[...installs.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, count]) => `${name} ${count}`)
    .join(", ")}`,
);
console.log(
  `Heaviest trees: ${heaviest.map(([name, tree]) => `${name} (${tree.packages.size})`).join(", ")}`,
);

test("install weight report", () => {
  assert.ok(items.size > 0);
});

test("only items on the allowlist depend on motion", () => {
  const dependents = motionDependents();
  const gained = [...dependents]
    .filter((name) => !motionAllowlist.has(name))
    .sort();
  const removed = [...motionAllowlist]
    .filter((name) => !dependents.has(name))
    .sort();
  assert.deepEqual(
    gained,
    [],
    `${gained.join(", ")} gained motion/react. Add the item to motionAllowlist in scripts/registry-install-weight.test.mjs only if it animates on purpose; otherwise drop the dependency.`,
  );
  assert.deepEqual(
    removed,
    [],
    `motionAllowlist is stale: ${removed.join(", ")} no longer depend on motion. Remove them from the allowlist in scripts/registry-install-weight.test.mjs.`,
  );
  for (const name of convertingOffMotion)
    assert.ok(
      !dependents.has(name),
      `${name} still depends on motion/react; it is scheduled to move to CSS or the Web Animations API`,
    );
});
