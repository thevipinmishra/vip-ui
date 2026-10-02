import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/docs/site-header";

export const metadata: Metadata = {
  title: "MIT license | vip/ui",
  description: "Read the MIT license for vip/ui.",
};

export default async function LicensePage() {
  const license = await readFile(path.join(process.cwd(), "LICENSE"), "utf8");

  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main"
        className="sr-only fixed start-4 top-4 z-50 rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-24">
        <h1 className="text-[clamp(2.8rem,5vw,4.5rem)] font-semibold tracking-[-0.065em]">
          MIT license
        </h1>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          The license below applies to the vip/ui source code.
        </p>
        <pre className="mt-10 whitespace-pre-wrap break-words rounded-[20px] bg-card p-5 font-mono text-xs leading-6 shadow-[var(--shadow-card)] ring-1 ring-border/70 sm:p-8 sm:text-sm">
          {license.trim()}
        </pre>
      </main>
    </div>
  );
}
