import Link from "next/link";
import { GitHubMark, repositoryUrl } from "./github-mark";
import { SiteLogo } from "./site-logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 py-5">
      <div className="site-container flex items-center justify-between gap-4">
        <Link
          href="/"
          aria-label="vip/ui home"
          className="inline-flex rounded-lg outline-offset-4 outline-transparent transition-[opacity,outline-color,outline-offset] duration-150 ease-out-quint hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:outline-offset-2"
        >
          <SiteLogo />
        </Link>
        <a
          href={repositoryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-8 items-center gap-2 rounded-md text-sm font-medium text-muted-foreground transition-[color,background-color,box-shadow] duration-150 ease-out-quint hover:text-foreground focus-visible:bg-primary focus-visible:text-primary-foreground focus-visible:ring-3 focus-visible:ring-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-transparent"
        >
          <GitHubMark />
          GitHub
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </footer>
  );
}
