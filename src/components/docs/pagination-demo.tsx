"use client";

import { type MouseEvent, useSyncExternalStore } from "react";
import { ChevronLeft, ChevronRight } from "reicon-react";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationList,
} from "@/components/ui/pagination";

const projects = [
  "Studio North",
  "Atlas",
  "Fieldnotes",
  "Beacon",
  "Orchard",
  "Mosaic",
  "Harbor",
  "Pavilion",
  "Lumen",
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

function goToPage(event: MouseEvent<HTMLAnchorElement>, page: number) {
  if (
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  )
    return;
  event.preventDefault();
  const url = new URL(window.location.href);
  url.searchParams.set("page", String(page));
  window.history.pushState(null, "", url);
  window.dispatchEvent(new Event("pagination-change"));
}

export function PaginationDemo() {
  const page = useSyncExternalStore(subscribe, currentPage, () => 1);
  return (
    <div className="grid w-full max-w-md gap-5">
      <ul className="divide-y divide-border rounded-lg border border-border bg-card px-4 text-sm shadow-[var(--shadow-card)]">
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
              onClick={(event) => goToPage(event, page - 1)}
            >
              <ChevronLeft size={17} aria-hidden="true" />
              <span className="hidden sm:inline">Previous</span>
            </PaginationLink>
          </PaginationItem>
          {[1, 2, 3].map((number) => (
            <PaginationItem key={number}>
              <PaginationLink
                href={`?page=${number}#preview`}
                isCurrent={number === page}
                aria-label={`Page ${number}`}
                onClick={(event) => goToPage(event, number)}
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
              onClick={(event) => goToPage(event, page + 1)}
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight size={17} aria-hidden="true" />
            </PaginationLink>
          </PaginationItem>
        </PaginationList>
      </Pagination>
    </div>
  );
}
