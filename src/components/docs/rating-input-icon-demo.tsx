"use client";

import { HeartIcon } from "@phosphor-icons/react";
import { RatingInput } from "@/components/ui/rating-input";

export function RatingInputIconDemo() {
  return (
    <RatingInput
      label="How much did you enjoy it?"
      icon={HeartIcon}
      defaultValue={4}
      className="w-full max-w-sm"
    />
  );
}
