import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import { catalogGroups } from "@/lib/catalog";
import { cn } from "@/lib/utils";

const tileClass =
  "group/tile relative flex min-w-0 flex-col gap-3 rounded-xl bg-card p-5 text-card-foreground shadow-[var(--shadow-card)] ring-1 ring-border/70 outline-offset-4 outline-transparent transition-[box-shadow,outline-color,outline-offset] duration-200 ease-out-quint hover:shadow-[var(--shadow-float)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:outline-offset-2 forced-colors:border";

function anchor(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

const more = [
  {
    href: "/blocks",
    title: "Blocks",
    description:
      "Full pages and page sections: a dashboard, sign-in forms, settings, and more.",
  },
  {
    href: "/charts",
    title: "Charts",
    description:
      "A TanStack Charts gallery and a chart frame for your own charts.",
  },
  {
    href: "/themes",
    title: "Themes",
    description: "Themes made from the color scales. Copy the CSS variables.",
  },
  {
    href: "/colors",
    title: "Colors",
    description: "Color scales with 12 steps each, for light and dark mode.",
  },
];

export function CatalogOverview() {
  return (
    <div className="grid gap-10">
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {catalogGroups.map((group) => (
          <li key={group.title} className="grid min-w-0">
            <Link
              href={`/components#${anchor(group.title)}`}
              className={tileClass}
            >
              <span className="flex items-baseline justify-between gap-3">
                <span className="truncate text-sm font-semibold">
                  {group.title}
                </span>
                <span className="font-mono text-xs text-muted-foreground tabular-nums">
                  {group.components.length}
                </span>
              </span>
              <span className="text-sm leading-6 text-pretty text-muted-foreground">
                {group.components
                  .slice(0, 4)
                  .map((component) => component.name)
                  .join(", ")}
                {group.components.length > 4 && ", and more"}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {more.map((item) => (
          <li key={item.href} className="grid min-w-0">
            <Link
              href={item.href}
              className={cn(tileClass, "bg-transparent shadow-none")}
            >
              <span className="flex items-center gap-1.5 text-sm font-semibold">
                {item.title}
                <ArrowRightIcon
                  size={13}
                  aria-hidden="true"
                  className="text-muted-foreground transition-transform duration-200 ease-out-quint motion-safe:group-hover/tile:translate-x-0.5 rtl:-scale-x-100"
                />
              </span>
              <span className="text-sm leading-6 text-pretty text-muted-foreground">
                {item.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
