"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "reicon-react";
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { href: "/components/installation", label: "Docs" },
  { href: "/components", label: "Components" },
  { href: "/charts", label: "Charts" },
  { href: "/examples", label: "Examples" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const active =
    pathname === "/components/installation"
      ? "/components/installation"
      : pathname.startsWith("/components")
        ? "/components"
        : links.find((link) => pathname.startsWith(link.href))?.href;

  return (
    <header className="sticky top-0 z-30 px-4 pt-3 sm:px-8 sm:pt-4">
      <nav
        aria-label="Site navigation"
        className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 rounded-full bg-card/95 px-4 shadow-[var(--shadow-float)] ring-1 ring-border/60 backdrop-blur-xl sm:px-6"
      >
        <Link
          href="/"
          aria-label="vip/ui home"
          className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-md font-semibold tracking-[-0.055em] text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <span
            className="grid size-8 grid-cols-2 gap-0.5 rounded-md bg-primary p-[7px]"
            aria-hidden="true"
          >
            <span className="rounded-[2px] bg-primary-foreground" />
            <span className="rounded-[2px] bg-primary-foreground/55" />
            <span className="rounded-[2px] bg-primary-foreground/55" />
            <span className="rounded-[2px] bg-primary-foreground" />
          </span>
          <span className="text-[19px]">
            vip<span className="text-primary">/</span>ui
          </span>
        </Link>
        <div className="flex items-center gap-1 sm:gap-3">
          <div className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active === link.href ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-10 items-center rounded-full px-3 text-sm font-medium transition-colors duration-200 hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                  active === link.href
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <ThemeToggle />
          <div className="md:hidden">
            <Drawer isOpen={open} onOpenChange={setOpen}>
              <DrawerTrigger
                variant="ghost"
                size="icon"
                aria-label="Open site navigation"
              >
                <Menu size={20} aria-hidden="true" />
              </DrawerTrigger>
              <DrawerContent placement="right">
                <DrawerHeader className="flex items-center justify-between gap-4 border-b border-border/70 pb-4">
                  <DrawerTitle>Navigate</DrawerTitle>
                  <DrawerClose />
                </DrawerHeader>
                <DrawerBody className="pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                  <div className="grid gap-2">
                    <Link
                      href="/"
                      onNavigate={() => setOpen(false)}
                      aria-current={pathname === "/" ? "page" : undefined}
                      className={cn(
                        "flex min-h-12 items-center rounded-lg px-4 text-sm font-medium hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring",
                        pathname === "/"
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground",
                      )}
                    >
                      Home
                    </Link>
                    {links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onNavigate={() => setOpen(false)}
                        aria-current={active === link.href ? "page" : undefined}
                        className={cn(
                          "flex min-h-12 items-center rounded-lg px-4 text-sm font-medium hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring",
                          active === link.href
                            ? "bg-accent text-accent-foreground"
                            : "text-muted-foreground",
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </nav>
    </header>
  );
}
