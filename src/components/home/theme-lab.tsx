"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Switch } from "@/components/ui/switch";
import { TextSwap } from "@/components/ui/text-swap";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";
import { FactList } from "./section";

export interface ThemeOption {
  slug: string;
  name: string;
  light: Record<string, string>;
  dark: Record<string, string>;
}

const shownTokens = ["primary", "primary-foreground", "ring", "chart-1"];
const bars = [38, 54, 46, 72, 64, 88];
const ranges = ["Day", "Week", "Month"];

function TokenSnippet({ values }: { values: Record<string, string> }) {
  return (
    <>
      {shownTokens.map((token) => (
        <span
          key={token}
          className="block overflow-hidden text-ellipsis whitespace-pre"
        >
          {`  --${token}: `}
          <span className="text-muted-foreground">{values[token]}</span>
          {";"}
        </span>
      ))}
    </>
  );
}

export function ThemeLab({ options }: { options: ThemeOption[] }) {
  const [slug, setSlug] = useState("teal");
  const theme = options.find((option) => option.slug === slug) ?? options[0];

  return (
    <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
      <div
        data-home-theme={theme.slug}
        className="min-w-0 rounded-2xl bg-background p-3 ring-1 ring-border/70 transition-[background-color] duration-250 ease-out-quint sm:p-5"
      >
        <Card className="grid min-w-0 gap-5 p-5">
          <div className="flex min-w-0 items-center justify-between gap-3">
            <div className="grid min-w-0 gap-0.5">
              <h3 className="truncate text-sm font-semibold">Workspace</h3>
              <p className="truncate text-sm text-muted-foreground">
                Acme Inc.
              </p>
            </div>
            <Badge variant="accent">Pro</Badge>
          </div>
          <div className="flex min-w-0 flex-wrap items-end justify-between gap-4">
            <ToggleButtonGroup
              aria-label="Range"
              selectionMode="single"
              disallowEmptySelection
              defaultSelectedKeys={["Week"]}
              size="xs"
            >
              {ranges.map((range) => (
                <ToggleButton key={range} id={range} variant="segmented">
                  {range}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
            <div aria-hidden="true" className="flex h-16 items-end gap-1.5">
              {bars.map((height, index) => (
                <span
                  key={height}
                  style={{ height: `${height}%` }}
                  className={
                    index === bars.length - 1
                      ? "w-3 rounded-sm bg-(--chart-1) transition-colors duration-250 ease-out-quint"
                      : "w-3 rounded-sm bg-(--chart-1)/35 transition-colors duration-250 ease-out-quint"
                  }
                />
              ))}
            </div>
          </div>
          <ProgressBar label="Storage" value={64} valueLabel="64 of 100 GB" />
          <div className="grid gap-3">
            <Switch defaultChecked className="w-full">
              Public link
            </Switch>
            <Checkbox defaultChecked>Send a weekly report</Checkbox>
          </div>
          <div className="flex flex-wrap justify-end gap-2 border-t border-border/70 pt-4">
            <Button variant="outline">Cancel</Button>
            <Button>Save</Button>
          </div>
        </Card>
      </div>

      <div className="grid min-w-0 content-start gap-6">
        <div className="grid gap-3">
          <p className="flex min-w-0 items-baseline gap-2 text-sm font-medium">
            <span className="shrink-0">Theme</span>
            <TextSwap
              value={theme.name}
              className="min-w-0 text-muted-foreground"
            />
          </p>
          <ToggleButtonGroup
            aria-label="Theme"
            selectionMode="single"
            disallowEmptySelection
            selectedKeys={[slug]}
            onSelectionChange={(keys) => {
              const [next] = keys;
              if (typeof next === "string") setSlug(next);
            }}
            className="flex-wrap"
          >
            {options.map((option) => (
              <ToggleButton
                key={option.slug}
                id={option.slug}
                variant="ghost"
                iconOnly
                aria-label={option.name}
              >
                <span
                  data-home-theme={option.slug}
                  aria-hidden="true"
                  className="size-5 rounded-full bg-primary ring-1 ring-foreground/10 ring-inset"
                />
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </div>
        <pre className="min-w-0 rounded-xl bg-code p-4 font-mono text-xs leading-6 text-code-foreground ring-1 ring-border/70">
          <code>
            <span className="block text-muted-foreground">
              <span className="dark:hidden">{":root {"}</span>
              <span className="hidden dark:inline">{".dark {"}</span>
            </span>
            <span className="dark:hidden">
              <TokenSnippet values={theme.light} />
            </span>
            <span className="hidden dark:block">
              <TokenSnippet values={theme.dark} />
            </span>
            <span className="block text-muted-foreground">{"}"}</span>
          </code>
        </pre>
        <FactList
          className="sm:grid-cols-1"
          facts={[
            {
              term: "Light and dark",
              detail:
                "Each theme sets the variables for light mode and dark mode.",
            },
            {
              term: "Color scales",
              detail:
                "Themes use the 12-step color scales. The neutrals come from the gray scale.",
            },
          ]}
        />
      </div>
    </div>
  );
}
