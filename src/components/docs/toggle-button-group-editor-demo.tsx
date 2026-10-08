"use client";

import { useState } from "react";
import type { Key } from "react-aria-components";
import { Bold, Italic, Underline } from "reicon-react";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";

export function ToggleButtonGroupEditorDemo() {
  const [selected, setSelected] = useState(new Set<Key>(["bold"]));

  return (
    <div className="grid w-full max-w-md gap-5">
      <ToggleButtonGroup
        aria-label="Text styles"
        selectionMode="multiple"
        selectedKeys={selected}
        onSelectionChange={setSelected}
      >
        <ToggleButton id="bold" variant="segmented" aria-label="Bold">
          <Bold size={17} aria-hidden="true" />
        </ToggleButton>
        <ToggleButton id="italic" variant="segmented" aria-label="Italic">
          <Italic size={17} aria-hidden="true" />
        </ToggleButton>
        <ToggleButton id="underline" variant="segmented" aria-label="Underline">
          <Underline size={17} aria-hidden="true" />
        </ToggleButton>
      </ToggleButtonGroup>
      <div className="rounded-lg border border-border p-4 text-sm">
        <p className="text-xs text-muted-foreground">Selection preview</p>
        <p
          className={`mt-2 ${selected.has("bold") ? "font-bold" : ""} ${selected.has("italic") ? "italic" : ""} ${selected.has("underline") ? "underline" : ""}`}
        >
          The quick brown fox jumps over the lazy dog.
        </p>
      </div>
    </div>
  );
}
