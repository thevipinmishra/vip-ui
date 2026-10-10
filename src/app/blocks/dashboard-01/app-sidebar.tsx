"use client";

import {
  ChartLineUpIcon,
  GearSixIcon,
  HouseIcon,
  PackageIcon,
  ReceiptIcon,
  UsersIcon,
} from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { cn } from "@/lib/utils";

const navigation = [
  { label: "Overview", href: "#", icon: HouseIcon, current: true },
  { label: "Orders", href: "#", icon: ReceiptIcon, count: 12 },
  { label: "Customers", href: "#", icon: UsersIcon },
  { label: "Products", href: "#", icon: PackageIcon },
  { label: "Reports", href: "#", icon: ChartLineUpIcon },
  { label: "Settings", href: "#", icon: GearSixIcon },
];

export function AppSidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col gap-6">
      <div className="flex items-center gap-2.5 px-2">
        <span
          aria-hidden="true"
          className="grid size-8 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground"
        >
          A
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">Acme Store</p>
          <p className="truncate text-xs text-muted-foreground">Pro plan</p>
        </div>
      </div>
      <nav aria-label="Main">
        <ul className="grid gap-0.5">
          {navigation.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                onClick={onNavigate}
                aria-current={item.current ? "page" : undefined}
                className={cn(
                  "flex min-h-10 items-center gap-3 rounded-md px-2.5 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                  item.current
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <item.icon
                  size={18}
                  weight={item.current ? "fill" : "regular"}
                  aria-hidden="true"
                />
                <span className="flex-1">{item.label}</span>
                {item.count && (
                  <Badge className="min-h-5 px-2 py-0 text-[11px] shadow-none">
                    {item.count}
                    <span className="sr-only"> new</span>
                  </Badge>
                )}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto rounded-lg bg-muted/60 p-3 ring-1 ring-border/70">
        <ProgressBar
          label="Storage"
          value={68}
          valueLabel="6.8 of 10 GB"
          className="gap-1.5 [&_[data-slot=progress-bar-label]]:text-xs [&_[data-slot=progress-bar-value]]:text-xs"
        />
        <p className="mt-2 text-xs leading-5 text-muted-foreground">
          Upgrade to get 100 GB.
        </p>
      </div>
    </div>
  );
}
