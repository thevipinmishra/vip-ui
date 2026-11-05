"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ItemHighlight } from "@/components/ui/item-highlight";
import { springLayout, transitionFor } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface CategoryTab {
  href: string;
  label: string;
}

export function CategoryTabs({
  label,
  tabs,
  active,
}: {
  label: string;
  tabs: CategoryTab[];
  active: string;
}) {
  const listRef = useRef<HTMLUListElement>(null);
  const activeRef = useRef<HTMLLIElement>(null);
  const firstRun = useRef(true);
  const reduceMotion = useReducedMotion();

  // biome-ignore lint/correctness/useExhaustiveDependencies: re-center the active tab when the category changes
  useEffect(() => {
    const list = listRef.current;
    const item = activeRef.current;
    if (!list || !item || list.scrollWidth <= list.clientWidth) return;
    const listRect = list.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    list.scrollTo({
      left:
        list.scrollLeft +
        itemRect.left -
        listRect.left -
        (list.clientWidth - itemRect.width) / 2,
      behavior: firstRun.current || reduceMotion ? "auto" : "smooth",
    });
    firstRun.current = false;
  }, [active]);

  const revealGallery = () => {
    const gallery = document.getElementById("gallery");
    if (!gallery || gallery.getBoundingClientRect().top >= 0) return;
    requestAnimationFrame(() => {
      document.getElementById("gallery")?.scrollIntoView();
    });
  };

  return (
    <nav
      aria-label={label}
      className="sticky top-0 z-30 bg-linear-to-b from-background from-70% to-transparent pb-4 pt-3"
    >
      <div className="site-container">
        <ul
          ref={listRef}
          className="relative isolate mx-auto flex w-fit max-w-full items-center gap-0.5 overflow-x-auto rounded-full bg-card/60 p-1 shadow-[var(--shadow-card)] ring-1 ring-border/60 backdrop-blur-xl max-[880px]:px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-[880px]:[mask-image:linear-gradient(to_right,transparent,black_16px,black_calc(100%-16px),transparent)]"
        >
          <ItemHighlight placement="under" items="a" className="bg-muted/70" />
          {tabs.map((tab) => {
            const current = tab.href === active;
            return (
              <li
                key={tab.href}
                ref={current ? activeRef : undefined}
                className="shrink-0"
              >
                <Link
                  href={tab.href}
                  scroll={false}
                  onNavigate={revealGallery}
                  aria-current={current ? "page" : undefined}
                  className={cn(
                    "relative isolate inline-flex min-h-8 items-center rounded-full px-3 text-[13px] font-medium whitespace-nowrap transition-[color,background-color,box-shadow] duration-200 ease-out-quint focus-visible:bg-primary focus-visible:text-primary-foreground focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-transparent",
                    current
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {current && (
                    <motion.span
                      layoutId="category-tab-selection"
                      initial={false}
                      aria-hidden="true"
                      transition={transitionFor(reduceMotion, springLayout)}
                      className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-background shadow-[0_1px_2px_oklch(0_0_0/0.06)] ring-1 ring-border/60"
                    />
                  )}
                  {tab.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
