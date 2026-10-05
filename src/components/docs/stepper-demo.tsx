"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "reicon-react";
import { Button } from "@/components/ui/button";
import { Stepper } from "@/components/ui/stepper";

const steps = [
  { label: "Details", description: "Add the essentials" },
  { label: "Review", description: "Check your choices" },
  { label: "Complete", description: "Ready to submit" },
];

export function StepperDemo() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="grid w-full max-w-xl gap-5 rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)] sm:p-6">
      <Stepper
        steps={steps}
        currentStep={currentStep}
        aria-label="Project setup progress"
      />
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        <output aria-live="polite" className="text-sm text-muted-foreground">
          Step {currentStep + 1} of {steps.length}: {steps[currentStep].label}
        </output>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            isDisabled={currentStep === 0}
            onPress={() => setCurrentStep((step) => step - 1)}
          >
            <ChevronLeft size={16} aria-hidden="true" /> Back
          </Button>
          <Button
            size="sm"
            isDisabled={currentStep === steps.length - 1}
            onPress={() => setCurrentStep((step) => step + 1)}
          >
            Next <ChevronRight size={16} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
}
