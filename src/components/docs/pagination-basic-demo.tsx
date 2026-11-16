"use client";

import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import { useState } from "react";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationList,
  PaginationPages,
} from "@/components/ui/pagination";

export function PaginationBasicDemo() {
  const [page, setPage] = useState(1);
  return (
    <Pagination
      count={30}
      page={page}
      pageSize={10}
      onPageChange={(details) => setPage(details.page)}
    >
      <PaginationList className="flex-nowrap gap-1 sm:gap-2">
        <PaginationItem>
          <PaginationLink
            isDisabled={page === 1}
            aria-label="Previous page"
            onPress={() => {
              setPage((current) => current - 1);
            }}
          >
            <CaretLeftIcon aria-hidden="true" />
            <span className="hidden sm:inline">Previous</span>
          </PaginationLink>
        </PaginationItem>
        <PaginationPages />
        <PaginationItem>
          <PaginationLink
            isDisabled={page === 3}
            aria-label="Next page"
            onPress={() => {
              setPage((current) => current + 1);
            }}
          >
            <span className="hidden sm:inline">Next</span>
            <CaretRightIcon aria-hidden="true" />
          </PaginationLink>
        </PaginationItem>
      </PaginationList>
    </Pagination>
  );
}
