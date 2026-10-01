"use client";

import { Badge } from "@/components/ui/badge";
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
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
  return (
    <div className="w-full max-w-2xl overflow-x-auto rounded-lg border border-border bg-card shadow-[var(--shadow-card)]">
      <Table aria-label="Projects" selectionMode="single">
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
    </div>
  );
}
