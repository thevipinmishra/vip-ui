"use client";

import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import { useState } from "react";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationList,
} from "@/components/ui/pagination";

export function PaginationBasicDemo() {
  const [page, setPage] = useState(1);
  return (
    <Pagination>
      <PaginationList className="flex-nowrap gap-1 sm:gap-2">
        <PaginationItem>
          <PaginationLink
            href="#preview"
            isDisabled={page === 1}
            aria-label="Previous page"
            onClick={(event) => {
              event.preventDefault();
              setPage((current) => current - 1);
            }}
          >
            <CaretLeftIcon size={17} aria-hidden="true" />
            <span className="hidden sm:inline">Previous</span>
          </PaginationLink>
        </PaginationItem>
        {[1, 2, 3].map((number) => (
          <PaginationItem key={number}>
            <PaginationLink
              href="#preview"
              isCurrent={page === number}
              onClick={(event) => {
                event.preventDefault();
                setPage(number);
              }}
              aria-label={`Page ${number}`}
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationLink
            href="#preview"
            isDisabled={page === 3}
            aria-label="Next page"
            onClick={(event) => {
              event.preventDefault();
              setPage((current) => current + 1);
            }}
          >
            <span className="hidden sm:inline">Next</span>
            <CaretRightIcon size={17} aria-hidden="true" />
          </PaginationLink>
        </PaginationItem>
      </PaginationList>
    </Pagination>
  );
}
