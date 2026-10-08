"use client";

import { RatingInput } from "@/components/ui/rating-input";

export function RatingInputDemo() {
  return (
    <RatingInput
      label="Rate this item"
      name="rating"
      defaultValue={3}
      className="w-full max-w-sm"
    />
  );
}
