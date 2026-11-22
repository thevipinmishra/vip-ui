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
    entry.startsWith("To use this example, install "),
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
    const declared = declaredDependencies(text);
    for (const name of declared.items)
      if (!items.has(name))
        problems.push(`${slug} > ${title}: no registry item ${name}`);
    const install = installTree([slug, ...declared.items], items);
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
const buttonView = "export const View = () => <Button>Save</Button>;";
const iconImport = 'import { CheckIcon } from "@phosphor-icons/react";';
const iconView = "export const View = () => <CheckIcon />;";

test("the snippet check finds each class of broken code", () => {
  const cases = [
    {
      slug: "button",
      code: `${buttonImport}\nexport const View = () => <Button size="huge">Save</Button>;`,
      error: /TS2322/,
    },
    {
      slug: "popover",
      code: `${buttonImport}\n${buttonView}`,
      fix: "To use this example, install the registry item `button`.",
      error: /TS2307.*vip-ui\/button/,
    },
    {
      slug: "popover",
      code: `${iconImport}\n${iconView}`,
      fix: "To use this example, install the npm package `@phosphor-icons/react@^2.1.10`.",
      error: /TS2307.*phosphor-icons/,
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
  for (const { slug, code, fix, error } of cases) {
    assert.match(
      compile(slug, fenced("Usage", code)).problems.join("\n"),
      error,
    );
    if (fix)
      assert.deepEqual(
        compile(slug, fenced("Usage", code, fix)).problems,
        [],
        `${slug} must compile after it declares its dependency`,
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
});

test("each component Markdown snippet compiles with its declared dependencies", async () => {
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
    if (markdown.includes("install the registry item"))
      assert.ok(
        markdown.includes(`${origin}/r/<slug>.json`),
        `${slug} must give the URL of a registry item`,
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
