import {
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationList,
} from "@/components/ui/pagination";

export function PaginationBasicDemo() {
  return (
    <Pagination>
      <PaginationList>
        <PaginationItem>
          <PaginationLink href="#preview">Previous</PaginationLink>
        </PaginationItem>
        {[1, 2, 3].map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#preview"
              isCurrent={page === 1}
              aria-label={`Page ${page}`}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationLink href="#preview">Next</PaginationLink>
        </PaginationItem>
      </PaginationList>
    </Pagination>
  );
}
