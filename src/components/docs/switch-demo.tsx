"use client";

import { useState } from "react";
import {
  Switch,
  SwitchControl,
  SwitchDescription,
  SwitchLabel,
  SwitchThumb,
} from "@/components/ui/switch";

export function SwitchDemo() {
  const [publicProfile, setPublicProfile] = useState(true);
  const [activity, setActivity] = useState(false);
  return (
    <div className="grid w-full max-w-sm gap-3">
      <Switch
        checked={publicProfile}
        onCheckedChange={setPublicProfile}
        className="rounded-xl border border-border bg-card px-4 py-2 shadow-[var(--shadow-card)]"
      >
        <span>
          <SwitchLabel>Public profile</SwitchLabel>
          <SwitchDescription>Others can find your profile.</SwitchDescription>
        </span>
        <SwitchControl>
          <SwitchThumb />
        </SwitchControl>
      </Switch>
      <Switch
        checked={activity}
        onCheckedChange={setActivity}
        className="rounded-xl border border-border bg-card px-4 py-2 shadow-[var(--shadow-card)]"
      >
        <span>
          <SwitchLabel>Show activity</SwitchLabel>
          <SwitchDescription>
            Show recent work on your profile.
          </SwitchDescription>
        </span>
        <SwitchControl>
          <SwitchThumb />
        </SwitchControl>
      </Switch>
      <Switch
        isDisabled
        checked
        className="rounded-xl border border-border bg-card px-4 py-2 shadow-[var(--shadow-card)]"
      >
        <span>
          <SwitchLabel>Security alerts</SwitchLabel>
          <SwitchDescription>Managed by your workspace.</SwitchDescription>
        </span>
        <SwitchControl>
          <SwitchThumb />
        </SwitchControl>
      </Switch>
    </div>
  );
}
