"use client";

import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import { useState } from "react";
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
    <div className="grid w-full max-w-xl gap-5">
      <Stepper
        steps={steps}
        currentStep={currentStep}
        aria-label="Project setup progress"
      />
      <div className="flex justify-end gap-2 border-t border-border pt-4">
        <Button
          size="sm"
          variant="outline"
          isDisabled={currentStep === 0}
          onPress={() => setCurrentStep((step) => step - 1)}
        >
          <CaretLeftIcon size={16} aria-hidden="true" /> Back
        </Button>
        <Button
          size="sm"
          isDisabled={currentStep === steps.length - 1}
          onPress={() => setCurrentStep((step) => step + 1)}
        >
          Next <CaretRightIcon size={16} aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
