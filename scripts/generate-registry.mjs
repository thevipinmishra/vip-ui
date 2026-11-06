import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  reactAriaPlugin,
  referencedVars,
  setupCss,
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
const packageJson = JSON.parse(
  await readFile(path.join(root, "package.json"), "utf8"),
);
const registryOrigin = (
  process.env.NEXT_PUBLIC_REGISTRY_URL || "https://vip-ui.dev"
).replace(/\/$/, "");
const catalogDescriptions = new Map(
  JSON.parse(
    await readFile(path.join(root, "src/lib/catalog.json"), "utf8"),
  ).groups.flatMap((group) =>
    group.items.map((item) => {
      if (typeof item.description !== "string" || !item.description.trim())
        throw new Error(
          `src/lib/catalog.json has no description for ${item.slug}`,
        );
      return [item.slug, item.description];
    }),
  ),
);
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

function styleSetup(contents, dependencies) {
  const setup = {};
  const cssVars = { theme: {}, light: {}, dark: {} };
  for (const content of contents) {
    const vars = referencedVars(content);
    if (!vars) continue;
    Object.assign(cssVars.theme, vars.theme);
    Object.assign(cssVars.light, vars.light);
    Object.assign(cssVars.dark, vars.dark);
  }
  if (dependencies.has("react-aria-components")) {
    setup.devDependencies = [versioned(reactAriaPlugin)];
    setup.css = { [`@plugin ${reactAriaPlugin}`]: {} };
  }
  if (!Object.keys(cssVars.theme).length) delete cssVars.theme;
  if (!Object.keys(cssVars.light).length) {
    delete cssVars.light;
    delete cssVars.dark;
  }
  if (Object.keys(cssVars).length) setup.cssVars = cssVars;
  return setup;
}

export function packageName(specifier) {
  if (specifier === "motion/react") return "motion";
  if (specifier.startsWith("@"))
    return specifier.split("/").slice(0, 2).join("/");
  return specifier.split("/")[0];
}

export function itemUrl(name) {
  return `${registryOrigin}/r/vip-${name}.json`;
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
  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: `vip-${name}`,
    type: "registry:lib",
    title: titleFor(name),
    description: componentDescription(name),
    dependencies: [...dependencies].sort().map(versioned),
    ...linkedItems(registryDependencies),
    ...styleSetup([content], dependencies),
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
  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: `vip-${name}`,
    type: "registry:ui",
    title: titleFor(name),
    description: componentDescription(name),
    dependencies: [...dependencies].sort().map(versioned),
    ...linkedItems(registryDependencies),
    ...styleSetup([content], dependencies),
    files,
  };
}

function relativeImport(from, target) {
  const relative = path.posix.relative(path.posix.dirname(from), target);
  return relative.startsWith(".") ? relative : `./${relative}`;
}

function createRouteItem(routeDirectory, sources, routeFiles, block) {
  const dependencies = new Set();
  const registryDependencies = new Set();
  const files = [];
  for (const [relative, source] of routeFiles) {
    const pathInApp = `${routeDirectory}/${relative}`;
    let content = source.replace(/\r\n/g, "\n");
    if (relative === "page.tsx" && block) {
      content = content
        .replace('import { blockMetadata } from "@/lib/block-seo";\n', "")
        .replace(
          /export const metadata = blockMetadata\("[^"]+"\);/,
          `export const metadata = {\n  title: ${JSON.stringify(block.title)},\n  description: ${JSON.stringify(block.description)},\n};`,
        );
    }
    for (const specifier of importsFrom(content)) {
      const lib = specifier.replace(/^@\/lib\//, "");
      if (specifier.startsWith("@/components/ui/")) {
        const slug = specifier.slice("@/components/ui/".length);
        if (!sources.has(slug))
          throw new Error(`${pathInApp} imports missing component ${slug}`);
        registryDependencies.add(slug);
        content = content.replaceAll(
          specifier,
          relativeImport(pathInApp, `src/components/vip-ui/${slug}`),
        );
      } else if (specifier.startsWith("@/lib/") && libSources.has(lib)) {
        registryDependencies.add(lib);
        content = content.replaceAll(
          specifier,
          relativeImport(pathInApp, `src/components/vip-ui/${lib}`),
        );
      } else if (
        specifier === "server-only" ||
        (!specifier.startsWith(".") &&
          !specifier.startsWith("@/") &&
          packageJson.dependencies?.[packageName(specifier)] &&
          !["next", "react", "react-dom"].includes(packageName(specifier)))
      ) {
        dependencies.add(packageName(specifier));
      } else if (
        !specifier.startsWith(".") &&
        !specifier.startsWith("next/") &&
        specifier !== "next" &&
        specifier !== "react"
      ) {
        throw new Error(`Unhandled import in ${pathInApp}: ${specifier}`);
      }
    }
    files.push({
      path: pathInApp,
      type:
        relative.endsWith("/page.tsx") || relative === "page.tsx"
          ? "registry:page"
          : "registry:file",
      target: pathInApp,
      content,
    });
  }
  return {
    dependencies: [...dependencies]
      .sort()
      .map((dependency) =>
        dependency === "server-only" ? dependency : versioned(dependency),
      ),
    ...linkedItems(registryDependencies),
    ...styleSetup(
      files.map((file) => file.content),
      dependencies,
    ),
    files,
  };
}

export function createBlockItem(block, sources, blockFiles) {
  if (!blockFiles.has("page.tsx"))
    throw new Error(`Block ${block.name} has no page.tsx`);
  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: `vip-${block.name}`,
    type: "registry:block",
    title: block.name
      .split("-")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" "),
    description: block.description,
    categories: [block.category],
    ...createRouteItem(
      `src/app/blocks/${block.name}`,
      sources,
      blockFiles,
      block,
    ),
  };
}

export async function readRouteFiles(directory, prefix = "") {
  const files = new Map();
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const relative = `${prefix}${entry.name}`;
    if (entry.isDirectory()) {
      for (const [name, source] of await readRouteFiles(
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
  await mkdir(outputDirectory, { recursive: true });
  for (const filename of await readdir(outputDirectory)) {
    if (filename === "registry.json" || /^vip-.*\.json$/.test(filename)) {
      await rm(path.join(outputDirectory, filename));
    }
  }
  await rm(sourceDirectory, { recursive: true, force: true });
  for (const slug of Object.keys(internalDescriptions)) {
    if (!sources.has(slug) && !libSources.has(slug))
      throw new Error(
        `src/lib/internal-descriptions.json describes missing file ${slug}`,
      );
  }
  const items = [];
  for (const name of libSources.keys()) {
    if (sources.has(name))
      throw new Error(`Component ${name} has the name of a shared library`);
    items.push(createLibItem(name));
  }
  for (const name of sources.keys()) items.push(createItem(name, sources));
  const blocks = await readBlockCatalog();
  for (const block of blocks) {
    if (sources.has(block.name) || libSources.has(block.name))
      throw new Error(`Block ${block.name} has the name of another item`);
    items.push(
      createBlockItem(
        block,
        sources,
        await readRouteFiles(path.join(blocksDirectory, block.name)),
      ),
    );
  }
  checkRegistryDependencies(items);
  const catalogItems = [];
  const registrySources = new Map();
  for (const item of items) {
    catalogItems.push(catalogItem(item, registrySources));
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
    `Generated ${libSources.size} libraries, ${sources.size} components, and ${blocks.length} blocks in public/r`,
  );
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  await generate();
}
