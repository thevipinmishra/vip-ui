import Link from "next/link";
import { cn } from "@/lib/utils";
import { repositoryUrl } from "./github-mark";

const linkStyles =
  "inline-flex min-h-6 items-center rounded-sm transition-[color,background-color,box-shadow] duration-150 ease-out-quint hover:text-foreground focus-visible:bg-primary focus-visible:text-primary-foreground focus-visible:ring-3 focus-visible:ring-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-transparent";

export function SiteFooter({ className }: { className?: string }) {
  return (
    <footer className={cn("py-6 text-xs text-muted-foreground", className)}>
      <div className="site-container flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <p className="flex items-center gap-1.5">
          vip/ui
          <span aria-hidden="true">·</span>
          <Link href="/license" className={linkStyles}>
            MIT License
          </Link>
        </p>
        <a
          href={repositoryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={linkStyles}
        >
          GitHub
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </footer>
  );
}
