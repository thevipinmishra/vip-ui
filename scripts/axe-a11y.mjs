import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { AxeBuilder } from "@axe-core/playwright";
import { chromium } from "@playwright/test";

const root = path.resolve(import.meta.dirname, "..");
const baseURL = (
  process.argv[2] ??
  process.env.VIP_A11Y_BASE_URL ??
  "http://localhost:3000"
).replace(/\/$/, "");

const catalog = JSON.parse(
  await readFile(path.join(root, "src/lib/catalog.json"), "utf8"),
);
const routes = catalog.groups.flatMap((group) =>
  group.items.map((item) => `/components/${item.slug}`),
);

const browser = await chromium.launch();
const failures = [];
const counts = new Map();

try {
  for (const mode of ["light", "dark"]) {
    const context = await browser.newContext();
    await context.addInitScript((value) => {
      try {
        window.localStorage.setItem("vip-ui-theme", value);
      } catch {}
    }, mode);
    const page = await context.newPage();
    for (const route of routes) {
      const response = await page.goto(`${baseURL}${route}`, {
        waitUntil: "networkidle",
      });
      if (!response?.ok()) {
        failures.push(`${route} ${mode}: the page failed to load`);
        console.log(`${route} ${mode}: failed to load`);
        continue;
      }
      await page.waitForTimeout(250);
      const results = await new AxeBuilder({ page }).analyze();
      const violations = results.violations.filter((violation) =>
        ["serious", "critical"].includes(violation.impact),
      );
      console.log(`${route} ${mode}: ${violations.length}`);
      for (const violation of violations) {
        counts.set(
          violation.id,
          (counts.get(violation.id) ?? new Set()).add(route),
        );
        failures.push(
          `${route} ${mode}: ${violation.id} (${violation.impact}) on ${violation.nodes.length} node(s), for example ${violation.nodes
            .slice(0, 3)
            .map((node) => node.target.join(" "))
            .join(", ")}`,
        );
      }
    }
    await context.close();
  }
} finally {
  await browser.close();
}

console.log(
  `Scanned ${routes.length} component pages in light and dark from ${baseURL}.`,
);
if (failures.length) {
  console.error(
    `${failures.length} serious or critical axe violations:\n${failures.join("\n")}`,
  );
  console.error(
    `Rule totals: ${[...counts.entries()]
      .map(([id, routes]) => `${id} (${routes.size} pages)`)
      .join(", ")}`,
  );
  process.exitCode = 1;
} else {
  console.log("No serious or critical axe violations.");
}
