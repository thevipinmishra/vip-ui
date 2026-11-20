import type { ComponentType } from "react";

type DemoModule = Record<string, ComponentType<Record<string, unknown>>>;

const demos = import.meta.glob<DemoModule>("./*-demo.tsx");

export function demoExportName(file: string) {
  return file
    .replace(/\.tsx$/, "")
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join("");
}

export async function loadDemo(
  file: string,
  props: Readonly<Record<string, unknown>> = {},
) {
  const load = demos[`./${file}`];
  if (!load) throw new Error(`No demo file named ${file}`);
  const Demo = (await load())[demoExportName(file)];
  if (!Demo) throw new Error(`${file} must export ${demoExportName(file)}`);
  return <Demo {...props} />;
}
