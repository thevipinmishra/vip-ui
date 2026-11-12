import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import {
  mkdir,
  mkdtemp,
  readdir,
  readFile,
  rm,
  writeFile,
} from "node:fs/promises";
import { createServer } from "node:http";
import os from "node:os";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const shadcn = process.env.VIP_SHADCN ?? "shadcn@4.23.0";
const fixture = await mkdtemp(path.join(os.tmpdir(), "vip-ui-registry-"));
const requests = new Map();
let base = process.env.VIP_REGISTRY_BASE?.replace(/\/$/, "");

function localItem(name) {
  return readFile(path.join(root, "public/r", `${name}.json`), "utf8").then(
    JSON.parse,
  );
}

const server = createServer(async (request, response) => {
  const name = request.url?.match(/^\/r\/([a-z0-9-]+)\.json$/)?.[1];
  if (!name) {
    response.writeHead(404).end();
    return;
  }
  requests.set(name, (requests.get(name) ?? 0) + 1);
  try {
    const item = await localItem(name);
    if (item.registryDependencies)
      item.registryDependencies = item.registryDependencies.map((url) =>
        url.replace(/^https?:\/\/[^/]+\/r\//, `${base}/`),
      );
    response
      .writeHead(200, { "content-type": "application/json" })
      .end(JSON.stringify(item));
  } catch {
    response.writeHead(404).end();
  }
});

function run(command, args, cwd = fixture) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      shell: process.platform === "win32",
      stdio: ["ignore", "pipe", "pipe"],
    });
    let output = "";
    for (const stream of [child.stdout, child.stderr]) {
      stream.on("data", (chunk) => {
        output += chunk;
        process.stdout.write(chunk);
      });
    }
    child.on("error", reject);
    child.on("close", (code) =>
      code === 0
        ? resolve(output)
        : reject(new Error(`${command} ${args.join(" ")} exited ${code}`)),
    );
  });
}

async function installTree(names) {
  const items = new Map();
  async function visit(name) {
    if (items.has(name)) return;
    const item = await localItem(name);
    items.set(name, item);
    for (const url of item.registryDependencies ?? [])
      await visit(url.match(/\/r\/([a-z0-9-]+)\.json$/)[1]);
  }
  for (const name of names) await visit(name);
  return [...items.values()];
}

async function listFiles(directory, prefix = "") {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const relative = `${prefix}${entry.name}`;
    if (entry.isDirectory())
      files.push(
        ...(await listFiles(path.join(directory, entry.name), `${relative}/`)),
      );
    else files.push(relative);
  }
  return files.sort();
}

function documentedRtlSource(content, flips) {
  let expected = content;
  for (const [from, to] of flips) expected = expected.replaceAll(from, to);
  return expected;
}

function lineDiff(expected, installed) {
  const lines = [];
  const expectedLines = expected.split("\n");
  const installedLines = installed.split("\n");
  for (
    let index = 0;
    index < Math.max(expectedLines.length, installedLines.length);
    index++
  ) {
    if (expectedLines[index] !== installedLines[index]) {
      lines.push(`${index + 1}: - ${expectedLines[index]?.trim() ?? "<end>"}`);
      lines.push(`${index + 1}: + ${installedLines[index]?.trim() ?? "<end>"}`);
    }
  }
  return lines.join("\n");
}

try {
  if (!base) {
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
    base = `http://127.0.0.1:${server.address().port}/r`;
  }
  for (const directory of ["src/app", "src/lib", "src/components/ui"]) {
    await mkdir(path.join(fixture, directory), { recursive: true });
  }
  await writeFile(
    path.join(fixture, "package.json"),
    JSON.stringify(
      {
        name: "vip-ui-registry-consumer",
        private: true,
        packageManager: "pnpm@12.14.0",
        dependencies: {
          react: "19.2.8",
          "react-dom": "19.2.8",
          tailwindcss: "^4",
        },
        devDependencies: {
          typescript: "^5",
          "@types/react": "^19",
          "@types/react-dom": "^19",
          "@types/node": "^20",
          "@tailwindcss/postcss": "^4",
          postcss: "^8",
        },
      },
      null,
      2,
    ),
  );
  await writeFile(
    path.join(fixture, "tsconfig.json"),
    JSON.stringify(
      {
        compilerOptions: {
          jsx: "react-jsx",
          strict: true,
          skipLibCheck: true,
          module: "esnext",
          moduleResolution: "bundler",
          target: "es2017",
          baseUrl: ".",
          paths: { "~/*": ["./src/*"] },
        },
        include: ["src/**/*.tsx", "src/**/*.ts"],
      },
      null,
      2,
    ),
  );
  await writeFile(
    path.join(fixture, "components.json"),
    JSON.stringify(
      {
        $schema: "https://ui.shadcn.com/schema.json",
        style: "new-york",
        rsc: true,
        tsx: true,
        tailwind: {
          config: "",
          css: "src/app/globals.css",
          baseColor: "neutral",
          cssVariables: true,
        },
        aliases: {
          components: "~/components",
          utils: "~/lib/utils",
          ui: "~/components/ui",
          lib: "~/lib",
          hooks: "~/hooks",
        },
        registries: { "@vip-ui": `${base}/{name}.json` },
      },
      null,
      2,
    ),
  );
  await writeFile(
    path.join(fixture, "src/app/globals.css"),
    '@import "tailwindcss";\n@custom-variant dark (&:is(.dark *));\n:root { --primary: #123456; --accent: #abcdef; --radius: 0.625rem; --shadow-card: none; }\n.dark { --primary: #654321; }\n@theme inline { --color-primary: var(--primary); --color-accent: var(--accent); --radius-md: calc(var(--radius) * 0.8); }\n',
  );
  await writeFile(
    path.join(fixture, "src/lib/utils.ts"),
    "export function cn(...args: unknown[]) { return args.join(' '); }\n",
  );
  await writeFile(
    path.join(fixture, "src/components/ui/button.tsx"),
    "export const existing = true;\n",
  );

  await run("pnpm", [
    "dlx",
    shadcn,
    "add",
    "-y",
    "-c",
    fixture,
    `${base}/button.json`,
    `${base}/select.json`,
    `${base}/response.json`,
  ]);
  const output = path.join(fixture, "src/components/vip-ui");
  const firstFiles = await listFiles(output);
  const second = await run("pnpm", [
    "dlx",
    shadcn,
    "add",
    "-y",
    "-c",
    fixture,
    "@vip-ui/dialog",
    `${base}/dashboard-01.json`,
  ]);
  assert.doesNotMatch(second, /Updated \d+ files?/);
  assert.match(second, /Skipped \d+ files?/);

  const installed = ["button", "select", "response", "dialog", "dashboard-01"];
  const tree = await installTree(installed);
  const expected = tree
    .flatMap((item) => item.files)
    .filter((file) => file.target.startsWith("@components/vip-ui/"))
    .map((file) => file.target.slice("@components/vip-ui/".length))
    .sort();
  assert.equal(expected.length, new Set(expected).size);
  const installedFiles = await listFiles(output);
  assert.deepEqual(installedFiles, expected);
  for (const file of firstFiles) assert.ok(installedFiles.includes(file));
  for (const item of tree)
    for (const file of item.files)
      assert.equal(
        await readFile(
          file.target.startsWith("@components/")
            ? path.join(fixture, "src/components", file.target.slice(12))
            : path.join(fixture, file.target),
          "utf8",
        ),
        file.content,
        `${file.target} differs from ${item.name}`,
      );
  if (!process.env.VIP_REGISTRY_BASE)
    for (const item of tree)
      assert.ok(requests.has(item.name), `${item.name} was not fetched`);
  for (const file of [
    "dashboard-01/dashboard.tsx",
    "dashboard-01/data.ts",
    "dashboard-01/revenue-chart.tsx",
  ]) {
    await readFile(path.join(fixture, "src/components/blocks", file), "utf8");
  }
  assert.deepEqual(await readdir(path.join(fixture, "src/app")), [
    "globals.css",
  ]);
  assert.equal(
    await readFile(path.join(fixture, "src/components/ui/button.tsx"), "utf8"),
    "export const existing = true;\n",
  );
  assert.equal(
    await readFile(path.join(fixture, "src/lib/utils.ts"), "utf8"),
    "export function cn(...args: unknown[]) { return args.join(' '); }\n",
  );
  const installedCss = await readFile(
    path.join(fixture, "src/app/globals.css"),
    "utf8",
  );
  assert.match(installedCss, /--primary: #123456/);
  assert.match(installedCss, /--shadow-card: none/);
  assert.match(installedCss, /@plugin "tailwindcss-react-aria-components";/);
  for (const marker of [
    "--shadow-float:",
    "--success:",
    "--color-success: var(--success)",
    "--ease-out-quint:",
    "--animate-caret:",
    "@keyframes caret-breathe",
  ]) {
    assert.ok(
      installedCss.includes(marker),
      `Missing installed style ${marker}`,
    );
  }
  const installedPackage = await readFile(
    path.join(fixture, "package.json"),
    "utf8",
  );
  for (const name of [
    "@tanstack/charts",
    "motion",
    "tailwind-variants",
    "@phosphor-icons/react",
    "tailwindcss-react-aria-components",
  ])
    assert.ok(
      installedPackage.includes(`"${name}"`),
      `Missing package ${name}`,
    );
  assert.match(installedPackage, /"react-aria-components": "\^1\.22/);
  assert.doesNotMatch(installedCss, /--vip-primary/);
  assert.match(
    await readFile(path.join(output, "select.tsx"), "utf8"),
    /from "\.\/utils"/,
  );

  const rtlFixture = path.join(fixture, "rtl");
  for (const directory of ["src/app", "src/lib"]) {
    await mkdir(path.join(rtlFixture, directory), { recursive: true });
  }
  await writeFile(
    path.join(rtlFixture, "package.json"),
    JSON.stringify(
      {
        name: "vip-ui-registry-rtl",
        private: true,
        packageManager: "pnpm@12.14.0",
        dependencies: {
          react: "19.2.8",
          "react-dom": "19.2.8",
          tailwindcss: "^4",
        },
        devDependencies: {
          typescript: "^5",
          "@types/react": "^19",
          "@types/react-dom": "^19",
          "@types/node": "^20",
          "@tailwindcss/postcss": "^4",
          postcss: "^8",
        },
      },
      null,
      2,
    ),
  );
  await writeFile(
    path.join(rtlFixture, "tsconfig.json"),
    JSON.stringify(
      {
        compilerOptions: {
          jsx: "react-jsx",
          strict: true,
          skipLibCheck: true,
          module: "esnext",
          moduleResolution: "bundler",
          target: "es2017",
          baseUrl: ".",
          paths: { "~/*": ["./src/*"] },
        },
        include: ["src/**/*.tsx", "src/**/*.ts"],
      },
      null,
      2,
    ),
  );
  await writeFile(
    path.join(rtlFixture, "components.json"),
    JSON.stringify(
      {
        $schema: "https://ui.shadcn.com/schema.json",
        style: "new-york",
        rsc: true,
        tsx: true,
        rtl: true,
        tailwind: {
          config: "",
          css: "src/app/globals.css",
          baseColor: "neutral",
          cssVariables: true,
        },
        aliases: {
          components: "~/components",
          utils: "~/lib/utils",
          ui: "~/components/ui",
          lib: "~/lib",
          hooks: "~/hooks",
        },
        registries: { "@vip-ui": `${base}/{name}.json` },
      },
      null,
      2,
    ),
  );
  await writeFile(
    path.join(rtlFixture, "src/app/globals.css"),
    '@import "tailwindcss";\n@custom-variant dark (&:is(.dark *));\n',
  );
  await writeFile(
    path.join(rtlFixture, "src/lib/utils.ts"),
    "export function cn(...args: unknown[]) { return args.join(' '); }\n",
  );
  const rtlNames = [
    "border-beam",
    "highlighter",
    "item-highlight",
    "range-calendar",
    "slider",
  ];
  await run(
    "pnpm",
    [
      "dlx",
      shadcn,
      "add",
      "-y",
      "-c",
      rtlFixture,
      ...rtlNames.map((name) => `${base}/${name}.json`),
    ],
    rtlFixture,
  );
  const expectedRtlFlips = new Map();
  const rtlTree = await installTree(rtlNames);
  const rtlOutput = path.join(rtlFixture, "src/components/vip-ui");
  const rtlFiles = rtlTree
    .flatMap((item) => item.files)
    .filter((file) => file.target.startsWith("@components/vip-ui/"));
  assert.deepEqual(
    await listFiles(rtlOutput),
    rtlFiles
      .map((file) => file.target.slice("@components/vip-ui/".length))
      .sort(),
    `The rtl fixture did not install the registry tree of ${rtlNames.join(", ")}. Run with VIP_KEEP_FIXTURE=1 to inspect ${rtlFixture}.`,
  );
  const rtlDifferences = [];
  const rtlTransformed = [];
  for (const file of rtlFiles) {
    const name = file.target.slice("@components/vip-ui/".length);
    const installed = await readFile(path.join(rtlOutput, name), "utf8");
    if (installed === file.content) continue;
    const flips = expectedRtlFlips.get(name) ?? [];
    const expected = documentedRtlSource(file.content, flips);
    const summary =
      flips.map(([from, to]) => `${from} → ${to}`).join(", ") || "none";
    if (expected === installed) {
      rtlTransformed.push(`${name}: ${summary}`);
      continue;
    }
    rtlDifferences.push(
      `${name} differs from the registry source beyond the documented flips (${summary}). The shadcn RTL transform changed:\n${lineDiff(expected, installed)}\nDocument the behavior in expectedRtlFlips in scripts/test-registry-cli.mjs, or run with VIP_KEEP_FIXTURE=1 to inspect ${rtlFixture}.`,
    );
  }
  for (const [name, flips] of expectedRtlFlips) {
    const source = rtlFiles.find(
      (file) => file.target === `@components/vip-ui/${name}`,
    )?.content;
    if (
      source !== undefined &&
      (await readFile(path.join(rtlOutput, name), "utf8")) === source
    )
      rtlDifferences.push(
        `The shadcn RTL transform no longer changes ${name} (expected ${flips.map(([from, to]) => `${from} → ${to}`).join(", ")}). Update expectedRtlFlips in scripts/test-registry-cli.mjs.`,
      );
  }
  assert.ok(rtlDifferences.length === 0, rtlDifferences.join("\n\n"));
  console.log(
    `RTL fixture (${rtlNames.join(", ")}) with rtl: true: the CLI transformed ${rtlTransformed.length} of ${rtlFiles.length} files; ${rtlTransformed.join("; ") || "no physical class changed"}.`,
  );

  const manualDirectory = path.join(fixture, "src/components/manual-vip-ui");
  await mkdir(manualDirectory, { recursive: true });
  for (const file of (await installTree(["select"]))
    .flatMap((item) => item.files)
    .filter((entry) => !entry.target.endsWith("/utils.ts"))) {
    await writeFile(
      path.join(manualDirectory, path.basename(file.target)),
      file.content.replaceAll('from "./utils"', 'from "~/lib/utils"'),
    );
  }
  await writeFile(
    path.join(fixture, "src/app/manual.css"),
    (await readFile(path.join(fixture, "src/app/globals.css"), "utf8")) +
      '\n@source "../components/manual-vip-ui";',
  );
  await writeFile(
    path.join(fixture, "check-css.cjs"),
    `const fs = require("node:fs");
const path = require("node:path");
const postcss = require("postcss");
const tailwind = require("@tailwindcss/postcss");
async function check(file) {
  const source = path.resolve("src/app", file);
  const css = await postcss([tailwind({ base: process.cwd() })]).process(
    fs.readFileSync(source, "utf8") + '\\n@source "../components/vip-ui";',
    { from: source },
  );
  for (const rule of [
    "rounded-md",
    "bg-primary",
    "bg-accent[data-selected]",
    ":where(:not([data-rac])):focus",
    ":where(:not([data-rac])):disabled",
  ]) {
    if (!css.css.includes(rule)) throw new Error(file + " is missing " + rule);
  }
}
Promise.all([check("globals.css"), check("manual.css")]).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
`,
  );
  await run("pnpm", ["exec", "tsc", "--noEmit"]);
  await run("node", ["check-css.cjs"]);
  console.log(
    `Installed ${installed.join(", ")} from ${base}: ${installedFiles.length} files in components/vip-ui, each from one item, ${requests.size || "remote"} items fetched.`,
  );
  console.log(
    "CLI and manual files typecheck and compile Tailwind CSS without overwriting existing shadcn files.",
  );
} finally {
  server.close();
  if (process.env.VIP_KEEP_FIXTURE)
    console.log(`Fixture retained at ${fixture}`);
  else
    await rm(fixture, {
      recursive: true,
      force: true,
      maxRetries: 4,
      retryDelay: 300,
    });
}
