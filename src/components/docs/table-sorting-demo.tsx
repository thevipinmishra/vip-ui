"use client";

import { useMemo, useState } from "react";
import type { SortDescriptor } from "react-aria-components";
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "@/components/ui/table";

const projects = [
  { id: "north", name: "Studio North", owner: "Maya Chen", openTasks: 12 },
  { id: "atlas", name: "Atlas", owner: "Sam Rivera", openTasks: 8 },
  { id: "field", name: "Field Notes", owner: "Jo Park", openTasks: 3 },
  { id: "signal", name: "Signal", owner: "Maya Chen", openTasks: 18 },
  { id: "morrow", name: "Morrow", owner: "Alex Kim", openTasks: 5 },
  { id: "orbit", name: "Orbit", owner: "Sam Rivera", openTasks: 21 },
  { id: "grain", name: "Grain", owner: "Jo Park", openTasks: 0 },
  { id: "horizon", name: "Horizon", owner: "Alex Kim", openTasks: 14 },
];

export function TableSortingDemo() {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });
  const sorted = useMemo(
    () =>
      [...projects].sort((a, b) => {
        const result =
          sortDescriptor.column === "openTasks"
            ? a.openTasks - b.openTasks
            : a[
                sortDescriptor.column === "owner" ? "owner" : "name"
              ].localeCompare(
                b[sortDescriptor.column === "owner" ? "owner" : "name"],
              );
        return sortDescriptor.direction === "descending" ? -result : result;
      }),
    [sortDescriptor],
  );

  return (
    <div className="w-full max-w-2xl overflow-x-auto rounded-lg border border-border bg-card shadow-[var(--shadow-card)]">
      <Table
        aria-label="Project backlog"
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
      >
        <TableHeader>
          <Column id="name" isRowHeader allowsSorting>
            Project
          </Column>
          <Column id="owner" allowsSorting>
            Owner
          </Column>
          <Column id="openTasks" allowsSorting>
            Open tasks
          </Column>
        </TableHeader>
        <TableBody items={sorted}>
          {(project) => (
            <Row id={project.id}>
              <Cell>{project.name}</Cell>
              <Cell>{project.owner}</Cell>
              <Cell>{project.openTasks}</Cell>
            </Row>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
