import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import {
  createExampleItem,
  createItem,
  packageName,
  portableSource,
  readExampleFiles,
} from "./generate-registry.mjs";

const root = path.resolve(import.meta.dirname, "..");
const ui = path.join(root, "src/components/ui");

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
  assert.deepEqual(createItem("chart", sources).dependencies, [
    "@tanstack/charts",
    "cn",
  ]);
});

test("every component has a current, complete registry item", async () => {
  const items = (await readdir(path.join(root, "public/r"))).filter(
    (file) => file.endsWith(".json") && !file.startsWith("vip-example-"),
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
    assert.equal(generated.cssVars, undefined);
    for (const file of generated.files) {
      assert.doesNotMatch(
        file.content,
        /\b(group-)?(selection-start|selection-end|outside-month|unavailable|placeholder|selected|pressed|invalid|indeterminate|disabled|empty):/,
      );
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

test("consumer setup includes the site's skeleton and overlay behavior", async () => {
  const site = (
    await readFile(path.join(root, "src/app/globals.css"), "utf8")
  ).replace(/\r\n/g, "\n");
  const setup = (
    await readFile(path.join(root, "public/r/setup.css"), "utf8")
  ).replace(/\r\n/g, "\n");
  assert.equal(
    setup.slice(setup.indexOf(".ui-skeleton {")).trim(),
    site
      .slice(site.indexOf(".ui-skeleton {"), site.indexOf("\n:root {"))
      .trim(),
  );
});

test("the repository example installs its routes and component dependencies", async () => {
  const exampleFiles = await readExampleFiles(
    path.join(root, "src/app/examples/repository"),
  );
  const generated = createExampleItem("repository", sources, exampleFiles);
  const onDisk = JSON.parse(
    await readFile(
      path.join(root, "public/r/vip-example-repository.json"),
      "utf8",
    ),
  );
  assert.deepEqual(onDisk, generated);
  assert.equal(generated.type, "registry:block");
  assert.equal(
    generated.files.filter(
      (file) =>
        file.target.endsWith("/page.tsx") && file.target.startsWith("src/app/"),
    ).length,
    6,
  );
  for (const component of [
    "table",
    "select",
    "date-picker",
    "accordion",
    "stat",
    "empty-state",
  ]) {
    assert.ok(
      generated.files.some(
        (file) => file.target === `@components/vip-ui/${component}.tsx`,
      ),
    );
  }
  for (const file of generated.files.filter((file) =>
    file.target.startsWith("src/app/"),
  )) {
    assert.doesNotMatch(file.content, /@\/components\/ui\//);
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
});

test("the business example installs seven sections and customer details", async () => {
  const exampleFiles = await readExampleFiles(
    path.join(root, "src/app/examples/business"),
  );
  const generated = createExampleItem("business", sources, exampleFiles);
  const onDisk = JSON.parse(
    await readFile(
      path.join(root, "public/r/vip-example-business.json"),
      "utf8",
    ),
  );
  assert.deepEqual(onDisk, generated);
  assert.equal(
    generated.files.filter(
      (file) =>
        file.target.startsWith("src/app/") && file.target.endsWith("/page.tsx"),
    ).length,
    8,
  );
  for (const component of ["stat", "badge", "card", "button"]) {
    assert.ok(
      generated.files.some(
        (file) => file.target === `@components/vip-ui/${component}.tsx`,
      ),
    );
  }
  for (const file of generated.files.filter((file) =>
    file.target.startsWith("src/app/"),
  )) {
    assert.doesNotMatch(file.content, /@\/components\/ui\//);
    for (const [, specifier] of file.content.matchAll(
      /\bfrom\s+["'](\.{1,2}\/[^"']+)["']/g,
    )) {
      const resolved = path.posix.normalize(
        path.posix.join(path.posix.dirname(file.target), specifier),
      );
      assert.ok(
        generated.files.some((entry) => {
          const target = entry.target.replace(
            /^@components\//,
            "src/components/",
          );
          return target === `${resolved}.tsx` || target === `${resolved}.ts`;
        }),
        `Missing ${specifier} for ${file.target}`,
      );
    }
  }
});

test("the chat example installs its flow and shared controls", async () => {
  const exampleFiles = await readExampleFiles(
    path.join(root, "src/app/examples/chat"),
  );
  const generated = createExampleItem("chat", sources, exampleFiles);
  const onDisk = JSON.parse(
    await readFile(path.join(root, "public/r/vip-example-chat.json"), "utf8"),
  );
  assert.deepEqual(onDisk, generated);
  for (const component of [
    "avatar",
    "button",
    "card",
    "search-field",
    "text-area",
  ]) {
    assert.ok(
      generated.files.some(
        (file) => file.target === `@components/vip-ui/${component}.tsx`,
      ),
    );
  }
  for (const file of generated.files.filter((file) =>
    file.target.startsWith("src/app/"),
  )) {
    assert.doesNotMatch(file.content, /@\/components\/ui\//);
    for (const [, specifier] of file.content.matchAll(
      /\bfrom\s+["'](\.{1,2}\/[^"']+)["']/g,
    )) {
      const resolved = path.posix.normalize(
        path.posix.join(path.posix.dirname(file.target), specifier),
      );
      assert.ok(
        generated.files.some((entry) => {
          const target = entry.target.replace(
            /^@components\//,
            "src/components/",
          );
          return target === `${resolved}.tsx` || target === `${resolved}.ts`;
        }),
        `Missing ${specifier} for ${file.target}`,
      );
    }
  }
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
  assert.ok(item.dependencies.includes("motion"));
  assert.ok(item.dependencies.includes("react-aria-components"));
  assert.ok(item.dependencies.includes("reicon-react"));
  assert.ok(
    item.dependencies.includes("cn"),
    "the scoped helper must be self-contained",
  );
  assert.ok(targets.includes("utils.ts"));
});

test("the portable source uses React Aria data states and shadcn tokens", () => {
  const output = portableSource(
    '"group-selected/item:bg-primary pressed:text-foreground disabled:opacity-50 selection-start:rounded-s-md selection-end:rounded-e-md placeholder:text-muted-foreground rounded-md shadow-[var(--shadow-card)]"',
  );
  assert.match(output, /group-data-\[selected\]\/item:bg-primary/);
  assert.match(output, /data-\[pressed\]:text-foreground/);
  assert.match(output, /data-\[disabled\]:opacity-50/);
  assert.match(output, /data-\[selection-start\]:rounded-s-md/);
  assert.match(output, /data-\[selection-end\]:rounded-e-md/);
  assert.match(output, /data-\[placeholder\]:text-muted-foreground/);
  assert.match(output, /rounded-md/);
  assert.match(output, /var\(--shadow-card\)/);
  assert.match(
    portableSource('import { cn } from "@/lib/utils"'),
    /from "\.\/utils"/,
  );
});
