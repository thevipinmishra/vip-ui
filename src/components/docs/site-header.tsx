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
import { DocsSearch } from "./docs-search";
import { SiteLogo } from "./site-logo";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { href: "/components", label: "Components" },
  { href: "/components/installation", label: "Installation" },
  { href: "/themes", label: "Themes" },
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

  const renderMobileLink = (href: string, label: string) => {
    const isActive = href === "/" ? pathname === "/" : active === href;
    return (
      <Link
        key={href}
        href={href}
        onNavigate={() => setOpen(false)}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "flex min-h-12 items-center rounded-lg px-4 text-sm font-medium transition-colors duration-200 hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring",
          isActive
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground",
        )}
      >
        {label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-30 px-5 pt-3 sm:px-8 sm:pt-4">
      <nav
        aria-label="Site navigation"
        className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-2 rounded-full bg-card/95 p-2 shadow-[var(--shadow-float)] ring-1 ring-border/60 backdrop-blur-xl sm:p-3"
      >
        <Link
          href="/"
          aria-label="vip/ui home"
          className="inline-flex min-h-10 shrink-0 items-center rounded-full px-2 transition-colors duration-200 hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <SiteLogo />
        </Link>
        <div className="flex items-center gap-0.5 sm:gap-1">
          <div className="hidden items-center gap-0.5 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active === link.href ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-10 items-center rounded-full px-3 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                  active === link.href
                    ? "bg-accent text-accent-foreground hover:bg-accent/70"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <DocsSearch />
          <ThemeToggle />
          <div className="md:hidden">
            <Drawer isOpen={open} onOpenChange={setOpen}>
              <DrawerTrigger
                variant="ghost"
                size="icon"
                aria-label="Open site navigation"
                className="size-10 rounded-full text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                <Menu size={20} aria-hidden="true" />
              </DrawerTrigger>
              <DrawerContent placement="right">
                <DrawerHeader className="flex items-center justify-between gap-4 border-b border-border/70 pb-4">
                  <DrawerTitle>Navigate</DrawerTitle>
                  <DrawerClose />
                </DrawerHeader>
                <DrawerBody className="pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                  <div className="grid gap-1">
                    {renderMobileLink("/", "Home")}
                    {links.map((link) =>
                      renderMobileLink(link.href, link.label),
                    )}
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
