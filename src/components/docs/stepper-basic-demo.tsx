import { Stepper } from "@/components/ui/stepper";

export function StepperBasicDemo() {
  return (
    <Stepper
      steps={[{ label: "Details" }, { label: "Review" }, { label: "Complete" }]}
      currentStep={1}
      aria-label="Project setup progress"
      className="w-full max-w-xl"
    />
  );
}
