import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/docs/page-header";
import { SiteFooter } from "@/components/docs/site-footer";
import { SiteHeader } from "@/components/docs/site-header";

export const metadata: Metadata = {
  title: "MIT license | vip/ui",
  description: "Read the MIT license for vip/ui.",
};

export default async function LicensePage() {
  const license = await readFile(path.join(process.cwd(), "LICENSE"), "utf8");

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <a
        href="#main"
        className="sr-only fixed start-4 inset-bs-4 z-50 rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="site-container flex-1 pbe-24 pbs-10 sm:pbs-14">
        <PageHeader>
          <PageHeaderHeading>MIT license</PageHeaderHeading>
          <PageHeaderDescription>
            The license below applies to the vip/ui source code.
          </PageHeaderDescription>
        </PageHeader>
        <pre className="mbs-10 max-w-4xl whitespace-pre-wrap break-words rounded-[20px] bg-card p-5 font-mono text-xs leading-6 shadow-[var(--shadow-card)] ring-1 ring-border/70 sm:p-8 sm:text-sm">
          {license.trim()}
        </pre>
      </main>
      <SiteFooter />
    </div>
  );
}
