"use client";

import { useState } from "react";
import {
  Pagination,
  PaginationContext,
  PaginationFirstTrigger,
  PaginationItem,
  PaginationLastTrigger,
  PaginationList,
  PaginationNextTrigger,
  PaginationPages,
  PaginationPrevTrigger,
} from "@/components/ui/pagination";

const invoices = [
  "Atlas Studio",
  "Beacon Labs",
  "Cascade Supply",
  "Drift Systems",
  "Ember & Co.",
  "Fieldwork",
  "Glacier Goods",
  "Harbor Studio",
  "Iris Interactive",
  "Juniper Press",
  "Kite Logistics",
  "Lumen Works",
  "Meadow Market",
  "Northwind Retail",
  "Orbit Analytics",
  "Pine & Paper",
  "Quarry Design",
  "Riverstone",
  "Summit Services",
  "Tidewater",
  "Umbra Media",
  "Violet Bakery",
  "Willow Health",
  "Xenon Studio",
];

export function PaginationContextDemo() {
  const [page, setPage] = useState(2);

  return (
    <div className="grid w-full max-w-lg gap-4">
      <Pagination
        aria-label="Invoices"
        count={invoices.length}
        page={page}
        pageSize={5}
        onPageChange={(details) => setPage(details.page)}
      >
        <PaginationContext>
          {(api) => (
            <div className="grid gap-3">
              <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
                <p
                  aria-atomic="true"
                  aria-live="polite"
                  className="text-muted-foreground"
                >
                  Showing {api.pageRange.start + 1}–
                  {Math.min(api.pageRange.end, api.count)} of {api.count}{" "}
                  invoices
                </p>
                <p className="font-medium tabular-nums">
                  Page {api.page} of {api.totalPages}
                </p>
              </div>
              <PaginationList className="flex-nowrap gap-1">
                <PaginationItem>
                  <PaginationFirstTrigger />
                </PaginationItem>
                <PaginationItem>
                  <PaginationPrevTrigger />
                </PaginationItem>
                <PaginationPages />
                <PaginationItem>
                  <PaginationNextTrigger />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLastTrigger />
                </PaginationItem>
              </PaginationList>
            </div>
          )}
        </PaginationContext>
      </Pagination>
    </div>
  );
}
