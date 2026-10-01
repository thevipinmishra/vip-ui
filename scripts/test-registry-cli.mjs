import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import os from "node:os";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const fixture = await mkdtemp(path.join(os.tmpdir(), "vip-ui-registry-"));
const server = createServer(async (request, response) => {
  if (!/^\/r\/vip-[a-z-]+\.json$/.test(request.url ?? "")) {
    response.writeHead(404).end();
    return;
  }
  try {
    const content = await readFile(path.join(root, "public", request.url));
    response
      .writeHead(200, { "content-type": "application/json" })
      .end(content);
  } catch {
    response.writeHead(404).end();
  }
});

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: fixture,
      shell: process.platform === "win32",
      stdio: "inherit",
    });
    child.on("error", reject);
    child.on("close", (code) =>
      code === 0 ? resolve() : reject(new Error(`${command} exited ${code}`)),
    );
  });
}

try {
  for (const directory of ["src/app", "src/lib", "src/components/ui"]) {
    await mkdir(path.join(fixture, directory), { recursive: true });
  }
  await writeFile(
    path.join(fixture, "package.json"),
    JSON.stringify(
      {
        name: "vip-ui-registry-consumer",
        private: true,
        packageManager: "pnpm@11.25.0",
        dependencies: {
          next: "16.3.6",
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
  await writeFile(path.join(fixture, "next.config.ts"), "export default {};\n");
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
      },
      null,
      2,
    ),
  );
  await writeFile(
    path.join(fixture, "src/app/globals.css"),
    '@import "tailwindcss";\n:root { --primary: #123456; --accent: #abcdef; --radius: 1rem; }\n@theme inline { --color-primary: var(--primary); --color-accent: var(--accent); --radius-md: calc(var(--radius) - 0.375rem); }\n' +
      (await readFile(path.join(root, "public/r/setup.css"), "utf8")),
  );
  await writeFile(
    path.join(fixture, "src/lib/utils.ts"),
    "export function cn(...args: unknown[]) { return args.join(' '); }\n",
  );
  await writeFile(
    path.join(fixture, "src/components/ui/button.tsx"),
    "// Existing shadcn component.\n",
  );

  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const base = `http://127.0.0.1:${server.address().port}/r`;
  await run("pnpm", [
    "dlx",
    "shadcn@latest",
    "add",
    "-y",
    "-c",
    fixture,
    `${base}/vip-select.json`,
    `${base}/vip-date-picker.json`,
    `${base}/vip-chart.json`,
    `${base}/vip-example-repository.json`,
    `${base}/vip-example-business.json`,
  ]);
  const output = path.join(fixture, "src/components/vip-ui");
  for (const file of [
    "select.tsx",
    "date-picker.tsx",
    "chart.tsx",
    "calendar.tsx",
    "press-button.tsx",
    "popover.tsx",
    "utils.ts",
  ]) {
    await readFile(path.join(output, file), "utf8");
  }
  for (const file of [
    "page.tsx",
    "layout.tsx",
    "data.ts",
    "issues/page.tsx",
    "pulls/page.tsx",
    "commits/page.tsx",
    "releases/page.tsx",
    "contributors/page.tsx",
  ]) {
    await readFile(
      path.join(fixture, "src/app/examples/repository", file),
      "utf8",
    );
  }
  for (const file of [
    "page.tsx",
    "layout.tsx",
    "data.ts",
    "customers/page.tsx",
    "customers/[id]/page.tsx",
    "subscriptions/page.tsx",
    "invoices/page.tsx",
    "payments/page.tsx",
    "reports/page.tsx",
    "settings/page.tsx",
  ]) {
    await readFile(
      path.join(fixture, "src/app/examples/business", file),
      "utf8",
    );
  }
  assert.equal(
    await readFile(path.join(fixture, "src/components/ui/button.tsx"), "utf8"),
    "// Existing shadcn component.\n",
  );
  const installedCss = await readFile(
    path.join(fixture, "src/app/globals.css"),
    "utf8",
  );
  assert.match(installedCss, /--primary: #123456/);
  for (const selector of [
    ".ui-skeleton::after",
    ".ui-tooltip[data-entering]",
    ".aria-overlay-exit[data-exiting]",
  ]) {
    assert.ok(
      installedCss.includes(selector),
      `Missing installed style ${selector}`,
    );
  }
  assert.match(
    await readFile(path.join(fixture, "package.json"), "utf8"),
    /"@tanstack\/charts"/,
  );
  assert.doesNotMatch(installedCss, /--vip-primary/);
  assert.match(
    await readFile(path.join(output, "select.tsx"), "utf8"),
    /from "\.\/utils"/,
  );
  // Copy the same published files by hand into a separate directory.
  const manual = JSON.parse(
    await readFile(path.join(root, "public/r/vip-select.json"), "utf8"),
  );
  const manualDirectory = path.join(fixture, "src/components/manual-vip-ui");
  await mkdir(manualDirectory, { recursive: true });
  for (const file of manual.files.filter(
    (entry) => !entry.target.endsWith("/utils.ts"),
  )) {
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
    ".ui-skeleton::after",
    ".ui-tooltip[data-entering]",
    ".aria-overlay-exit[data-exiting]",
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
  await run("pnpm", ["exec", "next", "typegen"]);
  await run("pnpm", ["exec", "tsc", "--noEmit"]);
  await run("node", ["check-css.cjs"]);
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
