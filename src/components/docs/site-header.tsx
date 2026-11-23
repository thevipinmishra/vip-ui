"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ItemHighlight } from "@/components/ui/item-highlight";
import { activeSection, mainNav } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { siteVersion } from "@/lib/version";
import { DocsSearch } from "./docs-search";
import { GitHubMark, repositoryUrl } from "./github-mark";
import { MobileNav } from "./mobile-nav";
import { SiteLogo } from "./site-logo";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader({
  transparentAtTop = false,
}: {
  transparentAtTop?: boolean;
}) {
  const pathname = usePathname();
  const active = activeSection(pathname);

  return (
    <>
      <a
        href="#main"
        className="sr-only fixed inset-s-4 top-2 z-50 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus:not-sr-only"
      >
        Skip to content
      </a>
      <header
        className={cn(
          "sticky top-0 z-40 border-b border-docs-line bg-background/75 backdrop-blur-xl backdrop-saturate-150",
          transparentAtTop && "header-settle",
        )}
      >
        <div className="site-container flex h-(--header-height) items-center gap-2">
          <Link
            href="/"
            aria-label="vip/ui home"
            aria-current={pathname === "/" ? "page" : undefined}
            className="mr-4 inline-flex min-h-10 shrink-0 items-center rounded-md outline-offset-4 outline-transparent transition-[opacity,outline-color,outline-offset] duration-150 ease-out-quint hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:outline-offset-2"
          >
            <SiteLogo />
          </Link>
          <span
            aria-hidden="true"
            className="mono-label -ms-2 me-3 hidden h-5 items-center rounded-full px-2 text-[10px] tracking-[0.04em] normal-case text-muted-foreground ring-1 ring-docs-line sm:inline-flex"
          >
            {siteVersion}
          </span>
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
                  "relative inline-flex h-9 items-center rounded-md px-3 text-[13px] font-medium transition-[color,background-color] duration-150 ease-out-quint hover:text-foreground focus-visible:bg-primary focus-visible:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-transparent",
                  active === link.href
                    ? "text-foreground"
                    : "text-muted-foreground",
                )}
              >
                {link.label}
                {active === link.href && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-3 -bottom-[calc((var(--header-height)-2.25rem)/2+1px)] h-px bg-docs-accent shadow-[0_0_10px_var(--docs-accent)] forced-colors:bg-[Highlight]"
                  />
                )}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-1">
            <DocsSearch />
            <span
              aria-hidden="true"
              className="mx-1.5 hidden h-5 w-px bg-docs-line sm:block"
            />
            <a
              href={repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub (opens in a new tab)"
              title="GitHub"
              className="hidden size-10 shrink-0 place-items-center rounded-md text-muted-foreground outline-offset-4 outline-transparent transition-[color,background-color,outline-color,outline-offset] duration-150 ease-out-quint hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:outline-offset-2 sm:grid"
            >
              <GitHubMark className="size-4.25" />
            </a>
            <ThemeToggle />
            <MobileNav />
          </div>
        </div>
        <span
          aria-hidden="true"
          className="docs-beam pointer-events-none absolute inset-x-0 -bottom-px h-px opacity-60"
        />
      </header>
    </>
  );
}
