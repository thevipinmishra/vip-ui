import Link from "next/link";
import { GitHubMark, repositoryUrl } from "./github-mark";
import { SiteLogo } from "./site-logo";

export function SiteFooter() {
  return (
    <footer className="border-bs border-border/70 py-5">
      <div className="site-container flex items-center justify-between gap-4">
        <Link
          href="/"
          aria-label="vip/ui home"
          className="inline-flex rounded-lg hover:opacity-80 active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <SiteLogo />
        </Link>
        <a
          href={repositoryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-8 items-center gap-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground active:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <GitHubMark />
          GitHub
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </footer>
  );
}
