"use client";

import { Radio, RadioGroup } from "@/components/ui/radio-group";

export function RadioGroupDescriptionDemo() {
  return (
    <RadioGroup
      label="Notifications"
      defaultValue="mentions"
      className="w-full max-w-sm"
    >
      <Radio value="all" description="Every comment, change, and mention.">
        All activity
      </Radio>
      <Radio value="mentions" description="Only when someone mentions you.">
        Mentions only
      </Radio>
      <Radio value="none" description="No notifications.">
        None
      </Radio>
    </RadioGroup>
  );
}
