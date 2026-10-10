"use client";

import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { useEffect, useId, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ColorSwatchPicker,
  ColorSwatchPickerItem,
} from "@/components/ui/color-swatch-picker";
import { Slider } from "@/components/ui/slider";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";
import { updateSiteTheme } from "@/lib/update-site-theme";
import { Block, BlockBody, BlockFooter } from "./block";
import { Part } from "./part";

const accents = [
  { name: "Blue", swatch: "#2554c7" },
  { name: "Violet", swatch: "#6b46c1", hue: 293, chroma: 0.19 },
  { name: "Green", swatch: "#1d7a4f", hue: 155, chroma: 0.13 },
  { name: "Rose", swatch: "#c2335c", hue: 10, chroma: 0.18 },
  { name: "Orange", swatch: "#b65a16", hue: 50, chroma: 0.15 },
] as const;

type Accent = (typeof accents)[number];

const defaultRadius = 10;
const themeKey = "vip-ui-theme";

function accentTokens(accent: Accent): Record<string, string> {
  if (!("hue" in accent)) return {};
  const { hue: h, chroma: c } = accent;
  const pick = (light: string, dark: string) =>
    `light-dark(oklch(${light} ${h}), oklch(${dark} ${h}))`;
  return {
    "--primary": pick(`0.5 ${c}`, `0.74 ${c * 0.7}`),
    "--ring": pick(`0.58 ${c}`, `0.8 ${c * 0.55}`),
    "--accent": pick(`0.962 ${c * 0.12}`, `0.29 ${c * 0.3}`),
    "--accent-foreground": pick(`0.46 ${c}`, `0.87 ${c * 0.4}`),
    "--chart-1": pick(`0.58 ${c}`, `0.74 ${c * 0.75}`),
  };
}

export function AppearanceBlock() {
  const [accent, setAccent] = useState<Accent>(accents[0]);
  const [radius, setRadius] = useState(defaultRadius);
  const [dark, setDark] = useState(false);
  const accentLabel = useId();

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setDark(root.classList.contains("dark"));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const tokens = accentTokens(accent);
    if (radius !== defaultRadius) tokens["--radius"] = `${radius / 16}rem`;
    for (const [name, value] of Object.entries(tokens)) {
      root.style.setProperty(name, value);
    }
    return () => {
      for (const name of Object.keys(tokens)) root.style.removeProperty(name);
    };
  }, [accent, radius]);

  function setScheme(next: boolean) {
    updateSiteTheme((root) => root.classList.toggle("dark", next));
    try {
      window.localStorage.setItem(themeKey, next ? "dark" : "light");
    } catch {}
    setDark(next);
  }

  const changed = accent !== accents[0] || radius !== defaultRadius;

  return (
    <Block
      title="Appearance"
      description="Change the colors and corners of this page."
    >
      <BlockBody>
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-medium">Theme</span>
          <Part slug="toggle-button-group">
            <ToggleButtonGroup
              aria-label="Theme"
              selectionMode="single"
              disallowEmptySelection
              selectedKeys={[dark ? "dark" : "light"]}
              onSelectionChange={(keys) => {
                const [next] = keys;
                if (next === "dark" || next === "light") {
                  setScheme(next === "dark");
                }
              }}
            >
              <ToggleButton id="light" variant="segmented" className="px-2.5">
                <SunIcon size={15} aria-hidden="true" />
                Light
              </ToggleButton>
              <ToggleButton id="dark" variant="segmented" className="px-2.5">
                <MoonIcon size={15} aria-hidden="true" />
                Dark
              </ToggleButton>
            </ToggleButtonGroup>
          </Part>
        </div>
        <div className="grid gap-2.5">
          <span id={accentLabel} className="text-sm font-medium">
            Accent color{" "}
            <span className="font-normal text-muted-foreground">
              {accent.name}
            </span>
          </span>
          <Part slug="color-swatch-picker" className="justify-self-start">
            <ColorSwatchPicker
              aria-labelledby={accentLabel}
              value={accent.swatch}
              onChange={(color) => {
                const hex = color.toString("hex").toLowerCase();
                const next = accents.find((item) => item.swatch === hex);
                if (next) setAccent(next);
              }}
            >
              {accents.map((item) => (
                <ColorSwatchPickerItem
                  key={item.name}
                  color={item.swatch}
                  aria-label={item.name}
                />
              ))}
            </ColorSwatchPicker>
          </Part>
        </div>
        <Part slug="slider">
          <Slider
            label="Corner radius (px)"
            minValue={0}
            maxValue={16}
            step={2}
            value={radius}
            onChange={(value) => setRadius(value as number)}
          />
        </Part>
      </BlockBody>
      <BlockFooter className="justify-between border-t border-border/70 pt-4">
        <p className="text-xs text-muted-foreground">
          The page resets when you reload it.
        </p>
        <Button
          variant="ghost"
          size="sm"
          isDisabled={!changed}
          onPress={() => {
            setAccent(accents[0]);
            setRadius(defaultRadius);
          }}
        >
          Reset
        </Button>
      </BlockFooter>
    </Block>
  );
}
