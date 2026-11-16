"use client";

import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationList,
  PaginationPages,
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
    <Pagination
      size={size}
      aria-label="Results"
      count={30}
      page={2}
      pageSize={10}
      getPageUrl={() => "#preview"}
    >
      <PaginationList className="flex-nowrap">
        <PaginationItem>
          <PaginationLink href="#preview" aria-label="Previous page">
            <CaretLeftIcon aria-hidden="true" />
          </PaginationLink>
        </PaginationItem>
        <PaginationPages />
        <PaginationItem>
          <PaginationLink href="#preview" aria-label="Next page">
            <CaretRightIcon aria-hidden="true" />
          </PaginationLink>
        </PaginationItem>
      </PaginationList>
    </Pagination>
  );
}
