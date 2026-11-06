"use client";

import { RatingInput } from "@/components/ui/rating-input";

export function RatingInputReadOnlyDemo() {
  return (
    <RatingInput
      label="Average rating"
      description="4.6 out of 5 from 128 reviews."
      value={4.6}
      isReadOnly
      className="w-full max-w-sm"
    />
  );
}
