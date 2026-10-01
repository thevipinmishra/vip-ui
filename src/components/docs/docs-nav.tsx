"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { catalogGroups } from "./catalog-groups";

const links = [
  { href: "/components", label: "Overview" },
  { href: "/components/installation", label: "Installation" },
  { href: "/components/button", label: "Button" },
  { href: "/components/text-field", label: "Text field" },
  { href: "/components/select", label: "Select" },
  { href: "/components/checkbox", label: "Checkbox" },
  { href: "/components/switch", label: "Switch" },
  { href: "/components/badge", label: "Badge" },
  { href: "/components/alert", label: "Alert" },
  { href: "/components/radio-group", label: "Radio group" },
  { href: "/components/text-area", label: "Text area" },
  { href: "/components/slider", label: "Slider" },
  { href: "/components/tabs", label: "Tabs" },
  { href: "/components/accordion", label: "Accordion" },
  { href: "/components/dialog", label: "Dialog" },
  { href: "/components/drawer", label: "Drawer" },
  { href: "/components/search-field", label: "Search field" },
  { href: "/components/menu", label: "Menu" },
  { href: "/components/combo-box", label: "Combo box" },
  { href: "/components/tooltip", label: "Tooltip" },
  { href: "/components/toast", label: "Toast" },
  { href: "/components/separator", label: "Separator" },
  { href: "/components/progress-bar", label: "Progress bar" },
  { href: "/components/meter", label: "Meter" },
  { href: "/components/number-field", label: "Number field" },
  { href: "/components/toggle-button", label: "Toggle button" },
  { href: "/components/toggle-button-group", label: "Toggle button group" },
  { href: "/components/breadcrumbs", label: "Breadcrumbs" },
  { href: "/components/tag-group", label: "Tag group" },
  { href: "/components/list-box", label: "List box" },
  { href: "/components/color-swatch", label: "Color swatch" },
  { href: "/components/checkbox-group", label: "Checkbox group" },
  { href: "/components/disclosure", label: "Disclosure" },
  { href: "/components/popover", label: "Popover" },
  { href: "/components/toolbar", label: "Toolbar" },
  { href: "/components/grid-list", label: "Grid list" },
  { href: "/components/color-field", label: "Color field" },
  { href: "/components/form", label: "Form" },
  { href: "/components/link", label: "Link" },
  { href: "/components/color-swatch-picker", label: "Color swatch picker" },
  { href: "/components/time-field", label: "Time field" },
  { href: "/components/date-field", label: "Date field" },
  { href: "/components/file-trigger", label: "File trigger" },
  { href: "/components/calendar", label: "Calendar" },
  { href: "/components/range-calendar", label: "Range calendar" },
  { href: "/components/date-picker", label: "Date picker" },
  { href: "/components/date-range-picker", label: "Date range picker" },
  { href: "/components/preview-trigger", label: "Preview trigger" },
  { href: "/components/table", label: "Table" },
  { href: "/components/autocomplete", label: "Autocomplete" },
  { href: "/components/card", label: "Card" },
  { href: "/components/avatar", label: "Avatar" },
  { href: "/components/skeleton", label: "Skeleton" },
  { href: "/components/empty-state", label: "Empty state" },
  { href: "/components/pagination", label: "Pagination" },
  { href: "/components/description-list", label: "Description list" },
  { href: "/components/kbd-code", label: "Kbd & code" },
  { href: "/components/stat", label: "Stat" },
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

  const renderLink = (link: (typeof links)[number]) => (
    <Link
      key={link.href}
      href={link.href}
      onNavigate={onNavigate}
      aria-current={pathname === link.href ? "page" : undefined}
      className={cn(
        "relative isolate inline-flex min-h-10 items-center gap-3 rounded-lg px-3 text-[13px] font-medium whitespace-nowrap hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring",
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
    <nav
      aria-label="Documentation navigation"
      className={mobile ? "grid gap-5 sm:grid-cols-2" : "grid gap-6"}
    >
      <div className="grid gap-0.5">
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Start here
        </p>
        {links.slice(0, 2).map(renderLink)}
      </div>
      {catalogGroups.map((group) => (
        <div key={group.title} className="grid gap-0.5">
          <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {group.title}
          </p>
          {group.hrefs.map((slug) => {
            const link = links.find(
              (item) => item.href === `/components/${slug}`,
            );
            return renderLink(
              link ?? {
                href: `/components/${slug}`,
                label: slug
                  .replaceAll("-", " ")
                  .replace(/^./, (first) => first.toUpperCase()),
              },
            );
          })}
        </div>
      ))}
    </nav>
  );
}
