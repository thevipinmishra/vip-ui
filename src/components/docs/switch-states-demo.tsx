"use client";

import { Switch } from "@/components/ui/switch";

export function SwitchStatesDemo() {
  return (
    <div className="grid w-full max-w-sm gap-3">
      <Switch defaultChecked description="Others can find your profile.">
        Public profile
      </Switch>
      <Switch isDisabled checked description="Managed by your workspace.">
        Security alerts
      </Switch>
    </div>
  );
}
