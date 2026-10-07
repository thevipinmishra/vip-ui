"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MaskReveal } from "@/components/ui/mask-reveal";

const directions = [
  { id: "left", label: "From the left" },
  { id: "right", label: "From the right" },
  { id: "up", label: "From above" },
  { id: "down", label: "From below" },
] as const;

type Direction = (typeof directions)[number]["id"];

export function MaskRevealDirectionsDemo() {
  const [direction, setDirection] = useState<Direction>("left");
  const [replay, setReplay] = useState(0);

  return (
    <div className="grid w-full max-w-sm gap-4">
      <MaskReveal
        key={`${direction}-${replay}`}
        trigger="mount"
        direction={direction}
      >
        <div className="relative isolate grid min-h-44 content-between overflow-hidden rounded-xl bg-primary p-6 text-primary-foreground">
          <span
            aria-hidden="true"
            className="absolute -top-16 -right-4 size-52 rounded-full border-[36px] border-current opacity-25"
          />
          <p className="relative text-xs font-medium tracking-[0.14em] uppercase">
            Campaign still
          </p>
          <p className="relative self-end text-3xl font-semibold tracking-[-0.05em]">
            Shape and light
          </p>
        </div>
      </MaskReveal>
      <div className="flex flex-wrap gap-2">
        {directions.map((item) => (
          <Button
            key={item.id}
            size="sm"
            variant={direction === item.id ? "default" : "outline"}
            onPress={() => {
              setDirection(item.id);
              setReplay((value) => value + 1);
            }}
          >
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
