import { cn } from "@/lib/utils";
import { repositoryUrl } from "./github-mark";

const linkStyles =
  "rounded-sm transition-[color,background-color,box-shadow] duration-150 ease-out-quint hover:text-foreground focus-visible:bg-primary focus-visible:text-primary-foreground focus-visible:ring-3 focus-visible:ring-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-transparent";

export function SiteFooter({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        "site-container py-8 text-center text-xs text-muted-foreground",
        className,
      )}
    >
      <p>
        vip/ui <span aria-hidden="true">·</span> MIT License{" "}
        <span aria-hidden="true">·</span>{" "}
        <a
          href={repositoryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={linkStyles}
        >
          GitHub
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </p>
    </footer>
  );
}
