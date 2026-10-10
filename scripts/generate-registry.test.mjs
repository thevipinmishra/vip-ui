import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import {
  createBlockItem,
  createItem,
  dependencyName,
  packageName,
  portableSource,
  readBlockCatalog,
  readRouteFiles,
  versioned,
} from "./generate-registry.mjs";
import { setupCss, themeVars } from "./registry-theme.mjs";

const root = path.resolve(import.meta.dirname, "..");
const ui = path.join(root, "src/components/ui");

const blocks = await readBlockCatalog();
const blockItemFiles = new Set(blocks.map(({ name }) => `vip-${name}.json`));

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
test("package subpaths resolve to installable package names", () => {
  assert.equal(packageName("@tanstack/charts/scales/band"), "@tanstack/charts");
  assert.equal(packageName("motion/react"), "motion");
  assert.equal(packageName("react-aria-components"), "react-aria-components");
  assert.deepEqual(
    createItem("chart", sources).dependencies.map(dependencyName),
    ["@tanstack/charts", "tailwind-variants"],
  );
  assert.equal(dependencyName("@tanstack/charts@^0.18.0"), "@tanstack/charts");
});

test("dependencies carry the ranges the site builds against", () => {
  const item = createItem("sheet", sources);
  assert.ok(item.dependencies.includes("react-aria-components@^1.22.0"));
  for (const dependency of item.dependencies)
    assert.match(dependency, /^@?[\w./-]+@[\^~]?\d/);
});

test("every component has a current, complete registry item", async () => {
  const items = (await readdir(path.join(root, "public/r"))).filter(
    (file) =>
      file.startsWith("vip-") &&
      file.endsWith(".json") &&
      !blockItemFiles.has(file),
  );
  assert.equal(items.length, sources.size);
  for (const name of sources.keys()) {
    const generated = createItem(name, sources);
    const onDisk = JSON.parse(
      await readFile(path.join(root, "public/r", `vip-${name}.json`), "utf8"),
    );
    assert.deepEqual(onDisk, generated, `Stale registry entry for ${name}`);
    assert.ok(
      generated.files.some((file) => file.path.endsWith(`/${name}.tsx`)),
    );
    assert.ok(
      generated.files.every((file) =>
        file.target.startsWith("@components/vip-ui/"),
      ),
    );
    assert.ok(generated.files.every((file) => !file.target.startsWith("@ui/")));
    const usesReactAria = generated.dependencies.some(
      (dependency) => dependencyName(dependency) === "react-aria-components",
    );
    assert.equal(Boolean(generated.css), usesReactAria, name);
    assert.equal(Boolean(generated.devDependencies), usesReactAria, name);
    for (const [variable, value] of Object.entries(
      generated.cssVars?.light ?? {},
    )) {
      assert.equal(value, themeVars.light[variable]);
      assert.equal(generated.cssVars.dark[variable], themeVars.dark[variable]);
    }
    for (const file of generated.files) {
      for (const variable of Object.keys(themeVars.light)) {
        if (file.content.includes(`--${variable})`))
          assert.ok(
            generated.cssVars?.light[variable],
            `${name} uses --${variable} without shipping it`,
          );
      }
      assert.doesNotMatch(file.content, /vip-(primary|radius|shadow)/);
      for (const [, specifier] of file.content.matchAll(
        /\bfrom\s+["']\.\/([\w-]+)["']/g,
      )) {
        assert.ok(
          generated.files.some(
            (entry) =>
              entry.target.endsWith(`/${specifier}.tsx`) ||
              entry.target.endsWith(`/${specifier}.ts`),
          ),
          `Missing relative import ${specifier} in ${name}`,
        );
      }
    }
  }
});

test("shipped theme variables match the site", async () => {
  const normalize = (value) => value.replace(/\s+/g, " ").trim();
  const declarations = (source, block) => {
    const start = source.indexOf(block);
    const body = source.slice(start, source.indexOf("\n}", start));
    return new Map(
      [...body.matchAll(/--([\w-]+):\s*([^;]+);/g)].map(([, name, value]) => [
        name,
        normalize(value),
      ]),
    );
  };
  const site = (
    await readFile(path.join(root, "src/app/globals.css"), "utf8")
  ).replace(/\r\n/g, "\n");
  const setup = (
    await readFile(path.join(root, "public/r/setup.css"), "utf8")
  ).replace(/\r\n/g, "\n");
  for (const [mode, block] of [
    ["light", ":root {"],
    ["dark", ".dark {"],
  ]) {
    const siteValues = declarations(site, block);
    const setupValues = declarations(setup, block);
    for (const [variable, value] of Object.entries(themeVars[mode])) {
      assert.equal(
        siteValues.get(variable),
        value,
        `globals.css --${variable}`,
      );
      assert.equal(setupValues.get(variable), value, `setup.css --${variable}`);
    }
  }
  assert.match(setup, /@plugin "tailwindcss-react-aria-components";/);
  assert.match(setupCss(), /--color-success-subtle: var\(--success-subtle\);/);
});

test("dependent components bring their files and packages", () => {
  const item = createItem("date-range-picker", sources);
  const targets = item.files.map((file) => path.basename(file.target));
  for (const dependency of [
    "date-range-picker.tsx",
    "date-segment.tsx",
    "button.tsx",
    "range-calendar.tsx",
    "calendar.tsx",
    "popover.tsx",
  ]) {
    assert.ok(targets.includes(dependency), `Missing ${dependency}`);
  }
  const names = item.dependencies.map(dependencyName);
  for (const dependency of [
    "@phosphor-icons/react",
    "motion",
    "react-aria-components",
    "tailwind-variants",
  ])
    assert.ok(names.includes(dependency), `Missing ${dependency}`);
  assert.ok(targets.includes("utils.ts"));
});

test("installed source matches the site source", () => {
  const classes =
    '"group-selected/item:bg-primary pressed:text-foreground disabled:opacity-50 focus-visible:outline-ring placeholder:text-muted-foreground"';
  assert.equal(portableSource(classes), classes);
  assert.equal(portableSource("a\r\nb"), "a\nb");
  assert.match(
    portableSource('import { cn } from "@/lib/utils"'),
    /from "\.\/utils"/,
  );
});

test("every block installs as a route with the components it imports", async () => {
  for (const block of blocks) {
    const blockFiles = await readRouteFiles(
      path.join(root, "src/app/blocks", block.name),
    );
    const generated = createBlockItem(block, sources, blockFiles);
    const onDisk = JSON.parse(
      await readFile(
        path.join(root, "public/r", `vip-${block.name}.json`),
        "utf8",
      ),
    );
    assert.deepEqual(
      onDisk,
      generated,
      `Stale registry entry for ${block.name}`,
    );
    assert.equal(generated.type, "registry:block");
    assert.deepEqual(generated.categories, [block.category]);
    assert.ok(
      generated.files.some(
        (file) =>
          file.type === "registry:page" &&
          file.target === `src/app/blocks/${block.name}/page.tsx`,
      ),
    );
    for (const file of generated.files.filter((file) =>
      file.target.startsWith("src/app/"),
    )) {
      assert.doesNotMatch(file.content, /@\/(components\/ui|lib)\//);
      for (const specifier of file.content.matchAll(
        /\bfrom\s+["'](\.{1,2}\/[^"']+)["']/g,
      )) {
        const resolved = path.posix.normalize(
          path.posix.join(path.posix.dirname(file.target), specifier[1]),
        );
        assert.ok(
          generated.files.some((entry) => {
            const target = entry.target.replace(
              /^@components\//,
              "src/components/",
            );
            return target === `${resolved}.tsx` || target === `${resolved}.ts`;
          }),
          `Missing ${specifier[1]} for ${file.target}`,
        );
      }
    }
  }
});

test("blocks bring the packages their routes import", async () => {
  const dashboard = createBlockItem(
    blocks.find(({ name }) => name === "dashboard-01"),
    sources,
    await readRouteFiles(path.join(root, "src/app/blocks/dashboard-01")),
  );
  assert.ok(dashboard.dependencies.includes(versioned("@tanstack/charts")));
  assert.ok(
    dashboard.files.some(
      (file) => file.target === "@components/vip-ui/utils.ts",
    ),
  );
  assert.throws(
    () =>
      createBlockItem(
        { name: "empty-01", description: "", category: "dashboard" },
        sources,
        new Map(),
      ),
    /no page\.tsx/,
  );
});
