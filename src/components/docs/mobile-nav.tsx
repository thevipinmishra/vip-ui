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
  SwatchesIcon,
  TextAaIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "react-aria-components";
import { ItemHighlight } from "@/components/ui/item-highlight";
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetHandle,
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
  "/typography": TextAaIcon,
  "/colors": SwatchesIcon,
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
          className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-md text-muted-foreground outline-offset-4 outline-transparent transition-[color,background-color,outline-color,outline-offset] duration-150 ease-out-quint hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:outline-offset-2"
        >
          <ListIcon size={20} aria-hidden="true" />
        </Button>
        <Sheet>
          <div className="relative flex shrink-0 items-center px-3">
            <SheetHandle />
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <SheetClose className="absolute end-3" />
          </div>
          <SheetBody className="grid content-start gap-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <nav
              aria-label="Main navigation"
              className="relative isolate border-b border-border/70 pb-4"
            >
              <ItemHighlight placement="under" items="a" />
              <ul className="grid grid-cols-2 gap-1">
                {sections.map((link) => {
                  const SectionIcon = icons[link.href];
                  const isActive = active === link.href;
                  return (
                    <li key={link.href} className="grid min-w-0">
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
                          "group/section flex min-h-10 min-w-0 items-center gap-2.5 rounded-lg px-3 text-[13px] font-medium transition-[color,background-color] duration-150 ease-out-quint hover:text-foreground focus-visible:bg-primary focus-visible:text-primary-foreground focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-transparent",
                          isActive
                            ? "bg-accent text-accent-foreground"
                            : "text-muted-foreground",
                        )}
                      >
                        <SectionIcon
                          size={16}
                          aria-hidden="true"
                          weight={isActive ? "fill" : "regular"}
                          className={cn(
                            "shrink-0 transition-colors duration-150 ease-out-quint group-hover/section:text-foreground group-focus-visible/section:text-primary-foreground",
                            isActive
                              ? "text-foreground"
                              : "text-muted-foreground",
                          )}
                        />
                        <span className="truncate">{link.label}</span>
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
