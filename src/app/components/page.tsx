import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "reicon-react";
import { CatalogCard } from "@/components/docs/catalog-card";
import { catalogGroups } from "@/components/docs/catalog-groups";

export const metadata: Metadata = {
  title: "Components | vip/ui",
  description:
    "Browse copyable React components, try live examples, and read installation and API guidance for each component.",
};

function componentName(slug: string) {
  if (slug === "kbd-code") return "Kbd & code";
  return slug
    .replaceAll("-", " ")
    .replace(/^./, (first) => first.toUpperCase());
}

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

      <div className="mt-12 grid gap-12">
        {catalogGroups.map((group) => {
          const headingId = `group-${group.title.replaceAll(" ", "-")}`;

          return (
            <section key={group.title} aria-labelledby={headingId}>
              <h2
                id={headingId}
                className="mb-5 text-xl font-semibold tracking-[-0.04em]"
              >
                {group.title}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {group.hrefs.map((slug) => (
                  <CatalogCard key={slug}>
                    <Link
                      href={`/components/${slug}`}
                      className="flex min-h-16 items-center rounded-xl bg-card px-5 py-4 text-base font-medium tracking-[-0.025em] text-card-foreground shadow-[var(--shadow-card)] ring-1 ring-border/70 motion-safe:transition-[box-shadow,background-color] motion-safe:duration-200 hover:bg-accent hover:shadow-[var(--shadow-float)] focus-visible:bg-accent focus-visible:shadow-[var(--shadow-float)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    >
                      {componentName(slug)}
                    </Link>
                  </CatalogCard>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </article>
  );
}
