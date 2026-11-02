"use client";

import { useState } from "react";
import type { Selection } from "react-aria-components";
import { Badge } from "@/components/ui/badge";
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableContainer,
  TableHeader,
} from "@/components/ui/table";

const projects = [
  {
    id: "north",
    name: "Studio North",
    owner: "Maya Chen",
    status: "In progress",
  },
  { id: "atlas", name: "Atlas", owner: "Sam Rivera", status: "Review" },
  { id: "field", name: "Field Notes", owner: "Jo Park", status: "Published" },
  { id: "signal", name: "Signal", owner: "Maya Chen", status: "In progress" },
  { id: "morrow", name: "Morrow", owner: "Alex Kim", status: "Review" },
  { id: "orbit", name: "Orbit", owner: "Sam Rivera", status: "Published" },
] as const;

const statusVariants = {
  "In progress": "accent",
  Review: "warning",
  Published: "success",
} as const;

export function TableDemo() {
  const [selected, setSelected] = useState<Selection>(new Set(["atlas"]));
  const count = selected === "all" ? projects.length - 1 : selected.size;

  return (
    <div className="grid w-full max-w-2xl gap-2">
      <TableContainer>
        <Table
          aria-label="Projects"
          selectionMode="multiple"
          selectedKeys={selected}
          onSelectionChange={setSelected}
          disabledKeys={["orbit"]}
          className="min-w-[30rem]"
        >
          <TableHeader>
            <Column id="name" isRowHeader>
              Project
            </Column>
            <Column id="owner">Owner</Column>
            <Column id="status">Status</Column>
          </TableHeader>
          <TableBody items={projects}>
            {(project) => (
              <Row id={project.id}>
                <Cell>
                  <span className="font-medium">{project.name}</span>
                </Cell>
                <Cell>{project.owner}</Cell>
                <Cell>
                  <Badge variant={statusVariants[project.status]} dot>
                    {project.status}
                  </Badge>
                </Cell>
              </Row>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <output
        aria-live="polite"
        className="text-sm text-muted-foreground tabular-nums"
      >
        {count === 0 ? "No projects selected" : `${count} selected`}
      </output>
    </div>
  );
}
