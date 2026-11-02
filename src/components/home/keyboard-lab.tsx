"use client";

import { type KeyboardEvent, type ReactNode, useState } from "react";
import { Card } from "@/components/ui/card";
import { Kbd } from "@/components/ui/kbd-code";
import { Radio, RadioGroup } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { TextSwap } from "@/components/ui/text-swap";
import { cn } from "@/lib/utils";

type ControlId = "billing" | "storage" | "alerts";

const keyMaps: Record<
  ControlId,
  { name: string; rows: { keys: string[]; action: string }[] }
> = {
  billing: {
    name: "Radio group",
    rows: [
      { keys: ["Tab"], action: "Moves focus into or out of the group." },
      {
        keys: ["↑", "↓", "←", "→"],
        action: "Selects the next or previous option.",
      },
    ],
  },
  storage: {
    name: "Slider",
    rows: [
      { keys: ["←", "→", "↑", "↓"], action: "Changes the value by 1." },
      { keys: ["Page Up", "Page Down"], action: "Changes the value by 10." },
      { keys: ["Home", "End"], action: "Sets the minimum or maximum value." },
    ],
  },
  alerts: {
    name: "Switch",
    rows: [
      { keys: ["Space"], action: "Turns the setting on or off." },
      { keys: ["Tab"], action: "Moves focus to the next control." },
    ],
  },
};

const keyNames: Record<string, string> = {
  ArrowLeft: "←",
  ArrowRight: "→",
  ArrowUp: "↑",
  ArrowDown: "↓",
  PageUp: "Page Up",
  PageDown: "Page Down",
  " ": "Space",
};

function Control({ id, children }: { id: ControlId; children: ReactNode }) {
  return (
    <div data-lab={id} className="min-w-0">
      {children}
    </div>
  );
}

export function KeyboardLab() {
  const [focused, setFocused] = useState<ControlId | null>(null);
  const [pressed, setPressed] = useState<string | null>(null);
  const map = focused ? keyMaps[focused] : null;

  function controlOf(target: EventTarget | null) {
    if (!(target instanceof Element)) return null;
    const control = target.closest<HTMLElement>("[data-lab]");
    return (control?.dataset.lab as ControlId | undefined) ?? null;
  }

  function onKeyDown(event: KeyboardEvent) {
    setPressed(keyNames[event.key] ?? event.key);
  }

  return (
    <Card className="grid min-w-0 gap-0 overflow-clip p-0">
      <div className="flex items-center justify-between gap-3 border-b border-border/70 px-5 py-3.5 sm:px-6">
        <h3 id="keyboard-test-title" className="text-sm font-semibold">
          Keyboard test
        </h3>
        <span className="text-xs text-muted-foreground">No mouse needed</span>
      </div>
      <form
        aria-labelledby="keyboard-test-title"
        className="grid gap-6 p-5 sm:p-6"
        onSubmit={(event) => event.preventDefault()}
        onKeyDownCapture={onKeyDown}
        onFocus={(event) => {
          setFocused(controlOf(event.target));
          setPressed(null);
        }}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setFocused(null);
            setPressed(null);
          }
        }}
      >
        <Control id="billing">
          <RadioGroup
            label="Billing"
            orientation="horizontal"
            defaultValue="yearly"
          >
            <Radio value="monthly">Monthly</Radio>
            <Radio value="yearly">Yearly</Radio>
          </RadioGroup>
        </Control>
        <Control id="storage">
          <Slider
            label="Storage limit"
            defaultValue={40}
            minValue={0}
            maxValue={100}
            formatOptions={{ style: "unit", unit: "gigabyte" }}
          />
        </Control>
        <Control id="alerts">
          <Switch
            defaultChecked
            description="We send an email at 90% of the limit."
            className="w-full"
          >
            Usage alerts
          </Switch>
        </Control>
      </form>
      <div
        aria-hidden="true"
        className="grid min-h-48 content-start gap-3 border-t border-border/70 bg-muted/40 p-5 sm:p-6"
      >
        <p className="flex min-w-0 items-center gap-2 text-xs font-medium text-muted-foreground">
          <span className="shrink-0">Keys for</span>
          <TextSwap
            value={map?.name ?? "the focused control"}
            className="min-w-0 font-mono text-foreground"
          />
        </p>
        {map ? (
          <ul key={focused} className="grid gap-1">
            {map.rows.map((row) => {
              const active = pressed != null && row.keys.includes(pressed);
              return (
                <li
                  key={row.action}
                  className={cn(
                    "flex min-h-10 flex-wrap items-center gap-x-3 gap-y-1.5 rounded-lg px-2.5 py-1.5 text-sm transition-[background-color,box-shadow] duration-200 ease-out-quint motion-safe:starting:opacity-0",
                    active &&
                      "bg-card shadow-[var(--shadow-card)] ring-1 ring-border/70",
                  )}
                >
                  <span className="flex flex-wrap gap-1">
                    {row.keys.map((key) => (
                      <Kbd
                        key={key}
                        className={cn(
                          "transition-[background-color,color,border-color] duration-150 ease-out-quint",
                          active &&
                            key === pressed &&
                            "border-primary bg-primary text-primary-foreground",
                        )}
                      >
                        {key}
                      </Kbd>
                    ))}
                  </span>
                  <span className="min-w-0 text-muted-foreground">
                    {row.action}
                  </span>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="grid gap-2 text-sm leading-7 text-muted-foreground">
            <p>
              Push <Kbd>Tab</Kbd> to move focus into the form.
            </p>
            <p>
              Then use <Kbd>←</Kbd> <Kbd>→</Kbd>, <Kbd>Space</Kbd>,{" "}
              <Kbd>Home</Kbd>, and <Kbd>End</Kbd>.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
