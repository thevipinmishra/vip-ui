"use client";

import {
  CaretDownIcon,
  MoonIcon,
  PaletteIcon,
  SparkleIcon,
  SquaresFourIcon,
  StackIcon,
  SunIcon,
} from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { TextField } from "@/components/ui/text-field";
import { cn } from "@/lib/utils";

export function Playground() {
  const [view, setView] = useState<"overview" | "tokens">("overview");
  const [isDark, setIsDark] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[22px] border border-border bg-card text-card-foreground shadow-[var(--shadow-float)]",
        isDark && "dark",
      )}
    >
      <div className="flex h-12 items-center justify-between border-b border-border bg-card px-4 sm:px-5">
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-muted-foreground/40" />
          <span className="size-2.5 rounded-full bg-muted-foreground/25" />
          <span className="size-2.5 rounded-full bg-muted-foreground/15" />
        </div>
        <span className="rounded-md border border-border bg-background px-3 py-1 font-mono text-[10px] text-muted-foreground">
          vip/ui · preview
        </span>
        <div className="w-12" />
      </div>

      <div className="flex min-h-[410px] sm:min-h-[465px]">
        <aside className="flex w-16 shrink-0 flex-col items-center gap-1 border-r border-border bg-background/70 px-1.5 py-5 sm:w-44 sm:items-stretch sm:px-3">
          <div className="mb-7 flex items-center justify-center gap-2 px-1 sm:justify-start sm:px-2">
            <span className="grid size-7 place-items-center rounded-[8px] bg-primary text-primary-foreground">
              <SparkleIcon size={15} aria-hidden="true" />
            </span>
            <span className="hidden text-xs font-semibold tracking-[-0.025em] sm:inline">
              Studio North
            </span>
          </div>
          <p className="mb-2 hidden px-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:block">
            Workspace
          </p>
          <Button
            variant="ghost"
            size="sm"
            className="w-full min-w-0 sm:justify-start"
            onPress={() => setView("overview")}
            aria-label="Show overview"
            aria-pressed={view === "overview"}
          >
            <SquaresFourIcon size={16} aria-hidden="true" />
            <span className="hidden sm:inline">Overview</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full min-w-0 sm:justify-start"
            onPress={() => setView("tokens")}
            aria-label="Show tokens"
            aria-pressed={view === "tokens"}
          >
            <PaletteIcon size={16} aria-hidden="true" />
            <span className="hidden sm:inline">Tokens</span>
          </Button>
          <div className="mt-auto hidden rounded-[11px] border border-border bg-card p-2.5 sm:block">
            <div className="flex items-center gap-2 text-[10px] font-semibold">
              <span className="grid size-6 place-items-center rounded-md bg-accent text-accent-foreground">
                <StackIcon size={13} weight="bold" aria-hidden="true" />
              </span>{" "}
              Built to grow
            </div>
            <p className="mt-2 text-[10px] leading-4 text-muted-foreground">
              Start with a foundation. Add what you need.
            </p>
          </div>
        </aside>

        <div className="min-w-0 flex-1 bg-background/65">
          <div className="flex h-14 items-center justify-between border-b border-border px-4 sm:px-6">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
              Workspace{" "}
              <CaretDownIcon size={12} weight="bold" aria-hidden="true" />{" "}
              <span className="text-border">/</span>{" "}
              <span className="text-foreground">
                {view === "overview" ? "Overview" : "Tokens"}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onPress={() => setIsDark((value) => !value)}
              aria-label={`Switch preview to ${isDark ? "light" : "dark"} theme`}
            >
              {isDark ? (
                <SunIcon size={16} aria-hidden="true" />
              ) : (
                <MoonIcon size={16} aria-hidden="true" />
              )}
            </Button>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={view}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduceMotion ? 0 : -4 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="p-4 sm:p-6"
            >
              {view === "overview" ? <Overview /> : <Tokens />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Overview() {
  const [isPublic, setIsPublic] = useState(true);
  const [saved, setSaved] = useState(false);
  return (
    <div>
      <div>
        <p className="text-[10px] font-medium text-muted-foreground">
          Component workspace
        </p>
        <h2 className="mt-1 text-[22px] font-semibold tracking-[-0.055em] sm:text-[26px]">
          Shape your space.
        </h2>
        <p className="mt-1 text-[11px] text-muted-foreground">
          A few building blocks, working together.
        </p>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-2.5 sm:gap-3">
        <div className="rounded-[13px] border border-border bg-card p-3 shadow-[var(--shadow-card)] sm:p-4">
          <p className="text-[11px] text-muted-foreground">Workspace</p>
          <p className="mt-3 text-sm font-semibold">Studio North</p>
        </div>
        <div className="rounded-[13px] border border-border bg-card p-3 shadow-[var(--shadow-card)] sm:p-4">
          <p className="text-[11px] text-muted-foreground">Appearance</p>
          <p className="mt-3 text-sm font-semibold">Light and dark</p>
        </div>
      </div>
      <div className="mt-2.5 rounded-[13px] border border-border bg-card p-3 shadow-[var(--shadow-card)] sm:mt-3 sm:p-4">
        <p className="text-[11px] font-semibold">Workspace settings</p>
        <p className="mt-0.5 text-[10px] text-muted-foreground">
          Try the real controls in this preview.
        </p>
        <div className="mt-4">
          <TextField
            label="Workspace name"
            name="workspaceName"
            defaultValue="Studio North"
          />
        </div>
        <Switch
          isSelected={isPublic}
          onChange={(value) => {
            setIsPublic(value);
            setSaved(false);
          }}
          description="Others can find this workspace."
          className="mt-2 w-full border-t border-border pt-3"
        >
          Public workspace
        </Switch>
        <div className="mt-3 flex items-center justify-between gap-3 border-t border-border pt-3">
          <output className="text-[10px] text-muted-foreground">
            {saved ? "Preferences saved." : "Changes stay in this preview."}
          </output>
          <Button size="sm" onPress={() => setSaved(true)}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

function Tokens() {
  return (
    <div>
      <div>
        <p className="text-[10px] font-medium text-muted-foreground">
          Your design language
        </p>
        <h2 className="mt-1 text-[22px] font-semibold tracking-[-0.055em] sm:text-[26px]">
          Design tokens
        </h2>
        <p className="mt-1 text-[11px] text-muted-foreground">
          Color, radius, and type share the same roles.
        </p>
      </div>
      <div className="mt-6 rounded-[13px] border border-border bg-card p-3 shadow-[var(--shadow-card)] sm:p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[11px] font-semibold">Core palette</p>
          <span className="font-mono text-[9px] text-muted-foreground">
            OKLCH
          </span>
        </div>
        <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
          <span className="h-19 rounded-md bg-background ring-1 ring-border sm:h-24" />
          <span className="h-19 rounded-md bg-muted sm:h-24" />
          <span className="h-19 rounded-md bg-accent sm:h-24" />
          <span className="h-19 rounded-md bg-primary sm:h-24" />
          <span className="h-19 rounded-md bg-foreground sm:h-24" />
        </div>
        <div className="mt-3 grid grid-cols-5 gap-1 text-[10px] text-muted-foreground">
          <span>Canvas</span>
          <span>Muted</span>
          <span>Accent</span>
          <span>Primary</span>
          <span>Ink</span>
        </div>
      </div>
      <div className="mt-2.5 grid grid-cols-2 gap-2.5 sm:mt-3 sm:gap-3">
        <div className="rounded-[13px] border border-border bg-card p-3 shadow-[var(--shadow-card)] sm:p-4">
          <p className="text-[11px] font-semibold">Radius</p>
          <div className="mt-5 flex items-end gap-2">
            <span className="size-8 rounded-md border border-primary/40 bg-accent" />
            <span className="size-8 rounded-lg border border-primary/40 bg-accent" />
            <span className="size-8 rounded-xl border border-primary/40 bg-accent" />
          </div>
          <p className="mt-4 font-mono text-[9px] text-muted-foreground">
            --radius: 1rem
          </p>
        </div>
        <div className="rounded-[13px] border border-border bg-card p-3 shadow-[var(--shadow-card)] sm:p-4">
          <p className="text-[11px] font-semibold">Type</p>
          <div className="mt-3 text-[25px] font-semibold tracking-[-0.07em]">
            Aa
            <span className="ml-2 text-[14px] font-normal tracking-normal text-muted-foreground">
              Geist
            </span>
          </div>
          <p className="mt-1 font-mono text-[9px] text-muted-foreground">
            Clarity at every size
          </p>
        </div>
      </div>
    </div>
  );
}
