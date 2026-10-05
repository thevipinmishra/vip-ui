"use client";

import { useState } from "react";
import { Pin, PinOff } from "reicon-react";
import { Badge } from "@/components/ui/badge";
import { ToggleButton } from "@/components/ui/toggle-button";

const projects = [
  { id: "studio", name: "Studio North", owner: "Maya Chen", tasks: 12 },
  { id: "atlas", name: "Atlas", owner: "Sam Rivera", tasks: 8 },
  { id: "field", name: "Field Notes", owner: "Jo Park", tasks: 3 },
];

export function ToggleButtonProjectsDemo() {
  const [pinned, setPinned] = useState(new Set(["atlas"]));
  return (
    <div className="w-full max-w-md rounded-xl bg-card p-5 ring-1 ring-border/70">
      <h4 className="text-sm font-semibold">Projects</h4>
      <ul className="mt-3 divide-y divide-border">
        {projects.map((project) => (
          <li
            key={project.id}
            className="flex items-center justify-between gap-3 py-3"
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium">{project.name}</span>
                {pinned.has(project.id) && (
                  <Badge variant="accent">Pinned</Badge>
                )}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {project.owner} · {project.tasks} open tasks
              </p>
            </div>
            <ToggleButton
              variant="ghost"
              isSelected={pinned.has(project.id)}
              onChange={(selected) =>
                setPinned((current) => {
                  const next = new Set(current);
                  if (selected) next.add(project.id);
                  else next.delete(project.id);
                  return next;
                })
              }
              aria-label={`${pinned.has(project.id) ? "Unpin" : "Pin"} ${project.name}`}
            >
              {pinned.has(project.id) ? (
                <Pin size={16} aria-hidden="true" />
              ) : (
                <PinOff size={16} aria-hidden="true" />
              )}
              <span className="hidden sm:inline">
                {pinned.has(project.id) ? "Unpin" : "Pin"}
              </span>
            </ToggleButton>
          </li>
        ))}
      </ul>
    </div>
  );
}
