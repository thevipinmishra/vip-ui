"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { catalogGroups } from "@/lib/catalog";
import { cn } from "@/lib/utils";

const gettingStarted = [
  { href: "/components", label: "Catalog" },
  { href: "/components/installation", label: "Installation" },
];

export function DocsNav({
  mobile = false,
  onNavigate,
}: {
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const activeRef = useRef<HTMLAnchorElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: re-run on navigation to keep the active link in view
  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest" });
  }, [pathname]);

  const renderLink = (link: { href: string; label: string }) => {
    const isActive = pathname === link.href;
    return (
      <Link
        key={link.href}
        href={link.href}
        ref={isActive ? activeRef : undefined}
        onNavigate={onNavigate}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "relative isolate inline-flex min-h-10 items-center rounded-lg px-3 text-[13px] font-medium whitespace-nowrap hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring",
          isActive ? "text-accent-foreground" : "text-muted-foreground",
        )}
      >
        {isActive && (
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
  };

  return (
    <nav aria-label="Documentation navigation" className="grid gap-6">
      <div className="grid gap-1">
        <p className="mb-2 px-3 text-xs font-semibold text-foreground">
          Getting started
        </p>
        {gettingStarted.map(renderLink)}
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
