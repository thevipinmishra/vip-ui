"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { catalogGroups } from "@/lib/catalog";
import { springLayout } from "@/lib/motion";
import { docsGuides } from "@/lib/navigation";
import { cn } from "@/lib/utils";

function revealInScrollParent(element: HTMLElement) {
  let scroller = element.parentElement;
  while (scroller && !/auto|scroll/.test(getComputedStyle(scroller).overflowY))
    scroller = scroller.parentElement;
  if (!scroller) return;
  const box = scroller.getBoundingClientRect();
  const rect = element.getBoundingClientRect();
  if (rect.top < box.top) scroller.scrollTop += rect.top - box.top;
  else if (rect.bottom > box.bottom)
    scroller.scrollTop += rect.bottom - box.bottom;
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

  const renderLink = (link: { href: string; label: string }) => {
    const isActive = activeHref === link.href;
    return (
      <Link
        key={link.href}
        href={link.href}
        ref={isActive ? activeRef : undefined}
        onNavigate={(event) => {
          setPendingHref(link.href);
          onNavigate?.(event, link.href);
        }}
        aria-current={pathname === link.href ? "page" : undefined}
        className={cn(
          "group/nav-link relative isolate inline-flex min-h-10 items-center rounded-lg px-3 text-[13px] font-medium whitespace-nowrap transition-[color,background-color] duration-150 ease-out-quint hover:bg-muted hover:text-foreground focus-visible:bg-primary focus-visible:text-primary-foreground focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-transparent",
          isActive ? "text-accent-foreground" : "text-muted-foreground",
        )}
      >
        {isActive && (
          <motion.span
            layoutId={mobile ? "mobile-nav-selection" : "desktop-nav-selection"}
            className="pointer-events-none absolute inset-0 -z-10 rounded-lg bg-accent transition-[background-color] duration-150 ease-out-quint group-focus-visible/nav-link:bg-primary"
            transition={reduceMotion ? { duration: 0 } : springLayout}
          />
        )}
        {link.label}
      </Link>
    );
  };

  return (
    <nav aria-label="Documentation navigation" className="grid gap-6">
      <div className="grid gap-1">
        <p className="mb-2 px-3 text-xs font-semibold text-foreground">
          Get started
        </p>
        {docsGuides.map(renderLink)}
      </div>
      {catalogGroups.map((group) => (
        <div key={group.title} className="grid gap-1">
          <p className="mb-2 px-3 text-xs font-semibold text-foreground">
            {group.title}
          </p>
          {group.components.map((component) =>
            renderLink({
              href: `/components/${component.slug}`,
              label: component.name,
            }),
          )}
        </div>
      ))}
    </nav>
  );
}
