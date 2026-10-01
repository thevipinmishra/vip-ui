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
    <div className="w-full max-w-sm rounded-xl bg-card p-5 shadow-[var(--shadow-card)] ring-1 ring-border/70 sm:p-6">
      <p className="text-sm font-semibold">Privacy</p>
      <p className="mt-1 text-xs text-muted-foreground">
        Changes are reflected immediately.
      </p>
      <div className="mt-4 grid divide-y divide-border">
        <Switch
          checked={publicProfile}
          onCheckedChange={setPublicProfile}
          className="py-3"
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
          className="py-3"
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
      </div>
      <output className="mt-3 block text-xs text-muted-foreground">
        Profile is {publicProfile ? "public" : "private"}; activity is{" "}
        {activity ? "visible" : "hidden"}.
      </output>
    </div>
  );
}
