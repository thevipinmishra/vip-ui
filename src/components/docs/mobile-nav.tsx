"use client";

import {
  BookOpenIcon,
  ChartBarIcon,
  CubeIcon,
  HouseIcon,
  type Icon,
  ListIcon,
  PaletteIcon,
  SquaresFourIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "react-aria-components";
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetHandle,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { activeSection, mainNav } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { DocsNav } from "./docs-nav";
import { OnUnmount, useNavigateAfterClose } from "./navigate-after-close";

const icons: Record<string, Icon> = {
  "/": HouseIcon,
  "/components/installation": BookOpenIcon,
  "/components": CubeIcon,
  "/blocks": SquaresFourIcon,
  "/charts": ChartBarIcon,
  "/themes": PaletteIcon,
};

const sections = [{ href: "/", label: "Home" }, ...mainNav];

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { onNavigate, onClosed } = useNavigateAfterClose(() => setOpen(false));
  const active = pathname === "/" ? "/" : activeSection(pathname);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <div className="lg:hidden">
      <SheetTrigger isOpen={open} onOpenChange={setOpen}>
        <Button
          aria-label="Open menu"
          className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <ListIcon size={20} aria-hidden="true" />
        </Button>
        <Sheet>
          <SheetHandle />
          <SheetHeader className="flex items-center justify-between gap-4 border-b border-border/70 pb-4">
            <SheetTitle>Menu</SheetTitle>
            <SheetClose />
          </SheetHeader>
          <SheetBody className="grid content-start gap-8 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <nav aria-label="Main navigation">
              <ul className="grid grid-cols-3 gap-2">
                {sections.map((link) => {
                  const SectionIcon = icons[link.href];
                  const isActive = active === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onNavigate={(event) => onNavigate(event, link.href)}
                        aria-current={
                          isActive
                            ? pathname === link.href
                              ? "page"
                              : "location"
                            : undefined
                        }
                        className={cn(
                          "flex min-h-16 flex-col items-center justify-center gap-1.5 rounded-lg border px-2 text-[13px] font-medium focus-visible:outline-2 focus-visible:outline-ring",
                          isActive
                            ? "border-transparent bg-accent text-accent-foreground"
                            : "border-border/70 text-muted-foreground hover:bg-muted hover:text-foreground",
                        )}
                      >
                        <SectionIcon size={18} aria-hidden="true" />
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <DocsNav mobile onNavigate={onNavigate} />
            <OnUnmount onUnmount={onClosed} />
          </SheetBody>
        </Sheet>
      </SheetTrigger>
    </div>
  );
}
