#!/usr/bin/env node
/**
 * AD-13: follow the agent instructions end to end in a clean Vite app.
 *
 * The script snapshots `public/r`, serves it on a free localhost port, and
 * builds the Markdown that an agent would read. It then does the steps of that
 * Markdown: the alias, `components.json` without `init`, the missing theme
 * tokens, the React Aria plugin, a safe install, a type check, and a build.
 * There is no Next build and no browser requirement.
 *
 * Usage:
 *   node scripts/agent-e2e.mjs --package-manager npm|pnpm [--keep]
 *
 * The harness reads the served text, not the source files, for the commands
 * that it runs. Contract checks fail with an instruction to update this file
 * when the served Markdown changes on purpose.
 */
import { spawn, spawnSync } from "node:child_process";
import {
  appendFileSync,
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { createServer } from "node:http";
import { createRequire } from "node:module";
import os from "node:os";
import path from "node:path";
import { compileFunction } from "node:vm";

const root = path.resolve(import.meta.dirname, "..").replaceAll("\\", "/");

// ---------------------------------------------------------------------------
// Options

const options = { packageManager: "npm", keep: false };
const argv = process.argv.slice(2);
for (let index = 0; index < argv.length; index++) {
  const argument = argv[index];
  if (argument === "--package-manager") options.packageManager = argv[++index];
  else if (argument === "--keep") options.keep = true;
  else if (argument === "--help") {
    console.log(
      "Usage: node scripts/agent-e2e.mjs --package-manager npm|pnpm [--keep]",
    );
    process.exit(0);
  } else throw new Error(`Unknown argument: ${argument}`);
}
if (!["npm", "pnpm"].includes(options.packageManager)) {
  throw new Error("--package-manager must be npm or pnpm");
}

const packageManager = options.packageManager;
const runner = packageManager === "pnpm" ? "pnpm dlx" : "npx";
const plugin = "tailwindcss-react-aria-components";

// ---------------------------------------------------------------------------
// Temp layout

const tempRoot = mkdtempSync(path.join(os.tmpdir(), "vip-ui-agent-e2e-"));
const docRoot = path.join(tempRoot, "docs");
const appDir = path.join(tempRoot, "app");
const cacheDir = path.join(tempRoot, "npm-cache");
const logDir = path.join(tempRoot, "logs");
const servedDir = path.join(tempRoot, "served");
for (const directory of [docRoot, appDir, cacheDir, logDir, servedDir]) {
  mkdirSync(directory, { recursive: true });
}

const commandEnv = {
  ...process.env,
  CI: "1",
  FORCE_COLOR: "0",
  NEXT_TELEMETRY_DISABLED: "1",
  NO_COLOR: "1",
  npm_config_audit: "false",
  npm_config_cache: cacheDir,
  npm_config_fund: "false",
  npm_config_yes: "true",
};

// ---------------------------------------------------------------------------
// Snapshot and server

const registrySource = path.join(root, "public/r");
const snapshot = path.join(docRoot, "public/r");
mkdirSync(snapshot, { recursive: true });
cpSync(registrySource, snapshot, { recursive: true });
cpSync(
  path.join(root, "src/components/docs"),
  path.join(docRoot, "src/components/docs"),
  { recursive: true },
);

let origin = "";
const requests = [];
const server = createServer((request, response) => {
  const pathname = (request.url ?? "/").split("?")[0];
  const match = pathname.match(/^\/r\/([a-z0-9-]+\.(?:json|css))$/);
  if (!match) {
    response.writeHead(404, { "content-type": "text/plain" }).end("Not found");
    return;
  }
  const file = path.join(snapshot, match[1]);
  if (!existsSync(file)) {
    response.writeHead(404, { "content-type": "text/plain" }).end("Not found");
    return;
  }
  requests.push(match[1]);
  const body = readFileSync(file, "utf8")
    .replaceAll("https://vip-ui.dev/r/", `${origin}/r/`)
    .replaceAll("http://localhost:3000/r/", `${origin}/r/`);
  response
    .writeHead(200, {
      "cache-control": "no-store",
      "content-type": match[1].endsWith(".json")
        ? "application/json; charset=utf-8"
        : "text/css; charset=utf-8",
    })
    .end(body);
});

await new Promise((resolve, reject) => {
  server.once("error", reject);
  server.listen(0, "127.0.0.1", resolve);
});
origin = `http://127.0.0.1:${server.address().port}`;

// ---------------------------------------------------------------------------
// Load the site modules without a Next build

process.env.NEXT_PUBLIC_SITE_URL = origin;
process.env.NEXT_PUBLIC_REGISTRY_URL = origin;
delete process.env.NEXT_PUBLIC_DEPLOY_ORIGIN;
process.env.NODE_ENV = "production";

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
    if (!target) throw new Error(`${file} imports missing ${specifier}`);
    return loadSite(target);
  };
  compileFunction(outputText, ["require", "module", "exports"], {
    filename: file,
  })(load, module, module.exports);
  return module.exports;
}

// `registry-docs.ts` and the Markdown route read `public/r` and the demo
// sources from the current directory. Point them at the snapshot.
process.chdir(docRoot);

const { buildSetupMarkdown } = loadSite(
  path.join(root, "src/lib/setup-markdown.ts"),
);
const { installSteps, itemPrompt } = loadSite(
  path.join(root, "src/lib/agent-docs.ts"),
);
const { GET } = loadSite(
  path.join(root, "src/app/components/(docs)/[slug]/markdown/route.ts"),
);

async function getMarkdown(slug) {
  const response = await GET(new Request(`${origin}/components/${slug}.md`), {
    params: Promise.resolve({ slug }),
  });
  if (!response.ok) {
    throw new Error(
      `The Markdown route returned ${response.status} for ${slug}`,
    );
  }
  return response.text();
}

// ---------------------------------------------------------------------------
// Small file helpers

function appPath(relative) {
  return path.join(appDir, relative);
}

function readApp(relative) {
  return readFileSync(appPath(relative), "utf8");
}

function writeApp(relative, text) {
  const file = appPath(relative);
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, text);
}

function existsApp(relative) {
  return existsSync(appPath(relative));
}

function writeAppAbsolute(file, text) {
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, text);
}

function readJson(relative) {
  return JSON.parse(readApp(relative));
}

function writeJson(relative, value) {
  writeApp(relative, `${JSON.stringify(value, null, 2)}\n`);
}

function writeServed(name, text) {
  writeFileSync(path.join(servedDir, name), text);
}

// ---------------------------------------------------------------------------
// Command helpers

const transient =
  /ETIMEDOUT|ECONNRESET|EAI_AGAIN|ENOTFOUND|UND_ERR_CONNECT_TIMEOUT|UND_ERR_SOCKET|socket hang up|fetch failed|Connect Timeout|503|502|504/i;

function logCommand(label, command, code, output) {
  const text = `\n$ ${command}\nexit ${code}\n${output}`;
  appendFileSync(path.join(logDir, `${label}.log`), text);
}

function runChild(command, args, { label, timeout = 360000, shell = false }) {
  const display = args ? [command, ...args].join(" ") : command;
  return new Promise((resolve) => {
    const settings = {
      cwd: appDir,
      env: commandEnv,
      shell,
      stdio: ["ignore", "pipe", "pipe"],
      windowsHide: true,
    };
    const child = shell
      ? spawn(display, settings)
      : args
        ? spawn(command, args, settings)
        : spawn(command, settings);
    let output = "";
    let settled = false;
    let timedOut = false;
    let timer;
    const append = (chunk) => {
      output += chunk.toString();
      if (output.length > 64 * 1024 * 1024) {
        output = output.slice(-32 * 1024 * 1024);
      }
    };
    child.stdout.on("data", append);
    child.stderr.on("data", append);
    const finish = (code, extra = "") => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      const text = `${output}${extra}`;
      logCommand(label, display, code, text);
      resolve({ code, output: text });
    };
    timer = setTimeout(() => {
      timedOut = true;
      if (process.platform === "win32") {
        spawnSync("taskkill", ["/pid", String(child.pid), "/t", "/f"], {
          windowsHide: true,
        });
      } else {
        child.kill("SIGKILL");
      }
    }, timeout);
    child.on("error", (error) => finish(1, `\n${error.stack ?? error}`));
    child.on("close", (code) =>
      finish(
        timedOut ? 124 : (code ?? 1),
        timedOut ? `\nTIMEOUT after ${timeout} ms` : "",
      ),
    );
  });
}

function execute(command, args, options) {
  return runChild(command, args, options);
}

function executePackageManager(args, options) {
  return runChild(packageManager, args, {
    ...options,
    shell: process.platform === "win32",
  });
}

function executeShell(command, options) {
  return runChild(command, null, { ...options, shell: true });
}

async function withRetry(label, run) {
  let result = await run();
  if (result.code !== 0 && transient.test(result.output)) {
    console.log(`[${label}] transient network error, retrying once`);
    result = await run();
  }
  return result;
}

function expectOk(result, label) {
  if (result.code !== 0) {
    const tail = result.output.trim().split("\n").slice(-12).join("\n");
    throw new Error(
      `${label} exited ${result.code}. Rerun with --keep to keep the logs.\n${tail}`,
    );
  }
}

// ---------------------------------------------------------------------------
// The seed app

// The plugin is a seed dependency so the flow needs one package-manager
// install before the first registry add. Setup step 5 still checks it and adds
// the `@plugin` line.
const seedPackageJson = {
  name: "vip-ui-agent-e2e",
  private: true,
  version: "0.0.0",
  type: "module",
  scripts: { build: "vite build" },
  dependencies: {
    react: "^19.3.1",
    "react-dom": "^19.3.1",
  },
  devDependencies: {
    "@tailwindcss/vite": "^4.3.5",
    "@types/react": "^19.3.0",
    "@types/react-dom": "^19.3.0",
    "@vitejs/plugin-react": "^6.3.0",
    [plugin]: "^2.2.0",
    tailwindcss: "^4.3.5",
    typescript: "^5.9.3",
    vite: "^8.3.8",
  },
};

const seedIndexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>vip-ui agent e2e</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;

const seedTsconfig = {
  files: [],
  references: [{ path: "./tsconfig.app.json" }],
};

const seedTsconfigApp = {
  compilerOptions: {
    target: "ES2022",
    useDefineForClassFields: true,
    lib: ["ES2022", "DOM", "DOM.Iterable"],
    module: "ESNext",
    skipLibCheck: true,
    moduleResolution: "bundler",
    allowImportingTsExtensions: true,
    verbatimModuleSyntax: true,
    moduleDetection: "force",
    noEmit: true,
    jsx: "react-jsx",
    strict: true,
    noUnusedLocals: true,
    noUnusedParameters: true,
    noFallthroughCasesInSwitch: true,
  },
  include: ["src"],
};

const seedViteConfig = `import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
`;

const themeCss = `@import "tailwindcss";

:root {
  --background: #fff8f0;
  --foreground: #221100;
  --primary: #ff00aa;
  --primary-foreground: #fff8f0;
  --brand-font: "Trebuchet MS", "Segoe UI", sans-serif;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #120b18;
    --foreground: #f6eef8;
    --primary: #ff77cc;
    --primary-foreground: #120b18;
  }
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --font-sans: var(--brand-font);
}

body {
  margin: 0;
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-sans);
}
`;

function mainSource({ alert, button, toast }) {
  const imports = ['import { StrictMode } from "react";'];
  if (alert) imports.push('import { Alert } from "@/components/vip-ui/alert";');
  if (button)
    imports.push('import { Button } from "@/components/vip-ui/button";');
  if (toast)
    imports.push('import { ToastViewport } from "@/components/vip-ui/toast";');
  imports.push('import { createRoot } from "react-dom/client";');
  imports.push('import "./index.css";');

  const buttonLine = button ? "\n        <Button>Save</Button>" : "";
  const alertLine = alert
    ? `
        <Alert title="Saved" variant="success">
          The change is live.
        </Alert>`
    : "";
  const toastLine = toast ? "\n        <ToastViewport />" : "";

  return `${imports.join("\n")}

function App() {
  return (
    <main className="p-10">
      <h1 className="text-2xl font-semibold">vip-ui agent e2e</h1>
      <div className="mt-4 flex items-center gap-3">
        <i id="highlight" className="block size-4 bg-highlight" />
        <i id="success" className="block size-4 bg-success-subtle" />
      </div>${buttonLine}${alertLine}${toastLine}
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
`;
}

function writeMain(flags) {
  writeApp("src/main.tsx", mainSource(flags));
}

function createSeedApp() {
  writeApp("package.json", `${JSON.stringify(seedPackageJson, null, 2)}\n`);
  writeApp("index.html", seedIndexHtml);
  writeApp("src/index.css", themeCss);
  writeApp(
    "src/main.tsx",
    mainSource({ alert: false, button: false, toast: false }),
  );
  writeApp("vite.config.ts", seedViteConfig);
  writeJson("tsconfig.json", seedTsconfig);
  writeJson("tsconfig.app.json", seedTsconfigApp);
}

// ---------------------------------------------------------------------------
// CSS helpers

function parseCss(text) {
  const rootNode = { type: "root", nodes: [] };
  const stack = [{ node: rootNode, path: [] }];
  let start = 0;
  let index = 0;
  let paren = 0;
  let quote = null;
  const top = () => stack[stack.length - 1];

  function addText(end) {
    if (end <= start) return;
    const raw = text.slice(start, end);
    if (raw.trim()) {
      top().node.nodes.push({ type: "text", raw, start, end });
    }
  }

  while (index < text.length) {
    const character = text[index];
    if (quote) {
      if (character === "\\") {
        index += 2;
        continue;
      }
      if (character === quote) quote = null;
      index++;
      continue;
    }
    if (character === '"' || character === "'") {
      quote = character;
      index++;
      continue;
    }
    if (character === "/" && text[index + 1] === "*") {
      const end = text.indexOf("*/", index + 2);
      index = end === -1 ? text.length : end + 2;
      continue;
    }
    if (character === "(") {
      paren++;
      index++;
      continue;
    }
    if (character === ")") {
      paren = Math.max(0, paren - 1);
      index++;
      continue;
    }
    if (paren === 0) {
      if (character === "{") {
        addText(index);
        const parent = top();
        const prelude = text.slice(start, index).trim();
        const block = {
          type: "block",
          prelude,
          start,
          open: index,
          close: -1,
          end: -1,
          nodes: [],
        };
        parent.node.nodes.push(block);
        stack.push({ node: block, path: [...parent.path, prelude] });
        index++;
        start = index;
        continue;
      }
      if (character === "}") {
        addText(index);
        const entry = stack.pop() ?? stack[0];
        entry.node.close = index;
        entry.node.end = index + 1;
        index++;
        start = index;
        continue;
      }
      if (character === ";") {
        addText(index + 1);
        index++;
        start = index;
        continue;
      }
    }
    index++;
  }
  addText(text.length);
  return rootNode;
}

function walkCss(node, visit, pathParts = []) {
  for (const child of node.nodes) {
    if (child.type === "block") {
      const childPath = [...pathParts, child.prelude];
      visit(child, childPath);
      walkCss(child, visit, childPath);
    }
  }
}

function cssBlocks(css) {
  const blocks = [];
  walkCss(parseCss(css), (block, blockPath) => {
    blocks.push({ ...block, path: blockPath });
  });
  return blocks;
}

function isDarkMedia(prelude) {
  return /@media[^{]*prefers-color-scheme:\s*dark/.test(prelude);
}

function scanDeclarations(css) {
  const declarations = [];
  const rootNode = parseCss(css);
  const visit = (node, pathParts) => {
    if (node.type === "text") {
      const match = node.raw.match(/^(\s*)(--[\w-]+)\s*:\s*([\s\S]*?);?\s*$/);
      if (match) {
        declarations.push({
          prop: match[2],
          value: match[3].trim().replace(/\s+/g, " "),
          path: pathParts.join(" > "),
          start: node.start,
          end: node.end,
        });
      }
      return;
    }
    for (const child of node.nodes) {
      visit(child, node.prelude ? [...pathParts, node.prelude] : pathParts);
    }
  };
  visit(rootNode, []);
  return declarations;
}

function applyEdits(text, edits) {
  let result = text;
  for (const edit of [...edits].sort((a, b) => b.start - a.start)) {
    result = result.slice(0, edit.start) + edit.text + result.slice(edit.end);
  }
  return result;
}

function lastImportEnd(css) {
  let end = 0;
  for (const match of css.matchAll(/^@import[^\n]*;\s*$/gm)) {
    end = match.index + match[0].length;
  }
  return end;
}

function insertAfterImports(css, text) {
  const end = lastImportEnd(css);
  if (!end) throw new Error("The seed CSS has no @import");
  return `${css.slice(0, end)}\n\n${text}${css.slice(end)}`;
}

function addCustomVariant(css, params) {
  if (/@custom-variant\s+dark\b/.test(css)) return css;
  return insertAfterImports(css, `@custom-variant dark ${params};`);
}

function addPlugin(css, name) {
  if (css.includes(`@plugin "${name}"`)) return css;
  return insertAfterImports(css, `@plugin "${name}";`);
}

function addMissingTokens(css, cssVars) {
  const blocks = cssBlocks(css);
  const light = blocks.find(
    (block) =>
      block.prelude === ":root" &&
      !block.path.some((entry) => entry.startsWith("@media")),
  );
  const dark = blocks.find(
    (block) =>
      block.prelude === ":root" &&
      block.path.some((entry) => isDarkMedia(entry)),
  );
  const theme = blocks.find((block) => block.prelude === "@theme inline");
  if (!light || !dark || !theme) {
    throw new Error(
      "The seed CSS lost :root, its dark :root, or @theme inline",
    );
  }
  const declarations = scanDeclarations(css);
  const names = (filter) =>
    new Set(declarations.filter(filter).map((entry) => entry.prop.slice(2)));
  const lightNames = names((entry) => entry.path === ":root");
  // The served setup text says that a value in :root is not missing for dark.
  const known = {
    light: lightNames,
    dark: new Set([
      ...lightNames,
      ...names(
        (entry) =>
          entry.path.endsWith(" > :root") &&
          entry.path.split(" > ").some((part) => isDarkMedia(part)),
      ),
    ]),
    theme: names((entry) => entry.path === "@theme inline"),
  };
  const missing = { light: [], dark: [], theme: [] };
  for (const mode of ["light", "dark", "theme"]) {
    for (const [key, value] of Object.entries(cssVars[mode] ?? {})) {
      if (!known[mode].has(key)) missing[mode].push([key, value]);
    }
  }
  // The served setup text asks for --radius when no radius token exists. It
  // is not part of base.json.
  if (!known.light.has("radius") && !known.theme.has("radius")) {
    missing.light.push(["radius", "0.625rem"]);
  }
  const textFor = (entries) =>
    entries.length
      ? `\n${entries.map(([key, value]) => `  --${key}: ${value};`).join("\n")}\n`
      : "";
  return applyEdits(css, [
    { start: light.close, end: light.close, text: textFor(missing.light) },
    { start: dark.close, end: dark.close, text: textFor(missing.dark) },
    { start: theme.close, end: theme.close, text: textFor(missing.theme) },
  ]);
}

function darkVariantParams(css) {
  const match = css.match(/@custom-variant\s+dark\s+([^;]+);/);
  return match ? match[1].trim() : null;
}

function keepDarkVariant(css, wanted) {
  if (!wanted) return css;
  const matches = [...css.matchAll(/@custom-variant\s+dark\s+([^;]+);/g)].map(
    (match) => ({
      start: match.index,
      end: match.index + match[0].length,
      params: match[1].trim(),
    }),
  );
  if (matches.length === 0) {
    return insertAfterImports(css, `@custom-variant dark ${wanted};`);
  }
  const edits = [];
  let kept = false;
  for (let index = 0; index < matches.length; index++) {
    const match = matches[index];
    if (!kept && match.params === wanted) {
      kept = true;
      continue;
    }
    edits.push({
      start: match.start,
      end: match.end,
      text: !kept && index === 0 ? `@custom-variant dark ${wanted};` : "",
    });
  }
  return applyEdits(css, edits);
}

function removeEmptyRules(css) {
  const edits = [];
  walkCss(parseCss(css), (block) => {
    if (block.prelude.startsWith("@")) return;
    const inner = css.slice(block.open + 1, block.close);
    if (!inner.trim()) {
      edits.push({ start: block.start, end: block.end, text: "" });
    }
  });
  return applyEdits(css, edits);
}

function cleanupCss(before, after) {
  const beforeDeclarations = scanDeclarations(before);
  const beforeKeys = new Set(
    beforeDeclarations.map(
      (entry) => `${entry.path}|${entry.prop}|${entry.value}`,
    ),
  );
  const beforeNames = new Set(beforeDeclarations.map((entry) => entry.prop));
  const removals = [];
  for (const declaration of scanDeclarations(after)) {
    const key = `${declaration.path}|${declaration.prop}|${declaration.value}`;
    if (beforeKeys.has(key)) continue;
    if (!beforeNames.has(declaration.prop)) continue;
    removals.push({
      start: declaration.start,
      end: declaration.end,
      text: "",
    });
  }
  let css = applyEdits(after, removals);
  css = keepDarkVariant(css, darkVariantParams(before));
  css = removeEmptyRules(css);
  css = removeEmptyRules(css);
  return css;
}

// ---------------------------------------------------------------------------
// Registry helpers

function registryItem(name) {
  return JSON.parse(readFileSync(path.join(snapshot, `${name}.json`), "utf8"));
}

function registryTree(names) {
  const items = new Map();
  const visit = (name) => {
    if (items.has(name)) return;
    const item = registryItem(name);
    items.set(name, item);
    for (const url of item.registryDependencies ?? []) {
      const dependency = url.match(/\/r\/([a-z0-9-]+)\.json$/)?.[1];
      if (!dependency) throw new Error(`Unknown registry dependency ${url}`);
      visit(dependency);
    }
  };
  for (const name of names) visit(name);
  return [...items.values()];
}

function targetPath(target) {
  if (target.startsWith("@components/")) {
    return appPath(`src/components/${target.slice("@components/".length)}`);
  }
  return appPath(target);
}

function relativeApp(file) {
  return path.relative(appDir, file).replaceAll("\\", "/");
}

function installationSection(markdown) {
  const after = markdown.split("\n## Installation\n")[1];
  if (!after)
    throw new Error("The component Markdown has no Installation section");
  return after.split("\n## ")[0];
}

function numberedStep(text, number) {
  const match = text.match(new RegExp(`(?:^|\\n)${number}\\. ([^\\n]*)`));
  return match ? match[1] : "";
}

function firstCode(text) {
  return text.match(/`([^`]+)`/)?.[1] ?? "";
}

function safeCommandBody(command) {
  const prefix = 'node -e "';
  if (!command.startsWith(prefix) || !command.endsWith('"')) {
    throw new Error(`Unexpected safe install command: ${command}`);
  }
  return command.slice(prefix.length, -1);
}

// ---------------------------------------------------------------------------
// Setup

function expectText(text, needle, label) {
  if (!text.includes(needle)) {
    throw new Error(
      `${label} is missing from the served text. Expected ${JSON.stringify(needle)}. Update scripts/agent-e2e.mjs if the Markdown changed on purpose.`,
    );
  }
}

function dedent(text) {
  const lines = text.split("\n");
  const widths = lines
    .filter((line) => line.trim())
    .map((line) => line.match(/^\s*/)?.[0].length ?? 0);
  const minimum = widths.length ? Math.min(...widths) : 0;
  return lines.map((line) => line.slice(minimum)).join("\n");
}

function addTsconfigPaths(file) {
  const config = readJson(file);
  config.compilerOptions = {
    ...config.compilerOptions,
    paths: { ...(config.compilerOptions?.paths ?? {}), "@/*": ["./src/*"] },
  };
  writeJson(file, config);
}

function addViteAlias() {
  let config = readApp("vite.config.ts");
  if (config.includes("resolve:"))
    throw new Error("The seed Vite config already has an alias");
  config = config.replace(
    'import { defineConfig } from "vite";',
    'import { fileURLToPath } from "node:url";\nimport { defineConfig } from "vite";',
  );
  config = config.replace(
    "  plugins: [react(), tailwindcss()],",
    '  resolve: {\n    alias: {\n      "@": fileURLToPath(new URL("./src", import.meta.url)),\n    },\n  },\n  plugins: [react(), tailwindcss()],',
  );
  if (!config.includes("fileURLToPath") || !config.includes("resolve:")) {
    throw new Error("Could not add the alias to vite.config.ts");
  }
  writeApp("vite.config.ts", config);
}

async function ensurePluginInstalled() {
  const manifest = readJson("package.json");
  const installed =
    manifest.dependencies?.[plugin] || manifest.devDependencies?.[plugin];
  if (!installed) {
    expectOk(
      await withRetry("plugin-install", () =>
        executePackageManager(["install", plugin], {
          label: "plugin-install",
        }),
      ),
      "plugin-install",
    );
  }
}

async function runSetup(setupMarkdown) {
  writeServed("installation.md", setupMarkdown);

  expectText(setupMarkdown, "do not run `init`", "The existing-theme path");
  expectText(
    setupMarkdown,
    "Do not change the values, fonts, or base styles of the project.",
    "The existing-theme rule",
  );
  expectText(setupMarkdown, `${origin}/r/base.json`, "The local base.json URL");
  expectText(
    setupMarkdown,
    "@custom-variant dark (@media (prefers-color-scheme: dark));",
    "The media dark variant",
  );
  expectText(
    setupMarkdown,
    `@plugin "${plugin}";`,
    "The React Aria plugin line",
  );
  expectText(setupMarkdown, "resolve.alias", "The Vite alias step");
  expectText(setupMarkdown, "use `tsc -b`", "The tsc -b fallback");
  expectText(setupMarkdown, "Do not add `baseUrl`.", "The no-baseUrl rule");
  expectText(
    setupMarkdown,
    "If the dark colors are only in `.dark`",
    "The dark-token exception",
  );
  expectText(
    setupMarkdown,
    "A value that was in `:root` before your edits is not missing for dark.",
    "The light-token rule",
  );
  if (/https:\/\/vip-ui\.dev\/r\//.test(setupMarkdown)) {
    throw new Error("The served setup Markdown still points at production");
  }

  // Step 2: the import alias.
  addTsconfigPaths("tsconfig.json");
  addTsconfigPaths("tsconfig.app.json");
  addViteAlias();

  // Steps 3 and 4: components.json without init, then the existing theme.
  const block = setupMarkdown.match(
    /If `components\.json` does not exist, create it:\n\n\s*```json\n([\s\S]*?)\n\s*```/,
  );
  if (!block)
    throw new Error("The served setup Markdown lost the components.json block");
  const components = JSON.parse(dedent(block[1]));
  components.rsc = false;
  components.tailwind = { ...components.tailwind, css: "src/index.css" };
  writeJson("components.json", components);

  const base = await fetch(`${origin}/r/base.json`).then(async (response) => {
    if (!response.ok) throw new Error(`base.json returned ${response.status}`);
    return response.json();
  });

  let css = readApp("src/index.css");
  css = addCustomVariant(css, "(@media (prefers-color-scheme: dark))");
  await ensurePluginInstalled();
  css = addPlugin(css, plugin);
  css = addMissingTokens(css, base.cssVars);
  writeApp("src/index.css", css);

  // Step 5 and the token list are done. Prove the result.
  const installed = readApp("src/index.css");
  if (!installed.includes(`@plugin "${plugin}";`)) {
    throw new Error(`Setup did not add the ${plugin} plugin`);
  }
  for (const token of [
    "--border:",
    "--ring:",
    "--destructive:",
    "--success-subtle:",
    "--shadow-card:",
    "--radius:",
    "--color-highlight:",
    "--color-success-subtle:",
    "--ease-out-quint:",
  ]) {
    if (!installed.includes(token)) {
      throw new Error(`Setup did not add ${token} to src/index.css`);
    }
  }
  const config = readJson("components.json");
  if (
    config.rsc !== false ||
    config.tsx !== true ||
    config.tailwind?.css !== "src/index.css" ||
    config.tailwind?.cssVariables !== true ||
    config.aliases?.components !== "@/components"
  ) {
    throw new Error("components.json does not match the served setup text");
  }
  for (const file of ["tsconfig.json", "tsconfig.app.json"]) {
    const paths = readJson(file).compilerOptions?.paths?.["@/*"];
    if (paths?.[0] !== "./src/*") {
      throw new Error(`The import alias is missing from ${file}`);
    }
  }
  if (
    !readApp("vite.config.ts").includes(
      '"@": fileURLToPath(new URL("./src", import.meta.url))',
    )
  ) {
    throw new Error("The import alias is missing from vite.config.ts");
  }
  if (existsApp("src/components/ui") || existsApp("src/lib/utils.ts")) {
    throw new Error(
      "init ran; it must not run for a project with its own theme",
    );
  }
}

// ---------------------------------------------------------------------------
// Install

async function installItem(name, markdown) {
  const itemUrl = `${origin}/r/${name}.json`;
  const section = installationSection(markdown);
  const preview = firstCode(numberedStep(section, 1));
  const safe = firstCode(numberedStep(section, 2));
  const expected = installSteps(itemUrl);
  if (`1. ${numberedStep(section, 1)}` !== expected[0]) {
    throw new Error(`The served install step 1 changed for ${name}`);
  }
  if (`2. ${numberedStep(section, 2)}` !== expected[1]) {
    throw new Error(`The served install step 2 changed for ${name}`);
  }
  if (!preview.includes(`${origin}/r/${name}.json`)) {
    throw new Error(`The served dry-run does not use the local ${name} URL`);
  }

  const tree = registryTree([name]);
  const targets = [
    ...new Set(
      tree.flatMap((item) => item.files.map((file) => targetPath(file.target))),
    ),
  ];
  const copies = new Map(
    targets
      .filter((file) => existsSync(file))
      .map((file) => [file, readFileSync(file, "utf8")]),
  );
  const creates = targets.filter((file) => !existsSync(file));
  const cssBefore = readApp("src/index.css");

  // Step 1: preview, then copy each file that shows `overwrite`.
  const previewResult = await withRetry(`dry-run-${name}`, () =>
    executeShell(
      preview.replace(/^npx shadcn@latest/, `${runner} shadcn@latest`),
      { label: `dry-run-${name}` },
    ),
  );
  expectOk(previewResult, `dry-run-${name}`);
  for (const file of creates) {
    if (existsSync(file)) {
      throw new Error(`The dry run wrote ${relativeApp(file)}`);
    }
  }

  // Step 2: the No-answer command from the served Markdown.
  const body = safeCommandBody(safe).replaceAll(
    "npx shadcn@latest",
    `${runner} shadcn@latest`,
  );
  const installResult = await withRetry(`install-${name}`, () =>
    execute(process.execPath, ["-e", body], { label: `install-${name}` }),
  );
  expectOk(installResult, `install-${name}`);

  // Step 3: each create file exists; restore each overwrite file.
  for (const file of creates) {
    if (!existsSync(file)) {
      throw new Error(`Step 3 failed: ${relativeApp(file)} was not created`);
    }
  }
  const restored = [];
  for (const [file, text] of copies) {
    if (readFileSync(file, "utf8") !== text) {
      writeAppAbsolute(file, text);
      restored.push(relativeApp(file));
    }
  }

  // Step 4: the project keeps its own declarations.
  const cssAfter = readApp("src/index.css");
  const cleaned = cleanupCss(cssBefore, cssAfter);
  if (cleaned !== cssAfter) writeApp("src/index.css", cleaned);

  return {
    creates: creates.map(relativeApp),
    restored,
    tree: tree.map((item) => item.name),
  };
}

// ---------------------------------------------------------------------------
// Build and type check

async function runBuild(label) {
  const result = await withRetry(label, () =>
    executeShell(
      packageManager === "pnpm" ? "pnpm run build" : "npm run build",
      { label, timeout: 240000 },
    ),
  );
  expectOk(result, label);
  return result;
}

async function runTypes(label) {
  const tsc = path.join(appDir, "node_modules", "typescript", "bin", "tsc");
  if (!existsSync(tsc)) throw new Error("TypeScript was not installed");
  const result = await execute(process.execPath, [tsc, "-b"], {
    label,
    timeout: 240000,
  });
  expectOk(result, label);
  return result;
}

function builtCss() {
  const assets = path.join(appDir, "dist", "assets");
  if (!existsSync(assets))
    throw new Error("vite build produced no dist/assets");
  const files = readdirSync(assets).filter((file) => file.endsWith(".css"));
  if (files.length === 0) throw new Error("vite build produced no CSS");
  return files
    .map((file) => readFileSync(path.join(assets, file), "utf8"))
    .join("\n");
}

function expectUtility(css, marker, label) {
  if (!css.includes(marker)) {
    throw new Error(
      `${label}: the built CSS has no ${marker}. The registry tokens or the Tailwind plugin did not reach the build.`,
    );
  }
}

// ---------------------------------------------------------------------------
// Cases

const results = [];

async function runCase(name, run, { dependsOn } = {}) {
  const blocker = dependsOn
    ? results.find(
        (entry) => entry.name === dependsOn && entry.status !== "PASS",
      )
    : null;
  if (blocker) {
    results.push({ name, status: "FAIL", detail: `blocked by ${dependsOn}` });
    console.log(`FAIL ${name}: blocked by ${dependsOn}`);
    return false;
  }
  try {
    const detail = await run();
    results.push({ name, status: "PASS", detail });
    console.log(`PASS ${name}: ${detail}`);
    return true;
  } catch (error) {
    results.push({ name, status: "FAIL", detail: error.message });
    console.log(`FAIL ${name}: ${error.message}`);
    return false;
  }
}

const state = { buttonMd: "", toastMd: "", alertMd: "" };

try {
  console.log(`vip-ui agent e2e: ${packageManager} in ${tempRoot}`);

  createSeedApp();
  const setupMarkdown = buildSetupMarkdown(origin);
  const prompt = itemPrompt(origin, `${origin}/r/button.json`, "Button");
  writeServed("button.prompt.txt", `${prompt}\n`);
  expectText(prompt, `${origin}/r/button.json`, "The prompt URL");
  expectText(prompt, "Keep my theme and edits.", "The prompt finish line");

  const installSeed = withRetry("seed-install", () =>
    executePackageManager(["install"], { label: "seed-install" }),
  );

  const setupOk = await runCase("setup", async () => {
    expectOk(await installSeed, "seed-install");
    if (!existsSync(path.join(appDir, "node_modules", "vite"))) {
      throw new Error("vite was not installed");
    }
    await runSetup(setupMarkdown);
    const css = readApp("src/index.css");
    if (!/--primary:\s*#ff00aa/.test(css)) {
      throw new Error("Setup changed the project primary color");
    }
    return "alias in both tsconfigs and Vite, components.json without init, base tokens, plugin, media dark variant";
  });

  await runCase(
    "button",
    async () => {
      state.buttonMd = await getMarkdown("button");
      writeServed("button.md", state.buttonMd);
      expectText(
        state.buttonMd,
        "The component goes to `components/vip-ui/button.tsx`.",
        "The Button target path",
      );
      expectText(
        state.buttonMd,
        `npx shadcn@latest add ${origin}/r/button.json --dry-run`,
        "The local Button dry-run",
      );
      expectText(
        state.buttonMd,
        installSteps(`${origin}/r/button.json`)[1],
        "The No-answer install step",
      );
      if (/https:\/\/vip-ui\.dev\/r\//.test(state.buttonMd)) {
        throw new Error(
          "The served Button Markdown still points at production",
        );
      }

      const installed = await installItem("button", state.buttonMd);
      writeMain({ alert: false, button: true, toast: false });
      await runBuild("button-build");
      await runTypes("button-types");

      const css = builtCss();
      for (const marker of [
        ".bg-highlight",
        "--highlight:",
        ".bg-primary",
        ".ease-out-quint",
      ]) {
        expectUtility(css, marker, "Button");
      }
      if (!requests.includes("button.json")) {
        throw new Error(
          "The install did not fetch button.json from the local snapshot",
        );
      }
      for (const file of ["button.tsx", "button-styles.tsx", "size.tsx"]) {
        const relative = `src/components/vip-ui/${file}`;
        if (!installed.creates.includes(relative)) {
          throw new Error(`${relative} was not created`);
        }
      }
      if (
        !readApp("src/components/vip-ui/button.tsx").includes(
          "export function Button",
        )
      ) {
        throw new Error("the installed button.tsx does not export Button");
      }
      return `dry-run + safe install, ${installed.creates.length} files, build 0, tsc 0, CSS has bg-highlight and bg-primary`;
    },
    { dependsOn: "setup" },
  );

  await runCase(
    "toast",
    async () => {
      state.toastMd = await getMarkdown("toast");
      writeServed("toast.md", state.toastMd);
      const finish = state.toastMd.split("\n## Finish setup\n")[1] ?? "";
      if (!finish.includes("Render `<ToastViewport />` one time")) {
        throw new Error(
          "The served toast.md no longer tells the agent to render <ToastViewport />",
        );
      }
      const installed = await installItem("toast", state.toastMd);
      const toastFile = readApp("src/components/vip-ui/toast.tsx");
      if (!/export function ToastViewport\b/.test(toastFile)) {
        throw new Error(
          "the installed toast.tsx does not export ToastViewport",
        );
      }
      writeMain({ alert: false, button: true, toast: true });
      return `Finish setup names ToastViewport, toast.tsx exports it, ${installed.creates.length} files created`;
    },
    { dependsOn: "button" },
  );

  await runCase(
    "shared-file",
    async () => {
      const utils = "src/components/vip-ui/utils.ts";
      const button = "src/components/vip-ui/button.tsx";
      for (const file of [utils, button]) {
        if (!existsApp(file)) {
          throw new Error(`${file} does not exist before the edit`);
        }
      }
      const editedUtils = `${readApp(utils).trimEnd()}\n\nexport const agentE2eEdit = "kept";\n`;
      const editedButton = `${readApp(button).trimEnd()}\n\n// agent-e2e edit: keep me\n`;
      writeApp(utils, editedUtils);
      writeApp(button, editedButton);

      state.alertMd = await getMarkdown("alert");
      writeServed("alert.md", state.alertMd);
      const installed = await installItem("alert", state.alertMd);
      if (!existsApp("src/components/vip-ui/alert.tsx")) {
        throw new Error("alert.tsx was not created");
      }
      if (readApp(utils) !== editedUtils) {
        throw new Error(
          "The edit to utils.ts did not survive the alert install",
        );
      }
      if (readApp(button) !== editedButton) {
        throw new Error(
          "The edit to button.tsx did not survive the alert install",
        );
      }
      writeMain({ alert: true, button: true, toast: true });
      await runBuild("alert-build");
      await runTypes("alert-types");
      const alertCss = builtCss();
      for (const marker of [".bg-success-subtle", ".bg-warning-subtle"]) {
        expectUtility(alertCss, marker, "Alert");
      }
      return `edits to utils.ts and button.tsx kept (restored: ${installed.restored.length ? installed.restored.join(", ") : "no"}), alert.tsx created, build 0, tsc 0`;
    },
    { dependsOn: "toast" },
  );

  await runCase(
    "theme",
    async () => {
      const css = readApp("src/index.css");
      const required = [
        [/--primary:\s*#ff00aa/, "own light primary"],
        [/--primary:\s*#ff77cc/, "own dark primary"],
        [/--background:\s*#fff8f0/, "own light background"],
        [/--foreground:\s*#221100/, "own light foreground"],
        [
          /--brand-font:\s*"Trebuchet MS",\s*"Segoe UI",\s*sans-serif/,
          "own font",
        ],
        [/@media\s*\(prefers-color-scheme:\s*dark\)/, "media dark rule"],
        [
          /@custom-variant\s+dark\s+\(@media\s*\(prefers-color-scheme:\s*dark\)\)/,
          "media dark variant",
        ],
      ];
      for (const [pattern, label] of required) {
        if (!pattern.test(css))
          throw new Error(`The install lost the ${label}`);
      }
      if (/&:is\(\.dark \*\)/.test(css)) {
        throw new Error("The CLI added a class dark variant");
      }
      if (existsApp("src/components/ui") || existsApp("src/lib/utils.ts")) {
        throw new Error("init ran; the project must keep its own theme files");
      }
      return "primary #ff00aa / #ff77cc, font, media dark rule, and no .dark variant survived three installs";
    },
    { dependsOn: "button" },
  );

  console.log("---");
  for (const name of [
    "base",
    "button",
    "button-styles",
    "size",
    "toast",
    "utils",
    "alert",
  ]) {
    if (requests.includes(`${name}.json`)) console.log(`served ${name}.json`);
  }
  if (setupOk && options.keep) console.log(`served markdown: ${servedDir}`);

  const failures = results.filter((entry) => entry.status !== "PASS");
  console.log(
    failures.length
      ? `RESULT: FAIL (${failures.length} of ${results.length} cases failed)`
      : `RESULT: PASS (${results.length} cases)`,
  );
  if (failures.length) process.exitCode = 1;
} finally {
  // Windows cannot remove a directory that is still the current directory.
  process.chdir(root);
  server.closeAllConnections();
  await new Promise((resolve) => server.close(resolve));
  if (options.keep) {
    console.log(`kept ${tempRoot}`);
  } else {
    try {
      rmSync(tempRoot, {
        recursive: true,
        force: true,
        maxRetries: 4,
        retryDelay: 300,
      });
    } catch (error) {
      console.warn(`WARN: could not remove ${tempRoot}: ${error.message}`);
    }
  }
}
