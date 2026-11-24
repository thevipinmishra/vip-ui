"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ItemHighlight } from "@/components/ui/item-highlight";
import { catalogGroups } from "@/lib/catalog";
import { springLayout } from "@/lib/motion";
import { guideGroups } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { NewBadge } from "./new-badge";

const groups = [
  ...guideGroups.map(({ title, guides }) => ({ title, links: guides })),
  ...catalogGroups.map(({ title, components }) => ({
    title,
    links: components.map(({ slug, name, added }) => ({
      href: `/components/${slug}`,
      label: name,
      added,
    })),
  })),
];

function scrollParent(element: HTMLElement) {
  let scroller = element.parentElement;
  while (scroller && !/auto|scroll/.test(getComputedStyle(scroller).overflowY))
    scroller = scroller.parentElement;
  return scroller;
}

function revealInScrollParent(element: HTMLElement) {
  const scroller = scrollParent(element);
  if (!scroller) return;
  const box = scroller.getBoundingClientRect();
  const rect = element.getBoundingClientRect();
  if (rect.top < box.top || rect.bottom > box.bottom)
    scroller.scrollTop +=
      rect.top + rect.height / 2 - (box.top + box.height / 2);
}

export function DocsNav({
  mobile = false,
  onNavigate,
}: {
  mobile?: boolean;
  onNavigate?: (event: { preventDefault: () => void }, href: string) => void;
}) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const activeRef = useRef<HTMLAnchorElement>(null);
  const [pendingHref, setPendingHref] = useState<string | null>(null);
  const activeHref = pendingHref ?? pathname;

  // biome-ignore lint/correctness/useExhaustiveDependencies: re-run on navigation to keep the active link in view
  useEffect(() => {
    setPendingHref(null);
    if (activeRef.current) revealInScrollParent(activeRef.current);
  }, [pathname]);

  const renderLink = (link: {
    href: string;
    label: string;
    added?: string;
  }) => {
    const isActive = activeHref === link.href;
    return (
      <Link
        key={link.href}
        href={link.href}
        ref={isActive && !mobile ? activeRef : undefined}
        onNavigate={(event) => {
          setPendingHref(link.href);
          onNavigate?.(event, link.href);
        }}
        aria-current={pathname === link.href ? "page" : undefined}
        className={cn(
          "group/nav-link relative isolate flex min-w-0 items-center gap-2 px-3 font-medium transition-[color,background-color] duration-150 ease-out-quint hover:text-foreground focus-visible:bg-primary focus-visible:text-primary-foreground focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-transparent",
          mobile
            ? "min-h-11 flex-wrap gap-y-1 rounded-lg py-2 text-base/5"
            : "min-h-8 rounded-full text-[13px] whitespace-nowrap",
          isActive || mobile ? "text-foreground" : "text-muted-foreground",
        )}
      >
        {isActive && (
          <motion.span
            layoutId={mobile ? "mobile-nav-selection" : "desktop-nav-selection"}
            className={cn(
              "pointer-events-none absolute inset-0 -z-10 transition-[background-color] duration-150 ease-out-quint group-focus-visible/nav-link:bg-primary",
              mobile
                ? "rounded-lg bg-accent"
                : "rounded-full bg-card inset-ring inset-ring-border/70 group-focus-visible/nav-link:inset-ring-transparent",
            )}
            transition={reduceMotion ? { duration: 0 } : springLayout}
          />
        )}
        <span className={mobile ? "min-w-0 wrap-anywhere" : "min-w-0 truncate"}>
          {link.label}
        </span>
        <NewBadge added={link.added} />
      </Link>
    );
  };

  return (
    <nav
      aria-label="Documentation navigation"
      className="relative isolate grid gap-7"
    >
      <ItemHighlight placement="under" items="a" className="bg-muted/70" />
      {groups.map(({ title, links }) => (
        <div
          key={title}
          className={mobile ? "grid grid-cols-2" : "grid gap-0.5"}
        >
          {mobile ? (
            <h3 className="col-span-full mb-1.5 px-3 text-sm font-semibold text-muted-foreground">
              {title}
            </h3>
          ) : (
            <p className="mb-1.5 px-3 text-xs font-medium text-muted-foreground">
              {title}
            </p>
          )}
          {links.map(renderLink)}
        </div>
      ))}
    </nav>
  );
}
