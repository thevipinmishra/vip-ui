"use client";

import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import { useSyncExternalStore } from "react";
import { RouterProvider } from "react-aria-components";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationList,
} from "@/components/ui/pagination";

const projects = [
  "Atlas brand refresh",
  "Beacon onboarding",
  "Cascade campaign",
  "Drift design system",
  "Ember editorial",
  "Field notes",
  "Glacier microsite",
  "Harbor handbook",
  "Iris identity",
];

function subscribe(callback: () => void) {
  window.addEventListener("popstate", callback);
  window.addEventListener("pagination-change", callback);
  return () => {
    window.removeEventListener("popstate", callback);
    window.removeEventListener("pagination-change", callback);
  };
}

function currentPage() {
  const match = /^([1-3])$/.exec(
    new URLSearchParams(window.location.search).get("page") ?? "",
  );
  return match ? Number(match[1]) : 1;
}

function navigate(href: string) {
  window.history.pushState(null, "", new URL(href, window.location.href));
  window.dispatchEvent(new Event("pagination-change"));
}

export function PaginationDemo() {
  const page = useSyncExternalStore(subscribe, currentPage, () => 1);
  return (
    <RouterProvider navigate={navigate}>
      <div className="grid w-full max-w-md gap-5">
        <ul className="divide-y divide-border rounded-lg border border-border bg-card px-4 text-sm shadow-(--shadow-card)">
          {projects.slice((page - 1) * 3, page * 3).map((project) => (
            <li className="flex min-h-12 items-center" key={project}>
              {project}
            </li>
          ))}
        </ul>
        <Pagination>
          <PaginationList className="w-full flex-nowrap gap-1 sm:gap-2">
            <PaginationItem className="flex-1 justify-end">
              <PaginationLink
                href={`?page=${page - 1}#preview`}
                isDisabled={page === 1}
                aria-label="Previous page"
              >
                <CaretLeftIcon aria-hidden="true" />
                <span className="hidden sm:inline">Previous</span>
              </PaginationLink>
            </PaginationItem>
            {[1, 2, 3].map((number) => (
              <PaginationItem key={number}>
                <PaginationLink
                  href={`?page=${number}#preview`}
                  isCurrent={number === page}
                  aria-label={`Page ${number}`}
                >
                  {number}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem className="flex-1 justify-start">
              <PaginationLink
                href={`?page=${page + 1}#preview`}
                isDisabled={page === 3}
                aria-label="Next page"
              >
                <span className="hidden sm:inline">Next</span>
                <CaretRightIcon aria-hidden="true" />
              </PaginationLink>
            </PaginationItem>
          </PaginationList>
        </Pagination>
      </div>
    </RouterProvider>
  );
}
