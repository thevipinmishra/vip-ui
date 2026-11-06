"use client";

import { RatingInput } from "@/components/ui/rating-input";

export function RatingInputSizesDemo() {
  return (
    <div className="grid gap-4">
      <RatingInput size="sm" aria-label="Small rating" defaultValue={3} />
      <RatingInput aria-label="Medium rating" defaultValue={3} />
      <RatingInput size="lg" aria-label="Large rating" defaultValue={3} />
    </div>
  );
}
