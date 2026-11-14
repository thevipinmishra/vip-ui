"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LayoutMorph } from "@/components/ui/layout-morph";

const updates = [
  "Draft saved. Only you can see it.",
  "Published. Subscribers get it in the next digest, and search engines index it within a day.",
];

export function LayoutMorphDemo() {
  const [index, setIndex] = useState(0);

  return (
    <div className="grid w-full max-w-sm gap-3">
      <LayoutMorph
        aria-live="polite"
        contentKey={index}
        className="rounded-xl border border-border bg-card px-5 py-4 text-sm leading-6 shadow-(--shadow-card)"
      >
        {updates[index]}
      </LayoutMorph>
      <div>
        <Button
          size="sm"
          variant="secondary"
          onPress={() => setIndex((value) => (value + 1) % updates.length)}
        >
          {index === 0 ? "Publish" : "Edit draft"}
        </Button>
      </div>
    </div>
  );
}
