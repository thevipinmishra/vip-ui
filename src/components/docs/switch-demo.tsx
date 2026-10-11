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
        className="w-full rounded-xl border border-border bg-card px-4 py-2 shadow-[var(--shadow-card)]"
      >
        <span className="min-w-0">
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
        className="w-full rounded-xl border border-border bg-card px-4 py-2 shadow-[var(--shadow-card)]"
      >
        <span className="min-w-0">
          <SwitchLabel>Show activity</SwitchLabel>
          <SwitchDescription>
            Show recent work on your profile.
          </SwitchDescription>
        </span>
        <SwitchControl>
          <SwitchThumb />
        </SwitchControl>
      </Switch>
    </div>
  );
}
