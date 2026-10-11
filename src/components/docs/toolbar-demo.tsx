"use client";

import {
  TextBIcon,
  TextItalicIcon,
  TextUnderlineIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";
import { Toolbar } from "@/components/ui/toolbar";

export function ToolbarDemo() {
  const [styles, setStyles] = useState(new Set(["bold"]));

  return (
    <div className="grid w-full max-w-sm justify-items-start gap-3">
      <Toolbar aria-label="Text formatting">
        <ToggleButtonGroup
          aria-label="Text style"
          selectionMode="multiple"
          selectedKeys={styles}
          onSelectionChange={(keys) =>
            setStyles(new Set([...keys].map(String)))
          }
        >
          <ToggleButton id="bold" variant="segmented" aria-label="Bold">
            <TextBIcon size={16} aria-hidden="true" />
          </ToggleButton>
          <ToggleButton id="italic" variant="segmented" aria-label="Italic">
            <TextItalicIcon size={16} aria-hidden="true" />
          </ToggleButton>
          <ToggleButton
            id="underline"
            variant="segmented"
            aria-label="Underline"
          >
            <TextUnderlineIcon size={16} aria-hidden="true" />
          </ToggleButton>
        </ToggleButtonGroup>
        <Separator orientation="vertical" className="h-6 self-center" />
        <Button
          variant="ghost"
          size="sm"
          isDisabled={styles.size === 0}
          onPress={() => setStyles(new Set())}
        >
          Clear
        </Button>
      </Toolbar>
      <p
        className="w-full rounded-lg border border-border/70 bg-card px-4 py-3 text-sm leading-6 shadow-[var(--shadow-card)]"
        style={{
          fontWeight: styles.has("bold") ? 700 : 400,
          fontStyle: styles.has("italic") ? "italic" : "normal",
          textDecoration: styles.has("underline") ? "underline" : "none",
        }}
      >
        Make something worth reading.
      </p>
    </div>
  );
}
