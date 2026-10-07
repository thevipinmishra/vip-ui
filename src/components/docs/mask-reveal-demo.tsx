"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MaskReveal } from "@/components/ui/mask-reveal";

export function MaskRevealDemo() {
  const [replay, setReplay] = useState(0);

  return (
    <div className="grid w-full max-w-sm gap-4">
      <MaskReveal key={replay} trigger="mount" direction="left">
        <div className="relative isolate grid min-h-44 content-between overflow-hidden rounded-xl bg-primary p-6 text-primary-foreground">
          <span
            aria-hidden="true"
            className="absolute -top-16 -right-4 size-52 rounded-full border-[36px] border-current opacity-25"
          />
          <p className="relative self-end text-3xl font-semibold tracking-[-0.05em]">
            Shape and light
          </p>
        </div>
      </MaskReveal>
      <div>
        <Button
          size="sm"
          variant="secondary"
          onPress={() => setReplay((value) => value + 1)}
        >
          Replay
        </Button>
      </div>
    </div>
  );
}
