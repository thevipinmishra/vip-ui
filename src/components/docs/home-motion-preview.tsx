"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { ArrowRight, Check, Layers } from "reicon-react";
import { Button } from "@/components/ui/button";

const cards = [
  { id: "press", label: "A press with a little give" },
  { id: "layout", label: "Cards that find their place" },
  { id: "feedback", label: "Feedback that arrives softly" },
] as const;

const positions = [
  { x: "0%", y: -18, rotate: 0, scale: 1 },
  { x: "42%", y: 24, rotate: 9, scale: 0.88 },
  { x: "-42%", y: 24, rotate: -9, scale: 0.88 },
];

function CardArtwork({
  kind,
  isActive,
  reduceMotion,
}: {
  kind: (typeof cards)[number]["id"];
  isActive: boolean;
  reduceMotion: boolean | null;
}) {
  const transition = reduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 320, damping: 30 };

  if (kind === "press") {
    return (
      <>
        <div className="flex items-center justify-between text-xs font-semibold">
          <span>Button</span>
          <span className="text-muted-foreground">Press</span>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <motion.span
            initial={false}
            animate={{ scale: isActive ? 1 : 0.96 }}
            transition={transition}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-float)]"
          >
            Continue <ArrowRight size={16} aria-hidden="true" />
          </motion.span>
          <span className="font-mono text-[11px] text-muted-foreground">
            scale: 0.96
          </span>
        </div>
      </>
    );
  }

  if (kind === "layout") {
    return (
      <>
        <div className="flex items-center justify-between text-xs font-semibold">
          <span>Layout</span>
          <Layers size={16} aria-hidden="true" className="text-primary" />
        </div>
        <div className="flex flex-1 flex-col justify-center gap-2.5">
          {["Sketch", "Build", "Ship"].map((step, index) => (
            <motion.div
              key={step}
              initial={false}
              animate={{ x: isActive ? 0 : index % 2 === 0 ? -6 : 6 }}
              transition={transition}
              className="flex items-center gap-3 rounded-xl bg-muted/70 px-3 py-2.5 text-xs font-medium ring-1 ring-border/60"
            >
              <span className="size-2 rounded-full bg-primary" />
              {step}
              <span className="ms-auto h-1.5 w-10 rounded-full bg-primary/25" />
            </motion.div>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between text-xs font-semibold">
        <span>Feedback</span>
        <span className="text-muted-foreground">Saved</span>
      </div>
      <div className="flex flex-1 flex-col justify-center gap-3">
        <div className="h-2 w-28 rounded-full bg-muted" />
        <div className="h-2 w-40 max-w-full rounded-full bg-muted" />
        <motion.div
          initial={false}
          animate={{ opacity: isActive ? 1 : 0.65, y: isActive ? 0 : 8 }}
          transition={transition}
          className="mt-2 flex items-center gap-3 rounded-xl bg-success-subtle px-4 py-4 text-success-foreground"
        >
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-success/15">
            <Check size={17} aria-hidden="true" />
          </span>
          <div>
            <span className="block text-xs font-semibold">Changes saved</span>
            <span className="mt-0.5 block text-[11px] opacity-80">
              Your workspace is up to date.
            </span>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export function HomeMotionPreview() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const spring = reduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 280, damping: 28 };

  return (
    <div className="overflow-hidden rounded-[28px] bg-card p-2 shadow-[var(--shadow-float)] ring-1 ring-border/70">
      <div className="flex items-center justify-between gap-3 px-4 py-4 sm:px-5">
        <h2 className="text-sm font-semibold tracking-[-0.025em]">
          Motion in the details
        </h2>
        <span className="font-mono text-[11px] text-muted-foreground">
          motion/react
        </span>
      </div>
      <div className="relative flex min-h-[340px] items-center justify-center overflow-hidden rounded-[21px] bg-accent/60 sm:min-h-[390px]">
        <div
          className="home-motion-grid pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          {cards.map((card, index) => {
            const position = (index - active + cards.length) % cards.length;
            return (
              <motion.div
                key={card.id}
                initial={false}
                animate={positions[position]}
                transition={spring}
                style={{ zIndex: 3 - position }}
                className="absolute flex h-[225px] w-[min(74%,320px)] flex-col rounded-[20px] bg-card p-5 text-foreground shadow-[var(--shadow-float)] ring-1 ring-border sm:h-[250px] sm:p-6"
              >
                <CardArtwork
                  kind={card.id}
                  isActive={position === 0}
                  reduceMotion={reduceMotion}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-5 px-4 py-5 sm:px-5">
        <div>
          <output aria-live="polite" className="text-sm font-semibold">
            {cards[active].label}
          </output>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Move the stack and watch each card settle.
          </p>
          <div className="mt-3 flex gap-1.5" aria-hidden="true">
            {cards.map((card, index) => (
              <span
                key={card.id}
                className="relative h-1.5 w-6 rounded-full bg-muted"
              >
                {index === active && (
                  <motion.span
                    layoutId="home-motion-selection"
                    className="absolute inset-0 rounded-full bg-primary"
                    transition={spring}
                  />
                )}
              </span>
            ))}
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onPress={() => setActive((current) => (current + 1) % cards.length)}
        >
          Move cards <ArrowRight size={15} aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
