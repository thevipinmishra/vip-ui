"use client";

import { useSyncExternalStore } from "react";
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
  return () => window.removeEventListener("popstate", callback);
}

function currentPage() {
  const match = /^([1-3])$/.exec(
    new URLSearchParams(window.location.search).get("page") ?? "",
  );
  return match ? Number(match[1]) : 1;
}

export function PaginationDemo() {
  const page = useSyncExternalStore(subscribe, currentPage, () => 1);
  return (
    <div className="grid w-full max-w-md gap-5">
      <ul className="divide-y divide-border rounded-lg border border-border px-4 text-sm">
        {projects.slice((page - 1) * 3, page * 3).map((project) => (
          <li className="py-3" key={project}>
            {project}
          </li>
        ))}
      </ul>
      <Pagination>
        <PaginationList>
          {page > 1 && (
            <PaginationItem>
              <PaginationLink href={`?page=${page - 1}#preview`}>
                Previous
              </PaginationLink>
            </PaginationItem>
          )}
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
          {page < 3 && (
            <PaginationItem>
              <PaginationLink href={`?page=${page + 1}#preview`}>
                Next
              </PaginationLink>
            </PaginationItem>
          )}
        </PaginationList>
      </Pagination>
    </div>
  );
}
