import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function* files(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) yield* files(full);
    else if (entry.name.endsWith(".tsx")) yield full;
  }
}

const rules = [
  [/(\s)size="icon"(?=[\s/>])/g, "$1iconOnly"],
  [/\s+size="default"(?=[\s/>])/g, ""],
];

let changed = 0;
for await (const file of files(path.join(root, "src"))) {
  const before = await readFile(file, "utf8");
  const after = rules.reduce(
    (text, [from, to]) => text.replace(from, to),
    before,
  );
  if (after !== before) {
    await writeFile(file, after);
    changed++;
    console.log(path.relative(root, file));
  }
}
console.log(`${changed} files changed`);
