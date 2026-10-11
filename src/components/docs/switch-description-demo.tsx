"use client";

import { Switch } from "@/components/ui/switch";

export function SwitchDescriptionDemo() {
  return (
    <Switch description="Others can find your profile." className="max-w-sm">
      Public profile
    </Switch>
  );
}
