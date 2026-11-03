"use client";

import {
  ArrowClockwiseIcon,
  ArrowSquareOutIcon,
  DeviceMobileIcon,
  DeviceTabletIcon,
  MonitorIcon,
} from "@phosphor-icons/react";
import { useRef, useState } from "react";
import {
  PreviewFrame,
  type PreviewFrameHandle,
} from "@/components/docs/preview-frame";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Sheet, SheetClose, SheetTitle } from "@/components/ui/sheet";
import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/tabs";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";
import type { Block } from "@/lib/blocks";
import { cn } from "@/lib/utils";
import type { BlockPreviewView } from "./block-preview";
import { BlockSourcePanel } from "./block-source-panel";

const viewports = [
  { id: "desktop", label: "Desktop", width: null, icon: MonitorIcon },
  { id: "tablet", label: "Tablet", width: 768, icon: DeviceTabletIcon },
  { id: "mobile", label: "Mobile", width: 390, icon: DeviceMobileIcon },
] as const;
type Viewport = (typeof viewports)[number]["id"];

export function BlockPreviewSheet({
  block,
  initialView,
  isOpen,
  onOpenChange,
}: {
  block: Block;
  initialView: BlockPreviewView;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}) {
  return (
    <Sheet
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      position="bottom"
      size="full"
    >
      <PreviewContent
        key={`${block.name}-${initialView}`}
        block={block}
        initialView={initialView}
      />
    </Sheet>
  );
}

function PreviewContent({
  block,
  initialView,
}: {
  block: Block;
  initialView: BlockPreviewView;
}) {
  const [view, setView] = useState<BlockPreviewView>(initialView);
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const frameRef = useRef<PreviewFrameHandle>(null);
  const current =
    viewports.find((item) => item.id === viewport) ?? viewports[0];
  const src = `/blocks/${block.name}`;

  return (
    <Tabs
      value={view}
      onValueChange={(value) => setView(value === "code" ? "code" : "preview")}
      className="flex min-h-0 flex-1 flex-col"
    >
      <header className="shrink-0 border-b border-border/70">
        <div className="flex items-center gap-2 px-3 pb-2 pt-[max(0.5rem,env(safe-area-inset-top))] sm:px-4">
          <div className="min-w-0 flex-1">
            <SheetTitle className="truncate text-base font-semibold tracking-[-0.03em]">
              {block.title}
            </SheetTitle>
            <p className="truncate font-mono text-[11px] text-muted-foreground">
              {block.name}
            </p>
          </div>
          <SheetClose size="sm" />
        </div>
        <div className="flex items-center justify-between gap-2 px-3 pb-2 sm:px-4">
          <TabList aria-label={`${block.title} view`} size="sm">
            <Tab id="preview">Preview</Tab>
            <Tab id="code">Code</Tab>
          </TabList>
          <div className="flex shrink-0 items-center gap-1">
            {view === "preview" && (
              <>
                <ToggleButtonGroup
                  aria-label="Preview width"
                  selectionMode="single"
                  selectedKeys={[viewport]}
                  onSelectionChange={(keys) => {
                    const [next] = keys;
                    const match = viewports.find((item) => item.id === next);
                    if (match) setViewport(match.id);
                  }}
                  size="sm"
                  className="hidden sm:inline-flex"
                >
                  {viewports.map((item) => (
                    <ToggleButton
                      key={item.id}
                      id={item.id}
                      variant="segmented"
                      iconOnly
                      aria-label={`${item.label} width`}
                    >
                      <item.icon size={16} aria-hidden="true" />
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
                <Button
                  variant="minimal"
                  size="sm"
                  iconOnly
                  aria-label="Reload preview"
                  onPress={() => frameRef.current?.reload()}
                >
                  <ArrowClockwiseIcon size={16} aria-hidden="true" />
                </Button>
              </>
            )}
            <ButtonLink
              href={src}
              target="_blank"
              rel="noopener"
              variant="minimal"
              size="sm"
              iconOnly
              aria-label={`Open ${block.title} in a new tab`}
            >
              <ArrowSquareOutIcon size={16} aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>
      </header>
      <TabPanel
        id="preview"
        shouldForceMount
        className="mt-0 flex min-h-0 flex-1 flex-col overflow-hidden rounded-none bg-muted/40 p-0 shadow-none ring-0 [&[inert]]:hidden"
      >
        <div className="flex min-h-0 flex-1 justify-center overflow-hidden">
          <div
            className={cn(
              "relative h-full min-h-0 bg-background ring-1 ring-border/70 motion-safe:transition-[width] motion-safe:duration-300 motion-safe:ease-out-quint",
              viewport !== "desktop" && "shadow-[var(--shadow-float)]",
            )}
            style={{ width: current.width ?? "100%", maxWidth: "100%" }}
          >
            <PreviewFrame
              ref={frameRef}
              src={src}
              title={`${block.title} preview`}
              height="100%"
              className="h-full"
            />
          </div>
        </div>
      </TabPanel>
      <TabPanel
        id="code"
        className="mt-0 flex min-h-0 flex-1 flex-col rounded-none bg-transparent p-0 shadow-none ring-0"
      >
        {view === "code" && <BlockSourcePanel block={block} />}
      </TabPanel>
    </Tabs>
  );
}
