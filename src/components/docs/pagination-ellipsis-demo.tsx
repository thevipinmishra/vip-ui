"use client";

import { useState } from "react";
import {
  Pagination,
  PaginationList,
  PaginationPages,
} from "@/components/ui/pagination";

export function PaginationEllipsisDemo() {
  const [page, setPage] = useState(10);
  return (
    <Pagination
      aria-label="Search results"
      count={100}
      page={page}
      pageSize={10}
      getPageUrl={(details) => `#page-${details.page}`}
      onPageChange={(details) => setPage(details.page)}
    >
      <PaginationList>
        <PaginationPages />
      </PaginationList>
    </Pagination>
  );
}
