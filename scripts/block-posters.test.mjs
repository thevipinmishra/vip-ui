import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");
const posterDir = path.join(root, "public/blocks/posters");
const catalog = JSON.parse(
  await readFile(path.join(root, "src/lib/blocks.json"), "utf8"),
);

const names = new Set(catalog.blocks.map((block) => block.name));
const files = new Set(
  (await readdir(posterDir)).filter((file) => file.endsWith(".jpg")),
);

test("every gallery block has light and dark posters", () => {
  const missing = [];
  for (const name of names) {
    for (const theme of ["light", "dark"]) {
      if (!files.has(`${name}-${theme}.jpg`))
        missing.push(`${name}-${theme}.jpg`);
    }
  }
  assert.deepEqual(missing, []);
});

test("no poster exists for a block that no longer exists", () => {
  const orphaned = [];
  for (const file of files) {
    const match = file.match(/^(.+)-(light|dark)\.jpg$/);
    if (!match || !names.has(match[1])) orphaned.push(file);
  }
  assert.deepEqual(orphaned, []);
});
