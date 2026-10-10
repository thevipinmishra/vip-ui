"use client";

import { Switch } from "@/components/ui/switch";

export function SwitchDisabledDemo() {
  return (
    <div className="grid gap-1">
      <Switch isDisabled defaultChecked>
        Security alerts
      </Switch>
      <Switch isDisabled>Beta features</Switch>
    </div>
  );
}
