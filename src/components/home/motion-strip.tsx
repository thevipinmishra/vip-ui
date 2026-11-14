"use client";

import { ArrowRightIcon } from "@phosphor-icons/react";
import { useInView, useReducedMotion } from "motion/react";
import Link from "next/link";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { TextScramble } from "@/components/ui/text-scramble";
import { TextSwap } from "@/components/ui/text-swap";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";
import { cn } from "@/lib/utils";

const statuses = [
  { label: "Queued", dot: "bg-muted-foreground" },
  { label: "Building", dot: "bg-(--chart-3)" },
  { label: "Live", dot: "bg-(--chart-2)" },
] as const;

function StatusSpecimen({ play }: { play: number }) {
  const [index, setIndex] = useState(statuses.length - 1);

  useEffect(() => {
    if (play === 0) return;
    setIndex(0);
    const timers = [
      window.setTimeout(() => setIndex(1), 520),
      window.setTimeout(() => setIndex(2), 1240),
    ];
    return () => timers.forEach(window.clearTimeout);
  }, [play]);

  return (
    <span className="inline-flex items-center gap-2.5 text-2xl font-semibold tracking-[-0.04em]">
      <span
        className={cn(
          "size-2.5 shrink-0 rounded-full transition-colors duration-300 ease-out-quint",
          statuses[index].dot,
        )}
      />
      <span className="inline-grid">
        {statuses.map((status) => (
          <span
            key={status.label}
            className="invisible col-start-1 row-start-1 px-[0.1em]"
          >
            {status.label}
          </span>
        ))}
        <TextSwap
          value={statuses[index].label}
          className="col-start-1 row-start-1 mx-0 justify-self-start"
        />
      </span>
    </span>
  );
}

function NumberSpecimen({ play }: { play: number }) {
  return (
    <AnimatedNumber
      variant="slide"
      value={1284 + (play % 40) * 125}
      className="text-3xl font-semibold tracking-tighter"
    />
  );
}

const hashes = ["8c4e21a", "f31b07d", "2a9e6c4", "d74c1f0"];

function HashSpecimen({ play }: { play: number }) {
  return (
    <TextScramble
      value={hashes[play % hashes.length]}
      duration={0.6}
      glyphs="0123456789abcdef"
      className="text-2xl font-medium tracking-[-0.02em]"
    />
  );
}

const periods = ["7D", "30D", "12M"];

function SegmentSpecimen({ play }: { play: number }) {
  return (
    <ToggleButtonGroup
      aria-label="Period"
      selectionMode="single"
      disallowEmptySelection
      selectedKeys={[periods[(play + 1) % periods.length]]}
      size="xs"
    >
      {periods.map((period) => (
        <ToggleButton key={period} id={period} variant="segmented">
          {period}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

const specimens: {
  slug: string;
  name: string;
  Specimen: (props: { play: number }) => ReactNode;
}[] = [
  { slug: "text-swap", name: "Text swap", Specimen: StatusSpecimen },
  {
    slug: "animated-number",
    name: "Animated number",
    Specimen: NumberSpecimen,
  },
  { slug: "text-scramble", name: "Text scramble", Specimen: HashSpecimen },
  {
    slug: "toggle-button-group",
    name: "Toggle button group",
    Specimen: SegmentSpecimen,
  },
];

function MotionTile({
  slug,
  name,
  Specimen,
  start,
  delay,
  reduceMotion,
}: (typeof specimens)[number] & {
  start: boolean;
  delay: number;
  reduceMotion: boolean;
}) {
  const [play, setPlay] = useState(0);
  const replay = () => {
    if (!reduceMotion) setPlay((value) => value + 1);
  };

  useEffect(() => {
    if (!start || reduceMotion) return;
    const timer = window.setTimeout(() => setPlay((value) => value + 1), delay);
    return () => window.clearTimeout(timer);
  }, [start, delay, reduceMotion]);

  return (
    <li
      className="group/tile relative flex min-w-0 flex-col rounded-xl bg-card text-card-foreground shadow-(--shadow-card) ring-1 ring-border/70 transition-shadow duration-200 ease-out-quint hover:shadow-(--shadow-float) forced-colors:border"
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") replay();
      }}
    >
      <div
        aria-hidden="true"
        inert
        className="grid h-24 place-items-center overflow-clip px-3"
      >
        <Specimen play={play} />
      </div>
      <Link
        href={`/components/${slug}`}
        onFocus={replay}
        className="flex min-h-10 items-center gap-1.5 border-t border-border/60 px-3 sm:px-3.5 text-[13px] font-medium text-muted-foreground transition-colors duration-150 ease-out-quint outline-none group-hover/tile:text-foreground after:absolute after:inset-0 after:rounded-xl after:outline-offset-4 after:outline-transparent after:transition-[outline-color,outline-offset] after:duration-150 after:ease-out-quint focus-visible:text-foreground focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-ring motion-reduce:after:outline-offset-2"
      >
        <span className="min-w-0 truncate">{name}</span>
        <ArrowRightIcon
          size={13}
          aria-hidden="true"
          className="ms-auto shrink-0 transition-transform duration-200 ease-out-quint motion-safe:group-hover/tile:translate-x-0.5 rtl:-scale-x-100"
        />
      </Link>
    </li>
  );
}

export function MotionStrip({ className }: { className?: string }) {
  const ref = useRef<HTMLUListElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion() === true;

  return (
    <ul
      ref={ref}
      aria-label="Motion components"
      className={cn("grid grid-cols-2 gap-3 lg:grid-cols-4", className)}
    >
      {specimens.map((specimen, index) => (
        <MotionTile
          key={specimen.slug}
          {...specimen}
          start={inView}
          delay={250 + index * 420}
          reduceMotion={reduceMotion}
        />
      ))}
    </ul>
  );
}
