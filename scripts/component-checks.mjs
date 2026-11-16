import { execFile } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { promisify } from "node:util";

const root = path.resolve(import.meta.dirname, "..");
const target = path.join(root, "src/lib/component-checks.json");

export async function writeChecks(key, value) {
  let checks = {};
  try {
    checks = JSON.parse(await readFile(target, "utf8"));
  } catch {}
  checks[key] = value;
  await writeFile(target, `${JSON.stringify(checks, null, 2)}\n`);
  await promisify(execFile)(
    process.execPath,
    [
      path.join(root, "node_modules/@biomejs/biome/bin/biome"),
      "format",
      "--write",
      target,
    ],
    { cwd: root },
  );
}
