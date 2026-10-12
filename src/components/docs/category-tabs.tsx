import Link from "next/link";
import { cn } from "@/lib/utils";

export interface CategoryTab {
  href: string;
  label: string;
  count: number;
}

export function CategoryTabs({
  label,
  tabs,
  active,
}: {
  label: string;
  tabs: CategoryTab[];
  active: string;
}) {
  return (
    <nav
      aria-label={label}
      className="sticky top-0 z-30 border-b border-border/70 bg-background/90 backdrop-blur"
    >
      <ul className="site-container flex gap-1 overflow-x-auto [scrollbar-width:none]">
        {tabs.map((tab) => (
          <li key={tab.href} className="shrink-0">
            <Link
              href={tab.href}
              scroll={false}
              aria-current={tab.href === active ? "page" : undefined}
              className={cn(
                "inline-flex min-h-12 items-center gap-2 border-b-2 px-3 text-sm font-medium focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring",
                tab.href === active
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
              )}
            >
              {tab.label}
              <span className="rounded-full bg-muted px-1.5 text-[11px] tabular-nums text-muted-foreground">
                {tab.count}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
