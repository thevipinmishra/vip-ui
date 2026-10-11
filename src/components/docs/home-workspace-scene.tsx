"use client";

import { CheckIcon } from "@phosphor-icons/react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectError,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";

const workspaces = [
  { id: "billing", name: "Billing operations" },
  { id: "repository", name: "Repository desk" },
  { id: "studio", name: "Asset studio" },
];

export function HomeWorkspaceScene() {
  const [workspace, setWorkspace] = useState("");
  const selected = workspaces.find((item) => item.id === workspace);

  return (
    <div className="flex w-full min-w-0 max-w-sm flex-col gap-4">
      <Select
        value={workspace}
        onValueChange={setWorkspace}
        isInvalid={!workspace}
      >
        <SelectLabel>Workspace</SelectLabel>
        <SelectTrigger />
        <SelectError>Choose a workspace to continue.</SelectError>
        <SelectContent>
          {workspaces.map((item) => (
            <SelectItem key={item.id} id={item.id}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p
        aria-live="polite"
        className="flex min-h-10 items-start gap-2 text-sm text-muted-foreground"
      >
        {selected ? (
          <>
            <CheckIcon
              size={16}
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-success-foreground"
            />
            <span>
              <span className="font-medium text-foreground">
                {selected.name}
              </span>{" "}
              selected. The error cleared.
            </span>
          </>
        ) : (
          "No workspace selected yet."
        )}
      </p>
    </div>
  );
}
