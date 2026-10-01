"use client";

import {
  PreviewTrigger as AriaPreviewTrigger,
  type PreviewTriggerProps,
} from "react-aria-components";

// Pair with a focusable React Aria trigger and a Popover containing the preview.
export function PreviewTrigger(props: PreviewTriggerProps) {
  return <AriaPreviewTrigger {...props} />;
}
