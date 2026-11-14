"use client";

import {
  ArrowCounterClockwiseIcon,
  DesktopIcon,
  MoonIcon,
  SunIcon,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { type Color, parseColor } from "react-aria-components";
import { Avatar } from "../../vip-ui/avatar";
import { Badge } from "../../vip-ui/badge";
import { Button } from "../../vip-ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../vip-ui/card";
import { ColorField } from "../../vip-ui/color-field";
import { ColorPicker } from "../../vip-ui/color-picker";
import {
  ColorSwatchPicker,
  ColorSwatchPickerItem,
} from "../../vip-ui/color-swatch-picker";
import {
  RadioButton,
  RadioField,
  RadioGroup,
  RadioGroupItems,
  RadioIndicator,
  RadioLabel,
} from "../../vip-ui/radio-group";
import { SizeProvider } from "../../vip-ui/size";
import { Slider } from "../../vip-ui/slider";
import { Switch } from "../../vip-ui/switch";
import { showToast } from "../../vip-ui/toast";
import { cn } from "../../vip-ui/utils";
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

const themes = [
  { id: "light", label: "Light", icon: SunIcon },
  { id: "dark", label: "Dark", icon: MoonIcon },
  { id: "system", label: "System", icon: DesktopIcon },
] as const;

const thumbnailColors = {
  light: { page: "#f4f5f4", panel: "#ffffff", line: "#dfe2df", ink: "#1a211e" },
  dark: { page: "#151816", panel: "#1f2320", line: "#353a36", ink: "#eceeec" },
};

function ThemeWindow({
  mode,
  className,
}: {
  mode: "light" | "dark";
  className?: string;
}) {
  const color = thumbnailColors[mode];
  return (
    <span
      className={cn("absolute inset-0 flex gap-1.5 p-2", className)}
      style={{ backgroundColor: color.page }}
    >
      <span className="grid w-1/4 content-start gap-1 pt-1">
        {[0.9, 0.6, 0.6, 0.6].map((opacity, index) => (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: static decoration.
            key={index}
            className="h-1 rounded-full"
            style={{ backgroundColor: color.ink, opacity: opacity * 0.5 }}
          />
        ))}
      </span>
      <span
        className="grid flex-1 content-start gap-1.5 rounded-[4px] p-1.5"
        style={{
          backgroundColor: color.panel,
          boxShadow: `0 0 0 1px ${color.line}`,
        }}
      >
        <span
          className="h-1.5 w-2/3 rounded-full"
          style={{ backgroundColor: color.ink, opacity: 0.8 }}
        />
        <span
          className="h-1 w-full rounded-full"
          style={{ backgroundColor: color.line }}
        />
        <span
          className="h-1 w-5/6 rounded-full"
          style={{ backgroundColor: color.line }}
        />
      </span>
    </span>
  );
}

function ThemeThumbnail({ mode }: { mode: ThemeMode }) {
  return (
    <span
      aria-hidden="true"
      className="relative block aspect-16/10 w-full overflow-hidden rounded-md ring-1 ring-border/70"
    >
      {mode === "system" ? (
        <>
          <ThemeWindow mode="light" />
          <ThemeWindow
            mode="dark"
            className="[clip-path:polygon(100%_0,100%_100%,0_100%)]"
          />
        </>
      ) : (
        <ThemeWindow mode={mode} />
      )}
    </span>
  );
}

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
              <CardDescription>
                Select a theme for this browser.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                aria-label="Theme"
                value={theme}
                onValueChange={(value) => pickTheme(value as ThemeMode)}
              >
                <RadioGroupItems className="grid grid-cols-3 gap-2 sm:gap-3">
                  {themes.map((option) => (
                    <RadioField
                      key={option.id}
                      value={option.id}
                      variant="card"
                      className="p-2 sm:p-2.5"
                    >
                      <RadioButton className="flex-col items-stretch gap-2.5">
                        <ThemeThumbnail mode={option.id} />
                        <span className="flex items-center gap-2">
                          <RadioIndicator />
                          <RadioLabel className="flex min-w-0 items-center gap-1.5">
                            <option.icon
                              size={15}
                              aria-hidden="true"
                              className="shrink-0 text-muted-foreground max-sm:hidden"
                            />
                            <span className="truncate">{option.label}</span>
                          </RadioLabel>
                        </span>
                      </RadioButton>
                    </RadioField>
                  ))}
                </RadioGroupItems>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle as="h2">Accent color</CardTitle>
              <CardDescription>
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
              <CardDescription>
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
              <CardDescription>
                Kestrel also follows the motion setting on your device.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Switch
                checked={reduceMotion}
                onCheckedChange={setReduceMotion}
                description="Turn off panel, chart, and hover animations."
                className="w-full"
              >
                Reduce motion
              </Switch>
            </CardContent>
          </Card>
        </div>

        <Card className="min-w-0 overflow-hidden xl:sticky xl:top-24">
          <div className="border-b border-border/70 px-4 py-3">
            <h2 className="text-sm font-semibold">Preview</h2>
          </div>
          <div className="p-4">
            <div className={cn("min-w-0", fontOption.className)}>
              <div
                className={cn(
                  "grid gap-3 border border-border/70 bg-card p-3.5",
                  !reduceMotion &&
                    "transition-[border-radius,font-size] duration-200 ease-out-quint",
                )}
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
                    <p className="font-medium">Events this month</p>
                    <p className="text-[0.75em] text-muted-foreground">74%</p>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn(
                        "h-full rounded-full",
                        !reduceMotion &&
                          "transition-[background-color] duration-200 ease-out-quint",
                      )}
                      style={{ width: "74%", backgroundColor: accent }}
                    />
                  </div>
                  <p className="mt-1.5 text-[0.75em] text-muted-foreground">
                    1.48M of 2M
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
          </div>
        </Card>
      </div>
    </SettingsShell>
  );
}
