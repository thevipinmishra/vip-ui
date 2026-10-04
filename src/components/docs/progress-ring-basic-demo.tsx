"use client";

import { ProgressRing } from "@/components/ui/progress-ring";

export function ProgressRingBasicDemo() {
  return <ProgressRing label="Uploading assets" value={65} size="lg" />;
}
