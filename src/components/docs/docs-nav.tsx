"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { catalogGroups } from "./catalog-groups";

const gettingStarted = [
  { href: "/components", label: "Overview" },
  { href: "/components/installation", label: "Installation" },
];

const components = [...new Set(catalogGroups.flatMap((group) => group.hrefs))]
  .map((slug) => ({
    href: `/components/${slug}`,
    label:
      slug === "kbd-code"
        ? "Kbd & code"
        : slug
            .replaceAll("-", " ")
            .replace(/^./, (first) => first.toUpperCase()),
  }))
  .sort((a, b) => a.label.localeCompare(b.label));

export function DocsNav({
  mobile = false,
  onNavigate,
}: {
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  const renderLink = (link: { href: string; label: string }) => (
    <Link
      key={link.href}
      href={link.href}
      onNavigate={onNavigate}
      aria-current={pathname === link.href ? "page" : undefined}
      className={cn(
        "relative isolate inline-flex min-h-10 items-center rounded-lg px-3 text-[13px] font-medium whitespace-nowrap hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring",
        pathname === link.href
          ? "text-accent-foreground"
          : "text-muted-foreground",
      )}
    >
      {pathname === link.href && (
        <motion.span
          layoutId={mobile ? "mobile-nav-selection" : "desktop-nav-selection"}
          className="pointer-events-none absolute inset-0 -z-10 rounded-lg bg-accent"
          transition={
            reduceMotion
              ? { duration: 0 }
              : { type: "spring", duration: 0.3, bounce: 0 }
          }
        />
      )}
      {link.label}
    </Link>
  );

  return (
    <nav aria-label="Documentation navigation" className="grid gap-6">
      <div className="grid gap-1">
        <p className="mb-2 px-3 text-xs font-semibold text-foreground">
          Getting started
        </p>
        {gettingStarted.map(renderLink)}
      </div>
      <div className="grid gap-1">
        <p className="mb-2 px-3 text-xs font-semibold text-foreground">
          Components
        </p>
        {components.map(renderLink)}
      </div>
    </nav>
  );
}
