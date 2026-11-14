"use client";

import { ArrowRightIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { memo, useState } from "react";
import { type CatalogComponent, catalogGroups } from "@/lib/catalog";
import { CatalogPreview } from "./catalog-preview";

const CatalogCard = memo(function CatalogCard({
  component,
}: {
  component: CatalogComponent;
}) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  return (
    <li
      className="group/card relative flex flex-col rounded-2xl bg-card p-1 text-card-foreground shadow-(--shadow-card) ring-1 ring-border/60 transition-[box-shadow,scale] duration-200 ease-out-quint hover:shadow-(--shadow-float) hover:ring-border motion-safe:has-[a:active]:scale-[0.985] forced-colors:border"
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setHovered(true);
      }}
      onPointerLeave={() => setHovered(false)}
    >
      <CatalogPreview slug={component.slug} active={hovered || focused} />
      <Link
        href={`/components/${component.slug}`}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="group/link flex items-center gap-2 px-3 py-2.5 outline-none after:absolute after:inset-0 after:rounded-2xl after:outline-offset-4 after:outline-transparent after:transition-[outline-color,outline-offset] after:duration-200 after:ease-out-quint focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-ring motion-reduce:after:outline-offset-2"
      >
        <span className="min-w-0 truncate text-sm font-medium tracking-[-0.01em]">
          {component.name}
        </span>
        <span className="sr-only">. {component.description}</span>
        <ArrowRightIcon
          size={14}
          aria-hidden="true"
          className="ms-auto shrink-0 text-muted-foreground opacity-0 transition-[opacity,translate] duration-200 ease-out-quint group-hover/card:opacity-100 group-focus-visible/link:opacity-100 motion-safe:-translate-x-1 motion-safe:group-hover/card:translate-x-0 motion-safe:group-focus-visible/link:translate-x-0 rtl:-scale-x-100"
        />
      </Link>
    </li>
  );
});

export function CatalogBrowser({ category }: { category?: string }) {
  const groups = category
    ? catalogGroups.filter((group) => group.title === category)
    : catalogGroups;

  return (
    <section
      id="gallery"
      aria-label="Components"
      className="grid scroll-mt-20 gap-14 pt-6"
    >
      {groups.map((group) => {
        const headingId = group.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

        return (
          <section
            key={group.title}
            id={headingId}
            aria-labelledby={`${headingId}-title`}
            className="scroll-mt-20"
          >
            <div className="flex items-baseline gap-2.5">
              <h2
                id={`${headingId}-title`}
                className="text-lg font-semibold tracking-[-0.03em]"
              >
                {group.title}
              </h2>
              <span className="text-sm tabular-nums text-muted-foreground">
                {group.components.length}
              </span>
            </div>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4 xl:grid-cols-4">
              {group.components.map((component) => (
                <CatalogCard key={component.slug} component={component} />
              ))}
            </ul>
          </section>
        );
      })}
    </section>
  );
}
