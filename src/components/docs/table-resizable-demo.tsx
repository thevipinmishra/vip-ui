"use client";

import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableContainer,
  TableHeader,
} from "@/components/ui/table";

const files = [
  {
    id: "brief",
    name: "Brand brief.pdf",
    owner: "Maya Chen",
    note: "Final copy for the spring campaign",
    size: "2.4 MB",
  },
  {
    id: "audit",
    name: "Accessibility audit.xlsx",
    owner: "Jo Park",
    note: "Contrast and focus findings from the last review",
    size: "860 KB",
  },
  {
    id: "roadmap",
    name: "Roadmap Q3.key",
    owner: "Sam Rivera",
    note: "Draft. Needs dates from the platform team",
    size: "14.1 MB",
  },
  {
    id: "invoice",
    name: "Invoice 2041.pdf",
    owner: "Alex Kim",
    note: "Paid on 4 June",
    size: "120 KB",
  },
];

export function TableResizableDemo() {
  return (
    <TableContainer className="max-w-2xl">
      <Table aria-label="Shared files">
        <TableHeader>
          <Column
            id="name"
            isRowHeader
            allowsResizing
            defaultWidth="1.4fr"
            minWidth={140}
          >
            Name
          </Column>
          <Column id="owner" allowsResizing defaultWidth="1fr" minWidth={110}>
            Owner
          </Column>
          <Column id="note" allowsResizing defaultWidth="2fr" minWidth={140}>
            Note
          </Column>
          <Column id="size" defaultWidth={96} className="text-end">
            Size
          </Column>
        </TableHeader>
        <TableBody items={files}>
          {(file) => (
            <Row id={file.id}>
              <Cell className="truncate font-medium">{file.name}</Cell>
              <Cell className="truncate">{file.owner}</Cell>
              <Cell className="truncate text-muted-foreground">
                {file.note}
              </Cell>
              <Cell className="text-end tabular-nums">{file.size}</Cell>
            </Row>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
