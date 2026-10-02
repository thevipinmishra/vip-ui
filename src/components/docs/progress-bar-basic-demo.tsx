"use client";

import { ProgressBar } from "@/components/ui/progress-bar";

export function ProgressBarBasicDemo() {
  return (
    <ProgressBar label="Uploading assets" value={40} className="max-w-sm" />
  );
}
