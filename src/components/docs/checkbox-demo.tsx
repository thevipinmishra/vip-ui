"use client";

import { useState } from "react";
import {
  Checkbox,
  CheckboxDescription,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/ui/checkbox";

export function CheckboxDemo() {
  const [email, setEmail] = useState(true);
  const [digest, setDigest] = useState(false);
  return (
    <div className="w-full max-w-sm rounded-xl bg-card p-5 shadow-[var(--shadow-card)] ring-1 ring-border/70 sm:p-6">
      <p className="text-sm font-semibold">Notifications</p>
      <p className="mt-1 text-xs text-muted-foreground">
        Choose what reaches your inbox.
      </p>
      <div className="mt-5 grid gap-3">
        <Checkbox checked={email} onCheckedChange={setEmail}>
          <CheckboxIndicator />
          <span className="pt-0.5">
            <CheckboxLabel>Product updates</CheckboxLabel>
            <CheckboxDescription>
              A note when something needs your attention.
            </CheckboxDescription>
          </span>
        </Checkbox>
        <Checkbox checked={digest} onCheckedChange={setDigest}>
          <CheckboxIndicator />
          <span className="pt-0.5">
            <CheckboxLabel>Weekly digest</CheckboxLabel>
            <CheckboxDescription>
              A short summary every Friday.
            </CheckboxDescription>
          </span>
        </Checkbox>
        <Checkbox isDisabled>
          <CheckboxIndicator />
          <span className="pt-0.5">
            <CheckboxLabel>Security alerts</CheckboxLabel>
            <CheckboxDescription>
              Managed by your workspace administrator.
            </CheckboxDescription>
          </span>
        </Checkbox>
      </div>
    </div>
  );
}
