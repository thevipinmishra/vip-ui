"use client";

import {
  ArrowCounterClockwiseIcon,
  DesktopIcon,
  MoonIcon,
  PlayIcon,
  SparkleIcon,
  SunIcon,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { type Color, parseColor } from "react-aria-components";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ColorField } from "@/components/ui/color-field";
import { ColorPicker } from "@/components/ui/color-picker";
import {
  ColorSwatchPicker,
  ColorSwatchPickerItem,
} from "@/components/ui/color-swatch-picker";
import {
  RadioButton,
  RadioField,
  RadioGroup,
  RadioGroupItems,
  RadioIndicator,
  RadioLabel,
} from "@/components/ui/radio-group";
import { SizeProvider } from "@/components/ui/size";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { showToast } from "@/components/ui/toast";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";
import { cn } from "@/lib/utils";
import { SettingsShell } from "./settings-shell";
import { updateSiteTheme } from "./site-theme";

const accents = [
  { color: "#4f46e5", label: "Indigo" },
  { color: "#0d9488", label: "Teal" },
  { color: "#0284c7", label: "Sky" },
  { color: "#7c3aed", label: "Violet" },
  { color: "#e11d48", label: "Rose" },
  { color: "#d97706", label: "Amber" },
  { color: "#65a30d", label: "Lime" },
  { color: "#475569", label: "Slate" },
];

const fonts = [
  {
    id: "sans",
    label: "Geist Sans",
    note: "Default",
    className: "font-sans",
  },
  {
    id: "mono",
    label: "Geist Mono",
    note: "Fixed width",
    className: "font-mono",
  },
  {
    id: "system",
    label: "System",
    note: "Device font",
    className: "font-[ui-sans-serif,system-ui,sans-serif]",
  },
] as const;

type ThemeMode = "light" | "dark" | "system";
type FontId = (typeof fonts)[number]["id"];

function luminance(hex: string) {
  const value = Number.parseInt(hex.replace("#", ""), 16);
  const channels = [(value >> 16) & 255, (value >> 8) & 255, value & 255].map(
    (channel) => {
      const ratio = channel / 255;
      return ratio <= 0.03928
        ? ratio / 12.92
        : ((ratio + 0.055) / 1.055) ** 2.4;
    },
  );
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrastWith(hex: string) {
  const level = luminance(hex);
  const white = 1.05 / (level + 0.05);
  const black = (level + 0.05) / 0.05;
  return white >= black
    ? { ratio: white, foreground: "#ffffff" }
    : { ratio: black, foreground: "#111111" };
}

function applyTheme(mode: ThemeMode) {
  if (mode === "system") {
    try {
      window.localStorage.removeItem("vip-ui-theme");
    } catch {}
    const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    updateSiteTheme((root) => root.classList.toggle("dark", dark));
    return;
  }
  try {
    window.localStorage.setItem("vip-ui-theme", mode);
  } catch {}
  updateSiteTheme((root) => root.classList.toggle("dark", mode === "dark"));
}

export function AppearanceSettings() {
  const [theme, setTheme] = useState<ThemeMode>("system");
  const [accent, setAccent] = useState("#4f46e5");
  const [font, setFont] = useState<FontId>("sans");
  const [fontSize, setFontSize] = useState(16);
  const [radius, setRadius] = useState(10);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [previews, setPreviews] = useState(0);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem("vip-ui-theme");
    } catch {}
    if (stored === "light" || stored === "dark") setTheme(stored);
  }, []);

  const color = parseColor(accent);
  const contrast = contrastWith(accent);
  const fontOption = fonts.find((option) => option.id === font) ?? fonts[0];

  function pickTheme(mode: ThemeMode) {
    setTheme(mode);
    applyTheme(mode);
  }

  function pickColor(next: Color | null) {
    if (next) setAccent(next.toString("hex").toLowerCase());
  }

  function reset() {
    setAccent("#4f46e5");
    setFont("sans");
    setFontSize(16);
    setRadius(10);
    setReduceMotion(false);
    pickTheme("system");
    showToast({
      title: "Appearance is reset",
      description: "Kestrel uses the default theme on this device.",
    });
  }

  return (
    <SettingsShell
      current="appearance"
      title="Appearance"
      description="Choose how Kestrel looks on this device."
      actions={
        <Button variant="outline" size="sm" onPress={reset}>
          <ArrowCounterClockwiseIcon size={16} aria-hidden="true" />
          Reset
        </Button>
      }
    >
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_19rem] xl:items-start">
        <div className="grid min-w-0 gap-5">
          <Card>
            <CardHeader>
              <CardTitle as="h2">Theme</CardTitle>
              <CardDescription className="text-xs leading-5">
                Select a theme for this browser.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ToggleButtonGroup
                size="sm"
                aria-label="Theme"
                selectionMode="single"
                selectedKeys={new Set([theme])}
                disallowEmptySelection
                onSelectionChange={(keys) => {
                  const next = Array.from(keys)[0];
                  if (next) pickTheme(next as ThemeMode);
                }}
                className="w-full sm:w-fit"
              >
                <ToggleButton
                  id="light"
                  variant="segmented"
                  className="flex-1 sm:flex-none"
                >
                  <SunIcon aria-hidden="true" />
                  Light
                </ToggleButton>
                <ToggleButton
                  id="dark"
                  variant="segmented"
                  className="flex-1 sm:flex-none"
                >
                  <MoonIcon aria-hidden="true" />
                  Dark
                </ToggleButton>
                <ToggleButton
                  id="system"
                  variant="segmented"
                  className="flex-1 sm:flex-none"
                >
                  <DesktopIcon aria-hidden="true" />
                  System
                </ToggleButton>
              </ToggleButtonGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle as="h2">Accent color</CardTitle>
              <CardDescription className="text-xs leading-5">
                The accent marks buttons, links, and selections.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <ColorSwatchPicker
                aria-label="Accent color"
                value={accent}
                onChange={pickColor}
                className="grid grid-cols-4 justify-items-center gap-2 sm:grid-cols-8"
              >
                {accents.map((option) => (
                  <ColorSwatchPickerItem
                    key={option.color}
                    color={option.color}
                    aria-label={option.label}
                  />
                ))}
              </ColorSwatchPicker>
              <SizeProvider size="sm">
                <div className="flex flex-wrap items-end gap-3 border-t border-border/70 pt-4">
                  <ColorField
                    size="sm"
                    label="Hex"
                    value={color}
                    onChange={pickColor}
                    className="w-32"
                  />
                  <ColorPicker
                    label="Pick color"
                    value={color}
                    onChange={pickColor}
                  />
                  <div className="flex items-center gap-2 pb-1.5">
                    <p className="text-xs text-muted-foreground">
                      Contrast{" "}
                      <span className="font-mono tabular-nums text-foreground">
                        {contrast.ratio.toFixed(1)}:1
                      </span>
                    </p>
                    <Badge
                      variant={contrast.ratio >= 4.5 ? "success" : "warning"}
                      className="min-h-5 py-0 text-[11px]"
                    >
                      {contrast.ratio >= 4.5 ? "AA" : "Large text"}
                    </Badge>
                  </div>
                </div>
              </SizeProvider>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle as="h2">Type and shape</CardTitle>
              <CardDescription className="text-xs leading-5">
                Set the interface font and scale.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-5">
              <div className="grid gap-2">
                <p className="text-sm font-medium">Interface font</p>
                <RadioGroup
                  aria-label="Interface font"
                  value={font}
                  onValueChange={(value) => setFont(value as FontId)}
                >
                  <RadioGroupItems className="grid gap-2 sm:grid-cols-3">
                    {fonts.map((option) => (
                      <RadioField
                        key={option.id}
                        value={option.id}
                        variant="card"
                      >
                        <RadioButton>
                          <RadioIndicator />
                          <span className="flex min-w-0 flex-1 items-center gap-2.5">
                            <span
                              aria-hidden="true"
                              className={cn(
                                "text-lg font-semibold leading-none",
                                option.className,
                              )}
                            >
                              Aa
                            </span>
                            <span className="min-w-0">
                              <RadioLabel className="block text-sm">
                                {option.label}
                              </RadioLabel>
                              <span className="block text-xs leading-5 text-muted-foreground">
                                {option.note}
                              </span>
                            </span>
                          </span>
                        </RadioButton>
                      </RadioField>
                    ))}
                  </RadioGroupItems>
                </RadioGroup>
              </div>
              <div className="grid gap-1 border-t border-border/70 pt-4">
                <Slider
                  label="Font size (px)"
                  minValue={14}
                  maxValue={20}
                  step={1}
                  value={fontSize}
                  onChange={(value) =>
                    setFontSize(Array.isArray(value) ? value[0] : value)
                  }
                  marks={[14, 17, 20]}
                />
              </div>
              <div className="grid gap-1 border-t border-border/70 pt-4">
                <Slider
                  label="Corner radius (px)"
                  minValue={4}
                  maxValue={16}
                  step={2}
                  value={radius}
                  onChange={(value) =>
                    setRadius(Array.isArray(value) ? value[0] : value)
                  }
                  marks={[4, 10, 16]}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle as="h2">Motion</CardTitle>
              <CardDescription className="text-xs leading-5">
                Turn off entrance and hover animations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Switch checked={reduceMotion} onCheckedChange={setReduceMotion}>
                Reduce motion
              </Switch>
            </CardContent>
          </Card>
        </div>

        <Card className="min-w-0 overflow-hidden xl:sticky xl:top-24">
          <div className="flex items-center justify-between gap-3 border-b border-border/70 px-4 py-3">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <SparkleIcon
                size={16}
                weight="fill"
                aria-hidden="true"
                className="text-muted-foreground"
              />
              Preview
            </p>
            <Button
              size="xs"
              variant="ghost"
              onPress={() => setPreviews((count) => count + 1)}
            >
              <PlayIcon size={14} aria-hidden="true" />
              Play preview
            </Button>
          </div>
          <div className="p-4">
            <div className={cn("min-w-0", fontOption.className)}>
              <div
                className="grid gap-3 border border-border/70 bg-card p-3.5"
                style={{ borderRadius: radius, fontSize }}
              >
                <div className="flex items-center gap-2.5">
                  <Avatar name="Nadia Okafor" size="sm" />
                  <div className="min-w-0">
                    <p className="truncate font-medium">Nadia Okafor</p>
                    <p className="truncate text-[0.78em] text-muted-foreground">
                      Workspace admin
                    </p>
                  </div>
                  <span
                    className="ms-auto shrink-0 rounded-full px-2 py-0.5 text-[0.68em] font-medium"
                    style={{
                      backgroundColor: accent,
                      color: contrast.foreground,
                    }}
                  >
                    Pro
                  </span>
                </div>
                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="font-medium">Usage this month</p>
                    <p className="text-[0.75em] text-muted-foreground">68%</p>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full"
                      style={{ width: "68%", backgroundColor: accent }}
                    />
                  </div>
                  <p className="mt-1.5 text-[0.75em] text-muted-foreground">
                    6.8 of 10 GB
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span
                    className="inline-flex min-h-8 items-center px-3 text-[0.8em] font-medium"
                    style={{
                      backgroundColor: accent,
                      color: contrast.foreground,
                      borderRadius: Math.max(4, radius * 0.6),
                    }}
                  >
                    Invite member
                  </span>
                  <span
                    className="inline-flex min-h-8 items-center border border-border px-3 text-[0.8em] font-medium"
                    style={{ borderRadius: Math.max(4, radius * 0.6) }}
                  >
                    View plan
                  </span>
                </div>
              </div>
            </div>
            {previews > 0 && (
              <div
                key={previews}
                className={cn(
                  "mt-3 flex items-start gap-2.5 rounded-lg bg-muted/60 px-3 py-2.5 ring-1 ring-border/70",
                  !reduceMotion &&
                    "transition-[opacity,translate] duration-300 ease-out-quint starting:opacity-0 motion-safe:starting:-translate-y-1",
                )}
              >
                <span
                  aria-hidden="true"
                  className="mt-1 size-2 shrink-0 rounded-full"
                  style={{ backgroundColor: accent }}
                />
                <div className="min-w-0">
                  <p className="text-xs font-medium">New comment on Q4 plan</p>
                  <p className="text-xs text-muted-foreground">
                    Leo Park mentioned you 2 minutes ago.
                  </p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </SettingsShell>
  );
}
