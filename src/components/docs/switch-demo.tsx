"use client";

import { Badge } from "@/components/ui/badge";
import {
  SwitchButton,
  SwitchControl,
  SwitchDescription,
  SwitchField,
  SwitchLabel,
  SwitchThumb,
} from "@/components/ui/switch";

const settings = [
  {
    id: "profile",
    label: "Public profile",
    description: "Others can find your profile.",
    isNew: false,
    on: true,
  },
  {
    id: "activity",
    label: "Show activity",
    description: "Show recent work on your profile.",
    isNew: true,
    on: false,
  },
];

export function SwitchDemo() {
  return (
    <div className="w-full max-w-sm divide-y divide-border rounded-xl border border-border bg-card px-4 shadow-(--shadow-card)">
      {settings.map((setting) => (
        <SwitchField
          key={setting.id}
          defaultSelected={setting.on}
          className="w-full py-3"
        >
          <SwitchButton>
            <SwitchLabel className="flex flex-wrap items-center gap-2">
              {setting.label}
              {setting.isNew && (
                <Badge variant="accent" className="min-h-5 py-0">
                  New
                </Badge>
              )}
            </SwitchLabel>
            <SwitchControl>
              <SwitchThumb />
            </SwitchControl>
          </SwitchButton>
          <SwitchDescription>{setting.description}</SwitchDescription>
        </SwitchField>
      ))}
    </div>
  );
}
