import { cn } from "@/lib/utils";
import { repositoryUrl } from "./github-mark";
import { SiteLogo } from "./site-logo";

const linkStyles =
  "rounded-sm transition-[color,background-color,box-shadow] duration-150 ease-out-quint hover:text-foreground focus-visible:bg-primary focus-visible:text-primary-foreground focus-visible:ring-3 focus-visible:ring-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-transparent";

const links = [
  { label: "GitHub", href: repositoryUrl },
  { label: "Changelog", href: `${repositoryUrl}/blob/main/CHANGELOG.md` },
];

export function SiteFooter({ className }: { className?: string }) {
  return (
    <footer className={cn("relative border-t border-docs-line", className)}>
      <span
        aria-hidden="true"
        className="docs-beam pointer-events-none absolute inset-x-0 -top-px h-px opacity-50"
      />
      <div className="site-container flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <SiteLogo className="scale-90 opacity-80" />
        <p className="mono-label flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[10px] text-muted-foreground">
          <span>MIT License</span>
          {links.map((link) => (
            <span key={link.label} className="contents">
              <span aria-hidden="true" className="text-foreground/25">
                /
              </span>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={linkStyles}
              >
                {link.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </span>
          ))}
        </p>
      </div>
    </footer>
  );
}
