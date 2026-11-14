"use client";

import { CheckIcon, CopyIcon } from "@phosphor-icons/react";
import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { Highlighter } from "@/components/ui/highlighter";
import { IconSwap } from "@/components/ui/icon-swap";
import { LayoutMorph } from "@/components/ui/layout-morph";
import { Marquee } from "@/components/ui/marquee";
import { Presence } from "@/components/ui/presence";
import { PresenceList } from "@/components/ui/presence-list";
import { StaggerGroup, StaggerItem } from "@/components/ui/stagger-group";
import { TextLoop } from "@/components/ui/text-loop";
import { TextReveal } from "@/components/ui/text-reveal";
import { TextScramble } from "@/components/ui/text-scramble";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { TextSwap } from "@/components/ui/text-swap";
import type { CatalogPreviewProps } from "./catalog-preview-registry";

function usePlay(active: boolean, { autoplay = true, interval = 1400 } = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion() === true;
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!autoplay || reduceMotion || !inView) return;
    const timer = window.setTimeout(() => setTick((value) => value + 1), 300);
    return () => window.clearTimeout(timer);
  }, [autoplay, inView, reduceMotion]);

  useEffect(() => {
    if (reduceMotion || !active) return;
    const first = window.setTimeout(() => setTick((value) => value + 1), 60);
    const timer = window.setInterval(
      () => setTick((value) => value + 1),
      interval,
    );
    return () => {
      window.clearTimeout(first);
      window.clearInterval(timer);
    };
  }, [active, interval, reduceMotion]);

  return { ref, tick, reduceMotion };
}

const words = ["Gather", "Shape", "Release"];

export function TextSwapPreview({ active }: CatalogPreviewProps) {
  const { ref, tick } = usePlay(active, { interval: 1100 });

  return (
    <div ref={ref} className="grid justify-items-center">
      <span className="inline-grid text-5xl leading-tight font-semibold tracking-[-0.06em]">
        {words.map((word) => (
          <span
            key={word}
            className="invisible col-start-1 row-start-1 justify-self-center px-[0.1em]"
          >
            {word}
          </span>
        ))}
        <TextSwap
          value={words[tick % words.length]}
          className="col-start-1 row-start-1 mx-0 justify-self-center"
        />
      </span>
    </div>
  );
}

export function AnimatedNumberPreview({ active }: CatalogPreviewProps) {
  const { ref, tick } = usePlay(active, { interval: 1000 });

  return (
    <div ref={ref} className="grid justify-items-center text-center">
      <span className="text-sm text-muted-foreground">Views today</span>
      <AnimatedNumber
        variant="slide"
        value={1284 + (tick % 60) * 125}
        className="mt-1 block text-5xl font-semibold tracking-[-0.06em]"
      />
    </div>
  );
}

export function TextRevealPreview({ active }: CatalogPreviewProps) {
  const { ref, tick } = usePlay(active, { autoplay: false, interval: 1800 });

  return (
    <div ref={ref} className="w-full">
      <p className="text-4xl leading-[1.15] font-semibold tracking-[-0.06em]">
        <TextReveal key={tick} text="Make room for the unusual." />
      </p>
    </div>
  );
}

const titles = ["STUDIO NOTES", "SIGNAL NOTES", "STREET NOTES"];

export function TextScramblePreview({ active }: CatalogPreviewProps) {
  const { ref, tick } = usePlay(active, { interval: 1200 });

  return (
    <div ref={ref}>
      <p className="text-3xl font-semibold tracking-tight">
        <TextScramble value={titles[tick % titles.length]} />
      </p>
    </div>
  );
}

export function TextShimmerPreview() {
  return (
    <p className="text-3xl font-semibold tracking-[-0.04em]">
      <TextShimmer>Thinking it through</TextShimmer>
    </p>
  );
}

export function IconSwapPreview({ active }: CatalogPreviewProps) {
  const { ref, tick } = usePlay(active, { interval: 1100 });
  const copied = tick % 2 === 1;

  return (
    <div
      ref={ref}
      className="grid size-16 place-items-center rounded-2xl border border-border bg-card shadow-(--shadow-card)"
    >
      <IconSwap contentKey={copied ? "copied" : "copy"} className="text-2xl">
        {copied ? <CheckIcon /> : <CopyIcon />}
      </IconSwap>
    </div>
  );
}

export function PresencePreview({ active }: CatalogPreviewProps) {
  const { ref, tick, reduceMotion } = usePlay(active, { interval: 1100 });
  const show = reduceMotion || tick % 2 === 1;

  return (
    <div ref={ref} className="grid min-h-32 content-start gap-3">
      <span className="inline-flex h-9 w-fit items-center rounded-md bg-secondary px-3.5 text-sm font-medium text-secondary-foreground">
        {show ? "Hide note" : "Show note"}
      </span>
      <Presence
        show={show}
        className="w-full rounded-xl border border-border bg-card p-4 shadow-(--shadow-card)"
      >
        <p className="text-lg font-medium tracking-tight">
          Keep the good ideas close.
        </p>
      </Presence>
    </div>
  );
}

const tasks = [
  { id: "copy", title: "Review copy" },
  { id: "icons", title: "Check icons" },
  { id: "ship", title: "Ship release" },
];

export function PresenceListPreview({ active }: CatalogPreviewProps) {
  const { ref, tick, reduceMotion } = usePlay(active, { interval: 1300 });
  const items = reduceMotion || tick % 2 === 1 ? tasks : tasks.slice(0, 1);

  return (
    <div ref={ref} className="grid min-h-40 content-start">
      <PresenceList items={items} getKey={(item) => item.id} aria-label="Tasks">
        {(item) => (
          <span className="flex items-center gap-3 rounded-xl border border-border bg-card px-3 py-2.5 text-sm shadow-(--shadow-card)">
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-accent font-mono text-xs font-semibold text-accent-foreground">
              {String(tasks.indexOf(item) + 1).padStart(2, "0")}
            </span>
            <span className="min-w-0 font-medium">{item.title}</span>
          </span>
        )}
      </PresenceList>
    </div>
  );
}

const tiles = ["Type", "Form", "Light"];

export function StaggerGroupPreview({ active }: CatalogPreviewProps) {
  const { ref, tick } = usePlay(active, { autoplay: false, interval: 1400 });

  return (
    <div ref={ref}>
      <StaggerGroup key={tick} className="grid grid-cols-3 gap-2">
        {tiles.map((word) => (
          <StaggerItem
            key={word}
            className="grid min-h-28 min-w-0 content-between rounded-xl border border-border bg-card p-3 shadow-(--shadow-card)"
          >
            <span className="h-1 w-7 rounded-full bg-primary" />
            <span className="text-lg font-semibold tracking-tight">{word}</span>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  );
}

const captions = [
  { title: "First light", detail: "The wall before the room wakes up." },
  {
    title: "After the rain",
    detail:
      "A longer note about what happens when color returns to the street after the storm.",
  },
];

export function LayoutMorphPreview({ active }: CatalogPreviewProps) {
  const { ref, tick } = usePlay(active, { interval: 1500 });
  const caption = captions[tick % captions.length];

  return (
    <div ref={ref} className="grid min-h-40 content-start">
      <LayoutMorph
        contentKey={tick % captions.length}
        className="rounded-xl border border-border bg-card px-5 py-4 shadow-(--shadow-card)"
      >
        <p className="text-xl font-semibold tracking-tight">{caption.title}</p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {caption.detail}
        </p>
      </LayoutMorph>
    </div>
  );
}

const disciplines = ["Typography", "Photography", "Editorial", "Motion"];

export function MarqueePreview() {
  return (
    <Marquee speed={40} className="w-full [&>div:nth-child(2)]:hidden">
      {disciplines.map((discipline, index) => (
        <span
          key={discipline}
          className="inline-flex items-center gap-3 whitespace-nowrap rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium shadow-(--shadow-card)"
        >
          <span className="font-mono text-xs text-primary">0{index + 1}</span>
          {discipline}
        </span>
      ))}
    </Marquee>
  );
}

export function TextLoopPreview({ active }: CatalogPreviewProps) {
  return (
    <p className="text-3xl font-semibold tracking-[-0.04em]">
      For{" "}
      <TextLoop
        values={["designers", "engineers", "writers"]}
        interval={1.4}
        active={active}
        className="text-muted-foreground"
      />
    </p>
  );
}

export function HighlighterPreview({ active }: CatalogPreviewProps) {
  const { tick } = usePlay(active, { autoplay: false, interval: 2200 });

  return (
    <p key={tick} className="text-3xl font-semibold tracking-[-0.04em]">
      Ship it <Highlighter variant="circle">today</Highlighter>
    </p>
  );
}
