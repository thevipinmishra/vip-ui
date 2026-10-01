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
      <div className="-mx-5 overflow-x-auto px-5 pb-4 sm:mx-0 sm:px-0">
        <div className="w-max min-w-full border-b border-border/70 pb-3">
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
            className="flex-nowrap gap-2 border-0 bg-transparent p-0"
          >
            {categories.map((category) => (
              <ToggleButton
                key={category.slug}
                id={category.slug}
                variant="ghost"
                aria-controls="chart-results"
              >
                {category.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </div>
      </div>
      <output className="sr-only">Showing {active.label} charts</output>
      <div id="chart-results">{active.content}</div>
    </>
  );
}
