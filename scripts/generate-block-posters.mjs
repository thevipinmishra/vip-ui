import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { chromium } from "@playwright/test";

const root = path.resolve(import.meta.dirname, "..");
const posterDir = path.join(root, "public/blocks/posters");
const catalog = JSON.parse(
  await readFile(path.join(root, "src/lib/blocks.json"), "utf8"),
);
const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/+$/, "");
const requested = process.argv.slice(3);
const known = new Set(catalog.blocks.map((block) => block.name));
const names = requested.length > 0 ? requested : [...known];

for (const name of names) {
  if (!known.has(name)) throw new Error(`Unknown block: ${name}`);
}

const themes = ["light", "dark"];

await mkdir(posterDir, { recursive: true });

const browser = await chromium.launch();
const contexts = new Map();

for (const theme of themes) {
  const context = await browser.newContext({
    viewport: { width: 1024, height: 640 },
    deviceScaleFactor: 1,
    colorScheme: theme,
    reducedMotion: "reduce",
  });
  await context.addInitScript((value) => {
    window.localStorage.setItem("vip-ui-theme", value);
    document.addEventListener(
      "DOMContentLoaded",
      () => {
        const style = document.createElement("style");
        style.textContent =
          "nextjs-portal { display: none !important; } html { scrollbar-width: none; } ::-webkit-scrollbar { display: none; }";
        document.head.append(style);
      },
      { once: true },
    );
  }, theme);
  contexts.set(theme, context);
}

const files = [];

for (const name of names) {
  await Promise.all(
    themes.map(async (theme) => {
      const page = await contexts.get(theme).newPage();
      try {
        await page.goto(`${base}/blocks/${name}`, {
          waitUntil: "networkidle",
          timeout: 60000,
        });
        await page.evaluate(() => document.fonts.ready);
        const isDark = await page.evaluate(() =>
          document.documentElement.classList.contains("dark"),
        );
        if (isDark !== (theme === "dark")) {
          throw new Error(`${name} did not render in ${theme} mode`);
        }
        await page.waitForTimeout(1000);
        const buffer = await page.screenshot({ type: "jpeg", quality: 85 });
        const file = path.join(posterDir, `${name}-${theme}.jpg`);
        await writeFile(file, buffer);
        files.push({ file, bytes: buffer.length });
        console.log(
          `${path.relative(root, file)} ${(buffer.length / 1024).toFixed(1)} KB`,
        );
      } finally {
        await page.close();
      }
    }),
  );
}

for (const context of contexts.values()) await context.close();
await browser.close();

const total = files.reduce((sum, item) => sum + item.bytes, 0);
console.log(
  `${files.length} posters, ${(total / 1024 / 1024).toFixed(2)} MB total, ${(total / files.length / 1024).toFixed(1)} KB average`,
);
