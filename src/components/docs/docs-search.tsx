"use client";

import {
  AtomIcon,
  ChartBarIcon,
  CubeIcon,
  HouseIcon,
  MagnifyingGlassIcon,
  PaletteIcon,
  ScalesIcon,
  SquaresFourIcon,
  TerminalWindowIcon,
} from "@phosphor-icons/react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CommandPalette,
  CommandPaletteItem,
} from "@/components/ui/command-palette";
import { catalogComponents } from "@/lib/catalog";

const shortcutTakenByDemo = new Set(["/components/command-palette", "/themes"]);

const pages = [
  { href: "/", label: "Home", icon: HouseIcon },
  {
    href: "/components/installation",
    label: "Installation",
    icon: TerminalWindowIcon,
  },
  { href: "/components/react-aria", label: "React Aria", icon: AtomIcon },
  { href: "/components", label: "Components", icon: CubeIcon },
  { href: "/blocks", label: "Blocks", icon: SquaresFourIcon },
  { href: "/charts", label: "Charts", icon: ChartBarIcon },
  { href: "/themes", label: "Themes", icon: PaletteIcon },
  { href: "/license", label: "License", icon: ScalesIcon },
];

export function DocsSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        aria-label="Search components and pages"
        onPress={() => setOpen(true)}
        className="size-10 gap-2 rounded-md p-0 text-muted-foreground hover:text-foreground lg:w-auto lg:px-3"
      >
        <MagnifyingGlassIcon size={17} aria-hidden="true" />
        <span className="hidden lg:inline">Search</span>
      </Button>
      <CommandPalette
        isOpen={open}
        onOpenChange={setOpen}
        shortcut={!shortcutTakenByDemo.has(pathname)}
        title="Search components and pages"
        placeholder="Search components and pages"
        emptyMessage="No components or pages match."
      >
        {pages.map((page) => (
          <CommandPaletteItem
            key={page.href}
            textValue={page.label}
            onAction={() => router.push(page.href)}
          >
            <page.icon
              size={17}
              aria-hidden="true"
              className="text-muted-foreground"
            />
            {page.label}
          </CommandPaletteItem>
        ))}
        {catalogComponents.map((component) => (
          <CommandPaletteItem
            key={component.slug}
            textValue={`${component.name} ${component.group} ${component.useFor}`}
            onAction={() => router.push(`/components/${component.slug}`)}
          >
            <span className="min-w-0 flex-1 truncate">{component.name}</span>
            <span className="shrink-0 text-xs text-muted-foreground">
              {component.group}
            </span>
          </CommandPaletteItem>
        ))}
      </CommandPalette>
    </>
  );
}
