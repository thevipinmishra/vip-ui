"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { ReactNode } from "react";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";

interface ChartCategory {
  slug: string;
  label: string;
}

export function ChartFilters({
  categories,
  active,
}: {
  categories: ChartCategory[];
  active: ChartCategory & { content: ReactNode };
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <>
      <div className="-mx-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0">
        <ToggleButtonGroup
          aria-label="Chart category"
          selectionMode="single"
          disallowEmptySelection
          selectedKeys={[active.slug]}
          onSelectionChange={(keys) => {
            const [slug] = keys;
            const next = categories.find((item) => item.slug === slug);
            if (!next || next.slug === active.slug) return;
            const params = new URLSearchParams(searchParams?.toString());
            params.set("chart", next.slug);
            router.push(`/charts?${params}`, { scroll: false });
          }}
          className="w-max min-w-full max-w-none flex-nowrap gap-5 rounded-none border-0 border-b border-border/70 bg-transparent p-0 sm:gap-7"
        >
          {categories.map((category) => (
            <ToggleButton
              key={category.slug}
              id={category.slug}
              variant="ghost"
              aria-controls="chart-results"
              className="-mb-px min-h-10 rounded-none border-0 border-b-2 border-transparent px-1 text-muted-foreground hover:bg-transparent hover:text-foreground selected:border-primary selected:bg-transparent selected:text-foreground"
            >
              {category.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
      <output className="sr-only">Showing {active.label} charts</output>
      <section id="examples" data-toc-label="Examples">
        <div id="chart-results">{active.content}</div>
      </section>
    </>
  );
}
