"use client";

import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "@/components/ui/table";

const projects = [
  { id: "north", name: "Studio North", owner: "Maya Chen" },
  { id: "atlas", name: "Atlas", owner: "Sam Rivera" },
  { id: "field", name: "Field Notes", owner: "Jo Park" },
];

export function TableBasicDemo() {
  return (
    <div className="w-full max-w-md overflow-x-auto rounded-lg border border-border">
      <Table aria-label="Projects">
        <TableHeader>
          <Column isRowHeader>Project</Column>
          <Column>Owner</Column>
        </TableHeader>
        <TableBody items={projects}>
          {(project) => (
            <Row id={project.id}>
              <Cell>{project.name}</Cell>
              <Cell>{project.owner}</Cell>
            </Row>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
