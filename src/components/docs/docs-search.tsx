"use client";

import {
  AtomIcon,
  ChartBarIcon,
  CubeIcon,
  HouseIcon,
  type Icon,
  MagnifyingGlassIcon,
  PaintBrushIcon,
  PaletteIcon,
  SquaresFourIcon,
  SwatchesIcon,
  TerminalWindowIcon,
  TextAaIcon,
  WaveSineIcon,
} from "@phosphor-icons/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "react-aria-components";
import {
  CommandPalette,
  CommandPaletteItem,
  CommandPaletteSection,
} from "@/components/ui/command-palette";
import { Kbd, KbdGroup } from "@/components/ui/kbd-code";
import { catalogComponents } from "@/lib/catalog";
import { docsGuides, type Guide } from "@/lib/navigation";

const shortcutTakenByDemo = new Set(["/components/command-palette"]);

const guideIcons: Record<Guide["href"], Icon> = {
  "/components/installation": TerminalWindowIcon,
  "/components/styling": PaintBrushIcon,
  "/components/typography": TextAaIcon,
  "/components/react-aria": AtomIcon,
  "/components/motion": WaveSineIcon,
};

const pages = [
  { href: "/", label: "Home", icon: HouseIcon },
  ...docsGuides.map(({ href, label }) => ({
    href,
    label,
    icon: guideIcons[href],
  })),
  { href: "/components", label: "Components", icon: CubeIcon },
  { href: "/blocks", label: "Blocks", icon: SquaresFourIcon },
  { href: "/charts", label: "Charts", icon: ChartBarIcon },
  { href: "/themes", label: "Themes", icon: PaletteIcon },
  { href: "/colors", label: "Colors", icon: SwatchesIcon },
];

export function DocsSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [modifier, setModifier] = useState<string>();
  const shortcut = !shortcutTakenByDemo.has(pathname);

  useEffect(() => {
    setModifier(/Mac|iPhone|iPad/.test(navigator.userAgent) ? "⌘" : "Ctrl");
  }, []);

  useEffect(() => {
    if (!shortcut) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.key.toLowerCase() !== "k" ||
        !(event.metaKey || event.ctrlKey) ||
        event.altKey ||
        event.shiftKey ||
        event.repeat
      )
        return;
      if (!open && document.querySelector("[role='dialog']")) return;
      event.preventDefault();
      setOpen(!open);
    };
    window.addEventListener("keydown", onKeyDown, true);
    return () => window.removeEventListener("keydown", onKeyDown, true);
  }, [open, shortcut]);

  return (
    <>
      <Button
        aria-label="Search components and pages"
        aria-keyshortcuts={shortcut ? "Control+K Meta+K" : undefined}
        onPress={() => setOpen(true)}
        className="inline-flex size-10 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md text-sm text-muted-foreground outline-offset-4 outline-transparent transition-[color,background-color,outline-color,outline-offset] duration-150 ease-out-quint hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:outline-offset-2 sm:h-9 sm:w-44 sm:justify-start sm:border sm:border-border/70 sm:bg-muted/40 sm:ps-2.5 sm:pe-1.5 lg:w-52 xl:w-64"
      >
        <MagnifyingGlassIcon size={17} aria-hidden="true" />
        <span className="hidden sm:inline">Search…</span>
        {shortcut && modifier && (
          <KbdGroup className="ml-auto hidden sm:inline-flex">
            <Kbd>{modifier}</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
        )}
      </Button>
      <CommandPalette
        isOpen={open}
        onOpenChange={setOpen}
        shortcut={false}
        title="Search components and pages"
        placeholder="Search components and pages"
        emptyMessage="No components or pages match."
      >
        <CommandPaletteSection title="Pages">
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
        </CommandPaletteSection>
        <CommandPaletteSection title="Components">
          {catalogComponents.map((component) => (
            <CommandPaletteItem
              key={component.slug}
              textValue={`${component.name} ${component.group} ${component.description}`}
              onAction={() => router.push(`/components/${component.slug}`)}
            >
              <span className="min-w-0 flex-1 truncate">{component.name}</span>
              <span className="shrink-0 text-xs text-muted-foreground">
                {component.group}
              </span>
            </CommandPaletteItem>
          ))}
        </CommandPaletteSection>
      </CommandPalette>
    </>
  );
}
