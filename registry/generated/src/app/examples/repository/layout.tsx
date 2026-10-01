import type { Metadata } from "next";
import { repository } from "./config";
import { Navigation, SourceLink } from "./navigation";
import { ThemeToggle } from "./theme-toggle";

export const metadata: Metadata = {
  title: "Repository desk",
  description:
    "Track issues, reviews, commits, releases, and contributors on GitHub.",
};

export default function RepositoryLayout({
  children,
}: LayoutProps<"/examples/repository">) {
  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main"
        className="sr-only fixed start-4 top-4 z-50 rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only"
      >
        Skip to content
      </a>
      <header className="border-b border-border/70 bg-card lg:sticky lg:top-0 lg:z-20">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3 px-5 py-3 sm:px-8">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <a
              href="/examples/repository"
              className="text-lg font-semibold tracking-[-0.055em]"
            >
              Repository<span className="text-primary">/</span>desk
            </a>
            <span
              className="hidden h-5 w-px bg-border sm:block"
              aria-hidden="true"
            />
            <span className="text-xs text-muted-foreground">
              {repository.owner} / {repository.name}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <SourceLink />
            <ThemeToggle />
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-[1440px] lg:grid lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="min-w-0 border-b border-border/70 px-5 py-4 sm:px-8 lg:sticky lg:top-[65px] lg:h-[calc(100dvh-65px)] lg:self-start lg:overflow-y-auto lg:overscroll-y-contain lg:border-b-0 lg:border-e lg:px-5 lg:py-8">
          <div className="mb-6 hidden lg:block">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Workspace
            </p>
            <p className="mt-2 break-all text-sm font-semibold">
              {repository.owner} / {repository.name}
            </p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Public GitHub repository
            </p>
          </div>
          <Navigation />
          <p className="mt-8 hidden border-t border-border/70 pt-5 text-xs leading-5 text-muted-foreground lg:block">
            Open items on GitHub to take action.
          </p>
        </aside>
        <main
          id="main"
          className="min-w-0 scroll-mt-[65px] px-5 pb-20 pt-9 sm:px-8 sm:pt-12 lg:px-10 xl:px-14"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
