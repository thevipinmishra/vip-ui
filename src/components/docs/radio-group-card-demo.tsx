"use client";

import {
  RadioButton,
  RadioDescription,
  RadioField,
  RadioGroup,
  RadioGroupItems,
  RadioGroupLabel,
  RadioIndicator,
  RadioLabel,
} from "@/components/ui/radio-group";

const plans = [
  { id: "hobby", name: "Hobby", price: 0, description: "One project." },
  { id: "pro", name: "Pro", price: 20, description: "Unlimited projects." },
  { id: "team", name: "Team", price: 50, description: "Shared billing." },
];

export function RadioGroupCardDemo() {
  return (
    <RadioGroup defaultValue="pro" className="w-full max-w-sm">
      <RadioGroupLabel>Plan</RadioGroupLabel>
      <RadioGroupItems className="gap-2">
        {plans.map((plan) => (
          <RadioField key={plan.id} value={plan.id} variant="card">
            <RadioButton>
              <RadioIndicator />
              <RadioLabel className="flex-1">{plan.name}</RadioLabel>
              <span className="font-semibold tabular-nums">
                ${plan.price}
                <span
                  aria-hidden="true"
                  className="font-normal text-muted-foreground"
                >
                  /mo
                </span>
                <span className="sr-only"> per month</span>
              </span>
            </RadioButton>
            <RadioDescription>{plan.description}</RadioDescription>
          </RadioField>
        ))}
      </RadioGroupItems>
    </RadioGroup>
  );
}
