import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "reicon-react";
import { CatalogBrowser } from "@/components/docs/catalog-browser";

export const metadata: Metadata = {
  title: "Components | vip/ui",
  description:
    "Browse copyable React components, try live examples, and read installation and API guidance for each component.",
};

export default function ComponentsPage() {
  return (
    <article>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-[clamp(2.5rem,5vw,3.5rem)] font-semibold tracking-[-0.06em]">
          Components
        </h1>
        <Link
          href="/components/installation"
          className="inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring lg:hidden"
        >
          Installation <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>

      <CatalogBrowser />
    </article>
  );
}
