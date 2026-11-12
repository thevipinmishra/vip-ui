import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { compile } from "tailwindcss";
import {
  chartExampleItems,
  colorScaleItems,
  createBaseItem,
  createBlockItem,
  createItem,
  createLibItem,
  createStyleItem,
  fontItems,
  readBlockCatalog,
  readBlockFiles,
  readSiteTheme,
  styleNames,
  themeItems,
} from "./generate-registry.mjs";
import { setupCss, themeAnimations } from "./registry-theme.mjs";
import { siteTokens, tokenProblems } from "./registry-tokens.mjs";

const root = path.resolve(import.meta.dirname, "..");
const ui = path.join(root, "src/components/ui");

const globals = (
  await readFile(path.join(root, "src/app/globals.css"), "utf8")
).replace(/\r\n/g, "\n");

const site = siteTokens(globals);

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

const items = [
  ...["utils", "motion"].map((name) => createLibItem(name)),
  ...[...sources.keys()].map((name) => createItem(name, sources)),
  ...styleNames.map((name) => createStyleItem(name)),
  ...(await themeItems()),
  ...(await colorScaleItems()),
  createBaseItem(await readSiteTheme()),
  ...(await fontItems()),
];

const blocks = await readBlockCatalog();
for (const block of blocks) {
  items.push(
    createBlockItem(
      block,
      sources,
      await readBlockFiles(path.join(root, "src/app/blocks", block.name)),
    ),
  );
}
items.push(...(await chartExampleItems(sources)));

test("site tokens come from the site stylesheet", () => {
  assert.ok(site.vars.has("primary"));
  assert.ok(site.theme.has("color-primary"));
  assert.ok(site.vars.has("chart-6"));
  assert.ok(site.keyframes.has("caret-breathe"));
});

test("every item ships only tokens the site or itself defines", () => {
  assert.deepEqual(
    items.flatMap((item) => tokenProblems(item, site)),
    [],
  );
});

test("Tailwind emits every keyframes block in the setup CSS", async () => {
  const css = `@tailwind utilities;\n${setupCss().replace(/@plugin[^;]+;/, "")}`;
  const output = (await compile(css)).build(
    Object.entries(themeAnimations)
      .filter(([, animation]) => animation.value !== undefined)
      .map(([name]) => `animate-${name}`),
  );
  const missing = Object.values(themeAnimations)
    .flatMap((animation) => Object.keys(animation.keyframes))
    .filter((name) => !output.includes(`@keyframes ${name}`));
  assert.deepEqual(missing, []);
});

test("the site stylesheet keeps named keyframes outside @theme", () => {
  const css = globals.replace(/\/\*[\s\S]*?\*\//g, "");
  const start = css.indexOf("@theme");
  const theme = css.slice(start, css.indexOf("\n}", start));
  const inside = Object.values(themeAnimations)
    .filter((animation) => animation.value === undefined)
    .flatMap((animation) => Object.keys(animation.keyframes))
    .filter((name) => theme.includes(`@keyframes ${name}`));
  assert.deepEqual(inside, []);
});
