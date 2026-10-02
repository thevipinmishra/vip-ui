"use client";

import { useState } from "react";
import { Minus, Plus } from "reicon-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

export function ButtonGroupDemo() {
  const [zoom, setZoom] = useState(100);

  return (
    <div className="flex w-full max-w-sm flex-col items-start gap-5">
      <div className="flex flex-wrap items-center gap-3">
        <ButtonGroup aria-label="Preview zoom">
          <Button
            size="icon"
            variant="ghost"
            aria-label="Zoom out"
            isDisabled={zoom === 75}
            onPress={() => setZoom((value) => Math.max(75, value - 25))}
          >
            <Minus size={17} aria-hidden="true" />
          </Button>
          <output
            aria-label="Zoom level"
            className="min-w-14 px-1 text-center text-sm font-medium tabular-nums"
          >
            {zoom}%
          </output>
          <Button
            size="icon"
            variant="ghost"
            aria-label="Zoom in"
            isDisabled={zoom === 150}
            onPress={() => setZoom((value) => Math.min(150, value + 25))}
          >
            <Plus size={17} aria-hidden="true" />
          </Button>
        </ButtonGroup>
        <Button
          size="sm"
          variant="secondary"
          isDisabled={zoom === 100}
          onPress={() => setZoom(100)}
        >
          Reset
        </Button>
      </div>
      <p
        className="font-semibold text-foreground"
        style={{ fontSize: `${zoom / 100}rem` }}
      >
        Project overview
      </p>
    </div>
  );
}
