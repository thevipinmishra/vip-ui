"use client";

import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationList,
} from "@/components/ui/pagination";
import type { Size } from "@/components/ui/size";

export function PaginationSizesDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <ResultsPagination size="xs" />
      <ResultsPagination size="sm" />
      <ResultsPagination />
    </div>
  );
}

function ResultsPagination({ size }: { size?: Size }) {
  return (
    <Pagination size={size} aria-label="Results">
      <PaginationList className="flex-nowrap">
        <PaginationItem>
          <PaginationLink href="#preview" aria-label="Previous page">
            <CaretLeftIcon aria-hidden="true" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#preview" isCurrent aria-label="Page 1">
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#preview" aria-label="Page 2">
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#preview" aria-label="Page 3">
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#preview" aria-label="Next page">
            <CaretRightIcon aria-hidden="true" />
          </PaginationLink>
        </PaginationItem>
      </PaginationList>
    </Pagination>
  );
}
