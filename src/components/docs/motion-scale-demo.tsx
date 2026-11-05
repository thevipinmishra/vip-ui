"use client";

import { motion, useReducedMotion } from "motion/react";
import { type ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  springLayout,
  springPop,
  springSnappy,
  transitionFor,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

const tweens = [
  { name: "fast", value: "150 ms", className: "duration-150 ease-out-quint" },
  { name: "base", value: "200 ms", className: "duration-200 ease-out-quint" },
  { name: "slow", value: "250 ms", className: "duration-250 ease-out-quint" },
];

const springs = [
  { name: "springSnappy", value: "0.24 s", transition: springSnappy },
  { name: "springLayout", value: "0.3 s", transition: springLayout },
  { name: "springPop", value: "0.28 s", transition: springPop },
];

function Row({
  name,
  value,
  children,
}: {
  name: string;
  value: string;
  children: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[6.5rem_minmax(0,1fr)] items-center gap-3">
      <div className="min-w-0 text-xs leading-5">
        <div className="truncate font-mono text-foreground">{name}</div>
        <div className="text-muted-foreground tabular-nums">{value}</div>
      </div>
      {children}
    </div>
  );
}

export function MotionScaleDemo() {
  const [end, setEnd] = useState(false);
  const reduceMotion = useReducedMotion();
  return (
    <div className="grid w-full max-w-md gap-4">
      {tweens.map((tween) => (
        <Row key={tween.name} name={tween.name} value={tween.value}>
          <div className="@container h-6 rounded-full bg-muted p-1">
            <span
              className={cn(
                "block size-4 rounded-full bg-primary transition-[translate] motion-reduce:transition-none",
                tween.className,
                end &&
                  "translate-x-[calc(100cqw-100%)] rtl:translate-x-[calc(100%-100cqw)]",
              )}
            />
          </div>
        </Row>
      ))}
      {springs.map((spring) => (
        <Row key={spring.name} name={spring.name} value={spring.value}>
          <div
            className={cn(
              "flex h-6 rounded-full bg-muted p-1",
              end ? "justify-end" : "justify-start",
            )}
          >
            <motion.span
              layout
              transition={transitionFor(reduceMotion, spring.transition)}
              className="block size-4 rounded-full bg-primary"
            />
          </div>
        </Row>
      ))}
      <Button
        variant="outline"
        className="justify-self-start"
        onPress={() => setEnd((value) => !value)}
      >
        {end ? "Move back" : "Move"}
      </Button>
    </div>
  );
}
