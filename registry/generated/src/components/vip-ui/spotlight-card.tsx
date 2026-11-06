"use client";

import { useInView } from "motion/react";
import {
  type ComponentPropsWithRef,
  type CSSProperties,
  useEffect,
  useRef,
} from "react";
import { cn } from "./utils";
import { Card } from "./card";

const color = "var(--spotlight-color,var(--color-foreground))";
const size = "var(--spotlight-size,20rem)";
const at = "at var(--spotlight-x,50%) var(--spotlight-y,50%)";

export function SpotlightCard({
  className,
  style,
  children,
  ref,
  ...props
}: ComponentPropsWithRef<"div">) {
  const local = useRef<HTMLDivElement | null>(null);
  const inView = useInView(local, { margin: "120px" });

  useEffect(() => {
    const node = local.current;
    if (!node || !inView) return;
    let frame = 0;
    let x = 0;
    let y = 0;

    const paint = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      node.style.setProperty("--spotlight-x", `${x - rect.left}px`);
      node.style.setProperty("--spotlight-y", `${y - rect.top}px`);
      node.dataset.spotlight = "";
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const hide = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      delete node.dataset.spotlight;
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    return () => {
      hide();
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
    };
  }, [inView]);

  return (
    <Card
      {...props}
      ref={(node) => {
        local.current = node;
        if (typeof ref === "function") return ref(node);
        if (ref) ref.current = node;
      }}
      data-slot="spotlight-card"
      className={cn(
        "isolate before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:bg-(image:--spotlight-glow) before:opacity-0 before:transition-opacity before:duration-300 before:ease-out-quint before:content-[''] after:pointer-events-none after:absolute after:-inset-px after:rounded-[inherit] after:bg-(image:--spotlight-edge) after:p-px after:opacity-0 after:transition-opacity after:duration-300 after:ease-out-quint after:content-[''] after:[mask:linear-gradient(#000_0_0)_content-box_exclude,linear-gradient(#000_0_0)] data-spotlight:before:opacity-100 data-spotlight:after:opacity-100 motion-reduce:before:transition-none motion-reduce:after:transition-none forced-colors:before:hidden forced-colors:after:hidden",
        className,
      )}
      style={
        {
          "--spotlight-glow": `radial-gradient(${size} circle ${at}, color-mix(in oklab, ${color} 7%, transparent), transparent 70%)`,
          "--spotlight-edge": `radial-gradient(calc(${size} * 0.75) circle ${at}, color-mix(in oklab, ${color} 55%, transparent), transparent 70%)`,
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </Card>
  );
}
