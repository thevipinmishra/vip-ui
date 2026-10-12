"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ColorSwatchPicker,
  ColorSwatchPickerItem,
} from "@/components/ui/color-swatch-picker";
import { Slider } from "@/components/ui/slider";
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

export function AppearanceControls() {
  const [accent, setAccent] = useState<Accent>(accents[0]);
  const [radius, setRadius] = useState(defaultRadius);

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

  const changed = accent !== accents[0] || radius !== defaultRadius;

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      <Part slug="color-swatch-picker">
        <ColorSwatchPicker
          aria-label="Accent color"
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
      <Part slug="slider" className="w-40">
        <Slider
          label="Radius"
          minValue={0}
          maxValue={16}
          step={2}
          value={radius}
          onChange={(value) => setRadius(value as number)}
        />
      </Part>
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
    </div>
  );
}
