"use client";

import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tour, type TourStep, TourTarget, useTour } from "@/components/ui/tour";

const steps: TourStep[] = [
  {
    id: "draft",
    title: "Finish the draft",
    description:
      "Add the summary and the cover image. The checklist updates as you go.",
    placement: "end",
  },
  {
    id: "review",
    title: "Ask for a review",
    description: "Send the draft to Ana. Comments appear on the right.",
    placement: "end",
  },
  {
    id: "publish",
    title: "Publish the page",
    description:
      "The page goes live on your workspace address. You can undo it.",
    placement: "end",
  },
];

const tasks = [
  { id: "draft", title: "Draft the launch page", meta: "Maya Chen" },
  { id: "review", title: "Review with Ana Ruiz", meta: "Due Thursday" },
  { id: "publish", title: "Publish to fieldnote.app", meta: "Draft" },
];

export function TourNoSpotlightDemo() {
  return (
    <Tour steps={steps} spotlight={false}>
      <div className="grid w-full max-w-md gap-3">
        <div className="grid gap-0.5 rounded-xl border border-border bg-card p-3 shadow-(--shadow-card)">
          {tasks.map((task) => (
            <TourTarget key={task.id} id={task.id}>
              <div className="flex items-center justify-between gap-3 rounded-lg px-1 py-1.5">
                <Checkbox>{task.title}</Checkbox>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {task.meta}
                </span>
              </div>
            </TourTarget>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Launcher />
          <Button variant="minimal" size="sm">
            Open the board
            <ArrowUpRightIcon data-icon="inline-end" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </Tour>
  );
}

function Launcher() {
  const tour = useTour();
  return (
    <Button variant="outline" onPress={() => tour.start()}>
      Start tour
    </Button>
  );
}
