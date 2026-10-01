"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Check } from "reicon-react";
import { Radio, RadioGroup } from "@/components/ui/radio-group";
import { updateSiteTheme } from "@/lib/update-site-theme";

const storageKey = "vip-ui-palette";
const palettes = [
  { value: "blue", label: "Blue" },
  { value: "orchid", label: "Orchid" },
  { value: "lagoon", label: "Lagoon" },
  { value: "moss", label: "Moss" },
  { value: "clay", label: "Clay" },
] as const;

type Palette = (typeof palettes)[number]["value"];

function isPalette(value: string | undefined): value is Palette {
  return palettes.some((palette) => palette.value === value);
}

export function PalettePicker() {
  const [palette, setPalette] = useState<Palette>("blue");
  const [ready, setReady] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const saved = document.documentElement.dataset.palette;
    setPalette(isPalette(saved) ? saved : "blue");
    setReady(true);
  }, []);

  function changePalette(value: string) {
    if (!isPalette(value)) return;
    updateSiteTheme((root) => {
      root.dataset.palette = value;
    });
    setPalette(value);
    try {
      window.localStorage.setItem(storageKey, value);
    } catch {
      // The live preview still works if browser storage is unavailable.
    }
  }

  return (
    <RadioGroup
      aria-label="Site color theme"
      value={palette}
      onValueChange={changePalette}
      className="flex max-w-full flex-wrap justify-center gap-1 rounded-[20px] bg-muted/80 p-1.5 ring-1 ring-border/70"
    >
      {palettes.map(({ value, label }) => (
        <Radio
          key={value}
          value={value}
          className="relative isolate min-h-11 gap-2 overflow-hidden rounded-[14px] bg-transparent px-3 py-2 text-muted-foreground shadow-none ring-0 hover:bg-card/60 selected:bg-transparent selected:text-foreground selected:ring-0 focus-visible:z-10"
        >
          {palette === value && (
            <motion.span
              layoutId={ready ? "home-palette-selection" : undefined}
              initial={false}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { type: "spring", duration: 0.3, bounce: 0 }
              }
              className="pointer-events-none absolute inset-0 rounded-[14px] bg-card shadow-[var(--shadow-card)] ring-1 ring-border/70 forced-colors:outline-2 forced-colors:outline-[Highlight]"
              aria-hidden="true"
            />
          )}
          <span
            data-palette={value}
            className="theme-swatch relative grid size-6 shrink-0 place-items-center rounded-full ring-1 ring-foreground/10"
            aria-hidden="true"
          >
            {palette === value && <Check size={13} className="text-white" />}
          </span>
          <span className="relative text-[13px] font-medium">{label}</span>
        </Radio>
      ))}
    </RadioGroup>
  );
}
