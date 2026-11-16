"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Stepper } from "@/components/ui/stepper";
import { Tour, type TourStep, TourTarget, useTour } from "@/components/ui/tour";

const steps: TourStep[] = [
  {
    id: "inbox",
    title: "One inbox",
    description: "Messages, mentions, and review requests arrive here.",
  },
  {
    id: "filters",
    title: "Save a view",
    description: "Keep the filters you use each morning as a saved view.",
    placement: "bottom end",
  },
  {
    id: "digest",
    title: "A daily digest",
    description: "Choose what the digest covers and when it arrives.",
  },
];

const progress = steps.map((step) => ({ label: step.title }));

export function TourControlledDemo() {
  const [step, setStep] = useState(0);

  return (
    <Tour steps={steps} step={step} onStepChange={setStep}>
      <div className="grid w-full max-w-md gap-4">
        <Stepper
          steps={progress}
          currentStep={step}
          aria-label="Tour steps"
          className="border border-border bg-card"
        />
        <div className="grid gap-2 rounded-xl border border-border bg-card p-3 shadow-(--shadow-card)">
          <TourTarget id="inbox">
            <div className="rounded-lg bg-muted/50 px-3 py-2 text-sm">
              Inbox · 4 unread
            </div>
          </TourTarget>
          <div className="flex flex-wrap gap-2">
            <TourTarget id="filters">
              <Button variant="outline" size="sm">
                Saved views
              </Button>
            </TourTarget>
            <TourTarget id="digest">
              <Button variant="outline" size="sm">
                Daily digest
              </Button>
            </TourTarget>
          </div>
        </div>
        <Launcher />
      </div>
    </Tour>
  );
}

function Launcher() {
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
