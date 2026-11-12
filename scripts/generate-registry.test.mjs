import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import {
  chartExampleItems,
  checkRegistryDependencies,
  colorScaleItems,
  createBaseItem,
  createBlockItem,
  createChartExampleItem,
  createFontItem,
  createItem,
  createLibItem,
  createStyleItem,
  cssObject,
  dependencyName,
  fontItems,
  itemUrl,
  packageName,
  portableSource,
  readBlockCatalog,
  readBlockFiles,
  readChartCatalog,
  readSiteTheme,
  styleNames,
  themeItems,
  versioned,
} from "./generate-registry.mjs";
import {
  reactAriaPlugin,
  setupCss,
  themeAnimations,
  themeTokens,
  themeVars,
} from "./registry-theme.mjs";
import { keyframeBlocks } from "./registry-tokens.mjs";

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

const themes = await themeItems();
const scales = await colorScaleItems();
const base = createBaseItem(await readSiteTheme());
const fonts = await fontItems();
const chartCatalog = await readChartCatalog();
const chartExamples = await chartExampleItems(sources);

const onDisk = new Map();
for (const file of await readdir(path.join(root, "public/r"))) {
  if (file === "registry.json" || !file.endsWith(".json")) continue;
  const item = JSON.parse(
    await readFile(path.join(root, "public/r", file), "utf8"),
  );
  onDisk.set(item.name, item);
}
const byUrl = new Map(
  [...onDisk.values()].map((item) => [itemUrl(item.name), item]),
);

function installTree(item) {
  const items = new Map();
  function visit(current) {
    if (items.has(current.name)) return;
    items.set(current.name, current);
    for (const url of current.registryDependencies ?? []) {
      const dependency = byUrl.get(url);
      assert.ok(dependency, `${current.name} links unknown item ${url}`);
      visit(dependency);
    }
  }
  visit(item);
  const tree = [...items.values()];
  return {
    items: tree,
    targets: tree.flatMap((entry) => entry.files.map((file) => file.target)),
    packages: new Set(
      tree.flatMap((entry) => entry.dependencies.map(dependencyName)),
    ),
  };
}

function itemNamed(name) {
  return byUrl.get(itemUrl(name));
}

test("package subpaths resolve to installable package names", () => {
  assert.equal(packageName("@tanstack/charts/scales/band"), "@tanstack/charts");
  assert.equal(packageName("motion/react"), "motion");
  assert.equal(packageName("react-aria-components"), "react-aria-components");
  assert.ok(
    createItem("chart", sources)
      .dependencies.map(dependencyName)
      .includes("@tanstack/charts"),
  );
  assert.equal(dependencyName("@tanstack/charts@^0.18.0"), "@tanstack/charts");
});

test("dependencies carry the ranges the site builds against", async () => {
  const { dependencies } = JSON.parse(
    await readFile(path.join(root, "package.json"), "utf8"),
  );
  const item = createItem("sheet", sources);
  assert.ok(
    item.dependencies.includes(
      `react-aria-components@${dependencies["react-aria-components"]}`,
    ),
  );
  for (const dependency of item.dependencies)
    assert.match(dependency, /^@?[\w./-]+@[\^~]?\d/);
});

test("shared libraries are their own items", () => {
  for (const lib of libs) {
    const generated = createLibItem(lib);
    assert.deepEqual(itemNamed(lib), generated, `Stale registry entry ${lib}`);
    assert.equal(generated.type, "registry:lib");
    assert.ok(generated.description);
    assert.deepEqual(
      generated.files.map((file) => file.target),
      [`@components/vip-ui/${lib}.ts`],
    );
  }
  assert.deepEqual(createLibItem("utils").dependencies.map(dependencyName), [
    "tailwind-variants",
  ]);
});

test("stylesheets install as CSS in the project stylesheet", () => {
  for (const name of styleNames) {
    const generated = createStyleItem(name);
    assert.deepEqual(
      itemNamed(name),
      generated,
      `Stale registry entry ${name}`,
    );
    assert.deepEqual(generated.files, []);
    assert.ok(
      generated.css["@layer components"],
      `${name} has no components layer`,
    );
  }
  assert.deepEqual(
    cssObject(
      "@layer a { .b :where(c) { d: e; f: g h; } @media (x) { .b { d: i } } }",
    ),
    {
      "@layer a": {
        ".b :where(c)": { d: "e", f: "g h" },
        "@media (x)": { ".b": { d: "i" } },
      },
    },
  );
  assert.throws(
    () => cssObject(".a { b: c; b: d; }"),
    /Repeated CSS property b/,
  );
  assert.throws(
    () => cssObject(".a { b: c; } .a { d: e; }"),
    /Repeated CSS block .a/,
  );
});

test("every component ships only its own file and links the rest", () => {
  assert.equal(
    onDisk.size,
    sources.size +
      libs.length +
      styleNames.length +
      blocks.length +
      themes.length +
      scales.length +
      1 +
      fonts.length +
      chartExamples.length,
    "public/r has stale or missing items",
  );
  for (const name of sources.keys()) {
    const generated = createItem(name, sources);
    assert.deepEqual(
      itemNamed(name),
      generated,
      `Stale registry entry ${name}`,
    );
    assert.deepEqual(
      generated.files.map((file) => file.target),
      [`@components/vip-ui/${name}.tsx`],
    );
    const [file] = generated.files;
    const usesReactAria = generated.dependencies.some(
      (dependency) => dependencyName(dependency) === "react-aria-components",
    );
    assert.equal(
      Boolean(generated.css?.[`@plugin ${reactAriaPlugin}`]),
      usesReactAria,
      name,
    );
    assert.equal(
      generated.dependencies.includes(versioned(reactAriaPlugin)),
      usesReactAria,
      name,
    );
    for (const [variable, value] of Object.entries(
      generated.cssVars?.light ?? {},
    )) {
      assert.equal(value, themeVars.light[variable]);
      assert.equal(generated.cssVars.dark[variable], themeVars.dark[variable]);
    }
    for (const variable of Object.keys(themeVars.light)) {
      if (file.content.includes(`--${variable})`))
        assert.ok(
          generated.cssVars?.light[variable],
          `${name} uses --${variable} without shipping it`,
        );
    }
    for (const token of Object.keys(themeTokens)) {
      if (new RegExp(`(?<![\\w-])${token}(?![\\w-])`).test(file.content))
        assert.equal(
          generated.cssVars?.theme?.[token],
          themeTokens[token],
          `${name} uses ${token} without shipping it`,
        );
    }
    assert.doesNotMatch(file.content, /vip-(primary|radius|shadow)/);
    for (const [, specifier] of file.content.matchAll(
      /\bfrom\s+["']\.\/([\w-]+)["']/g,
    )) {
      assert.ok(
        generated.registryDependencies?.includes(itemUrl(specifier)),
        `${name} imports ./${specifier} without linking ${specifier}`,
      );
    }
  }
});

test("each file installs from exactly one item", () => {
  const owners = new Map();
  for (const item of onDisk.values()) {
    for (const file of item.files) {
      assert.ok(
        !owners.has(file.target),
        `${file.target} ships in ${owners.get(file.target)} and ${item.name}`,
      );
      owners.set(file.target, item.name);
    }
  }
});

test("registry dependencies are full URLs to generated items", () => {
  for (const item of onDisk.values()) {
    for (const url of item.registryDependencies ?? []) {
      assert.match(url, /^https?:\/\/[^/]+\/r\/[a-z0-9-]+\.json$/);
      assert.ok(byUrl.has(url), `${item.name} links unknown item ${url}`);
    }
  }
  checkRegistryDependencies([...onDisk.values()]);
  const base = {
    name: "example",
    dependencies: [],
    files: [],
  };
  assert.throws(
    () =>
      checkRegistryDependencies([
        { ...base, registryDependencies: ["button"] },
      ]),
    /bare registry dependency button/,
  );
  assert.throws(
    () =>
      checkRegistryDependencies([
        { ...base, registryDependencies: [itemUrl("missing")] },
      ]),
    /not a generated item/,
  );
  assert.throws(
    () =>
      checkRegistryDependencies([
        { ...base, name: "a", registryDependencies: [itemUrl("b")] },
        { ...base, name: "b", registryDependencies: [itemUrl("a")] },
      ]),
    /dependency cycle/,
  );
});

test("every item installs a complete tree of imports", () => {
  for (const item of onDisk.values()) {
    const tree = installTree(item);
    for (const entry of tree.items) {
      for (const file of entry.files) {
        if (!file.target.startsWith("@components/vip-ui/")) continue;
        for (const [, specifier] of file.content.matchAll(
          /\bfrom\s+["']\.\/([\w-]+)["']/g,
        )) {
          assert.ok(
            tree.targets.some(
              (target) =>
                target === `@components/vip-ui/${specifier}.tsx` ||
                target === `@components/vip-ui/${specifier}.ts`,
            ),
            `${item.name} misses ./${specifier} for ${file.target}`,
          );
        }
      }
    }
  }
});

test("shipped theme variables match the site", async () => {
  const normalize = (value) =>
    value.replace(/\s+/g, " ").replace(/\( /g, "(").replace(/ \)/g, ")").trim();
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
  const siteTheme = declarations(site, "@theme inline {");
  const setupTheme = declarations(setup, "@theme inline {");
  for (const [variable, value] of Object.entries(themeTokens)) {
    assert.equal(siteTheme.get(variable), value, `globals.css --${variable}`);
    assert.equal(setupTheme.get(variable), value, `setup.css --${variable}`);
  }
  const generated = setupCss();
  const generatedTheme = declarations(generated, "@theme inline {");
  const siteKeyframes = keyframeBlocks(site);
  for (const [name, animation] of Object.entries(themeAnimations)) {
    if (animation.value !== undefined) {
      assert.equal(
        siteTheme.get(`animate-${name}`),
        normalize(animation.value),
        `globals.css --animate-${name}`,
      );
      assert.equal(
        generatedTheme.get(`animate-${name}`),
        normalize(animation.value),
        `setupCss() --animate-${name}`,
      );
    }
    for (const keyframe of Object.keys(animation.keyframes)) {
      assert.ok(
        siteKeyframes.has(keyframe),
        `globals.css @keyframes ${keyframe}`,
      );
      assert.ok(
        generated.includes(`@keyframes ${keyframe}`),
        `setupCss() @keyframes ${keyframe}`,
      );
    }
  }
  assert.match(setup, /@plugin "tailwindcss-react-aria-components";/);
  assert.match(setupCss(), /--color-success-subtle: var\(--success-subtle\);/);
});

test("dependent components bring their files and packages", () => {
  const tree = installTree(itemNamed("date-range-picker"));
  const targets = tree.targets.map((target) => path.basename(target));
  for (const dependency of [
    "date-range-picker.tsx",
    "date-segment.tsx",
    "button.tsx",
    "range-calendar.tsx",
    "calendar.tsx",
    "popover.tsx",
    "utils.ts",
  ]) {
    assert.ok(targets.includes(dependency), `Missing ${dependency}`);
  }
  for (const dependency of [
    "@phosphor-icons/react",
    "motion",
    "react-aria-components",
    "tailwind-variants",
  ])
    assert.ok(tree.packages.has(dependency), `Missing ${dependency}`);
  assert.equal(targets.length, new Set(targets).size);
  assert.ok(
    tree.items.some((entry) => entry.css),
    "date-range-picker tree has no Tailwind plugin",
  );
});

test("groups link the item they group", () => {
  assert.ok(
    createItem("button-group", sources).registryDependencies.includes(
      itemUrl("button"),
    ),
  );
  assert.ok(
    createItem("toggle-button-group", sources).registryDependencies.includes(
      itemUrl("toggle-button"),
    ),
  );
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

test("every block installs as components with the files it imports", async () => {
  for (const block of blocks) {
    const blockFiles = await readBlockFiles(
      path.join(root, "src/app/blocks", block.name),
    );
    const generated = createBlockItem(block, sources, blockFiles);
    assert.deepEqual(
      itemNamed(block.name),
      generated,
      `Stale registry entry for ${block.name}`,
    );
    assert.equal(generated.type, "registry:block");
    assert.deepEqual(generated.categories, [block.category]);
    assert.ok(
      generated.files.every((file) =>
        file.target.startsWith(`@components/blocks/${block.name}/`),
      ),
    );
    assert.ok(
      generated.files.every((file) => !file.target.endsWith("/page.tsx")),
    );
    assert.ok(
      generated.files.some(
        (file) =>
          file.target ===
          `@components/blocks/${block.name}/${generated.meta.entry.file}`,
      ),
    );
    for (const file of generated.files)
      assert.doesNotMatch(file.content, /from "next[/"]/);
    const tree = installTree(generated);
    for (const file of generated.files) {
      assert.doesNotMatch(file.content, /@\/(components\/ui|lib)\//);
      for (const specifier of file.content.matchAll(
        /\bfrom\s+["'](\.{1,2}\/[^"']+)["']/g,
      )) {
        const resolved = path.posix.normalize(
          path.posix.join(
            path.posix.dirname(
              file.target.replace(/^@components\//, "src/components/"),
            ),
            specifier[1],
          ),
        );
        assert.ok(
          tree.targets.some((entry) => {
            const target = entry.replace(/^@components\//, "src/components/");
            return target === `${resolved}.tsx` || target === `${resolved}.ts`;
          }),
          `Missing ${specifier[1]} for ${file.target}`,
        );
      }
    }
  }
});

test("blocks bring the packages their files import", async () => {
  const dashboard = createBlockItem(
    blocks.find(({ name }) => name === "dashboard-01"),
    sources,
    await readBlockFiles(path.join(root, "src/app/blocks/dashboard-01")),
  );
  assert.ok(dashboard.dependencies.includes(versioned("@tanstack/charts")));
  assert.ok(dashboard.registryDependencies.includes(itemUrl("utils")));
  assert.ok(dashboard.registryDependencies.includes(itemUrl("chart")));
  assert.throws(
    () =>
      createBlockItem(
        { name: "empty-01", description: "", category: "dashboard" },
        sources,
        new Map(),
      ),
    /no page\.tsx/,
  );
  assert.throws(
    () =>
      createBlockItem(
        { name: "empty-01", description: "", category: "dashboard" },
        sources,
        new Map([
          [
            "page.tsx",
            "export default function Page() {\n  return <main />;\n}\n",
          ],
        ]),
      ),
    /must only set metadata and render one component/,
  );
});

test("theme items carry the site themes with vars and @theme mappings", () => {
  assert.equal(themes.length, 10);
  for (const item of themes) {
    assert.deepEqual(
      itemNamed(item.name),
      item,
      `Stale registry entry ${item.name}`,
    );
    assert.equal(item.type, "registry:theme");
    assert.deepEqual(item.files, []);
    assert.match(item.name, /^theme-[a-z0-9-]+$/);
    const light = Object.keys(item.cssVars.light);
    assert.deepEqual(Object.keys(item.cssVars.dark), light);
    for (const name of light)
      assert.equal(
        item.cssVars.theme[`color-${name}`],
        `var(--${name})`,
        `${item.name} does not map --color-${name}`,
      );
  }
  const teal = itemNamed("theme-teal");
  assert.match(teal.cssVars.light.primary, /oklch\(/);
  assert.ok(
    teal.cssVars.light["sidebar-ring"],
    "theme misses the sidebar tokens",
  );
  assert.ok(
    themes.every((item) => !sources.has(item.name)),
    "a theme name collides with a component name",
  );
});

test("color scales install 12 steps for light and dark mode", () => {
  assert.equal(scales.length, 10);
  for (const item of scales) {
    assert.deepEqual(
      itemNamed(item.name),
      item,
      `Stale registry entry ${item.name}`,
    );
    assert.equal(item.type, "registry:theme");
    const light = Object.keys(item.cssVars.light);
    assert.equal(light.length, 12);
    assert.deepEqual(Object.keys(item.cssVars.dark), light);
    assert.deepEqual(
      light,
      Array.from({ length: 12 }, (_, index) => `${item.name}-${index + 1}`),
    );
    assert.equal(
      item.cssVars.theme[`color-${item.name}-3`],
      `var(--${item.name}-3)`,
    );
    assert.ok(
      !sources.has(item.name) && !item.name.startsWith("theme-"),
      `scale name ${item.name} collides with another item`,
    );
  }
});

test("the base item is schema-valid and carries the site setup", () => {
  assert.deepEqual(itemNamed("base"), base, "Stale registry entry base");
  assert.equal(base.type, "registry:base");
  assert.ok(!("config" in base), "the schema does not list config");
  assert.deepEqual(
    Object.keys(base.cssVars.light),
    Object.keys(base.cssVars.dark),
  );
  assert.equal(
    base.cssVars.theme["ease-out-quint"],
    themeTokens["ease-out-quint"],
  );
  assert.equal(base.cssVars.theme["ease-spring"], themeTokens["ease-spring"]);
  assert.equal(base.cssVars.theme["color-highlight"], "var(--highlight)");
  assert.equal(base.cssVars.theme["color-chart-6"], "var(--chart-6)");
  assert.ok(base.css[`@plugin ${reactAriaPlugin}`]);
  assert.ok(base.dependencies.includes(versioned(reactAriaPlugin)));
  assert.ok(
    !("sidebar" in base.cssVars.light),
    "globals.css has no sidebar tokens",
  );
});

test("font items carry the typography fonts for every framework", () => {
  assert.equal(fonts.length, 9);
  for (const item of fonts) {
    assert.deepEqual(
      itemNamed(item.name),
      item,
      `Stale registry entry ${item.name}`,
    );
    assert.equal(item.type, "registry:font");
    assert.equal(item.font.provider, "google");
    for (const key of ["family", "import", "variable", "dependency"])
      assert.ok(item.font[key], `${item.name} has no font.${key}`);
    assert.ok(!("files" in item) || item.files.length === 0);
  }
  assert.equal(itemNamed("font-geist").font.import, "Geist");
  assert.equal(itemNamed("font-geist").font.variable, "--font-geist-sans");
  assert.deepEqual(itemNamed("font-ibm-plex-sans").font.weight, [
    "400",
    "500",
    "600",
  ]);
  assert.deepEqual(itemNamed("font-ibm-plex-mono").font.weight, ["400", "500"]);
  assert.equal(itemNamed("font-inter").font.weight, undefined);
  assert.equal(
    itemNamed("font-jetbrains-mono").font.dependency,
    "@fontsource-variable/jetbrains-mono",
  );
  assert.throws(
    () =>
      createFontItem({
        id: "unknown",
        name: "Unknown",
        kind: "sans",
        variable: "--font-unknown",
        loader: "Unknown",
        source: "google",
      }),
    /No fontsource package/,
  );
});

test("chart examples install as blocks with resolved imports", () => {
  assert.equal(chartExamples.length, 72);
  for (const item of chartExamples) {
    assert.deepEqual(
      itemNamed(item.name),
      item,
      `Stale registry entry ${item.name}`,
    );
    assert.equal(item.type, "registry:block");
    assert.deepEqual(item.categories, ["charts"]);
    assert.ok(chartCatalog.has(item.name));
    assert.equal(item.title, chartCatalog.get(item.name).name);
    const [file] = item.files;
    assert.equal(file.target, `@components/charts/${item.name}.tsx`);
    assert.doesNotMatch(file.content, /@\/(components|lib)\//);
    assert.match(
      file.content,
      new RegExp(`export function ${item.meta.entry.component}\\(`),
    );
    const tree = installTree(item);
    assert.ok(
      tree.items.some((entry) => entry.name === "chart"),
      `${item.name} does not install Chart`,
    );
    for (const specifier of file.content.matchAll(
      /\bfrom\s+["'](\.{1,2}\/[^"']+)["']/g,
    )) {
      const resolved = path.posix.normalize(
        path.posix.join(
          path.posix.dirname(
            file.target.replace(/^@components\//, "src/components/"),
          ),
          specifier[1],
        ),
      );
      assert.ok(
        tree.targets.some((entry) => {
          const target = entry.replace(/^@components\//, "src/components/");
          return target === `${resolved}.tsx` || target === `${resolved}.ts`;
        }),
        `${item.name} misses ${specifier[1]}`,
      );
    }
  }
  const geo = itemNamed("chart-geo");
  assert.ok(geo.dependencies.includes(versioned("d3-geo")));
  assert.ok(geo.devDependencies.includes(versioned("@types/d3-geo")));
  assert.ok(
    chartExamples.some((item) =>
      item.registryDependencies?.includes(itemUrl("button")),
    ),
  );
  assert.ok(
    chartExamples.some((item) =>
      item.registryDependencies?.includes(itemUrl("toggle-button-group")),
    ),
  );
  assert.throws(
    () =>
      createChartExampleItem(
        "chart-area-default",
        "export function A() {}\nexport function B() {}\n",
        chartCatalog,
        sources,
      ),
    /must export one component/,
  );
});

test("item names are unique on disk and schema-valid", () => {
  const files = [...onDisk.keys()];
  assert.equal(files.length, new Set(files).size, "two items share a name");
  const itemKeys = new Set([
    "$schema",
    "name",
    "type",
    "description",
    "title",
    "author",
    "dependencies",
    "devDependencies",
    "registryDependencies",
    "files",
    "tailwind",
    "cssVars",
    "css",
    "envVars",
    "meta",
    "docs",
    "categories",
  ]);
  const allowed = (item) => {
    const keys = new Set(itemKeys);
    if (item.type === "registry:base")
      for (const key of [
        "extends",
        "style",
        "iconLibrary",
        "baseColor",
        "theme",
      ])
        keys.add(key);
    if (item.type === "registry:font") keys.add("font");
    return keys;
  };
  for (const item of onDisk.values()) {
    for (const key of Object.keys(item))
      assert.ok(
        allowed(item).has(key),
        `${item.name} has the schema key ${key}`,
      );
    if (item.type === "registry:font")
      assert.ok(!("config" in item), "fonts carry no config");
  }
});
