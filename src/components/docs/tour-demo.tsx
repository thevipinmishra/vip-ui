"use client";

import { PlusIcon } from "@phosphor-icons/react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SearchField } from "@/components/ui/search-field";
import { Tour, type TourStep, TourTarget, useTour } from "@/components/ui/tour";

const steps: TourStep[] = [
  {
    id: "search",
    title: "Find any project",
    description: "Search by name, client, or tag. Results appear as you type.",
  },
  {
    id: "new",
    title: "Start a project",
    description: "Create the project and invite the team in the same step.",
  },
  {
    id: "account",
    title: "Your account",
    description: "Switch workspaces, set a status, or open billing.",
    placement: "bottom end",
  },
];

export function TourDemo() {
  return (
    <Tour steps={steps}>
      <div className="grid w-full max-w-md gap-3">
        <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card p-3 shadow-(--shadow-card)">
          <TourTarget id="search">
            <SearchField
              size="sm"
              aria-label="Search projects"
              placeholder="Search projects"
              className="min-w-0 flex-1"
            />
          </TourTarget>
          <TourTarget id="new">
            <Button size="sm">
              <PlusIcon aria-hidden="true" />
              New project
            </Button>
          </TourTarget>
          <TourTarget id="account">
            <Button
              variant="ghost"
              size="sm"
              iconOnly
              aria-label="Account menu for MC"
            >
              <Avatar name="Maya Chen" size="xs" />
            </Button>
          </TourTarget>
        </div>
        <TourLauncher />
      </div>
    </Tour>
  );
}

function TourLauncher() {
  const tour = useTour();
  return (
    <Button
      variant="outline"
      className="justify-self-start"
      onPress={() => tour.start()}
    >
      Start tour
    </Button>
  );
}
