import Link from "next/link";
import { DocsNav } from "@/components/docs/docs-nav";
import { MobileDocsNav } from "@/components/docs/mobile-docs-nav";
import { SidebarScrollArea } from "@/components/docs/sidebar-scroll-area";
import { ThemeToggle } from "@/components/docs/theme-toggle";

export default function ComponentsLayout({
  children,
}: LayoutProps<"/components">) {
  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main"
        className="sr-only fixed left-4 top-4 z-50 rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-30 px-4 pt-3 sm:px-8 sm:pt-4">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 rounded-full bg-card/95 px-4 shadow-[var(--shadow-float)] ring-1 ring-border/60 backdrop-blur-xl sm:px-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-semibold tracking-[-0.055em] text-foreground"
            >
              <span
                className="grid size-8 grid-cols-2 gap-0.5 rounded-md bg-primary p-[7px] shadow-[var(--shadow-card)]"
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
          </div>
          <nav
            aria-label="Site navigation"
            className="flex items-center gap-2 sm:gap-4"
          >
            <Link
              href="/components"
              className="hidden min-h-10 items-center rounded-full px-3 text-sm font-medium text-foreground hover:bg-muted sm:inline-flex"
            >
              Docs
            </Link>
            <Link
              href="/charts"
              className="inline-flex min-h-10 items-center rounded-full px-3 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              Charts
            </Link>
            <Link
              href="/examples"
              className="hidden min-h-10 items-center rounded-full px-3 text-sm text-muted-foreground hover:bg-muted hover:text-foreground sm:inline-flex"
            >
              Examples
            </Link>
            <Link
              href="/components/installation"
              className="hidden min-h-10 items-center rounded-full px-3 text-sm text-muted-foreground hover:bg-muted hover:text-foreground sm:inline-flex"
            >
              Installation
            </Link>
            <MobileDocsNav />
            <ThemeToggle />
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:grid lg:grid-cols-[224px_minmax(0,1fr)] lg:gap-14">
        <aside className="hidden border-r border-border/70 lg:block">
          <SidebarScrollArea>
            <DocsNav />
            <Link
              href="/components/installation"
              className="mt-8 block rounded-xl bg-accent p-4 text-sm font-medium text-accent-foreground hover:bg-accent/70"
            >
              Install a component →
            </Link>
          </SidebarScrollArea>
        </aside>
        <main
          id="main"
          className="min-w-0 max-w-[930px] pb-28 pt-12 sm:pt-16 lg:pt-10"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
