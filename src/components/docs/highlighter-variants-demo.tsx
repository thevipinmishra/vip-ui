"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Highlighter } from "@/components/ui/highlighter";

export function HighlighterVariantsDemo() {
  const [run, setRun] = useState(0);

  return (
    <div className="grid w-full max-w-md gap-6">
      <div key={run} className="grid gap-4 text-lg leading-8 tracking-tight">
        <p>
          Every plan includes <Highlighter>unlimited guests</Highlighter>.
        </p>
        <p>
          Reviews take <Highlighter variant="underline">minutes</Highlighter>,
          not days.
        </p>
        <p>
          Start with <Highlighter variant="circle">one</Highlighter> template.
        </p>
      </div>
      <div>
        <Button
          size="sm"
          variant="secondary"
          onPress={() => setRun((current) => current + 1)}
        >
          Replay
        </Button>
      </div>
    </div>
  );
}
