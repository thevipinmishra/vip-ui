import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { stripTypeScriptTypes } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  reactAriaPlugin,
  referencedVars,
  setupCss,
  themeTokens,
  themeVars,
} from "./registry-theme.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const uiDirectory = path.join(root, "src/components/ui");
const outputDirectory = path.join(root, "public/r");
const sourceDirectory = path.join(root, "registry/generated");
const libSources = new Map(
  await Promise.all(
    ["utils", "motion"].map(async (name) => [
      name,
      await readFile(path.join(root, `src/lib/${name}.ts`), "utf8"),
    ]),
  ),
);
const styleSources = new Map(
  await Promise.all(
    ["typography"].map(async (name) => [
      name,
      (await readFile(path.join(root, `src/app/${name}.css`), "utf8")).replace(
        /\r\n/g,
        "\n",
      ),
    ]),
  ),
);
const packageJson = JSON.parse(
  await readFile(path.join(root, "package.json"), "utf8"),
);
const chartExamplesDirectory = path.join(
  root,
  "src/components/charts/examples",
);
const registryOrigin = (
  process.env.NEXT_PUBLIC_REGISTRY_URL || "https://vip-ui.dev"
).replace(/\/$/, "");
const catalogGroups = JSON.parse(
  await readFile(path.join(root, "src/lib/catalog.json"), "utf8"),
).groups;
const catalogDescriptions = new Map(
  catalogGroups.flatMap((group) =>
    group.items.map((item) => {
      if (typeof item.description !== "string" || !item.description.trim())
        throw new Error(
          `src/lib/catalog.json has no description for ${item.slug}`,
        );
      return [item.slug, item.description];
    }),
  ),
);
const catalogCategories = new Map(
  catalogGroups.flatMap((group) =>
    group.items.map((item) => [
      item.slug,
      group.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    ]),
  ),
);
const internalCategories = {
  "button-link": "actions",
  chart: "charts",
  typography: "typography",
};
export const registryAuthor =
  "thevipinmishra <https://github.com/thevipinmishra>";
export const reservedNames = ["registry"];
const internalDescriptions = JSON.parse(
  await readFile(path.join(root, "src/lib/internal-descriptions.json"), "utf8"),
);
for (const slug of Object.keys(internalDescriptions)) {
  if (catalogDescriptions.has(slug))
    throw new Error(
      `${slug} is in src/lib/catalog.json and src/lib/internal-descriptions.json`,
    );
}
export function componentDescription(name) {
  const description =
    catalogDescriptions.get(name) ??
    (Object.hasOwn(internalDescriptions, name)
      ? internalDescriptions[name]
      : undefined);
  if (typeof description !== "string" || !description.trim())
    throw new Error(
      `${name} has no description in src/lib/catalog.json or src/lib/internal-descriptions.json`,
    );
  return description;
}
const groupItems = {
  "button-group": ["button"],
  "toggle-button-group": ["toggle-button"],
};
export function portableSource(source) {
  return source
    .replace(/\r\n/g, "\n")
    .replace(/from "@\/lib\/(utils|motion)"/g, 'from "./$1"');
}

export function importsFrom(source) {
  return [...source.matchAll(/\b(?:from|import)\s+["']([^"']+)["']/g)].map(
    (match) => match[1],
  );
}

export function versioned(name) {
  const range =
    packageJson.dependencies?.[name] ?? packageJson.devDependencies?.[name];
  if (!range) throw new Error(`${name} is not in package.json`);
  return `${name}@${/^\d/.test(range) ? `^${range}` : range}`;
}

export function dependencyName(dependency) {
  const at = dependency.indexOf("@", 1);
  return at === -1 ? dependency : dependency.slice(0, at);
}

function styleSetup(contents, dependencies, ownCss = {}) {
  const usesReactAria = dependencies.has("react-aria-components");
  const cssVars = { theme: {}, light: {}, dark: {} };
  const css = usesReactAria ? { [`@plugin ${reactAriaPlugin}`]: {} } : {};
  for (const content of contents) {
    const vars = referencedVars(content);
    if (!vars) continue;
    Object.assign(cssVars.theme, vars.theme);
    Object.assign(cssVars.light, vars.light);
    Object.assign(cssVars.dark, vars.dark);
    Object.assign(css, vars.css);
  }
  for (const [key, value] of Object.entries(ownCss)) {
    if (Object.hasOwn(css, key)) throw new Error(`Repeated CSS block ${key}`);
    css[key] = value;
  }
  if (!Object.keys(cssVars.theme).length) delete cssVars.theme;
  if (!Object.keys(cssVars.light).length) {
    delete cssVars.light;
    delete cssVars.dark;
  }
  return {
    dependencies: [...dependencies, ...(usesReactAria ? [reactAriaPlugin] : [])]
      .sort()
      .map(versioned),
    ...(Object.keys(cssVars).length ? { cssVars } : {}),
    ...(Object.keys(css).length ? { css } : {}),
  };
}

export function itemCategory(name) {
  return (
    catalogCategories.get(name) ??
    (Object.hasOwn(internalCategories, name)
      ? internalCategories[name]
      : "shared")
  );
}

export function docsUrl(name) {
  if (name === "chart") return `${registryOrigin}/charts#documentation`;
  if (catalogCategories.has(name) || name === "typography")
    return `${registryOrigin}/components/${name}`;
  return undefined;
}

const setupNotes = {
  chart:
    "Chart puts a frame around a TanStack Charts chart. It does not use the shadcn/ui chart API.",
  toast: "Render <ToastViewport /> one time, near the root of your app.",
  typography:
    "Add the typography class to an element that contains HTML content.",
};

function itemDocs(name) {
  return Object.hasOwn(setupNotes, name)
    ? { docs: `${setupNotes[name]} Docs: ${docsUrl(name)}` }
    : {};
}

export function packageName(specifier) {
  if (specifier === "motion/react") return "motion";
  if (specifier.startsWith("@"))
    return specifier.split("/").slice(0, 2).join("/");
  return specifier.split("/")[0];
}

export function itemUrl(name) {
  return `${registryOrigin}/r/${name}.json`;
}

export function checkItemNames(items) {
  const names = new Set();
  for (const { name } of items) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name))
      throw new Error(`Registry item name ${name} is not kebab-case`);
    if (names.has(name))
      throw new Error(`Two registry items have the name ${name}`);
    if (reservedNames.includes(name))
      throw new Error(
        `Registry item name ${name} is reserved: /r/${name}.json is the registry index`,
      );
    names.add(name);
  }
}

function titleFor(name) {
  return name
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

function ownImports(name, source, sources) {
  const dependencies = new Set();
  const registryDependencies = new Set();
  for (const specifier of importsFrom(source)) {
    const lib = specifier.replace(/^@\/lib\//, "");
    if (specifier.startsWith("./")) {
      const slug = specifier.slice(2).replace(/\.tsx?$/, "");
      if (!sources.has(slug))
        throw new Error(`${name} imports missing component ${slug}`);
      registryDependencies.add(slug);
    } else if (specifier.startsWith("@/lib/") && libSources.has(lib)) {
      registryDependencies.add(lib);
    } else if (specifier === "react") {
    } else if (
      !specifier.startsWith("@/") &&
      !specifier.startsWith(".") &&
      !specifier.startsWith("node:")
    ) {
      dependencies.add(packageName(specifier));
    } else {
      throw new Error(`Unhandled import in ${name}: ${specifier}`);
    }
  }
  return { dependencies, registryDependencies };
}

function linkedItems(registryDependencies) {
  return registryDependencies.size
    ? { registryDependencies: [...registryDependencies].sort().map(itemUrl) }
    : {};
}

export function createLibItem(name) {
  const source = libSources.get(name);
  if (source === undefined) throw new Error(`Missing shared library ${name}`);
  const { dependencies, registryDependencies } = ownImports(
    name,
    source,
    new Map(),
  );
  const content = portableSource(source);
  const { dependencies: packages, ...setup } = styleSetup(
    [content],
    dependencies,
  );
  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name,
    type: "registry:lib",
    title: titleFor(name),
    description: componentDescription(name),
    author: registryAuthor,
    categories: [itemCategory(name)],
    dependencies: packages,
    ...linkedItems(registryDependencies),
    ...setup,
    files: [
      {
        path: `src/lib/${name}.ts`,
        type: "registry:file",
        target: `@components/vip-ui/${name}.ts`,
        content,
      },
    ],
  };
}

export function cssObject(source) {
  let index = 0;
  function declaration(target, text) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const colon = trimmed.indexOf(":");
    if (colon === -1) throw new Error(`Unparsed CSS statement: ${trimmed}`);
    const property = trimmed.slice(0, colon).trim();
    if (Object.hasOwn(target, property))
      throw new Error(`Repeated CSS property ${property}`);
    target[property] = trimmed
      .slice(colon + 1)
      .trim()
      .replace(/\s+/g, " ");
  }
  function block() {
    const target = {};
    let buffer = "";
    while (index < source.length) {
      const character = source[index++];
      if (character === "{") {
        const key = buffer
          .trim()
          .replace(/\s+/g, " ")
          .replace(/\( /g, "(")
          .replace(/ \)/g, ")");
        if (Object.hasOwn(target, key))
          throw new Error(`Repeated CSS block ${key}`);
        buffer = "";
        target[key] = block();
      } else if (character === "}") {
        declaration(target, buffer);
        return target;
      } else if (character === ";") {
        declaration(target, buffer);
        buffer = "";
      } else {
        buffer += character;
      }
    }
    if (buffer.trim()) throw new Error("Unclosed CSS block");
    return target;
  }
  return block();
}

export function createStyleItem(name) {
  const source = styleSources.get(name);
  if (source === undefined) throw new Error(`Missing stylesheet ${name}`);
  const { dependencies, ...setup } = styleSetup(
    [source],
    new Set(),
    cssObject(source),
  );
  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name,
    type: "registry:item",
    title: titleFor(name),
    description: componentDescription(name),
    author: registryAuthor,
    categories: [itemCategory(name)],
    ...itemDocs(name),
    dependencies,
    ...setup,
    files: [],
  };
}

export const styleNames = [...styleSources.keys()];

export function createItem(name, sources) {
  const source = sources.get(name);
  if (source === undefined) throw new Error(`Missing component ${name}`);
  const { dependencies, registryDependencies } = ownImports(
    name,
    source,
    sources,
  );
  for (const item of groupItems[name] ?? []) registryDependencies.add(item);
  if (name === "chart") dependencies.add("@tanstack/charts");
  const content = portableSource(source);
  const files = [
    {
      path: `src/components/ui/${name}.tsx`,
      type: "registry:file",
      target: `@components/vip-ui/${name}.tsx`,
      content,
    },
  ];
  const { dependencies: packages, ...setup } = styleSetup(
    [content],
    dependencies,
  );
  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name,
    type: "registry:ui",
    title: titleFor(name),
    description: componentDescription(name),
    author: registryAuthor,
    categories: [itemCategory(name)],
    ...itemDocs(name),
    dependencies: packages,
    ...linkedItems(registryDependencies),
    ...setup,
    files,
  };
}

function relativeImport(from, target) {
  const relative = path.posix.relative(path.posix.dirname(from), target);
  return relative.startsWith(".") ? relative : `./${relative}`;
}

const blockPagePattern =
  /^import \{ blockMetadata \} from "@\/lib\/block-seo";\nimport \{ (\w+) \} from "\.\/([\w-]+)";\n\nexport const metadata = blockMetadata\("([\w-]+)"\);\n\nexport default function \w+\(\) \{\n {2}return <\1 \/>;\n\}\n$/;

export function blockEntry(block, blockFiles) {
  const page = blockFiles.get("page.tsx");
  if (page === undefined)
    throw new Error(`Block ${block.name} has no page.tsx`);
  const match = page.replace(/\r\n/g, "\n").match(blockPagePattern);
  if (!match || match[3] !== block.name)
    throw new Error(
      `src/app/blocks/${block.name}/page.tsx must only set metadata and render one component from the block`,
    );
  const file = `${match[2]}.tsx`;
  if (!blockFiles.has(file))
    throw new Error(`Block ${block.name} has no entry file ${file}`);
  return { component: match[1], file };
}

function blockFilesItem(name, sources, blockFiles) {
  const dependencies = new Set();
  const registryDependencies = new Set();
  const files = [];
  for (const [relative, source] of blockFiles) {
    if (relative === "page.tsx") continue;
    const location = `src/components/blocks/${name}/${relative}`;
    let content = source.replace(/\r\n/g, "\n");
    for (const specifier of importsFrom(content)) {
      const lib = specifier.replace(/^@\/lib\//, "");
      if (specifier.startsWith("@/components/ui/")) {
        const slug = specifier.slice("@/components/ui/".length);
        if (!sources.has(slug))
          throw new Error(`${location} imports missing component ${slug}`);
        registryDependencies.add(slug);
        content = content.replaceAll(
          specifier,
          relativeImport(location, `src/components/vip-ui/${slug}`),
        );
      } else if (specifier.startsWith("@/lib/") && libSources.has(lib)) {
        registryDependencies.add(lib);
        content = content.replaceAll(
          specifier,
          relativeImport(location, `src/components/vip-ui/${lib}`),
        );
      } else if (
        !specifier.startsWith(".") &&
        !specifier.startsWith("@/") &&
        packageJson.dependencies?.[packageName(specifier)] &&
        !["next", "react", "react-dom"].includes(packageName(specifier))
      ) {
        dependencies.add(packageName(specifier));
      } else if (!specifier.startsWith(".") && specifier !== "react") {
        throw new Error(`Unhandled import in ${location}: ${specifier}`);
      }
    }
    files.push({
      path: location,
      type: "registry:file",
      target: `@components/blocks/${name}/${relative}`,
      content,
    });
  }
  const { dependencies: packages, ...setup } = styleSetup(
    files.map((file) => file.content),
    dependencies,
  );
  return {
    dependencies: packages,
    ...linkedItems(registryDependencies),
    ...setup,
    files,
  };
}

export function createBlockItem(block, sources, blockFiles) {
  const entry = blockEntry(block, blockFiles);
  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: block.name,
    type: "registry:block",
    title: titleFor(block.name),
    description: block.description,
    author: registryAuthor,
    categories: [block.category],
    docs: `Render <${entry.component} /> from components/blocks/${block.name}/${entry.file}. Preview: ${registryOrigin}/blocks/${block.name}`,
    meta: { entry },
    ...blockFilesItem(block.name, sources, blockFiles),
  };
}

export async function readBlockFiles(directory, prefix = "") {
  const files = new Map();
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const relative = `${prefix}${entry.name}`;
    if (entry.isDirectory()) {
      for (const [name, source] of await readBlockFiles(
        path.join(directory, entry.name),
        `${relative}/`,
      )) {
        files.set(name, source);
      }
    } else if (entry.isFile() && /\.(tsx|ts)$/.test(entry.name)) {
      files.set(
        relative,
        await readFile(path.join(directory, entry.name), "utf8"),
      );
    }
  }
  return files;
}

const siteModuleImports = {
  "src/lib/palettes.ts": { '"./palette-data"': "src/lib/palette-data.ts" },
  "src/app/themes/themes.ts": {
    '"@/lib/palettes"': "src/lib/palettes.ts",
  },
};
const siteModuleCache = new Map();
async function siteModule(relative) {
  const cached = siteModuleCache.get(relative);
  if (cached) return cached;
  let code = stripTypeScriptTypes(
    (await readFile(path.join(root, relative), "utf8")).replace(/\r\n/g, "\n"),
    { mode: "strip" },
  );
  for (const [specifier, target] of Object.entries(
    siteModuleImports[relative] ?? {},
  ))
    code = code.replaceAll(
      specifier,
      JSON.stringify((await siteModule(target)).url),
    );
  const module = {
    url: `data:text/javascript;base64,${Buffer.from(code).toString("base64")}`,
  };
  siteModuleCache.set(relative, module);
  return module;
}

export async function loadSiteModule(relative) {
  return import((await siteModule(relative)).url);
}

export function themeColorMappings(colors) {
  return Object.fromEntries(
    colors.map((name) => [`color-${name}`, `var(--${name})`]),
  );
}

function cssDeclarations(source, selector) {
  const start = source.indexOf(selector);
  if (start === -1) throw new Error(`No ${selector} block in the source`);
  const end = source.indexOf("\n}", start);
  const declarations = new Map();
  for (const [, name, value] of source
    .slice(source.indexOf("{", start) + 1, end)
    .matchAll(/--([\w-]+):\s*([^;]+);/g))
    declarations.set(name, value.replace(/\s+/g, " "));
  if (!declarations.size)
    throw new Error(`The ${selector} block has no declarations`);
  return declarations;
}

function sameKeys(left, right) {
  if (left.size !== right.size) return false;
  for (const name of left.keys()) if (!right.has(name)) return false;
  return true;
}

export function createThemeItem(theme, themeCss) {
  const css = themeCss.replace(/\r\n/g, "\n");
  const light = cssDeclarations(css, ":root {");
  const dark = cssDeclarations(css, ".dark {");
  if (!sameKeys(light, dark))
    throw new Error(
      `Theme ${theme.slug} has different tokens for light and dark`,
    );
  const colors = [...light.keys()];
  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: `theme-${theme.slug}`,
    type: "registry:theme",
    title: theme.name,
    description: theme.description,
    author: registryAuthor,
    categories: ["themes"],
    docs: "The theme sets colors only. Your fonts, radius, and shadows do not change.",
    dependencies: [],
    files: [],
    cssVars: {
      theme: themeColorMappings(colors),
      light: Object.fromEntries(light),
      dark: Object.fromEntries(dark),
    },
  };
}

export async function themeItems() {
  const { themes, themeCss } = await loadSiteModule("src/app/themes/themes.ts");
  return themes.map((theme) => createThemeItem(theme, themeCss(theme)));
}

export function createColorScaleItem(palette) {
  const steps = (mode) =>
    Object.fromEntries(
      palette[mode].map((value, index) => [
        `${palette.slug}-${index + 1}`,
        value,
      ]),
    );
  const light = steps("light");
  const dark = steps("dark");
  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: palette.slug,
    type: "registry:theme",
    title: palette.name,
    description: palette.description,
    author: registryAuthor,
    categories: ["colors"],
    docs: `The scale adds --${palette.slug}-1 to --${palette.slug}-12 for light and dark mode. Classes such as bg-${palette.slug}-3 work after the install.`,
    dependencies: [],
    files: [],
    cssVars: {
      theme: themeColorMappings(Object.keys(light)),
      light,
      dark,
    },
  };
}

export async function colorScaleItems() {
  const { palettes } = await loadSiteModule("src/lib/palettes.ts");
  return palettes.map(createColorScaleItem);
}

const baseTokens = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "highlight",
  "destructive",
  "destructive-foreground",
  "border",
  "input",
  "ring",
  "success",
  "success-subtle",
  "success-foreground",
  "warning",
  "warning-subtle",
  "warning-foreground",
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
  "chart-6",
  "shadow-card",
  "shadow-float",
  "shadow-inset",
];

const siteOnlyTokens = new Set([
  "radius",
  "code",
  "code-foreground",
  "scrollbar-thumb",
  "scrollbar-thumb-hover",
]);

export async function readSiteTheme() {
  const site = (
    await readFile(path.join(root, "src/app/globals.css"), "utf8")
  ).replace(/\r\n/g, "\n");
  const modes = {
    light: cssDeclarations(site, ":root {"),
    dark: cssDeclarations(site, ".dark {"),
  };
  for (const [mode, declarations] of Object.entries(modes)) {
    for (const name of baseTokens) {
      if (!declarations.has(name))
        throw new Error(`globals.css has no --${name} for ${mode}`);
      const value = declarations.get(name);
      const reference = value.match(/^var\(--([\w-]+)\)$/);
      if (reference) {
        const target = declarations.get(reference[1]);
        if (target === undefined)
          throw new Error(
            `globals.css --${name} for ${mode} references missing --${reference[1]}`,
          );
        declarations.set(name, target);
      }
    }
    for (const name of declarations.keys())
      if (
        !baseTokens.includes(name) &&
        !siteOnlyTokens.has(name) &&
        !name.startsWith("sage-")
      )
        throw new Error(
          `globals.css declares unexpected --${name} for ${mode}`,
        );
    for (const [name, value] of Object.entries(themeVars[mode])) {
      if (declarations.get(name) !== value)
        throw new Error(
          `globals.css --${name} for ${mode} does not match the registry token`,
        );
    }
  }
  return {
    light: Object.fromEntries(
      baseTokens.map((name) => [name, modes.light.get(name)]),
    ),
    dark: Object.fromEntries(
      baseTokens.map((name) => [name, modes.dark.get(name)]),
    ),
  };
}

export function createBaseItem(siteTheme) {
  const colors = baseTokens.filter((name) => !name.startsWith("shadow-"));
  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "base",
    type: "registry:base",
    title: "Base",
    description:
      "Sets up a project with the vip/ui theme, the shadow tokens, and the easing tokens.",
    author: registryAuthor,
    categories: ["setup"],
    docs: "Run after shadcn init and before a theme item. The base sets the sage theme colors, the shadow and easing tokens, and the Tailwind React Aria plugin. A theme item installed after it replaces the colors.",
    dependencies: [versioned(reactAriaPlugin)],
    files: [],
    cssVars: {
      theme: {
        ...themeColorMappings(colors),
        ...themeTokens,
      },
      light: siteTheme.light,
      dark: siteTheme.dark,
    },
    css: { [`@plugin ${reactAriaPlugin}`]: {} },
  };
}

const fontFamilies = {
  geist: "Geist Variable",
  "geist-mono": "Geist Mono Variable",
  inter: "Inter Variable",
  "ibm-plex-sans": "IBM Plex Sans Variable",
  "source-serif": "Source Serif 4 Variable",
  newsreader: "Newsreader Variable",
  lora: "Lora Variable",
  "jetbrains-mono": "JetBrains Mono Variable",
  "ibm-plex-mono": "IBM Plex Mono",
};
const fontImports = {
  geist: "Geist",
  "geist-mono": "Geist_Mono",
};
const fontWeights = {
  "ibm-plex-sans": ["400", "500", "600"],
  "ibm-plex-mono": ["400", "500"],
};
const fontDependencies = {
  geist: "@fontsource-variable/geist",
  "geist-mono": "@fontsource-variable/geist-mono",
  inter: "@fontsource-variable/inter",
  "ibm-plex-sans": "@fontsource-variable/ibm-plex-sans",
  "source-serif": "@fontsource-variable/source-serif-4",
  newsreader: "@fontsource-variable/newsreader",
  lora: "@fontsource-variable/lora",
  "jetbrains-mono": "@fontsource-variable/jetbrains-mono",
  "ibm-plex-mono": "@fontsource/ibm-plex-mono",
};
const kindStacks = {
  sans: "sans-serif",
  serif: "serif",
  mono: "monospace",
};

export function createFontItem(font) {
  const family = fontFamilies[font.id];
  const weight = fontWeights[font.id];
  const dependency = fontDependencies[font.id];
  if (!family || !dependency)
    throw new Error(`No fontsource package for ${font.id}`);
  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: `font-${font.id}`,
    type: "registry:font",
    title: font.name,
    description: `The ${font.name} font for the typography presets.`,
    author: registryAuthor,
    categories: ["fonts"],
    dependencies: [],
    files: [],
    font: {
      family: `'${family}', ${kindStacks[font.kind]}`,
      provider: "google",
      import: fontImports[font.id] ?? font.loader,
      variable: font.variable,
      subsets: ["latin"],
      ...(weight ? { weight } : {}),
      dependency,
    },
  };
}

export async function fontItems() {
  const { fontOptions } = await loadSiteModule("src/app/typography/fonts.ts");
  return fontOptions.map(createFontItem);
}

const chartCatalogPattern =
  /\bslug: "([\w-]+)"|\bfile: "([\w-]+)",\s*name: "([^"]+)"/g;

export async function readChartCatalog() {
  const source = await readFile(
    path.join(root, "src/components/charts/catalog.tsx"),
    "utf8",
  );
  const catalog = new Map();
  let category;
  for (const match of source
    .replace(/\r\n/g, "\n")
    .matchAll(chartCatalogPattern)) {
    if (match[1]) category = match[1];
    else if (category) catalog.set(match[2], { name: match[3], category });
  }
  const files = (await readdir(chartExamplesDirectory))
    .filter((file) => file.endsWith(".tsx"))
    .map((file) => file.slice(0, -4));
  for (const file of files)
    if (!catalog.has(file))
      throw new Error(
        `src/components/charts/catalog.tsx does not list chart example ${file}`,
      );
  for (const file of catalog.keys())
    if (!files.includes(file))
      throw new Error(`catalog lists missing chart example ${file}`);
  return catalog;
}

const typePackages = {
  "d3-geo": "@types/d3-geo",
  "d3-scale": "@types/d3-scale",
  "d3-shape": "@types/d3-shape",
};

export function createChartExampleItem(name, source, catalog, sources) {
  const example = catalog.get(name);
  if (!example) throw new Error(`No catalog entry for chart example ${name}`);
  const exported = [...source.matchAll(/export function (\w+)\(/g)];
  if (exported.length !== 1)
    throw new Error(`${name} must export one component`);
  const component = exported[0][1];
  const location = `src/components/charts/${name}.tsx`;
  const dependencies = new Set();
  const devDependencies = new Set();
  const registryDependencies = new Set();
  let content = source.replace(/\r\n/g, "\n");
  for (const specifier of importsFrom(content)) {
    if (specifier.startsWith("@/components/ui/")) {
      const slug = specifier.slice("@/components/ui/".length);
      if (!sources.has(slug))
        throw new Error(`${location} imports missing component ${slug}`);
      registryDependencies.add(slug);
      content = content.replaceAll(
        specifier,
        relativeImport(location, `src/components/vip-ui/${slug}`),
      );
    } else if (specifier === "react") {
    } else if (specifier.startsWith("@tanstack/charts")) {
      dependencies.add("@tanstack/charts");
    } else if (specifier.startsWith("@/lib/")) {
      const lib = specifier.replace(/^@\/lib\//, "");
      if (!libSources.has(lib))
        throw new Error(`Unhandled import in ${location}: ${specifier}`);
      registryDependencies.add(lib);
      content = content.replaceAll(
        specifier,
        relativeImport(location, `src/components/vip-ui/${lib}`),
      );
    } else if (packageJson.dependencies?.[packageName(specifier)]) {
      dependencies.add(packageName(specifier));
      const types = typePackages[packageName(specifier)];
      if (types) devDependencies.add(types);
    } else {
      throw new Error(`Unhandled import in ${location}: ${specifier}`);
    }
  }
  const { dependencies: packages, ...setup } = styleSetup(
    [content],
    dependencies,
  );
  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name,
    type: "registry:block",
    title: example.name,
    author: registryAuthor,
    categories: ["charts"],
    docs: `Render <${component} /> from components/charts/${name}.tsx. Preview: ${registryOrigin}/charts#${name}`,
    meta: { entry: { component, file: `${name}.tsx` } },
    dependencies: packages,
    ...(devDependencies.size
      ? { devDependencies: [...devDependencies].sort().map(versioned) }
      : {}),
    ...linkedItems(registryDependencies),
    ...setup,
    files: [
      {
        path: `src/components/charts/examples/${name}.tsx`,
        type: "registry:file",
        target: `@components/charts/${name}.tsx`,
        content,
      },
    ],
  };
}

export async function chartExampleItems(sources) {
  const catalog = await readChartCatalog();
  const items = [];
  for (const [name] of catalog) {
    items.push(
      createChartExampleItem(
        name,
        await readFile(
          path.join(chartExamplesDirectory, `${name}.tsx`),
          "utf8",
        ),
        catalog,
        sources,
      ),
    );
  }
  return items;
}

const blocksDirectory = path.join(root, "src/app/blocks");

export async function readBlockCatalog() {
  const { blocks } = JSON.parse(
    await readFile(path.join(root, "src/lib/blocks.json"), "utf8"),
  );
  const listed = new Set(blocks.map((block) => block.name));
  for (const entry of await readdir(blocksDirectory, { withFileTypes: true })) {
    if (!entry.isDirectory() || /^[[(]/.test(entry.name)) continue;
    if (!listed.has(entry.name))
      throw new Error(`src/lib/blocks.json does not list block ${entry.name}`);
  }
  return blocks;
}

export function checkRegistryDependencies(items) {
  const urls = new Map(
    items.map((item) => [`${registryOrigin}/r/${item.name}.json`, item]),
  );
  for (const item of items) {
    for (const dependency of item.registryDependencies ?? []) {
      if (!/^https?:\/\//.test(dependency))
        throw new Error(
          `${item.name} has the bare registry dependency ${dependency}`,
        );
      if (!urls.has(dependency))
        throw new Error(
          `${item.name} depends on ${dependency}, which is not a generated item`,
        );
    }
  }
  const visiting = new Set();
  const done = new Set();
  function visit(item, trail) {
    if (done.has(item)) return;
    if (visiting.has(item))
      throw new Error(
        `Registry dependency cycle: ${[...trail, item.name].join(" -> ")}`,
      );
    visiting.add(item);
    for (const dependency of item.registryDependencies ?? [])
      visit(urls.get(dependency), [...trail, item.name]);
    visiting.delete(item);
    done.add(item);
  }
  for (const item of items) visit(item, []);
}

function catalogItem(item, sources) {
  const { $schema: _schema, files, ...rest } = item;
  return {
    ...rest,
    files: files.map(({ content, ...file }) => {
      const destination = file.target.startsWith("@components/")
        ? `src/components/${file.target.slice("@components/".length)}`
        : file.target;
      const sourcePath = `registry/generated/${destination}`;
      const existing = sources.get(sourcePath);
      if (existing && existing !== content)
        throw new Error(`Conflicting registry source: ${sourcePath}`);
      sources.set(sourcePath, content);
      return { ...file, path: sourcePath };
    }),
  };
}

export async function generate() {
  const sources = new Map();
  for (const filename of await readdir(uiDirectory)) {
    if (filename.endsWith(".tsx")) {
      sources.set(
        filename.slice(0, -4),
        await readFile(path.join(uiDirectory, filename), "utf8"),
      );
    }
  }
  for (const slug of Object.keys(internalDescriptions)) {
    if (!sources.has(slug) && !libSources.has(slug) && !styleSources.has(slug))
      throw new Error(
        `src/lib/internal-descriptions.json describes missing file ${slug}`,
      );
  }
  const items = [];
  for (const name of libSources.keys()) items.push(createLibItem(name));
  for (const name of sources.keys()) items.push(createItem(name, sources));
  for (const name of styleSources.keys()) items.push(createStyleItem(name));
  const themes = await themeItems();
  const scales = await colorScaleItems();
  const base = createBaseItem(await readSiteTheme());
  const fonts = await fontItems();
  const blocks = await readBlockCatalog();
  for (const block of blocks) {
    items.push(
      createBlockItem(
        block,
        sources,
        await readBlockFiles(path.join(blocksDirectory, block.name)),
      ),
    );
  }
  const examples = await chartExampleItems(sources);
  items.push(...themes, ...scales, base, ...fonts, ...examples);
  checkItemNames(items);
  checkRegistryDependencies(items);
  const registrySources = new Map();
  const catalogItems = items.map((item) => catalogItem(item, registrySources));
  await mkdir(outputDirectory, { recursive: true });
  for (const filename of await readdir(outputDirectory)) {
    if (filename.endsWith(".json")) {
      await rm(path.join(outputDirectory, filename));
    }
  }
  await rm(sourceDirectory, { recursive: true, force: true });
  for (const item of items) {
    await writeFile(
      path.join(outputDirectory, `${item.name}.json`),
      `${JSON.stringify(item, null, 2)}\n`,
    );
  }
  for (const [filename, content] of registrySources) {
    const destination = path.join(root, filename);
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, content);
  }
  const catalog = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "vip-ui",
    homepage: registryOrigin,
    items: catalogItems,
  };
  const json = `${JSON.stringify(catalog, null, 2)}\n`;
  await writeFile(path.join(root, "registry.json"), json);
  await writeFile(path.join(outputDirectory, "registry.json"), json);
  await writeFile(path.join(outputDirectory, "setup.css"), setupCss());
  console.log(
    `Generated ${libSources.size} libraries, ${sources.size} components, ${styleSources.size} stylesheets, ${themes.length} themes, ${scales.length} color scales, ${fonts.length} fonts, ${blocks.length} blocks, ${examples.length} chart examples, and 1 base in public/r`,
  );
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  await generate();
}
