"use client";

import { Switch } from "@/components/ui/switch";

export function SwitchDisabledDemo() {
  return (
    <div className="grid w-full max-w-sm">
      <Switch isDisabled defaultSelected>
        Security alerts
      </Switch>
      <Switch isDisabled>Beta features</Switch>
    </div>
  );
}
