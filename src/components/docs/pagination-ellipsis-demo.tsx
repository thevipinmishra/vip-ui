"use client";

import {
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationList,
} from "@/components/ui/pagination";

export function PaginationEllipsisDemo() {
  return (
    <Pagination aria-label="Search results">
      <PaginationList>
        <PaginationItem>
          <PaginationLink href="#preview" aria-label="Page 1">
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#preview" aria-label="Page 8">
            8
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#preview" aria-label="Page 9">
            9
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#preview" isCurrent aria-label="Page 10">
            10
          </PaginationLink>
        </PaginationItem>
      </PaginationList>
    </Pagination>
  );
}
