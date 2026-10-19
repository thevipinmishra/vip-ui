"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ItemHighlight } from "@/components/ui/item-highlight";
import { activeSection, mainNav } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { DocsSearch } from "./docs-search";
import { GitHubMark, repositoryUrl } from "./github-mark";
import { MobileNav } from "./mobile-nav";
import { SiteLogo } from "./site-logo";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  const pathname = usePathname();
  const active = activeSection(pathname);

  return (
    <header className="border-b border-border/70 bg-background">
      <div className="site-container flex h-14 items-center gap-2">
        <Link
          href="/"
          aria-label="vip/ui home"
          aria-current={pathname === "/" ? "page" : undefined}
          className="mr-4 inline-flex min-h-10 shrink-0 items-center rounded-md outline-offset-4 outline-transparent transition-[opacity,outline-color,outline-offset] duration-150 ease-out-quint hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:outline-offset-2"
        >
          <SiteLogo />
        </Link>
        <nav
          aria-label="Main navigation"
          className="relative isolate hidden items-center gap-0.5 lg:flex"
        >
          <ItemHighlight placement="under" items="a" />
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
                "inline-flex h-9 items-center rounded-md px-3 text-sm font-medium transition-[color,background-color] duration-150 ease-out-quint hover:text-foreground focus-visible:bg-primary focus-visible:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-transparent",
                active === link.href
                  ? "text-foreground"
                  : "text-muted-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <DocsSearch />
          <span
            aria-hidden="true"
            className="mx-1.5 hidden h-5 w-px bg-border sm:block"
          />
          <a
            href={repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub (opens in a new tab)"
            title="GitHub"
            className="hidden size-10 shrink-0 place-items-center rounded-md text-muted-foreground outline-offset-4 outline-transparent transition-[color,background-color,outline-color,outline-offset] duration-150 ease-out-quint hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:outline-offset-2 sm:grid"
          >
            <GitHubMark className="size-[17px]" />
          </a>
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
