"use client";

import { UploadSimpleIcon } from "@phosphor-icons/react";
import {
  type ComponentProps,
  createContext,
  type Ref,
  use,
  useEffect,
  useRef,
  useState,
} from "react";
import { mergeRefs } from "react-aria/mergeRefs";
import {
  DropZone as AriaDropZone,
  type DropZoneProps as AriaDropZoneProps,
  composeRenderProps,
  type FileTriggerProps,
  Text,
  type TextProps,
} from "react-aria-components";
import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "./button";
import { FileTrigger } from "./file-trigger";

const ease = "cubic-bezier(0.23, 1, 0.32, 1)";

function stillMotion() {
  return matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const DropZoneStateContext = createContext<{
  isDisabled: boolean;
  isRejected: boolean;
  receive: () => void;
} | null>(null);

export interface DropZoneProps extends AriaDropZoneProps {
  ref?: Ref<HTMLDivElement>;
}

export function DropZone({
  className,
  getDropOperation,
  onDrop,
  isDisabled = false,
  ref,
  ...props
}: DropZoneProps) {
  const zoneRef = useRef<HTMLDivElement>(null);
  const [isRejected, setRejected] = useState(false);

  useEffect(() => {
    const node = zoneRef.current;
    if (!node) return;
    const entered = new Set<EventTarget>();
    const enter = (event: DragEvent) => {
      if (event.target) entered.add(event.target);
    };
    const leave = (event: DragEvent) => {
      if (event.target) entered.delete(event.target);
      if (entered.size === 0) setRejected(false);
    };
    const reset = () => {
      entered.clear();
      setRejected(false);
    };
    node.addEventListener("dragenter", enter);
    node.addEventListener("dragleave", leave);
    node.addEventListener("drop", reset);
    return () => {
      node.removeEventListener("dragenter", enter);
      node.removeEventListener("dragleave", leave);
      node.removeEventListener("drop", reset);
    };
  }, []);

  function receive() {
    if (stillMotion()) return;
    zoneRef.current?.animate(
      {
        boxShadow: [
          "0 0 0 0 color-mix(in oklab, var(--primary) 22%, transparent)",
          "0 0 0 0.5rem color-mix(in oklab, var(--primary) 0%, transparent)",
        ],
      },
      { duration: 600, easing: ease },
    );
  }

  return (
    <DropZoneStateContext value={{ isDisabled, isRejected, receive }}>
      <AriaDropZone
        {...props}
        ref={mergeRefs(zoneRef, ref)}
        isDisabled={isDisabled}
        data-slot="drop-zone"
        data-rejected={isRejected || undefined}
        getDropOperation={
          getDropOperation &&
          ((types, allowedOperations) => {
            const operation = getDropOperation(types, allowedOperations);
            setRejected(operation === "cancel");
            return operation;
          })
        }
        onDrop={(event) => {
          receive();
          onDrop?.(event);
        }}
        className={composeRenderProps(className, (className) =>
          cn(
            "group/drop-zone relative flex min-h-32 min-w-0 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-input bg-card p-5 text-center text-sm text-foreground outline-offset-4 outline-transparent [overflow-wrap:anywhere] transition-[background-color,border-color,outline-color,outline-offset,scale] duration-200 ease-out-quint has-[[data-slot=drop-zone-trigger][data-hovered]]:border-muted-foreground/45 has-[[data-slot=drop-zone-trigger][data-hovered]]:bg-[color-mix(in_oklab,var(--accent)_35%,var(--card))] motion-safe:has-[[data-slot=drop-zone-trigger][data-pressed]]:scale-[0.99] drop-target:border-solid drop-target:border-primary drop-target:bg-[color-mix(in_oklab,var(--accent)_70%,var(--card))] motion-safe:drop-target:scale-[1.01] data-rejected:border-solid data-rejected:border-destructive data-rejected:bg-[color-mix(in_oklab,var(--destructive)_6%,var(--card))] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-50 motion-reduce:outline-offset-2 forced-colors:drop-target:border-[Highlight]",
            className,
          ),
        )}
      />
    </DropZoneStateContext>
  );
}

export function DropZoneIcon({
  className,
  children,
  ...props
}: ComponentProps<"span">) {
  const iconRef = useRef<HTMLSpanElement>(null);
  const isRejected = use(DropZoneStateContext)?.isRejected ?? false;

  useEffect(() => {
    if (!isRejected || stillMotion()) return;
    iconRef.current?.animate(
      { translate: ["0", "-0.1875rem", "0.1875rem", "-0.125rem", "0"] },
      { duration: 320, easing: ease, composite: "add" },
    );
  }, [isRejected]);

  return (
    <span
      {...props}
      ref={iconRef}
      aria-hidden="true"
      data-slot="drop-zone-icon"
      className={cn(
        "grid size-10 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground transition-[translate,background-color,color] duration-350 ease-spring group-has-[[data-slot=drop-zone-trigger][data-hovered]]/drop-zone:text-foreground motion-safe:group-has-[[data-slot=drop-zone-trigger][data-hovered]]/drop-zone:-translate-y-0.5 group-drop-target/drop-zone:bg-primary group-drop-target/drop-zone:text-primary-foreground motion-safe:group-drop-target/drop-zone:-translate-y-1 group-data-rejected/drop-zone:bg-[color-mix(in_oklab,var(--destructive)_12%,var(--card))] group-data-rejected/drop-zone:text-destructive forced-colors:border [&_svg:not([class*='size-'])]:size-5",
        className,
      )}
    >
      {children ?? <UploadSimpleIcon />}
    </span>
  );
}

export function DropZoneLabel({ className, ...props }: TextProps) {
  return (
    <Text
      {...props}
      slot="label"
      data-slot="drop-zone-label"
      className={cn("text-sm font-medium text-foreground", className)}
    />
  );
}

export function DropZoneDescription({
  className,
  ...props
}: ComponentProps<"p">) {
  return (
    <p
      {...props}
      data-slot="drop-zone-description"
      className={cn("-mt-2 text-xs leading-5 text-muted-foreground", className)}
    />
  );
}

export interface DropZoneTriggerProps
  extends Pick<
      FileTriggerProps,
      | "acceptedFileTypes"
      | "acceptDirectory"
      | "allowsMultiple"
      | "defaultCamera"
      | "onSelect"
    >,
    Omit<ButtonProps, "onSelect"> {}

export function DropZoneTrigger({
  acceptedFileTypes,
  acceptDirectory,
  allowsMultiple,
  defaultCamera,
  onSelect,
  variant = "outline",
  isDisabled,
  className,
  children = "Browse files",
  ...props
}: DropZoneTriggerProps) {
  const zone = use(DropZoneStateContext);

  return (
    <FileTrigger
      acceptedFileTypes={acceptedFileTypes}
      acceptDirectory={acceptDirectory}
      allowsMultiple={allowsMultiple}
      defaultCamera={defaultCamera}
      onSelect={(files) => {
        if (files?.length) zone?.receive();
        onSelect?.(files);
      }}
    >
      <Button
        {...props}
        static
        data-slot="drop-zone-trigger"
        variant={variant}
        isDisabled={isDisabled ?? zone?.isDisabled}
        className={composeRenderProps(className, (className) =>
          cn("static after:absolute after:inset-0", className),
        )}
      >
        {children}
      </Button>
    </FileTrigger>
  );
}
