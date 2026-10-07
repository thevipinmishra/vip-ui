"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LayoutMorph } from "@/components/ui/layout-morph";

const captions = [
  { title: "First light", detail: "The wall before the room wakes up." },
  {
    title: "After the rain",
    detail:
      "A longer note about what happens when color returns to the street. The container grows without stretching the type inside it.",
  },
];

export function LayoutMorphDemo() {
  const [index, setIndex] = useState(0);

  return (
    <div className="grid w-full max-w-sm gap-4">
      <LayoutMorph
        contentKey={index}
        className="rounded-xl border border-border bg-card px-6 py-5 shadow-[var(--shadow-card)]"
      >
        <p className="text-xl font-semibold tracking-tight">
          {captions[index].title}
        </p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {captions[index].detail}
        </p>
      </LayoutMorph>
      <div>
        <Button
          size="sm"
          variant="secondary"
          onPress={() => setIndex((value) => (value + 1) % captions.length)}
        >
          Next caption
        </Button>
      </div>
    </div>
  );
}
