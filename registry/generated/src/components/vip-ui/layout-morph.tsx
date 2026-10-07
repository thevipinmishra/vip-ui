"use client";

import {
  AnimatePresence,
  type HTMLMotionProps,
  motion,
  useIsPresent,
  useReducedMotion,
} from "motion/react";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "./utils";

export interface LayoutMorphProps
  extends Omit<
    HTMLMotionProps<"div">,
    "ref" | "children" | "animate" | "transition"
  > {
  contentKey: string | number;
  children: ReactNode;
}

function MorphContent({
  children,
  onHeight,
  reducedMotion,
}: {
  children: ReactNode;
  onHeight: (height: number) => void;
  reducedMotion: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isPresent = useIsPresent();

  useEffect(() => {
    if (!isPresent || !ref.current) return;
    const node = ref.current;
    const observer = new ResizeObserver(() => onHeight(node.offsetHeight));
    observer.observe(node);
    return () => observer.disconnect();
  }, [isPresent, onHeight]);

  return (
    <motion.div
      ref={ref}
      data-slot="layout-morph-content"
      className="w-full"
      style={!isPresent ? { position: "absolute", inset: 0 } : undefined}
      inert={!isPresent}
      aria-hidden={!isPresent || undefined}
      initial={reducedMotion ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
      transition={{ duration: reducedMotion ? 0 : 0.2 }}
    >
      {children}
    </motion.div>
  );
}

export function LayoutMorph({
  contentKey,
  children,
  className,
  style,
  ...props
}: LayoutMorphProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>();
  const reducedMotion = useReducedMotion() === true;
  const measure = useCallback((contentHeight: number) => {
    if (!ref.current) return;
    const styles = getComputedStyle(ref.current);
    setHeight(
      contentHeight +
        Number.parseFloat(styles.paddingTop) +
        Number.parseFloat(styles.paddingBottom) +
        Number.parseFloat(styles.borderTopWidth) +
        Number.parseFloat(styles.borderBottomWidth),
    );
  }, []);

  return (
    <motion.div
      {...props}
      ref={ref}
      data-slot="layout-morph"
      className={cn("relative overflow-hidden", className)}
      style={style}
      animate={{ height: reducedMotion ? "auto" : (height ?? "auto") }}
      transition={{
        height: { duration: reducedMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      <AnimatePresence initial={false}>
        <MorphContent
          key={contentKey}
          onHeight={measure}
          reducedMotion={reducedMotion}
        >
          {children}
        </MorphContent>
      </AnimatePresence>
    </motion.div>
  );
}
