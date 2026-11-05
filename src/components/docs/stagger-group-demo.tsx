"use client";

import { useState } from "react";
import { StaggerGroup, StaggerItem } from "@/components/ui/stagger-group";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";

type Status = "all" | "active" | "done";

const projects = [
  { name: "Atlas", status: "active" },
  { name: "Beacon", status: "done" },
  { name: "Cascade", status: "active" },
  { name: "Drift", status: "done" },
] as const;

const filters: { id: Status; label: string }[] = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "done", label: "Done" },
];

export function StaggerGroupDemo() {
  const [status, setStatus] = useState<Status>("all");
  const visible = projects.filter(
    (project) => status === "all" || project.status === status,
  );

  return (
    <div className="grid w-full max-w-sm gap-3">
      <ToggleButtonGroup
        aria-label="Project status"
        selectionMode="single"
        disallowEmptySelection
        selectedKeys={[status]}
        onSelectionChange={(keys) => {
          const [key] = keys;
          if (key === "all" || key === "active" || key === "done")
            setStatus(key);
        }}
      >
        {filters.map(({ id, label }) => (
          <ToggleButton key={id} id={id} variant="segmented">
            {label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <StaggerGroup
        key={status}
        as="ul"
        aria-label="Projects"
        trigger="mount"
        className="grid gap-2"
      >
        {visible.map((project) => (
          <StaggerItem
            as="li"
            key={project.name}
            className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card px-3 py-2 text-sm"
          >
            <span className="min-w-0 font-medium">{project.name}</span>
            <span className="text-xs capitalize text-muted-foreground">
              {project.status}
            </span>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  );
}
