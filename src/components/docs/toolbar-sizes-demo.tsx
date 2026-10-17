"use client";

import {
  ArrowClockwiseIcon,
  ArrowCounterClockwiseIcon,
  LinkSimpleIcon,
  TextBIcon,
  TextItalicIcon,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Size } from "@/components/ui/size";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";
import { Toolbar } from "@/components/ui/toolbar";

export function ToolbarSizesDemo() {
  return (
    <div className="flex flex-col items-start gap-3">
      <CommentToolbar size="xs" />
      <CommentToolbar size="sm" />
      <CommentToolbar size="md" />
    </div>
  );
}

function CommentToolbar({ size }: { size: Size }) {
  return (
    <Toolbar size={size} aria-label="Comment editor">
      <Button variant="ghost" iconOnly aria-label="Undo">
        <ArrowCounterClockwiseIcon aria-hidden="true" />
      </Button>
      <Button variant="ghost" iconOnly aria-label="Redo">
        <ArrowClockwiseIcon aria-hidden="true" />
      </Button>
      <Separator orientation="vertical" className="h-5 self-center" />
      <ToggleButtonGroup aria-label="Text style" selectionMode="multiple">
        <ToggleButton id="bold" variant="segmented" iconOnly aria-label="Bold">
          <TextBIcon aria-hidden="true" />
        </ToggleButton>
        <ToggleButton
          id="italic"
          variant="segmented"
          iconOnly
          aria-label="Italic"
        >
          <TextItalicIcon aria-hidden="true" />
        </ToggleButton>
      </ToggleButtonGroup>
      <Separator orientation="vertical" className="h-5 self-center" />
      <Button variant="ghost">
        <LinkSimpleIcon aria-hidden="true" />
        Link
      </Button>
    </Toolbar>
  );
}
