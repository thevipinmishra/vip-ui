"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

export function CheckboxDemo() {
  const [updates, setUpdates] = useState(true);
  const [digest, setDigest] = useState(false);
  const selected = Number(updates) + Number(digest);
  const email =
    selected === 2 ? true : selected === 0 ? false : "indeterminate";

  return (
    <div className="grid gap-1">
      <Checkbox
        checked={email}
        onCheckedChange={(checked) => {
          setUpdates(checked);
          setDigest(checked);
        }}
      >
        Email notifications
      </Checkbox>
      <div className="grid gap-1 ps-8">
        <Checkbox checked={updates} onCheckedChange={setUpdates}>
          Product updates
        </Checkbox>
        <Checkbox checked={digest} onCheckedChange={setDigest}>
          Weekly digest
        </Checkbox>
      </div>
    </div>
  );
}
