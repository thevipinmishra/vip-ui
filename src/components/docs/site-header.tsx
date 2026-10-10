"use client";

import { ListIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { activeSection, mainNav } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { DocsSearch } from "./docs-search";
import { SiteLogo } from "./site-logo";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader({ wide = false }: { wide?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const active = activeSection(pathname);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  const renderMobileLink = (href: string, label: string) => {
    const isActive = href === "/" ? pathname === "/" : active === href;
    return (
      <Link
        key={href}
        href={href}
        onNavigate={() => setOpen(false)}
        aria-current={
          isActive ? (pathname === href ? "page" : "location") : undefined
        }
        className={cn(
          "flex min-h-12 items-center rounded-lg px-4 text-sm font-medium hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring",
          isActive
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        {label}
      </Link>
    );
  };

  return (
    <header className="border-b border-border/70 bg-card">
      <div
        className={cn(
          "mx-auto flex min-h-16 w-full items-center justify-between gap-4 px-5 sm:px-8 lg:grid lg:grid-cols-[224px_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[224px_minmax(0,1fr)_160px] xl:gap-8",
          wide ? "max-w-[90rem]" : "max-w-7xl",
        )}
      >
        <Link
          href="/"
          aria-label="vip/ui home"
          aria-current={pathname === "/" ? "page" : undefined}
          className="inline-flex min-h-10 shrink-0 items-center rounded-md hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <SiteLogo />
        </Link>
        <div className="flex min-w-0 flex-1 items-center justify-end gap-2 lg:col-start-2 xl:col-span-2">
          <nav
            aria-label="Main navigation"
            className="mr-auto hidden h-16 items-center gap-1 md:flex"
          >
            {mainNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={
                  active === link.href
                    ? pathname === link.href
                      ? "page"
                      : "location"
                    : undefined
                }
                className={cn(
                  "inline-flex h-full items-center border-b-2 px-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring",
                  active === link.href
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-1">
            <DocsSearch />
            <ThemeToggle />
            <div className="md:hidden">
              <SheetTrigger isOpen={open} onOpenChange={setOpen}>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open site navigation"
                  className="size-10 rounded-md text-muted-foreground hover:text-foreground"
                >
                  <ListIcon size={20} aria-hidden="true" />
                </Button>
                <Sheet position="right">
                  <SheetHeader className="flex items-center justify-between gap-4 border-b border-border/70 pb-4">
                    <SheetTitle>Menu</SheetTitle>
                    <SheetClose />
                  </SheetHeader>
                  <SheetBody className="pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                    <nav aria-label="Mobile navigation" className="grid gap-1">
                      {renderMobileLink("/", "Home")}
                      {mainNav.map((link) =>
                        renderMobileLink(link.href, link.label),
                      )}
                    </nav>
                  </SheetBody>
                </Sheet>
              </SheetTrigger>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
