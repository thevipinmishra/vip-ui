"use client";

import { CaretDownIcon } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { Button, Disclosure, Heading } from "react-aria-components";
import {
  CollapsiblePanel,
  collapsibleChevronStyles,
} from "@/components/ui/collapsible-panel";
import { ItemHighlight } from "@/components/ui/item-highlight";
import { catalogGroups } from "@/lib/catalog";
import { springLayout } from "@/lib/motion";
import { guideGroups } from "@/lib/navigation";
import { cn } from "@/lib/utils";

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

function followExpansion(group: HTMLElement) {
  const scroller = scrollParent(group);
  if (!scroller) return;
  const inset = Number.parseFloat(getComputedStyle(scroller).paddingBottom);
  const end = performance.now() + 320;
  const controller = new AbortController();
  for (const type of ["wheel", "touchmove"])
    scroller.addEventListener(type, () => controller.abort(), {
      passive: true,
      signal: controller.signal,
    });
  const step = () => {
    if (controller.signal.aborted) return;
    const box = scroller.getBoundingClientRect();
    const rect = group.getBoundingClientRect();
    const overflow = Math.min(
      rect.bottom - (box.bottom - inset),
      rect.top - box.top,
    );
    if (overflow > 0) scroller.scrollTop += overflow;
    if (performance.now() < end) requestAnimationFrame(step);
    else controller.abort();
  };
  requestAnimationFrame(step);
}

function NavGroup({
  title,
  count,
  defaultExpanded,
  children,
}: {
  title: string;
  count: number;
  defaultExpanded: boolean;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <Disclosure
      ref={ref}
      defaultExpanded={defaultExpanded}
      onExpandedChange={(isExpanded) => {
        if (isExpanded && ref.current) followExpansion(ref.current);
      }}
      className="min-w-0"
    >
      <Heading className="m-0">
        <Button
          slot="trigger"
          className="group/trigger flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-lg px-3 text-start text-sm font-medium text-foreground outline-transparent transition-[background-color,outline-color] duration-150 ease-out-quint hover:bg-muted/70 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
        >
          <span className="min-w-0 flex-1 truncate">{title}</span>
          <span
            aria-hidden="true"
            className="text-xs font-normal text-muted-foreground tabular-nums"
          >
            {count}
          </span>
          <span aria-hidden="true" className={collapsibleChevronStyles}>
            <CaretDownIcon size={14} />
          </span>
        </Button>
      </Heading>
      <CollapsiblePanel>
        <div className="grid gap-0.5 pt-0.5 pb-2">{children}</div>
      </CollapsiblePanel>
    </Disclosure>
  );
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
          "group/nav-link relative isolate flex min-w-0 items-center px-3 text-[13px] font-medium whitespace-nowrap transition-[color,background-color] duration-150 ease-out-quint hover:text-foreground focus-visible:bg-primary focus-visible:text-primary-foreground focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-transparent",
          mobile ? "min-h-10 rounded-lg" : "min-h-8 rounded-full",
          isActive ? "text-foreground" : "text-muted-foreground",
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
        {link.label}
      </Link>
    );
  };

  if (mobile) {
    const groups = [
      ...guideGroups.map((group) => ({
        title: group.title,
        links: group.guides.map(({ href, label }) => ({ href, label })),
      })),
      ...catalogGroups.map((group) => ({
        title: group.title,
        links: group.components.map((component) => ({
          href: `/components/${component.slug}`,
          label: component.name,
        })),
      })),
    ];
    return (
      <nav
        aria-label="Documentation navigation"
        className="relative isolate grid gap-0.5"
      >
        <ItemHighlight placement="under" items="a" className="bg-muted/70" />
        {groups.map((group) => (
          <NavGroup
            key={group.title}
            title={group.title}
            count={group.links.length}
            defaultExpanded={group.links.some((link) => link.href === pathname)}
          >
            {group.links.map(renderLink)}
          </NavGroup>
        ))}
      </nav>
    );
  }

  return (
    <nav
      aria-label="Documentation navigation"
      className="relative isolate grid gap-7"
    >
      <ItemHighlight placement="under" items="a" className="bg-muted/70" />
      {guideGroups.map((group) => (
        <div key={group.title} className="grid gap-0.5">
          <p className="mb-1.5 px-3 text-xs font-medium text-muted-foreground">
            {group.title}
          </p>
          {group.guides.map(renderLink)}
        </div>
      ))}
      {catalogGroups.map((group) => (
        <div key={group.title} className="grid gap-0.5">
          <p className="mb-1.5 px-3 text-xs font-medium text-muted-foreground">
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
