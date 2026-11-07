"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { usePageSections } from "./use-page-sections";

interface LineSpan {
  top: number;
  height: number;
}

export function OnThisPage() {
  const reduceMotion = useReducedMotion();
  const { sections, currentId, setCurrentId, visibleIds } = usePageSections();
  const [lineSpan, setLineSpan] = useState<LineSpan | null>(null);
  const [layoutTick, setLayoutTick] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef(new Map<string, HTMLAnchorElement>());
  const hasToc = sections.length >= 2;

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !hasToc) return;
    const observer = new ResizeObserver(() =>
      setLayoutTick((tick) => tick + 1),
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, [hasToc]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: layoutTick re-measures after container resizes
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (visibleIds.length === 0) {
      setLineSpan(null);
      return;
    }
    const first = itemRefs.current.get(visibleIds[0]);
    const last = itemRefs.current.get(visibleIds[visibleIds.length - 1]);
    if (!first || !last) return;
    const containerTop = container.getBoundingClientRect().top;
    const top = first.getBoundingClientRect().top - containerTop;
    const height = last.getBoundingClientRect().bottom - containerTop - top;
    setLineSpan((previous) =>
      previous &&
      Math.abs(previous.top - top) < 0.5 &&
      Math.abs(previous.height - height) < 0.5
        ? previous
        : { top, height },
    );
  }, [visibleIds, layoutTick]);

  if (sections.length < 2) return null;

  return (
    <nav aria-label="On this page">
      <p className="mb-2 ps-[calc(1.25rem+1px)] text-xs font-medium text-muted-foreground">
        On this page
      </p>
      <div ref={containerRef} className="relative">
        {lineSpan && (
          <motion.span
            aria-hidden="true"
            initial={false}
            animate={{ y: lineSpan.top, height: lineSpan.height }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { type: "spring", duration: 0.36, bounce: 0.16 }
            }
            className="pointer-events-none absolute top-0 start-0 w-px bg-foreground"
          />
        )}
        <ul className="grid gap-0.5">
          {sections.map((section) => {
            const isCurrent = section.id === currentId;
            const isHighlighted = isCurrent || visibleIds.includes(section.id);
            return (
              <li key={section.id}>
                <a
                  ref={(node) => {
                    if (node) itemRefs.current.set(section.id, node);
                    else itemRefs.current.delete(section.id);
                  }}
                  href={`#${section.id}`}
                  aria-current={isCurrent ? "location" : undefined}
                  onClick={() => setCurrentId(section.id)}
                  className={cn(
                    "relative flex items-start rounded-sm py-1 ps-[calc(1.25rem+1px)] pe-2 text-[13px] leading-5 transition-[color] duration-150 ease-out-quint hover:text-foreground",
                    isHighlighted ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {section.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
