"use client";

import { useState } from "react";
import { Bold, Italic, Underline } from "reicon-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";
import { Toolbar } from "@/components/ui/toolbar";

export function ToolbarDemo() {
  const [styles, setStyles] = useState(new Set(["bold"]));
  const [block, setBlock] = useState("body");
  return (
    <div className="flex w-full max-w-lg items-start gap-3">
      <Toolbar orientation="vertical" aria-label="Block type">
        <ToggleButtonGroup
          aria-label="Block"
          selectionMode="single"
          disallowEmptySelection
          selectedKeys={new Set([block])}
          onSelectionChange={(keys) => {
            const next = [...keys][0];
            if (next) setBlock(String(next));
          }}
        >
          <ToggleButton id="body" variant="segmented">
            Body
          </ToggleButton>
          <ToggleButton id="quote" variant="segmented">
            Quote
          </ToggleButton>
        </ToggleButtonGroup>
      </Toolbar>
      <div className="grid min-w-0 flex-1 justify-items-start gap-3">
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
              <Bold size={16} aria-hidden="true" />
            </ToggleButton>
            <ToggleButton id="italic" variant="segmented" aria-label="Italic">
              <Italic size={16} aria-hidden="true" />
            </ToggleButton>
            <ToggleButton
              id="underline"
              variant="segmented"
              aria-label="Underline"
            >
              <Underline size={16} aria-hidden="true" />
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
        <div className="w-full rounded-lg border border-border/70 bg-card px-4 py-3 text-sm leading-6 shadow-[var(--shadow-card)]">
          <p
            style={{
              fontWeight: styles.has("bold") ? 700 : 400,
              fontStyle: styles.has("italic") ? "italic" : "normal",
              textDecoration: styles.has("underline") ? "underline" : "none",
            }}
          >
            {block === "quote"
              ? "“Make something worth reading.”"
              : "Make something worth reading."}
          </p>
        </div>
      </div>
    </div>
  );
}
