"use client";

import { RatingInput } from "@/components/ui/rating-input";

export function RatingInputReadOnlyDemo() {
  return (
    <RatingInput
      label="Average rating"
      defaultValue={4}
      isReadOnly
      className="w-full max-w-sm"
    />
  );
}
