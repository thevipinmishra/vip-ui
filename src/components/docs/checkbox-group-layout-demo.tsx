"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  CheckboxGroup,
  CheckboxGroupError,
  CheckboxGroupItems,
  CheckboxGroupLabel,
} from "@/components/ui/checkbox-group";

const addOns = [
  {
    id: "backups",
    label: "Daily backups",
    description: "30 days of snapshots.",
  },
  {
    id: "support",
    label: "Priority support",
    description: "Replies in 1 hour.",
  },
  { id: "sso", label: "Single sign-on", description: "SAML and OIDC." },
  { id: "audit", label: "Audit log", description: "Export every event." },
];

export function CheckboxGroupLayoutDemo() {
  return (
    <CheckboxGroup defaultValue={["backups"]} className="w-full max-w-md">
      <CheckboxGroupLabel>Add-ons</CheckboxGroupLabel>
      <CheckboxGroupItems className="grid gap-2 sm:grid-cols-2">
        {addOns.map((addOn) => (
          <Checkbox
            key={addOn.id}
            value={addOn.id}
            variant="card"
            description={addOn.description}
          >
            {addOn.label}
          </Checkbox>
        ))}
      </CheckboxGroupItems>
      <CheckboxGroupError />
    </CheckboxGroup>
  );
}
