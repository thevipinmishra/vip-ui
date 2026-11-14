import {
  ArrowSquareOutIcon,
  CheckCircleIcon,
  CopyIcon,
  CursorIcon,
  FileTextIcon,
  FolderPlusIcon,
  GearSixIcon,
  MagnifyingGlassIcon,
  PencilSimpleIcon,
  TrashIcon,
  UserPlusIcon,
  XIcon,
} from "@phosphor-icons/react";
import type { ReactNode } from "react";
import { buttonStyles } from "@/components/ui/button-styles";
import { Kbd, KbdGroup } from "@/components/ui/kbd-code";
import { cn } from "@/lib/utils";

const surface =
  "rounded-xl bg-popover text-popover-foreground shadow-(--shadow-float) ring-1 ring-border/70";

function Screen({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative h-44 w-80 overflow-clip rounded-xl bg-card ring-1 ring-border/70",
        className,
      )}
    >
      <div className="grid gap-2 p-4">
        <span className="h-2 w-24 rounded-full bg-muted" />
        <span className="h-2 w-40 rounded-full bg-muted" />
        <span className="h-2 w-32 rounded-full bg-muted" />
      </div>
      {children}
    </div>
  );
}

function FakeButton({
  children,
  variant = "outline",
  className,
}: {
  children: ReactNode;
  variant?: "default" | "outline" | "secondary";
  className?: string;
}) {
  return (
    <span className={buttonStyles({ variant, size: "sm", className })}>
      {children}
    </span>
  );
}

function MenuRow({
  icon,
  children,
  highlighted,
  shortcut,
  className,
}: {
  icon?: ReactNode;
  children: ReactNode;
  highlighted?: boolean;
  shortcut?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "flex h-9 items-center gap-2.5 rounded-md px-2.5 text-sm [&_svg]:text-muted-foreground",
        highlighted && "bg-accent text-accent-foreground",
        className,
      )}
    >
      {icon}
      <span className="min-w-0 flex-1 truncate">{children}</span>
      {shortcut && <Kbd>{shortcut}</Kbd>}
    </span>
  );
}

export function DialogPreview() {
  return (
    <Screen>
      <div className="absolute inset-0 grid place-items-center bg-black/25 px-6 backdrop-blur-[1px] dark:bg-black/50">
        <div className={cn(surface, "grid w-full gap-1.5 p-4")}>
          <span className="flex items-center justify-between gap-3">
            <span className="text-sm font-semibold">Dialog title</span>
            <XIcon size={14} className="text-muted-foreground" />
          </span>
          <span className="text-xs text-muted-foreground">
            Review the details before you continue.
          </span>
          <span className="mt-1.5 flex justify-end gap-2">
            <FakeButton>Cancel</FakeButton>
            <FakeButton variant="default">Continue</FakeButton>
          </span>
        </div>
      </div>
    </Screen>
  );
}

export function SheetPreview() {
  return (
    <Screen>
      <div className="absolute inset-0 bg-black/25 dark:bg-black/50">
        <div
          className={cn(
            surface,
            "absolute inset-x-0 bottom-0 grid gap-1.5 rounded-b-none px-4 pb-4 pt-2",
          )}
        >
          <span className="mx-auto mb-1 h-1 w-9 rounded-full bg-border" />
          <span className="text-sm font-semibold">Order summary</span>
          <span className="flex justify-between text-xs">
            <span>Canvas notebook</span>
            <span className="tabular-nums">$18.00</span>
          </span>
          <span className="flex justify-between text-xs text-muted-foreground">
            <span>Shipping</span>
            <span className="tabular-nums">$4.00</span>
          </span>
        </div>
      </div>
    </Screen>
  );
}

export function PopoverPreview() {
  return (
    <div className="grid w-64 justify-items-center gap-2">
      <FakeButton>
        <ArrowSquareOutIcon /> Share
      </FakeButton>
      <div className={cn(surface, "relative grid w-full gap-2 p-3.5")}>
        <span className="absolute -top-1.5 left-1/2 size-3 -translate-x-1/2 rotate-45 bg-popover ring-1 ring-border/70 [clip-path:polygon(0_0,100%_0,0_100%)]" />
        <span className="text-sm font-semibold">Share project</span>
        <span className="flex h-9 items-center rounded-md border border-input bg-card px-3 text-xs text-muted-foreground">
          vip-ui.dev/p/studio-north
        </span>
      </div>
    </div>
  );
}

export function TooltipPreview() {
  return (
    <div className="grid justify-items-center gap-2">
      <span className="relative rounded-md bg-primary px-2.5 py-1.5 text-xs text-primary-foreground shadow-(--shadow-float)">
        Keep changes private until you publish.
        <span className="absolute -bottom-1 left-1/2 size-2 -translate-x-1/2 rotate-45 bg-primary" />
      </span>
      <FakeButton>Save draft</FakeButton>
    </div>
  );
}

export function MenuPreview() {
  return (
    <div className="grid w-52 justify-items-start gap-1.5">
      <FakeButton>Open menu</FakeButton>
      <div className={cn(surface, "grid w-full p-1")}>
        <MenuRow icon={<PencilSimpleIcon size={16} />}>Edit</MenuRow>
        <MenuRow icon={<CopyIcon size={16} />} highlighted>
          Duplicate
        </MenuRow>
        <span className="mx-1 my-1 h-px bg-border" />
        <MenuRow
          icon={<TrashIcon size={16} />}
          className="text-destructive [&_svg]:text-destructive"
        >
          Delete
        </MenuRow>
      </div>
    </div>
  );
}

export function ContextMenuPreview() {
  return (
    <div className="relative h-44 w-80">
      <div className="absolute inset-s-0 top-2 flex w-44 items-center gap-3 rounded-xl bg-card p-3 ring-1 ring-border/70">
        <span className="grid size-9 place-items-center rounded-lg bg-muted">
          <FileTextIcon size={18} className="text-muted-foreground" />
        </span>
        <span className="grid gap-0.5">
          <span className="text-sm font-medium">Brief.pdf</span>
          <span className="text-xs text-muted-foreground">2.4 MB</span>
        </span>
      </div>
      <CursorIcon
        size={18}
        weight="fill"
        className="absolute inset-s-32 top-11 text-foreground"
      />
      <div className={cn(surface, "absolute inset-s-36 top-14 grid w-44 p-1")}>
        <MenuRow>Open</MenuRow>
        <MenuRow highlighted>Rename</MenuRow>
        <MenuRow className="text-destructive">Delete</MenuRow>
      </div>
    </div>
  );
}

export function ToastPreview() {
  return (
    <Screen>
      <div
        className={cn(
          surface,
          "absolute inset-x-10 bottom-4 h-16 -translate-y-5",
        )}
      />
      <div
        className={cn(
          surface,
          "absolute inset-x-7 bottom-4 h-16 -translate-y-2.5",
        )}
      />
      <div
        className={cn(
          surface,
          "absolute inset-x-4 bottom-4 flex h-16 items-start gap-2.5 p-3",
        )}
      >
        <CheckCircleIcon
          size={18}
          weight="fill"
          className="mt-px shrink-0 text-success"
        />
        <span className="grid min-w-0 gap-0.5">
          <span className="text-sm font-medium">Draft saved</span>
          <span className="text-xs text-muted-foreground">
            Your changes are saved in this workspace.
          </span>
        </span>
        <XIcon size={13} className="ms-auto shrink-0 text-muted-foreground" />
      </div>
    </Screen>
  );
}

export function CommandPalettePreview() {
  return (
    <div className={cn(surface, "grid w-80 overflow-clip")}>
      <span className="flex h-11 items-center gap-2.5 border-b border-border/70 px-3.5 text-sm text-muted-foreground">
        <MagnifyingGlassIcon size={16} />
        <span className="flex-1">Search commands</span>
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </span>
      <span className="grid p-1">
        <span className="px-2.5 pb-1 pt-1.5 text-xs font-medium text-muted-foreground">
          Project
        </span>
        <MenuRow icon={<FolderPlusIcon size={16} />} highlighted>
          New project
        </MenuRow>
        <MenuRow icon={<UserPlusIcon size={16} />}>Invite teammate</MenuRow>
        <MenuRow icon={<GearSixIcon size={16} />}>Open settings</MenuRow>
      </span>
    </div>
  );
}
