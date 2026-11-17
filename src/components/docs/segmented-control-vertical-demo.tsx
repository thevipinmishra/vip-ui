"use client";

import {
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import {
  SegmentedControl,
  SegmentedControlItem,
} from "@/components/ui/segmented-control";

const alignments = {
  left: "text-start",
  center: "text-center",
  right: "text-end",
} as const;

type Alignment = keyof typeof alignments;

export function SegmentedControlVerticalDemo() {
  const [alignment, setAlignment] = useState<Alignment>("left");

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-5 sm:flex-row sm:items-start">
      <SegmentedControl
        aria-label="Text alignment"
        orientation="vertical"
        value={alignment}
        onChange={(value) => setAlignment(value as Alignment)}
      >
        <SegmentedControlItem className="justify-start" value="left">
          <TextAlignLeftIcon aria-hidden="true" />
          Left
        </SegmentedControlItem>
        <SegmentedControlItem className="justify-start" value="center">
          <TextAlignCenterIcon aria-hidden="true" />
          Center
        </SegmentedControlItem>
        <SegmentedControlItem className="justify-start" value="right">
          <TextAlignRightIcon aria-hidden="true" />
          Right
        </SegmentedControlItem>
      </SegmentedControl>
      <p
        className={`min-w-0 flex-1 text-sm leading-6 ${alignments[alignment]}`}
      >
        Studio North is due October 18. The final review covers the checkout,
        the confirmation email, and the delivery window.
      </p>
    </div>
  );
}
