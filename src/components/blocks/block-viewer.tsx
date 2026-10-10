"use client";

import {
  ArrowClockwiseIcon,
  ArrowSquareOutIcon,
  DeviceMobileIcon,
  DeviceTabletIcon,
  FileTsIcon,
  FileTsxIcon,
  FolderOpenIcon,
  MonitorIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import {
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { CopyButton } from "@/components/docs/copy-button";
import {
  PreviewFrame,
  type PreviewFrameHandle,
} from "@/components/docs/preview-frame";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/tabs";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";
import { cn } from "@/lib/utils";

export interface BlockSourceFile {
  path: string;
  code: string;
  highlighted: ReactNode;
}

const viewports = [
  { id: "desktop", label: "Desktop", width: null, icon: MonitorIcon },
  { id: "tablet", label: "Tablet", width: 768, icon: DeviceTabletIcon },
  { id: "mobile", label: "Mobile", width: 390, icon: DeviceMobileIcon },
] as const;
type Viewport = (typeof viewports)[number]["id"];

const minWidth = 320;
const keyboardStep = 32;

export function BlockViewer({
  name,
  description,
  height,
  files,
  command,
  components,
}: {
  name: string;
  description: string;
  height: number;
  files: BlockSourceFile[];
  command: string | null;
  components: { slug: string; name: string }[];
}) {
  const [viewport, setViewport] = useState<Viewport | null>("desktop");
  const [width, setWidth] = useState<number | null>(null);
  const [stageWidth, setStageWidth] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [activeFile, setActiveFile] = useState(
    files.find((file) => file.path.endsWith("/page.tsx"))?.path ??
      files[0]?.path,
  );
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<PreviewFrameHandle>(null);
  const dragStart = useRef({ x: 0, width: 0 });
  const src = `/blocks/${name}`;
  const titleId = `${name}-title`;
  const file = files.find((item) => item.path === activeFile) ?? files[0];
  const directory = file?.path.slice(0, file.path.lastIndexOf("/") + 1);
  const frameWidth = Math.min(width ?? stageWidth, stageWidth);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new ResizeObserver(([entry]) =>
      setStageWidth(Math.round(entry.contentRect.width)),
    );
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  function resize(next: number) {
    const clamped = Math.max(minWidth, Math.min(next, stageWidth));
    setViewport(null);
    setWidth(clamped >= stageWidth ? null : clamped);
  }

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStart.current = { x: event.clientX, width: frameWidth };
    setDragging(true);
  }

  function drag(event: PointerEvent<HTMLDivElement>) {
    if (!dragging) return;
    resize(dragStart.current.width + event.clientX - dragStart.current.x);
  }

  function resizeWithKeys(event: KeyboardEvent<HTMLDivElement>) {
    const steps: Record<string, number> = {
      ArrowLeft: frameWidth - keyboardStep,
      ArrowRight: frameWidth + keyboardStep,
      Home: minWidth,
      End: stageWidth,
    };
    if (!(event.key in steps)) return;
    event.preventDefault();
    resize(steps[event.key]);
  }

  return (
    <section
      id={name}
      aria-labelledby={titleId}
      className="min-w-0 scroll-mt-24"
    >
      <Tabs defaultSelectedKey="preview">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          <TabList aria-label={`${name} view`}>
            <Tab id="preview">Preview</Tab>
            <Tab id="code">Code</Tab>
          </TabList>
          <h2
            id={titleId}
            className="min-w-0 flex-1 basis-60 text-sm leading-6 text-muted-foreground"
          >
            <a
              href={`#${name}`}
              className="rounded-sm font-medium text-foreground hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {name}
            </a>
            <span aria-hidden="true"> · </span>
            <span className="sr-only">: </span>
            {description}
          </h2>
          <div className="flex items-center gap-1">
            <ToggleButtonGroup
              aria-label="Preview width"
              selectionMode="single"
              selectedKeys={viewport ? [viewport] : []}
              onSelectionChange={(keys) => {
                const [next] = keys;
                const match = viewports.find((item) => item.id === next);
                if (!match) return;
                setViewport(match.id);
                setWidth(match.width);
              }}
              className="hidden lg:inline-flex"
            >
              {viewports.map((item) => (
                <ToggleButton
                  key={item.id}
                  id={item.id}
                  variant="segmented"
                  aria-label={`${item.label} width`}
                  className="px-2.5"
                >
                  <item.icon size={17} aria-hidden="true" />
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
            <Button
              variant="minimal"
              size="icon"
              aria-label="Reload preview"
              onPress={() => frameRef.current?.reload()}
              className="size-10"
            >
              <ArrowClockwiseIcon size={17} aria-hidden="true" />
            </Button>
            <ButtonLink
              href={src}
              target="_blank"
              rel="noopener"
              variant="minimal"
              size="icon"
              aria-label={`Open ${name} in a new tab`}
              className="size-10"
            >
              <ArrowSquareOutIcon size={17} aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>
        <TabPanel
          id="preview"
          shouldForceMount
          className="preview-canvas mt-4 overflow-hidden rounded-2xl bg-muted/40 p-0 [&[inert]]:hidden"
        >
          <div ref={stageRef} className="relative min-w-0 lg:me-4">
            <div
              className={cn(
                "relative bg-background ring-1 ring-border/70",
                !dragging &&
                  "motion-safe:transition-[width] motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.23,1,0.32,1)]",
                width !== null && "shadow-[var(--shadow-float)]",
              )}
              style={{ width: width === null ? "100%" : frameWidth }}
            >
              <PreviewFrame
                ref={frameRef}
                src={src}
                title={`${name} preview`}
                height={height}
                className={cn(dragging && "pointer-events-none")}
              />
              {/* biome-ignore lint/a11y/useSemanticElements: A focusable splitter needs the separator role; <hr> cannot take focus. */}
              <div
                role="separator"
                tabIndex={0}
                aria-orientation="vertical"
                aria-label="Resize preview"
                aria-valuemin={minWidth}
                aria-valuemax={stageWidth}
                aria-valuenow={frameWidth}
                aria-valuetext={`${frameWidth} pixels wide`}
                onPointerDown={startDrag}
                onPointerMove={drag}
                onPointerUp={() => setDragging(false)}
                onPointerCancel={() => setDragging(false)}
                onKeyDown={resizeWithKeys}
                className="group absolute inset-y-0 -end-4 z-10 hidden w-4 cursor-ew-resize touch-none items-center justify-center outline-none lg:flex"
              >
                <span className="h-10 w-1.5 rounded-full bg-border shadow-[var(--shadow-card)] group-hover:bg-muted-foreground group-focus-visible:bg-ring group-focus-visible:ring-4 group-focus-visible:ring-ring/30" />
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel
          id="code"
          className="code-frame mt-4 grid overflow-hidden rounded-2xl bg-code p-0 text-code-foreground md:grid-cols-[14rem_minmax(0,1fr)]"
          style={{ height: Math.max(height, 480) }}
        >
          <div className="min-h-0 overflow-auto border-b border-border/70 p-2 md:border-e md:border-b-0">
            <p className="flex items-center gap-1.5 px-2 pb-2 pt-1 font-mono text-[11px] text-muted-foreground">
              <FolderOpenIcon size={14} aria-hidden="true" />
              <span className="truncate" title={directory}>
                {directory}
              </span>
            </p>
            <ToggleButtonGroup
              aria-label="Files"
              orientation="vertical"
              selectionMode="single"
              disallowEmptySelection
              selectedKeys={activeFile ? [activeFile] : []}
              onSelectionChange={(keys) => {
                const [next] = keys;
                if (typeof next === "string") setActiveFile(next);
              }}
              className="flex w-full flex-row gap-1 overflow-x-auto rounded-none border-0 bg-transparent p-0 md:flex-col"
            >
              {files.map((item) => {
                const Icon = item.path.endsWith(".tsx")
                  ? FileTsxIcon
                  : FileTsIcon;
                return (
                  <ToggleButton
                    key={item.path}
                    id={item.path}
                    variant="ghost"
                    className="min-h-9 shrink-0 justify-start gap-2 px-2 font-mono text-xs font-normal"
                  >
                    <Icon size={15} aria-hidden="true" className="shrink-0" />
                    {item.path.slice(item.path.lastIndexOf("/") + 1)}
                  </ToggleButton>
                );
              })}
            </ToggleButtonGroup>
          </div>
          {file && (
            <div className="flex min-h-0 min-w-0 flex-col">
              <div className="flex min-h-12 items-center justify-between gap-3 border-b border-border/70 px-4 py-2">
                <span
                  className="min-w-0 truncate font-mono text-[11px]"
                  title={file.path}
                >
                  {file.path}
                </span>
                <CopyButton
                  key={file.path}
                  code={file.code}
                  label={`Copy ${file.path}`}
                  iconOnly
                  variant="minimal"
                  className="size-8"
                />
              </div>
              <section
                aria-label={`Code for ${file.path}`}
                // biome-ignore lint/a11y/noNoninteractiveTabindex: Keyboard users scroll long code with the arrow keys.
                tabIndex={0}
                className="min-h-0 flex-1 overflow-auto overscroll-contain outline-none focus-visible:shadow-[inset_3px_0_0_var(--ring)]"
              >
                {file.highlighted}
              </section>
            </div>
          )}
        </TabPanel>
      </Tabs>
      <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-3">
        {command && (
          <div className="flex min-w-0 flex-1 basis-80 items-center gap-2 rounded-lg bg-muted/50 py-1 ps-3 pe-1 ring-1 ring-border/70">
            <code
              className="min-w-0 flex-1 truncate font-mono text-xs text-muted-foreground"
              title={command}
            >
              {command}
            </code>
            <CopyButton
              code={command}
              label={`Copy ${name} install command`}
              text="Copy command"
              variant="ghost"
            />
          </div>
        )}
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">Built with</span>
          <ul className="flex flex-wrap gap-1.5">
            {components.map((component) => (
              <li key={component.slug}>
                <Link
                  href={`/components/${component.slug}`}
                  className="inline-flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <Badge
                    variant="outline"
                    className="min-h-6 px-2.5 text-[11px] shadow-none hover:bg-muted"
                  >
                    {component.name}
                  </Badge>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
