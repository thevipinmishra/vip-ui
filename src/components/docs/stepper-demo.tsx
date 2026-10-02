"use client";

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
    <div className="grid w-full max-w-xl gap-6">
      <Stepper
        steps={steps}
        currentStep={currentStep}
        aria-label="Project setup progress"
      />
      <div className="flex justify-end">
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            isDisabled={currentStep === 0}
            onPress={() => setCurrentStep((step) => step - 1)}
          >
            Back
          </Button>
          <Button
            size="sm"
            isDisabled={currentStep === steps.length - 1}
            onPress={() => setCurrentStep((step) => step + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
