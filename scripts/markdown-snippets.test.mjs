import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import test from "node:test";
import { compileFunction } from "node:vm";
import { dependencyName, packageName } from "./generate-registry.mjs";

const origin = "https://vip-ui.dev";
process.env.NEXT_PUBLIC_SITE_URL = origin;
process.env.NEXT_PUBLIC_REGISTRY_URL = origin;

const root = path.resolve(import.meta.dirname, "..").replaceAll("\\", "/");
process.chdir(root);
const require = createRequire(import.meta.url);
const ts = require("typescript5");

const siteModules = new Map();

function loadSite(file) {
  if (siteModules.has(file)) return siteModules.get(file).exports;
  const source = readFileSync(file, "utf8");
  if (file.endsWith(".json")) return JSON.parse(source);
  const module = { exports: {} };
  siteModules.set(file, module);
  const { outputText } = ts.transpileModule(source, {
    fileName: file,
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2023,
      esModuleInterop: true,
    },
  });
  const load = (specifier) => {
    if (!/^(?:@\/|\.)/.test(specifier)) return require(specifier);
    const base = specifier.startsWith("@/")
      ? path.join(root, "src", specifier.slice(2))
      : path.resolve(path.dirname(file), specifier);
    const target = [`${base}.ts`, `${base}.tsx`, base].find(existsSync);
    assert.ok(target, `${file} imports missing ${specifier}`);
    return loadSite(target);
  };
  compileFunction(outputText, ["require", "module", "exports"], {
    filename: file,
  })(load, module, module.exports);
  return module.exports;
}

const { GET } = loadSite(
  path.join(root, "src/app/components/(docs)/[slug]/markdown/route.ts"),
);
const { getComponentPageData } = loadSite(
  path.join(root, "src/lib/component-examples.ts"),
);
const { catalogComponents } = loadSite(path.join(root, "src/lib/catalog.ts"));
const { GET: getBlockMarkdown } = loadSite(
  path.join(root, "src/app/api/blocks/[name]/markdown/route.ts"),
);
const { blocks: catalogBlocks } = loadSite(
  path.join(root, "src/lib/blocks.json"),
);
const { GET: getLlmsTxt } = loadSite(
  path.join(root, "src/app/llms.txt/route.ts"),
);

const registry = new Map();
for (const file of await readdir(path.join(root, "public/r"))) {
  if (!file.endsWith(".json") || file === "registry.json") continue;
  const item = JSON.parse(
    await readFile(path.join(root, "public/r", file), "utf8"),
  );
  registry.set(item.name, item);
}

function installTree(names, items) {
  const tree = { files: new Set(), packages: new Set(), items: new Map() };
  function visit(name) {
    if (tree.items.has(name)) return;
    const item = items.get(name);
    if (!item) return;
    tree.items.set(name, item);
    for (const file of item.files) tree.files.add(consumerPath(file.target));
    for (const dependency of item.dependencies)
      tree.packages.add(dependencyName(dependency));
    for (const url of item.registryDependencies ?? [])
      visit(path.posix.basename(new URL(url).pathname, ".json"));
  }
  for (const name of names) visit(name);
  return tree;
}

const consumer = `${root}/.snippet-consumer`;

function consumerPath(target) {
  return `${consumer}/${target.replace(/^@components\//, "components/")}`;
}

function importSpecifiers(source) {
  return [...source.matchAll(/\b(?:from|import)\s+["']([^"']+)["']/g)].map(
    (match) => match[1],
  );
}

function blockDependencies(name, item) {
  const components = new Set();
  const packages = new Set();
  const blockDirectory = `${consumer}/components/blocks/${name}/`;
  for (const file of item.files) {
    const target = consumerPath(file.target);
    const fileDirectory = path.posix.dirname(target);
    for (const specifier of importSpecifiers(file.content)) {
      if (specifier.startsWith(".")) {
        const resolved = path.posix.normalize(
          path.posix.join(fileDirectory, specifier),
        );
        const match = resolved.match(
          /\/components\/vip-ui\/([\w-]+?)(?:\.tsx?)?$/,
        );
        if (match) components.add(match[1]);
        else if (!resolved.startsWith(blockDirectory))
          throw new Error(`${name} has the unresolved import ${specifier}`);
      } else if (!["react", "react-dom"].includes(packageName(specifier))) {
        packages.add(packageName(specifier));
      }
    }
    if (/className="(?:[^"]*\s)?typography(?:\s[^"]*)?"/.test(file.content))
      components.add("typography");
  }
  // The registry adds the React Aria Tailwind plugin with React Aria itself.
  if (packages.has("react-aria-components"))
    packages.add("tailwindcss-react-aria-components");
  return {
    components: [...components].sort(),
    packages: [...packages].sort(),
  };
}

function readSections(markdown) {
  let section = { title: "", text: [], snippets: [] };
  const sections = [section];
  let fence = null;
  for (const line of markdown.split(/\r?\n/)) {
    if (fence) {
      if (line === "```") fence = null;
      else fence.lines.push(line);
    } else if (line.startsWith("```")) {
      fence = { language: line.slice(3), lines: [] };
      section.snippets.push(fence);
    } else if (line.startsWith("## ")) {
      section = { title: line.slice(3), text: [], snippets: [] };
      sections.push(section);
    } else {
      section.text.push(line);
    }
  }
  assert.equal(fence, null, "The Markdown has an open code fence");
  return sections;
}

function declaredDependencies(text) {
  const line = text.find((entry) =>
    /^To use this (?:example|block), install /.test(entry),
  );
  if (!line) return { items: [], packages: [] };
  const packagesStart = line.search(/the npm packages? `/);
  const names = (part) =>
    [...part.matchAll(/`([^`]+)`/g)].map((match) => match[1]);
  return packagesStart === -1
    ? { items: names(line), packages: [] }
    : {
        items: names(line.slice(0, packagesStart)),
        packages: names(line.slice(packagesStart)).map(dependencyName),
      };
}

function snippetDependencies(fences) {
  const components = new Set();
  const packages = new Set();
  for (const { lines } of fences) {
    for (const specifier of importSpecifiers(lines.join("\n"))) {
      const component = specifier.match(/^@\/components\/vip-ui\/([\w-]+)$/);
      if (component) {
        components.add(component[1]);
        continue;
      }
      if (specifier.startsWith("@/") || specifier.startsWith(".")) continue;
      if (specifier === "next/link") continue;
      const name = packageName(specifier);
      if (!["react", "react-dom"].includes(name)) packages.add(name);
    }
  }
  return { components: [...components], packages: [...packages] };
}

const compilerOptions = ts.convertCompilerOptionsFromJson(
  {
    target: "ES2023",
    lib: ["ES2023", "DOM"],
    types: [],
    module: "ESNext",
    moduleResolution: "Bundler",
    jsx: "react-jsx",
    strict: true,
    skipLibCheck: true,
    noEmit: true,
    isolatedModules: true,
    verbatimModuleSyntax: true,
    erasableSyntaxOnly: true,
    moduleDetection: "force",
    noUnusedLocals: true,
    noUnusedParameters: true,
    noFallthroughCasesInSwitch: true,
    noUncheckedSideEffectImports: true,
  },
  root,
).options;
const defaultHost = ts.createCompilerHost(compilerOptions, true);
for (const method of [
  "fileExists",
  "readFile",
  "directoryExists",
  "getDirectories",
  "realpath",
]) {
  defaultHost[method] = memoize(defaultHost[method]);
}
const resolutionCache = ts.createModuleResolutionCache(
  root,
  defaultHost.getCanonicalFileName,
  compilerOptions,
);
const librarySources = new Map();
const resolveLibrary = memoize((specifier, containing) =>
  withoutNodeTypes(
    ts.resolveModuleName(
      specifier,
      containing,
      compilerOptions,
      defaultHost,
      resolutionCache,
    ).resolvedModule,
  ),
);
const resolveTypes = memoize((name, containing) =>
  withoutNodeTypes(
    ts.resolveTypeReferenceDirective(
      name,
      containing,
      compilerOptions,
      defaultHost,
    ).resolvedTypeReferenceDirective,
  ),
);

function memoize(method) {
  const values = new Map();
  return (...args) => {
    const key = args.join(" | ");
    if (!values.has(key)) values.set(key, method(...args));
    return values.get(key);
  };
}

function withoutNodeTypes(resolved) {
  return resolved?.resolvedFileName.includes("/@types/node/")
    ? undefined
    : resolved;
}

function isException(slug, section, specifier) {
  return slug === "button" && section === "Link" && specifier === "next/link";
}

function compile(slug, markdown, items = registry) {
  const problems = [];
  const files = new Map();
  const installs = new Map();
  const labels = new Map();
  const titles = new Map();
  const own = installTree([slug], items);
  const all = new Map(own.items);
  let snippets = 0;

  for (const { title, text, snippets: fences } of readSections(markdown)) {
    if (!fences.length) continue;
    const declared = snippetDependencies(fences);
    for (const name of declared.components)
      if (!items.has(name))
        problems.push(`${slug} > ${title}: no registry item ${name}`);
    const install = installTree([slug, ...declared.components], items);
    for (const name of declared.packages) install.packages.add(name);
    for (const [name, item] of install.items) all.set(name, item);
    for (const { language, lines } of fences) {
      if (language !== "tsx") {
        problems.push(`${slug} > ${title}: cannot check a ${language} fence`);
        continue;
      }
      snippets++;
      let name = `snippet-${snippets}.tsx`;
      if (title === "Example file") {
        const saved = text.join("\n").match(/Save `([\w-]+\.tsx?)`/)?.[1];
        if (saved) name = saved;
        else problems.push(`${slug} > ${title}: no file name`);
      }
      const file = `${consumer}/examples/${name}`;
      files.set(file, `${lines.join("\n")}\n`);
      installs.set(file, install);
      labels.set(file, `${slug} > ${title}`);
      titles.set(file, title);
    }
  }
  for (const [name, item] of all) {
    const install = installTree([name], items);
    for (const file of item.files) {
      const target = consumerPath(file.target);
      files.set(target, file.content);
      installs.set(target, install);
      if (name === slug) labels.set(target, `${slug} > ${file.target}`);
    }
  }

  function resolveName(specifier, containing) {
    const install = installs.get(containing);
    if (install && /^(?:@\/|\.)/.test(specifier)) {
      const base = specifier.startsWith("@/")
        ? `${consumer}/${specifier.slice(2)}`
        : path.posix.join(path.posix.dirname(containing), specifier);
      const target = [`${base}.tsx`, `${base}.ts`].find(
        (file) =>
          files.has(file) &&
          (install.files.has(file) || file.startsWith(`${consumer}/examples/`)),
      );
      return (
        target && {
          resolvedFileName: target,
          extension: target.endsWith("x") ? ts.Extension.Tsx : ts.Extension.Ts,
        }
      );
    }
    if (install) {
      const name = packageName(specifier);
      const installed =
        name === "react" ||
        name === "react-dom" ||
        install.packages.has(name) ||
        isException(slug, titles.get(containing), specifier);
      if (!installed) return;
    }
    return resolveLibrary(
      specifier,
      install ? `${root}/consumer.tsx` : containing,
    );
  }

  const host = {
    ...defaultHost,
    getCurrentDirectory: () => root,
    fileExists: (file) => files.has(file) || defaultHost.fileExists(file),
    readFile: (file) => files.get(file) ?? defaultHost.readFile(file),
    getSourceFile(file, language) {
      if (files.has(file))
        return ts.createSourceFile(file, files.get(file), language, true);
      if (!librarySources.has(file))
        librarySources.set(file, defaultHost.getSourceFile(file, language));
      return librarySources.get(file);
    },
    getModuleResolutionCache: () => resolutionCache,
    resolveModuleNameLiterals: (names, containing) =>
      names.map(({ text }) => ({
        resolvedModule: resolveName(text, containing),
      })),
    resolveTypeReferenceDirectiveReferences: (references, containing) =>
      references.map((reference) => ({
        resolvedTypeReferenceDirective: resolveTypes(
          typeof reference === "string" ? reference : reference.fileName,
          containing,
        ),
      })),
  };
  const program = ts.createProgram([...files.keys()], compilerOptions, host);
  const diagnostics = [
    ...program.getOptionsDiagnostics(),
    ...program.getGlobalDiagnostics(),
  ];
  for (const file of labels.keys()) {
    const source = program.getSourceFile(file);
    diagnostics.push(
      ...program.getSyntacticDiagnostics(source),
      ...program.getSemanticDiagnostics(source),
    );
  }
  for (const { file, start, code, messageText } of diagnostics) {
    const line = file
      ? `:${file.getLineAndCharacterOfPosition(start).line + 1}`
      : "";
    problems.push(
      `${labels.get(file?.fileName) ?? slug}${line} TS${code}: ${ts.flattenDiagnosticMessageText(messageText, "\n  ")}`,
    );
  }
  return { problems, snippets };
}

function fenced(title, code, declaration = "") {
  return [`## ${title}`, "", declaration, "", "```tsx", code, "```", ""].join(
    "\n",
  );
}

const buttonImport = 'import { Button } from "@/components/vip-ui/button";';

test("the snippet check finds each class of broken code", () => {
  const cases = [
    {
      slug: "button",
      code: `${buttonImport}\nexport const View = () => <Button size="huge">Save</Button>;`,
      error: /TS2322/,
    },
    {
      slug: "popover",
      code: 'import { Nope } from "@/components/vip-ui/nope";\nexport const View = () => <Nope />;',
      error: /TS2307.*vip-ui\/nope/,
    },
    {
      slug: "popover",
      code: 'import "missing-package";\nexport const value = 1;',
      error: /TS2307.*missing-package/,
    },
    {
      slug: "lightbox",
      code: 'import { photo } from "./photo";\nexport const value = photo;',
      error: /TS2307.*\.\/photo/,
    },
    {
      slug: "tour",
      code: "export const mode = process.env.MODE;",
      error: /Cannot find name 'process'/,
    },
    {
      slug: "button",
      code: 'import Link from "next/link";\nexport const value = Link;',
      error: /TS2307.*next\/link/,
    },
  ];
  for (const { slug, code, error } of cases) {
    assert.match(
      compile(slug, fenced("Usage", code)).problems.join("\n"),
      error,
    );
  }

  const button = registry.get("button");
  const broken = new Map(registry).set("button", {
    ...button,
    files: button.files.map((file) => ({
      ...file,
      content: `${file.content}\nexport const mode = process.env.MODE;\nexport const items = [...document.querySelectorAll("button")];\n`,
    })),
  });
  const problems = compile("button", "", broken).problems.join("\n");
  assert.match(problems, /Cannot find name 'process'/);
  assert.match(problems, /\[Symbol\.iterator\]/);

  const dashboard = registry.get("dashboard-01");
  assert.ok(dashboard, "dashboard-01 must be a block");
  const brokenBlock = new Map(registry).set("dashboard-01", {
    ...dashboard,
    files: dashboard.files.map((file, index) =>
      index === 0
        ? {
            ...file,
            content: `${file.content}\nimport "missing-block-package";\n`,
          }
        : file,
    ),
  });
  assert.match(
    compile("dashboard-01", "", brokenBlock).problems.join("\n"),
    /TS2307.*missing-block-package/,
  );

  const chart = registry.get("chart-bar-default");
  assert.ok(chart, "chart-bar-default must be a chart example");
  const brokenChart = new Map(registry).set("chart-bar-default", {
    ...chart,
    files: chart.files.map((file) => ({
      ...file,
      content: `${file.content}\nimport "missing-chart-package";\n`,
    })),
  });
  assert.match(
    compile("chart-bar-default", "", brokenChart).problems.join("\n"),
    /TS2307.*missing-chart-package/,
  );
});

test("each component Markdown snippet compiles with the dependencies its imports name", async () => {
  assert.ok(catalogComponents.length > 0, "The catalog has no components");
  const problems = [];
  let snippets = 0;
  for (const { slug } of catalogComponents) {
    const response = await GET(new Request(`${origin}/${slug}.md`), {
      params: Promise.resolve({ slug }),
    });
    assert.equal(response.status, 200, slug);
    const markdown = await response.text();
    const result = compile(slug, markdown);
    const page = getComponentPageData(slug);
    assert.equal(
      result.snippets,
      1 + page.examples.length + (page.exampleFile ? 1 : 0),
      `${slug} must have a snippet for Usage and each example`,
    );
    const apiAt = markdown.indexOf("## API reference");
    const manualAt = markdown.indexOf("## Manual installation");
    const firstExampleAt = page.examples[0]
      ? markdown.indexOf(`## ${page.examples[0].title}`)
      : -1;
    assert.ok(
      apiAt === -1 || firstExampleAt === -1 || apiAt < firstExampleAt,
      `${slug}: API must come before the first example`,
    );
    assert.ok(
      apiAt === -1 || apiAt < manualAt,
      `${slug}: API must come before Manual installation`,
    );
    problems.push(...result.problems);
    snippets += result.snippets;
  }
  assert.ok(
    snippets > catalogComponents.length,
    "The check found too few snippets",
  );
  console.log(
    `Compiled ${snippets} snippets from ${catalogComponents.length} components.`,
  );
  assert.equal(problems.length, 0, `\n${problems.join("\n")}`);
});

test("each block Markdown snippet compiles with its declared dependencies", async () => {
  assert.ok(catalogBlocks.length > 0, "The catalog has no blocks");
  const problems = [];
  let snippets = 0;
  let files = 0;
  for (const block of catalogBlocks) {
    const item = registry.get(block.name);
    assert.ok(item, `${block.name} has no registry item`);
    const response = await getBlockMarkdown(
      new Request(`${origin}/blocks/${block.name}.md`),
      { params: Promise.resolve({ name: block.name }) },
    );
    assert.equal(response.status, 200, block.name);
    const markdown = await response.text();
    const declared = declaredDependencies(markdown.split(/\r?\n/));
    const expected = blockDependencies(block.name, item);
    assert.deepEqual(
      [...declared.items].sort(),
      expected.components,
      `${block.name} declares the wrong registry items`,
    );
    assert.deepEqual(
      [...declared.packages].sort(),
      expected.packages,
      `${block.name} declares the wrong npm packages`,
    );
    const declaredRegistry = new Map(registry).set(block.name, {
      ...item,
      registryDependencies: declared.items.map(
        (dependency) => `${origin}/r/${dependency}.json`,
      ),
      dependencies: declared.packages,
    });
    const result = compile(block.name, markdown, declaredRegistry);
    assert.equal(
      result.snippets,
      1,
      `${block.name} must have one Usage snippet`,
    );
    problems.push(...result.problems);
    snippets += result.snippets;
    files += item.files.length;
  }
  console.log(
    `Compiled ${snippets} block snippets and ${files} block files from ${catalogBlocks.length} blocks.`,
  );
  assert.equal(problems.length, 0, `\n${problems.join("\n")}`);
});

test("the block check finds a missing snippet dependency", async () => {
  const response = await getBlockMarkdown(
    new Request(`${origin}/blocks/dashboard-01.md`),
    { params: Promise.resolve({ name: "dashboard-01" }) },
  );
  assert.equal(response.status, 200);
  const markdown = await response.text();
  const declared = declaredDependencies(markdown.split(/\r?\n/));
  const item = registry.get("dashboard-01");
  assert.ok(item, "dashboard-01 has no registry item");
  const declaredRegistry = new Map(registry).set("dashboard-01", {
    ...item,
    registryDependencies: declared.items.map(
      (dependency) => `${origin}/r/${dependency}.json`,
    ),
    dependencies: declared.packages,
  });
  const broken = markdown.replace(
    "```tsx",
    '```tsx\nimport { Nope } from "@/components/vip-ui/nope";',
  );
  assert.match(
    compile("dashboard-01", broken, declaredRegistry).problems.join("\n"),
    /(?:no registry item nope|TS2307.*vip-ui\/nope)/,
  );
});

test("each chart example compiles with its declared dependencies", () => {
  const charts = [...registry.values()].filter(
    (item) =>
      item.type === "registry:block" &&
      item.files.length > 0 &&
      item.files.every((file) => file.target.startsWith("@components/charts/")),
  );
  assert.ok(charts.length > 0, "The registry has no chart examples");
  const problems = charts.flatMap(({ name }) => compile(name, "").problems);
  console.log(`Compiled ${charts.length} chart examples.`);
  assert.equal(problems.length, 0, `\n${problems.join("\n")}`);
});

test("llms.txt lists every block Markdown page", async () => {
  const text = await (await getLlmsTxt()).text();
  for (const block of catalogBlocks) {
    assert.ok(
      text.includes(
        `[${block.title}](${origin}/blocks/${block.name}.md): ${block.description}`,
      ),
      `${block.name} is not in llms.txt`,
    );
  }
});

test("each other shipped component compiles without Node types", () => {
  const checked = new Set(catalogComponents.map(({ slug }) => slug));
  const others = [...registry.values()].filter(
    (item) =>
      !checked.has(item.name) &&
      (item.type === "registry:ui" || item.type === "registry:lib"),
  );
  assert.ok(others.length > 0, "The registry has no shared files");
  const problems = others.flatMap(({ name }) => compile(name, "").problems);
  assert.equal(problems.length, 0, `\n${problems.join("\n")}`);
});
